import { Address } from "../scaffold-eth";

interface SocialPostDisplayProps {
  postText: string;
  proposedBy: string;
}

export const SocialPostDisplay = (thisPost: SocialPostDisplayProps) => {
  return (
    <>
      <label className="text-lg font-bold underline">Proposed By</label>
      <Address address={thisPost?.proposedBy} size="sm" />

      <label className="text-lg font-bold underline">Post Text</label>
      <p className="mt-0 mb-1 text-xl">{thisPost?.postText}</p>
    </>
  );
};
