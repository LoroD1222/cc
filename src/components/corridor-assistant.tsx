"use client";

import { FormEvent, useState } from "react";
import { Send } from "lucide-react";

type AssistantReply = {
  answer: string;
  link?: { href: string; label: string };
};

type ChatMessage = AssistantReply & {
  id: number;
  role: "assistant" | "user";
};

const welcome: ChatMessage = {
  id: 0,
  role: "assistant",
  answer: "Welcome to Corridor Help. Ask about programmes, infrastructure, opportunities, projects, Member States or how to contact CCTTFA.",
};

export function CorridorAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([welcome]);
  const [question, setQuestion] = useState("");
  const [isSending, setIsSending] = useState(false);

  async function submitQuestion(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedQuestion = question.trim();
    if (trimmedQuestion.length < 2 || isSending) return;

    const questionId = Date.now();
    setMessages((current) => [...current, { id: questionId, role: "user", answer: trimmedQuestion }]);
    setQuestion("");
    setIsSending(true);

    try {
      const response = await fetch("/api/corridor-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmedQuestion }),
      });
      const reply = await response.json() as AssistantReply;
      if (!response.ok || !reply.answer) throw new Error("Unable to get a reply");
      setMessages((current) => [...current, { id: questionId + 1, role: "assistant", ...reply }]);
    } catch {
      setMessages((current) => [...current, {
        id: questionId + 1,
        role: "assistant",
        answer: "I could not retrieve a reply just now. Please use the Contact Us page and the Secretariat will help you directly.",
        link: { href: "/contact", label: "Contact CCTTFA" },
      }]);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <aside className="assistant-card" aria-labelledby="corridor-assistant-title">
      <header><span aria-hidden /> <strong id="corridor-assistant-title">Corridor Help</strong><small>Website guide</small></header>
      <div className="assistant-messages" aria-live="polite">
        {messages.map((message) => (
          <div className={`assistant-message assistant-message-${message.role}`} key={message.id}>
            <p>{message.answer}</p>
            {message.link && <a href={message.link.href}>{message.link.label} <span aria-hidden>→</span></a>}
          </div>
        ))}
      </div>
      <form className="assistant-input" onSubmit={submitQuestion}>
        <label className="sr-only" htmlFor="corridor-help-question">Ask Corridor Help</label>
        <input id="corridor-help-question" value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Ask a question…" minLength={2} maxLength={500} disabled={isSending} required />
        <button type="submit" aria-label="Send question" disabled={isSending}>{isSending ? "…" : <Send aria-hidden size={18} />}</button>
      </form>
    </aside>
  );
}
