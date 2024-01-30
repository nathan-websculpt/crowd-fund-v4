import Link from "next/link";
import { Address } from "../scaffold-eth";

interface SocialPostDisplayProps {
  fundRunId: number;
  fundRunTitle: string;
  postText: string;
  proposedBy: string;
}

export const SocialPostDisplay = (thisPost: SocialPostDisplayProps) => {
  const handle = "@" + thisPost?.fundRunTitle.replace(/\s/g, "");
  return (
    <>
      <Link href={`/social/${thisPost?.fundRunId}`} passHref>
        <div className="flex items-center gap-4">
          <p className="mt-0 mb-1 font-serif text-2xl">{thisPost?.fundRunTitle}</p>
          <span className="text-md text-opacity-40 text-secondary-content">{handle}</span>
        </div>
      </Link>

      <p className="mt-3 mb-5 text-3xl">{thisPost?.postText}</p>

      <div className="flex items-center justify-end gap-4">
        <label className="font-mono text-sm font-bold">Originally Proposed By:</label>
        <Address address={thisPost?.proposedBy} size="sm" />
      </div>
    </>
  );
};
