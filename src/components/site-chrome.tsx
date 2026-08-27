"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { portalNavigation, publicNavigation } from "@/data/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const portal = ["/portal", "/contact", "/feedback"].some((route) => pathname.startsWith(route));
  const navigation = portal ? portalNavigation : publicNavigation;

  return (
    <header className={`site-header ${pathname === "/" ? "home-header" : ""}`}>
      <div className="site-container header-inner">
        <Link className="brand" href="/" aria-label="Central Corridor home">
          <Image src="/images/logo.png" alt="Central Corridor Transit Transport Facilitation Agency" width={450} height={70} preload />
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) => {
            const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return <Link aria-current={active ? "page" : undefined} className={active ? "active" : ""} href={item.href} key={item.href}>{item.label}</Link>;
          })}
        </nav>
        <div className="header-actions">
          <button className="language-switcher" type="button" aria-label="Current language English; switch to French"><span>EN</span><i />FR</button>
          <Link className="button button-small" href={portal ? "/portal#login" : "/contact"}>{portal ? "Partner Login" : "Contact us"}</Link>
          <button className="menu-button" type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
            {open ? <X aria-hidden /> : <Menu aria-hidden />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {navigation.map((item) => <Link href={item.href} key={item.href} onClick={() => setOpen(false)}>{item.label}</Link>)}
          {!portal && <Link href="/tenders" onClick={() => setOpen(false)}>Tenders & Procurement</Link>}
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  const pathname = usePathname();
  const portal = ["/portal", "/contact", "/feedback"].some((route) => pathname.startsWith(route));
  return (
    <footer className="site-footer">
      <div className="site-container footer-grid">
        <div className="footer-brand">
          <Image src="/images/logo-white.png" alt="Central Corridor Transit Transport Facilitation Agency" width={450} height={70} />
          <p>Connecting seven sovereign nations to regional and international maritime trade paths through integrated, resilient multi-modal logistics networks.</p>
          <div className="socials" aria-label="Social media links"><a href="https://x.com" aria-label="X">𝕏</a><a href="https://facebook.com" aria-label="Facebook">f</a><a href="https://youtube.com" aria-label="YouTube">▶</a></div>
        </div>
        <div>
          <h2>{portal ? "Portal Services" : "Quick Links"}</h2>
          <ul>
            <li><Link href="/about">About CCTTFA</Link></li>
            <li><Link href="/corridor">The Corridor</Link></li>
            <li><Link href="/projects">Projects & Masterplan</Link></li>
            <li><Link href="/news">Latest Bulletins</Link></li>
          </ul>
        </div>
        <div>
          <h2>{portal ? "Liaison & Help" : "Resources"}</h2>
          <ul>
            <li><Link href="/tenders">Tenders & Procurement</Link></li>
            <li><Link href="/resources">Transport Observatory</Link></li>
            <li><Link href="/portal">Stakeholders Portal</Link></li>
            <li><Link href="/feedback">Submit Feedback</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom"><div className="site-container"><span>© 2026 CCTTFA Permanent Secretariat. All rights reserved.</span><span>Dar es Salaam, Tanzania</span><a href="mailto:ttfa@centralcorridor-ttfa.org">ttfa@centralcorridor-ttfa.org</a></div></div>
    </footer>
  );
}
