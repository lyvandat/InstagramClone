import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  doc,
  setDoc,
  collection,
  query,
  orderBy,
  getDocs,
  serverTimestamp,
  deleteDoc,
} from "firebase/firestore";
import {
  EllipsisHorizontalIcon,
  HeartIcon as HeartIconFilled,
} from "@heroicons/react/24/solid";
import {
  ChatBubbleOvalLeftEllipsisIcon,
  BookmarkSquareIcon,
  FaceSmileIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import AvatarCircle from "../ui/AvatarCircle";
import { db } from "../../firebase";
import Comments from "../list/Comments";
import { CommentType } from "../../models/components";
import { userAgent } from "next/server";
import { number } from "minifaker";

const item: React.FC<{
  post: {
    id: string;
    image: string;
    imagePost: string;
    name: string;
    caption: string;
  };
}> = (props) => {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<CommentType[]>([]);
  const [likeState, setLikeState] = useState<{
    likes: { username?: string | null; uid?: string | null }[];
    hasLiked: boolean;
  }>({
    likes: [],
    hasLiked: false,
  });
  const [leaveIcon, setLeaveIcon] = useState(false);
  const uid = session?.user.uid;
  const likesLength = likeState.likes.length;

  const inputCommentHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const getComments = async () => {
    const queryCommentData = query(
      collection(db, "posts", props.post.id, "comments"),
      orderBy("timestamp", "desc")
    );
    const resFromDB = await getDocs(queryCommentData);
    const commentFromDB = resFromDB.docs.map((doc) => {
      return {
        id: doc.id,
        name: doc.data().username,
        comment: doc.data().comment,
        timePost: doc.data().timestamp,
      };
    });

    return commentFromDB;
  };

  const clickAddCommentHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim().length === 0) return;

    const postRef = doc(collection(db, "posts", props.post.id, "comments"));
    const commentDataRef = await setDoc(postRef, {
      username: session?.user.username,
      image: session?.user.image,
      comment: comment,
      timestamp: serverTimestamp(),
    });

    getComments()
      .then((data: CommentType[]) => {
        setComment("");
        setComments(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const likePost = async (e: React.MouseEvent) => {
    // ref to firestore with auto generated id
    const uid = session!.user!.uid!;
    const likesRef = doc(db, "posts", props.post.id, "likes", uid);

    if (likeState.hasLiked) {
      setLikeState((prevState) => {
        const likesList = [...prevState.likes];
        const unlikeIndex = likesList.findIndex((like) => like.uid === uid);
        likesList.splice(unlikeIndex, 1);
        return {
          likes: likesList,
          hasLiked: false,
        };
      });
      await deleteDoc(likesRef);
    } else {
      setLikeState((prevState) => {
        const newLikesList = [
          ...prevState.likes,
          { username: session?.user.name, uid: uid },
        ];

        return {
          likes: newLikesList,
          hasLiked: true,
        };
      });
      await setDoc(likesRef, {
        username: session?.user.username,
      });
    }
  };

  const enterIconHandler = (e: React.MouseEvent) => {
    setLeaveIcon((prevState) => false);
  };

  const leaveIconHandler = (e: React.MouseEvent) => {
    setLeaveIcon((prevState) => true);
  };

  useEffect(() => {
    getComments()
      .then((data: CommentType[]) => {
        setComment("");
        setComments(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [db]);

  useEffect(() => {
    const queryLikes = query(collection(db, "posts", props.post.id, "likes"));
    getDocs(queryLikes).then((snapshot) => {
      const likesFromDB = snapshot.docs.map((doc) => {
        return {
          uid: doc.id,
          username: doc.data().username,
        };
      });
      const hasLiked = likesFromDB.findIndex((like) => like.uid === uid) !== -1;
      // new state overwrite old state
      setLikeState((prevState) => {
        return {
          likes: likesFromDB,
          hasLiked,
        };
      });
    });
  }, [db, props.post.id, uid]);

  return (
    <li className="bg-white mb-5 rounded-lg shadow-sm border border-gray-300">
      <div className="flex items-center p-3">
        <AvatarCircle
          src={props.post.image}
          height={100}
          width={100}
          alt={props.post.name}
          onClick={() => {}}
          className="w-[36px] h-[36px]"
        />
        <h2 className="font-semibold text-gray-900 justify-self-start ml-4">
          {props.post.name}
        </h2>
        <EllipsisHorizontalIcon className="cursor-pointer h-6 text-black ml-auto" />
      </div>
      <div className="w-full h-[586px]">
        <img
          src={props.post.imagePost}
          alt={"image"}
          className="w-full h-full object-cover"
        />
      </div>
      {session && (
        <div className="p-3 pb-0 flex items-center">
          {likeState.hasLiked ? (
            <HeartIconFilled
              onMouseLeave={leaveIconHandler}
              onMouseEnter={enterIconHandler}
              onClick={likePost}
              className={`text-red-500 h-6 cursor-pointer ${
                leaveIcon && "animate-[leave_100ms_ease-in-out]"
              }`}
            />
          ) : (
            <HeartIcon
              onMouseLeave={leaveIconHandler}
              onMouseEnter={enterIconHandler}
              onClick={likePost}
              className={`h-6 cursor-pointer ${
                leaveIcon && "animate-[leave_300ms_ease-in-out]"
              }`}
            />
          )}
          <ChatBubbleOvalLeftEllipsisIcon
            className={`h-6 ml-3 cursor-pointer hover:scale-125 transition-transform ease-out duration-150`}
          />
          <BookmarkSquareIcon
            className={`h-6 ml-auto cursor-pointer hover:scale-125 transition-transform ease-out duration-150`}
          />
        </div>
      )}
      {/* likes */}
      <p className="px-3 mt-3 mb-1 font-semibold text-sm">{`${likesLength} like${
        likesLength > 1 ? "s" : ""
      }`}</p>
      {/* caption */}
      <p className="px-3 pb-3 truncate">
        <span className="font-semibold mr-1">{props.post.name}</span>
        {props.post.caption}
      </p>
      <Comments comments={comments} />
      {session && (
        <form
          onSubmit={clickAddCommentHandler}
          className="p-3 flex items-center "
        >
          <FaceSmileIcon className="h-6 cursor-pointer" />
          <input
            value={comment}
            onChange={inputCommentHandler}
            className="flex-1 border-none focus:ring-0"
            type="text"
            placeholder="Enter your comment..."
          />
          <button
            disabled={comment.trim().length === 0}
            className="font-semibold text-gray-80 disabled:text-gray-400 text-base"
          >
            Post
          </button>
        </form>
      )}
    </li>
  );
};

export default item;
