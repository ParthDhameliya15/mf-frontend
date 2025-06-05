import { useState } from "react";

const authers = ["Rajesh", "Parth", "Mahesh", "kakad"];

function AddComment({ onSubmit }) {
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(author, content);
        setAuthor("");
        setContent("");
      }}
    >
      <select
        id="author-select"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">Select Author</option>
        {authers.map((auth) => (
          <option key={auth} value={auth}>
            {auth}
          </option>
        ))}
      </select>
      <textarea
        placeholder="Write a comment"
        name="content"
        value={content}
        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-2 py-1 rounded"
      >
        Submit
      </button>
    </form>
  );
}

export default AddComment;
