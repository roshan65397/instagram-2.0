import {
  SearchIcon,
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon,
  CollectionIcon,
} from "@heroicons/react/outline";
import { storage } from "../firebase";
import { ref, getDownloadURL, uploadString } from "firebase/storage";
import { doc, deleteDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import {
  collection,
  orderBy,
  query,
  onSnapshot,
  addDoc,
  setDoc,
} from "@firebase/firestore";
import Moment from "react-moment";

import { useSession } from "next-auth/react";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import { useState } from "react";
import { async } from "@firebase/util";
import { useEffect } from "react";
import { Snapshot } from "recoil";
import { db } from "../firebase";

function Post({ id, username, userImg, img, caption }) {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasliked] = useState(false);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [db, id]
  );

  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [db, id]
  );

  useEffect(
    () =>
      setHasliked(
        likes.findIndex((like) => like.id === session?.user?.uid) !== -1
      ),
    [likes]
  );
  const likedPost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session.user.username,
      });
    }
  };

  const sendComment = async (e) => {
    e.preventDefault();

    const commentToSend = comment;
    setComment("");

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    });
  };

  return (
    <div className="bg-white my-7 border rounded-sm">
      {/* Header */}
      <div className="flex items-center p-5">
        <img
          src={userImg}
          className="rounded-full h-12 w-12 object-contain border p-1 mr-3"
          alt=""
        />
        <p className="flex-1 font-bold ">{username}</p>
        <DotsHorizontalIcon className="h-5" />
      </div>
      {/* Img */}
      <img src={img} className="object-cover w-full" alt="" />
      {/* Buttons */}
      {session && (
        <div className="flex justify-between px-4 pt-4 pb-4">
          <div className="flex space-x-4 ">
            {hasLiked ? (
              <HeartIconFilled
                onClick={likedPost}
                className="btn text-red-500"
              />
            ) : (
              <HeartIcon onClick={likedPost} className="btn " />
            )}
            <ChatIcon className="btn" />
            <PaperAirplaneIcon className="btn rotate-45" />
          </div>
          <BookmarkIcon className="btn" />
        </div>
      )}
      {/* Captions */}
      <p className="p-5 truncate">
        <p className="font-bold mb-1">{likes.length} likes</p>
        <span className="font-bold mr-1">{username} </span>
        {caption}
      </p>
      {/* Comments */}
      {comments.length > 0 && (
        <div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-center space-x-2 mb-3">
              <img
                className="h-7 rounded-full"
                src={comment.data().userImage}
                alt=""
              />
              <p className="text-sm flex-1">
                <span className="font-bold">{comment.data().username}</span>
                {comment.data.comment}
              </p>
              <Moment fromNow className="pr-5 text-xs">
                {comment.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}

      {/* Input Box */}
      {session && (
        <form className="flex items-center p-4">
          <EmojiHappyIcon className="h-7" />
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment. . ."
            className="border-none flex-1 focus:ring-0 outline-none"
          />
          <button
            type="submit"
            disabled={!comment.trim()}
            onClick={sendComment}
            className="font-semibold text-blue-400"
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;

// import {
//   SearchIcon,
//   BookmarkIcon,
//   ChatIcon,
//   DotsHorizontalIcon,
//   EmojiHappyIcon,
//   HeartIcon,
//   PaperAirplaneIcon,
//   MenuIcon,
//   CollectionIcon,
// } from "@heroicons/react/outline";

// import { HeartIcon as HeartFilledIcon } from "@heroicons/react/solid";
// import { useSession } from "next-auth/react";
// import session from "next-session";

// function Post({ id, username, img, caption }) {
//   const { data: session } = useSession();
//   return (
//     <div className="bg-white my-7 border rounded-sm">
//       {/* Header */}
//       <div className="flex items-center p-5">
//         <img
//           src={img}
//           className="rounded-full h-12 w-12 object-contain border p-1 mr-3"
//           alt=""
//         />
//         <p className="flex-1 font-bold ">{username}</p>
//         <DotsHorizontalIcon className="h-5" />
//       </div>

//       {/* Img */}
//       <img className="object-cover w-full" src={img} alt="" />

//       {/* Buttons */}
//       {session && (
//         <div className="flex justify-between px-4 pt-4">
//           <div className="flex space-x-4">
//             <HeartIcon className="btn" />
//             <ChatIcon className="btn" />
//             <PaperAirplaneIcon className="btn" />
//           </div>
//           <BookmarkIcon className="btn" />
//         </div>
//       )}

//       {/* Captions */}
//       <p className="p-5 truncate">
//         <p className="font-bold mb-1"> likes</p>
//         <span className="font-bold mr-1">{username} </span>
//         {caption}
//       </p>

//       {/* Comments */}
//       <div></div>

//       {/* Input Box */}
//       {session && (
//         <form className="flex items-center p-4">
//           <EmojiHappyIcon className="h-7" />
//           <input
//             placeholder="Add a comment. . ."
//             className="border-none flex-1 focus:right-0 outline-none"
//             type="text"
//           />
//           <button type="submit" className="font-semibold text-blue-400">
//             Post
//           </button>
//         </form>
//       )}
//     </div>
//   );
// }

// export default Post;
