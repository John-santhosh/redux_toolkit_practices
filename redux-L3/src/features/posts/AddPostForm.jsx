import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { nanoid } from "@reduxjs/toolkit";
import { addNewPost } from "./postSlice";
import { selectAllUsers } from "../users/userSlice";

const AddPostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const users = useSelector(selectAllUsers);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(e.target.value);

  const dispatch = useDispatch();

  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === "idle";

  const onSavePost = () => {
    console.log(addNewPost);
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        console.log({ title, body: content, userId });
        dispatch(addNewPost({ title, body: content, userId })).unwrap();
        setContent("");
        setTitle("");
        setUserId("");
      } catch (error) {
        console.error("Failed to save the post", error);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  const userOptions = users.map((user) => {
    return (
      <option key={user.id} value={user.id}>
        {user.name}
      </option>
    );
  });
  return (
    <section>
      <h2>Add a new Post</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />

        <label htmlFor="postAuthor">Author:</label>
        <select
          name=""
          id="postAuthor"
          value={userId}
          onChange={onAuthorChanged}
        >
          <option value=""></option>
          {userOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button disabled={!canSave} type="submit" onClick={onSavePost}>
          Save Post
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;
