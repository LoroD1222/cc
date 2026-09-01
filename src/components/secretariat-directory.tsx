"use client";

import Image from "next/image";
import { ArrowDown, ChevronDown, ChevronUp, Users } from "lucide-react";
import { useState } from "react";

export type SecretariatStaffProfile = { name: string; designation: string; unit: string; photo: string };

function StaffCard({ profile }: { profile: SecretariatStaffProfile }) {
  return <article className="directory-card"><div className="directory-photo"><Image src={profile.photo} alt="" fill sizes="8rem" /></div><div><h3>{profile.name}</h3><strong>{profile.designation}</strong><p>{profile.unit}</p></div></article>;
}

export function SecretariatDirectory({ executiveSecretary, directors }: { executiveSecretary: SecretariatStaffProfile; directors: SecretariatStaffProfile[] }) {
  const [expanded, setExpanded] = useState(true);
  const visibleDirectors = expanded ? directors : directors.slice(0, 3);

  return <section className="staff-directory"><div className="directory-heading"><Users aria-hidden size={26} /><div><p className="eyebrow">Staff chart & directory</p><h2>Permanent Secretariat structure</h2><p>The Executive Secretary leads the Secretariat. The chart below presents the director positions and can be expanded or reduced as the approved staff list changes.</p></div></div><div className="staff-executive"><StaffCard profile={executiveSecretary} /></div><ArrowDown className="staff-chart-arrow" aria-hidden size={28} /><p className="staff-reporting-label">Seven directorates report to the Executive Secretary</p><div className="staff-directory-grid">{visibleDirectors.map((profile, index) => <StaffCard key={`${profile.unit}-${index}`} profile={profile} />)}</div><button className="directory-toggle" type="button" aria-expanded={expanded} onClick={() => setExpanded((value) => !value)}>{expanded ? "Show fewer directors" : `Show all ${directors.length} directors`}{expanded ? <ChevronUp aria-hidden size={16} /> : <ChevronDown aria-hidden size={16} />}</button><small>Names, photographs and final reporting lines marked as pending will be completed from the Secretariat&apos;s current approved organogram.</small></section>;
}
