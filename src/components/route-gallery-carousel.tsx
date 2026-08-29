"use client";

import Image from "next/image";
import { Anchor, ChevronLeft, ChevronRight, MapPin, Ship, TrainFront, Truck, Warehouse } from "lucide-react";
import { useEffect, useState } from "react";

const slides = [
  { src: "/images/route-road.png", alt: "Freight truck travelling on a Central Corridor road", type: "Road networks", title: "Reliable regional road links", icon: Truck },
  { src: "/images/route-rail.png", alt: "Railway operations on the Central Corridor", type: "Railways", title: "Integrated rail freight systems", icon: TrainFront },
  { src: "/images/route-port.png", alt: "Container operations at a Central Corridor port", type: "Ports", title: "Maritime and lake gateways", icon: Anchor },
  { src: "/images/corridor-gallery-border.png", alt: "Border post serving Central Corridor trade", type: "Border posts", title: "Faster, coordinated crossings", icon: MapPin },
  { src: "/images/project-yard.png", alt: "Logistics yard supporting Central Corridor cargo", type: "Logistics facilities", title: "Efficient cargo consolidation", icon: Warehouse },
  { src: "/images/project-port.png", alt: "Inland port infrastructure on the Central Corridor", type: "Inland waterways", title: "Lake-linked regional trade", icon: Ship },
];

export function RouteGalleryCarousel() {
  const [active, setActive] = useState(0);
  const move = (direction: number) => setActive((value) => (value + direction + slides.length) % slides.length);

  useEffect(() => {
    const timer = window.setInterval(() => move(1), 4500);
    return () => window.clearInterval(timer);
  }, []);

  const visibleSlides = [0, 1, 2].map((offset) => slides[(active + offset) % slides.length]);

  return <div className="route-gallery-carousel" aria-roledescription="carousel" aria-label="Central Corridor infrastructure gallery">
    <div className="route-gallery-grid">
      {visibleSlides.map((slide, index) => { const Icon = slide.icon; return <div className={index === 1 ? "featured route-carousel-slide" : "route-carousel-slide"} key={`-`}><Image src={slide.src} alt={slide.alt} fill sizes="(max-width: 42rem) 100vw, 40vw" />{index === 1 && <span><i className="route-carousel-icon"><Icon aria-hidden size={22} /></i><small>{slide.type}</small>{slide.title}</span>}</div>; })}
    </div>
    <div className="route-carousel-controls"><button type="button" aria-label="Show previous gallery images" onClick={() => move(-1)}><ChevronLeft aria-hidden size={20} /></button><p aria-live="polite">{slides[active].type}</p><button type="button" aria-label="Show next gallery images" onClick={() => move(1)}><ChevronRight aria-hidden size={20} /></button></div>
  </div>;
}
