import React from "react";
import Comment from "../item/Comment";
import { CommentType } from "../../models/components";

const Comments: React.FC<{ comments: CommentType[] }> = (props) => {
  return (
    <ul className="max-h-[140px] overflow-y-auto scrollbar-hide">
      {props.comments?.map((cmt) => {
        return <Comment key={cmt.id} comment={cmt} />;
      })}
    </ul>
  );
};

export default Comments;
