import { useQuery } from "@apollo/client";

interface CommentsProps {
  postId: string;
}

export const Comments = (c: CommentsProps) => {
    const { loading, error, data } = useQuery(GQL_SOCIAL_POST_For_Display(), {
      variables: { socialPostId: postId },
      pollInterval: 1000,
    });
  return <h1>sfdsdf</h1>;
};
