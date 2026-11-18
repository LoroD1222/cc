import {cache} from "react";
import {secretariatLeadership} from "@/data/site";
import {client} from "@/sanity/client";
import {secretariatStaffQuery} from "@/sanity/queries";

type SanitySecretariatStaff = {
  _id: string;
  fullName: string;
  officialTitle?: string | null;
  department?: string | null;
  displayOrder?: number | null;
  photo?: string | null;
  reportsToId?: string | null;
  reportsToName?: string | null;
};

export type SecretariatStaffProfile = {
  id: string;
  name: string;
  designation: string;
  unit: string;
  photo: string;
  reportsToName?: string;
};

export type SecretariatDirectoryData = {
  executiveSecretary: SecretariatStaffProfile;
  staff: SecretariatStaffProfile[];
};

const fallbackExecutiveSecretary: SecretariatStaffProfile = {
  id: "fallback-executive-secretary",
  name: "Adv. Okandju Okonge Flory",
  designation: "Executive Secretary",
  unit: "Office of the Executive Secretary",
  photo: "/images/leader-flory.png",
};

const fallbackStaff = secretariatLeadership.map((profile, index) => ({
  id: `fallback-director-${index + 1}`,
  ...profile,
  reportsToName: fallbackExecutiveSecretary.name,
}));

const fetchOptions = {next: {revalidate: 60, tags: ["person", "secretariat"]}};

function toProfile(person: SanitySecretariatStaff): SecretariatStaffProfile {
  return {
    id: person._id,
    name: person.fullName,
    designation: person.officialTitle || "Position pending confirmation",
    unit: person.department || "Department or unit pending confirmation",
    photo: person.photo || (person.displayOrder === 1 ? "/images/leader-flory.png" : "/images/avatar-placeholder.svg"),
    reportsToName: person.reportsToName || undefined,
  };
}

export const getSecretariatDirectory = cache(async (): Promise<SecretariatDirectoryData> => {
  const people = await client.fetch<SanitySecretariatStaff[]>(secretariatStaffQuery, {}, fetchOptions);

  if (!people.length) {
    return {executiveSecretary: fallbackExecutiveSecretary, staff: fallbackStaff};
  }

  const profiles = people.map(toProfile);
  const executiveIndex = people.findIndex((person) => person.displayOrder === 1);
  const reportingRootIndex = people.findIndex((person) => !person.reportsToId);
  const executiveSecretary = profiles[executiveIndex >= 0 ? executiveIndex : reportingRootIndex >= 0 ? reportingRootIndex : 0];

  return {
    executiveSecretary,
    staff: profiles.filter((profile) => profile.id !== executiveSecretary.id),
  };
});
