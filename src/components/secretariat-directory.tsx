"use client";

import Image from "next/image";
import { ArrowDown, ChevronDown, ChevronUp, Users } from "lucide-react";
import { useState } from "react";
import type { SecretariatStaffProfile } from "@/sanity/secretariat";

function StaffCard({ profile }: { profile: SecretariatStaffProfile }) {
  return <article className="directory-card"><div className="directory-photo"><Image src={profile.photo} alt="" fill sizes="8rem" /></div><div><h3>{profile.name}</h3><strong>{profile.designation}</strong><p>{profile.unit}</p></div></article>;
}

export function SecretariatDirectory({ executiveSecretary, staff }: { executiveSecretary: SecretariatStaffProfile; staff: SecretariatStaffProfile[] }) {
  const [expanded, setExpanded] = useState(true);
  const visibleStaff = expanded ? staff : staff.slice(0, 3);
  const staffLabel = `${staff.length} current ${staff.length === 1 ? "staff member" : "staff members"}`;

  return <section className="staff-directory"><div className="directory-heading"><Users aria-hidden size={26} /><div><p className="eyebrow">Staff chart & directory</p><h2>Permanent Secretariat structure</h2><p>The Executive Secretary leads the Secretariat. This chart is managed in Sanity and updates as staff profiles, reporting lines and display order change.</p></div></div><div className="staff-executive"><StaffCard profile={executiveSecretary} /></div><ArrowDown className="staff-chart-arrow" aria-hidden size={28} /><p className="staff-reporting-label">{staffLabel} are listed in the Permanent Secretariat directory</p><div className="staff-directory-grid">{visibleStaff.map((profile) => <StaffCard key={profile.id} profile={profile} />)}</div>{staff.length > 3 && <button className="directory-toggle" type="button" aria-expanded={expanded} onClick={() => setExpanded((value) => !value)}>{expanded ? "Show fewer staff" : `Show all ${staff.length} staff members`}{expanded ? <ChevronUp aria-hidden size={16} /> : <ChevronDown aria-hidden size={16} />}</button>}<small>Update profiles in Sanity to add staff, set their position and department, assign a manager, or change their display order.</small></section>;
}
