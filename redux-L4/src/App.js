import PostsList from "./features/posts/PostsList";
import AddPostForm from "./features/posts/AddPostForm";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import SinglePostPage from "./features/posts/SinglePostPage";
import EditPostForm from "./features/posts/EditPostForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostsList />}></Route>
        <Route path="post">
          <Route index element={<AddPostForm />}></Route>
          <Route path=":postId" element={<SinglePostPage />}></Route>
          <Route path="edit">
            <Route path=":postId" element={<EditPostForm />}></Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
