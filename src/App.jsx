import { useEffect, useState } from "react";
import axios from "axios";
import CommentList from "./CommentList";
import AddComment from "./AddComment";
import { nestComments } from "./helpers";

const API = import.meta.env.VITE_API_URL;

function App() {
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    const res = await axios.get(`${API}/comments`);
    console.log("res", res?.data?.data);
    setComments(nestComments(res?.data?.data));
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const addComment = async (parentId = null, author, content) => {
    const payload = { author, content };

    if (parentId) {
      payload.parentId = parentId;
    }
    await axios.post(`${API}/comments`, payload);
    fetchComments();
  };

  const voteComment = async (id, delta) => {
    await axios.patch(`${API}/comments/${id}/vote`, { delta });
    fetchComments();
  };

  const deleteComment = async (id) => {
    await axios.delete(`${API}/comments/${id}`);
    fetchComments();
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Comments ({comments?.length})</h1>
      <div className="space-y-4">
        <AddComment
          onSubmit={(author, content) => {
            addComment("", author, content);
          }}
        />
        {comments.map((comment) => (
          <CommentList
            key={comment._id}
            comment={comment}
            addComment={addComment}
            voteComment={voteComment}
            deleteComment={deleteComment}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
