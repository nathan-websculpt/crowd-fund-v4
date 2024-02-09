import { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { ExplorePosts } from "~~/components/posts/ExplorePosts";

//currently just to see latest posts
const Explore: NextPage = () => {
  return (
    <>
      <MetaHeader title="Explore Latest Posts" />
      <ExplorePosts />
    </>
  );
};
export default Explore;
