import { useContext } from "react";
import { CommentsContext, useCommentsContext } from "~~/contexts/posts/commentsContext";

export const Tst = () => {    
  const commentsContext = useContext(CommentsContext);
  console.log("from Tst(), commentsContext equals: ", commentsContext);

  
    return(<></>);
};