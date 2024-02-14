import { useState } from "react";
import { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { ExplorePosts } from "~~/components/posts/ExplorePosts";
import { ExplorePostsFromWhoIFollow } from "~~/components/posts/ExplorePostsFromWhoIFollow";

//currently just to see latest posts
const Explore: NextPage = () => {
  const [showingWhoYouFollow, setShowingWhoYouFollow] = useState(true);

  return (
    <>
      <MetaHeader title="Explore Latest Posts" />

      <div className="flex justify-center mb-6 mt-14">
        <button
          className={showingWhoYouFollow ? "btn btn-accent rounded-none" : "btn btn-primary rounded-none"}
          onClick={() => setShowingWhoYouFollow(true)}
        >
          {showingWhoYouFollow ? "Viewing Who you Follow" : "View Who you Follow"}
        </button>
        <button
          className={showingWhoYouFollow ? "btn btn-primary rounded-none" : "btn btn-accent rounded-none"}
          onClick={() => setShowingWhoYouFollow(false)}
        >
          {showingWhoYouFollow ? "Explore More" : "Exploring More"}
        </button>
      </div>
      {showingWhoYouFollow ? <ExplorePostsFromWhoIFollow /> : <ExplorePosts />}
    </>
  );
};
export default Explore;
