"use client";

import { useEffect, useMemo, useState } from "react";

type SidebarItem = { label: string; href: string };

function getCurrentHash(items: SidebarItem[]) {
  if (typeof window === "undefined") return items[0]?.href ?? "";
  return items.some((item) => item.href === window.location.hash)
    ? window.location.hash
    : items[0]?.href ?? "";
}

export function SidebarNav({ label = "Navigation", items }: { label?: string; items: SidebarItem[] }) {
  const sectionIds = useMemo(
    () => [...new Set(items.map((item) => item.href.startsWith("#") ? item.href.slice(1) : "").filter(Boolean))],
    [items],
  );
  const [activeHref, setActiveHref] = useState(() => getCurrentHash(items));

  useEffect(() => {
    const syncFromScroll = () => {
      const visibleSections = sectionIds
        .map((id) => document.getElementById(id))
        .filter((section): section is HTMLElement => section !== null);
      const currentSection = visibleSections.reduce<HTMLElement | null>((active, section) => (
        section.getBoundingClientRect().top <= 160 ? section : active
      ), null) ?? visibleSections[0];

      if (currentSection) setActiveHref(`#${currentSection.id}`);
    };
    const syncFromHash = () => setActiveHref(getCurrentHash(items));

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    window.addEventListener("scroll", syncFromScroll, { passive: true });
    return () => {
      window.removeEventListener("hashchange", syncFromHash);
      window.removeEventListener("scroll", syncFromScroll);
    };
  }, [items, sectionIds]);

  return (
    <aside className="sidebar-nav" aria-label={`${label} in-page navigation`}>
      <p>{label}</p>
      <nav>
        {items.map((item, index) => {
          const isActive = item.href === activeHref && items.findIndex((candidate) => candidate.href === activeHref) === index;
          return (
            <a aria-current={isActive ? "location" : undefined} className={isActive ? "active" : ""} href={item.href} key={`${item.href}-${item.label}`} onClick={() => setActiveHref(item.href)}>
              {item.label}
            </a>
          );
        })}
      </nav>
    </aside>
  );
}
