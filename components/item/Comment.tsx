// REACT MOMENT --- 2 minutes ago, 2 months ago các kiểu
import React from "react";
import Moment from "react-moment";
import { CommentType } from "../../models/components";

const Comment: React.FC<{ comment: CommentType }> = (props) => {
  return (
    <li
      key={props.comment.id}
      className="flex justify-between items-center pr-3 last-of-type:pb-3"
    >
      <p className="truncate px-3">
        <span className="font-semibold mr-1">{props.comment.name}</span>
        <span>{props.comment.comment}</span>
      </p>
      <Moment className="text-sm text-gray-600 italic" fromNow>
        {props.comment.timePost.toDate()}
      </Moment>
    </li>
  );
};

export default Comment;
