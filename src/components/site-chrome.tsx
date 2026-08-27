"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { publicNavigation } from "@/data/site";

const moreNavigation = [
  { label: "Stakeholder Portal", href: "/portal" },
  { label: "Feedback", href: "/feedback" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const moreActive = moreNavigation.some((item) => pathname === item.href || pathname.startsWith(item.href));
  const mobileNavigation = [...publicNavigation, ...moreNavigation, { label: "Contact us", href: "/contact" }];

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!moreRef.current?.contains(event.target as Node)) setMoreOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMoreOpen(false);
    };

    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return (
    <header className={`site-header ${pathname === "/" ? "home-header" : ""}`}>
      <div className="site-container header-inner">
        <Link className="brand" href="/" aria-label="Central Corridor home">
          <Image src="/images/logo.png" alt="Central Corridor Transit Transport Facilitation Agency" width={450} height={70} preload />
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {publicNavigation.map((item) => {
            const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return <Link aria-current={active ? "page" : undefined} className={active ? "active" : ""} href={item.href} key={item.href}>{item.label}</Link>;
          })}
          <div className={`nav-more ${moreOpen ? "open" : ""}`} ref={moreRef}>
            <button className={`nav-more-button ${moreActive ? "active" : ""}`} type="button" aria-controls="more-navigation" aria-expanded={moreOpen} aria-haspopup="menu" onClick={() => setMoreOpen((value) => !value)}>
              More <ChevronDown aria-hidden size={15} />
            </button>
            {moreOpen && (
              <div className="nav-more-menu" id="more-navigation" role="menu">
                <p>Explore more</p>
                {moreNavigation.map((item) => (
                  <Link className={pathname === item.href ? "active" : ""} href={item.href} key={item.href} role="menuitem" onClick={() => setMoreOpen(false)}>
                    <span>{item.label}</span><span aria-hidden>→</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>
        <div className="header-actions">
          <button className="language-switcher" type="button" aria-label="Current language English; switch to French"><span>EN</span><i />FR</button>
          <Link className="button button-small" href="/contact">Contact us</Link>
          <button className="menu-button" type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => { setOpen((value) => !value); setMoreOpen(false); }}>
            {open ? <X aria-hidden /> : <Menu aria-hidden />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {mobileNavigation.map((item) => <Link href={item.href} key={item.href} onClick={() => setOpen(false)}>{item.label}</Link>)}
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-container footer-grid">
        <div className="footer-brand">
          <Image src="/images/logo-white.png" alt="Central Corridor Transit Transport Facilitation Agency" width={450} height={70} />
          <p>Connecting seven sovereign nations to regional and international maritime trade paths through integrated, resilient multi-modal logistics networks.</p>
          <div className="socials" aria-label="Social media links"><a href="https://x.com" aria-label="X">𝕏</a><a href="https://facebook.com" aria-label="Facebook">f</a><a href="https://youtube.com" aria-label="YouTube">▶</a></div>
        </div>
        <div>
          <h2>Explore</h2>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About CCTTFA</Link></li>
            <li><Link href="/corridor">The Corridor</Link></li>
            <li><Link href="/projects">Projects & Masterplan</Link></li>
          </ul>
        </div>
        <div>
          <h2>Updates</h2>
          <ul>
            <li><Link href="/news">News & Events</Link></li>
            <li><Link href="/tenders">Tenders & Procurement</Link></li>
            <li><Link href="/resources">Resources</Link></li>
          </ul>
        </div>
        <div>
          <h2>Connect</h2>
          <ul>
            <li><Link href="/portal">Stakeholder Portal</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
            <li><Link href="/feedback">Submit Feedback</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom"><div className="site-container"><span>© 2026 CCTTFA Permanent Secretariat. All rights reserved.</span><span>Dar es Salaam, Tanzania</span><a href="mailto:ttfa@centralcorridor-ttfa.org">ttfa@centralcorridor-ttfa.org</a></div></div>
    </footer>
  );
}
