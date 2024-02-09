import { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { WhoAmIFollowing } from "~~/components/social/following/WhoAmIFollowing";

const Following: NextPage = () => {
  return (
    <>
      <MetaHeader title="Following" />
      <WhoAmIFollowing />
    </>
  );
};

export default Following;
