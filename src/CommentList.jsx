import { useState } from "react";
import dayjs from "dayjs";
import AddComment from "./AddComment";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default function CommentList({
  comment,
  addComment,
  voteComment,
  deleteComment
}) {
  const [showReply, setShowReply] = useState(false);

  return (
    <div className={`ml-${comment?.level * 4} border-l pl-4`}>
      <div className="flex justify-between">
        <strong>
          {comment?.isDeleted ? "[Comment deleted]" : comment?.author}
        </strong>
        <span className="text-xs text-gray-500">
          {dayjs(comment?.createdAt).fromNow()}
        </span>
      </div>

      {!comment?.isDeleted && <p>{comment?.content}</p>}
      <div className="flex items-center space-x-2 text-sm">
        <button
          className="cursor-pointer"
          onClick={() => voteComment(comment?._id, 1)}
        >
          ⬆
        </button>
        <span>{comment?.votes}</span>
        <button
          className="cursor-pointer"
          onClick={() => voteComment(comment?._id, -1)}
        >
          ⬇
        </button>
        {comment?.level < 2 && (
          <button
            className="cursor-pointer text-amber-600"
            onClick={() => setShowReply(!showReply)}
          >
            Reply
          </button>
        )}
        {!comment.deleted && (
          <button
            onClick={() => deleteComment(comment?._id)}
            className="cursor-pointer text-red-500"
          >
            Delete
          </button>
        )}
      </div>
      {showReply && (
        <AddComment
          onSubmit={(author, content) => {
            addComment(comment?._id, author, content);
            setShowReply(false);
          }}
        />
      )}
      {comment?.children &&
        comment?.children.map((child) => (
          <CommentList
            key={child._id}
            comment={child}
            addComment={addComment}
            voteComment={voteComment}
            deleteComment={deleteComment}
          />
        ))}
    </div>
  );
}
