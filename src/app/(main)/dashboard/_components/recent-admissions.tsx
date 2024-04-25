import { fallbackImage } from "@/constants";
import db from "@/lib/db";
import { DashedSeperator } from "../../../../components/dashed-seperator";
import { Photo } from "../../../../components/photo";
import { RecentMember } from "./recent-member";

interface RecentAdmissionsProps {}

export const RecentAdmissions = async ({}: RecentAdmissionsProps) => {
  const members = await db.member.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });

  return (
    <section className="mt-12 flex flex-col rounded-xl bg-background_2 p-6">
      <h2 className="text-2xl font-bold">Recent Admissions</h2>
      <ul className="mt-5 flex h-10">
        {members.map(({ id, image, name }, index) => (
          <li
            key={id}
            className="absolute rounded-full border-4 border-white/5 shadow-md"
            style={{ transform: `translateX(${index * 50}%)` }}
          >
            <Photo
              src={image || fallbackImage}
              alt={name}
              className="size-10 min-w-10"
            />
          </li>
        ))}
      </ul>
      <DashedSeperator className="mt-6" />
      <ul className="mt-5 flex flex-col gap-2.5">
        {members.map((member) => (
          <RecentMember member={member} key={member.id} />
        ))}
      </ul>
    </section>
  );
};
