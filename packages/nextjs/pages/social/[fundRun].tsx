import router from "next/router";
import { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { SocialPostList } from "~~/components/social/SocialPostList";

const ViewSocial: NextPage = () => {
  return (
    <>
      <MetaHeader title="Social Media Page" />
      <div className="flex flex-col w-full p-4 mx-auto shadow-xl sm:my-auto bg-secondary sm:p-7 sm:rounded-lg sm:w-4/5 lg:w-2/5">
        <div className="flex justify-start mb-5">
          <button className="btn btn-sm btn-primary" onClick={() => router.back()}>
            Back
          </button>
        </div>

        <h1 className="font-bold text-primary-content">Posts from this Fund Run</h1>
        <SocialPostList />
      </div>
    </>
  );
};

export default ViewSocial;
