import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { NewsCard, ProjectCard, SectionHeading } from "@/components/ui";
import { articles, countries, organs, projects } from "@/data/site";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({ title: "Seven Nations. One Corridor to the Sea", description: "Explore the Central Corridor's seven partner states, regional projects, news, governance and multimodal trade network.", path: "/", image: "/images/home-hero.png" });

export default function HomePage() {
  return <>
    <section className="home-hero">
      <Image src="/images/home-hero.png" alt="Aerial view of container operations at the Port of Dar es Salaam" fill preload sizes="100vw" />
      <div className="home-hero-overlay" />
      <div className="site-container home-hero-content">
        <h1>Seven nations.<br />One corridor to the sea.</h1>
        <p>The Central Corridor connects East and Central Africa&apos;s landlocked nations to the sea through the Port of Dar es Salaam via an integrated multimodal transport and logistics network.</p>
        <div className="hero-actions"><Link className="button" href="/about">Our mission</Link><Link className="button button-outline" href="/corridor">Explore routes</Link></div>
      </div>
    </section>

    <section className="countries-strip section">
      <div className="site-container">
        <h2>Seven Nations. One Agreement.</h2>
        <div className="country-flags">{countries.map((country) => <Link href={`/countries/${country.slug}`} key={country.name}><div><Image src={country.flag} alt={`${country.name} flag`} fill sizes="6rem" /></div><h3>{country.name === "D.R. Congo" ? "D. R. C." : country.name}</h3></Link>)}</div>
      </div>
    </section>

    <section className="section home-news-section">
      <div className="site-container home-news-grid">
        <aside className="home-side-stack">
          <article className="executive-card"><div><Image src="/images/leader-flory.png" alt="Adv. Okandju Okonge Flory, Executive Secretary" fill sizes="20rem" /></div><h2>Adv. Okandju Okonge Flory <span>Executive Secretary</span></h2><Link className="text-link" href="/about/executive-secretary">Executive Secretary&apos;s Message <ArrowRight aria-hidden size={15} /></Link></article>
          <article className="tender-card"><p className="eyebrow">Tenders</p><hr /><span className="badge badge-open">Open</span><small>Ref. CCTTFA/PR/2026/04</small><h3>Provision of Medical Insurance Service Provider</h3><p>Closes Nov 30, 2026</p><Link className="text-link" href="/tenders">View all tenders <ArrowRight aria-hidden size={15} /></Link><hr /><p className="eyebrow">Vacancies</p><p>No active vacancies at the moment</p></article>
        </aside>
        <div className="home-article-grid">{articles.slice(0, 6).map((article) => <NewsCard article={article} key={article.title} />)}<Link className="button home-news-button" href="/news">View more news</Link></div>
      </div>
    </section>

    <section className="section section-pale">
      <div className="site-container">
        <SectionHeading title="Projects from Central Corridor" description="Follow the latest updates, partnerships and progress from across the Central Corridor network." align="center" />
        <div className="card-grid">{projects.slice(0, 3).map((project) => <ProjectCard project={project} key={project.title} />)}</div>
      </div>
    </section>

    <section className="governance-section section">
      <Image src="/images/governance-bg.png" alt="" fill sizes="100vw" />
      <div className="governance-overlay" />
      <div className="site-container governance-content">
        <SectionHeading title="Four Organs. One Mandate" description="CCTTFA delivers its mandate through four organs that coordinate policy, stakeholder consultation and implementation." align="center" />
        <div className="institutional-flow home-institutional-flow">{organs.map((organ, index) => <div className="institutional-flow-step" key={organ.slug}><Link href={`/about/organs/${organ.slug}`}><span>{index + 1}</span><div><h3>{organ.title}</h3><p>{organ.text}</p><small>Explore organ <ArrowRight aria-hidden size={14} /></small></div></Link>{index < organs.length - 1 && <ArrowDown className="institutional-flow-arrow" aria-hidden size={24} />}</div>)}</div>
      </div>
    </section>

    <section className="route-mission">
      <Image src="/images/corridor-map-home.png" alt="Map of Central Corridor rail, road and lake routes" fill sizes="100vw" />
      <div className="route-mission-overlay" />
      <div className="site-container route-mission-copy"><h2>The Competitive and Sustainable Trade Route of Choice</h2><p>To facilitate the development of integrated transportation and trade networks along the Central Corridor.</p><Link className="button" href="/corridor">View route network <ArrowRight aria-hidden size={17} /></Link></div>
    </section>

    <section className="home-route-gallery section-pale">
      <div className="site-container route-gallery-grid">
        {["/images/route-road.png", "/images/route-rail.png", "/images/route-port.png"].map((src, index) => <div className={index === 1 ? "featured" : ""} key={src}><Image src={src} alt="Central Corridor infrastructure" fill sizes="33vw" />{index === 1 && <span>Framework for Regional<br />Transit Cooperation</span>}</div>)}
      </div>
      <div className="site-container framework-copy"><p>The Central Corridor Transit Transport Facilitation Agreement was established on 2nd September 2006. It is built on a shared mission to eliminate non-tariff trade barriers, upgrade critical rail, road and port networks, and establish an uninterrupted flow of commodities.</p><div className="mini-flags">{countries.map((country) => <span key={country.name}><Image src={country.flag} alt="" fill sizes="1.5rem" /></span>)}</div></div>
    </section>
  </>;
}
