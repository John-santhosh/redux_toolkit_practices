import { useSelector } from "react-redux";
import { selectAllPosts } from "./postSlice";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionsButtons from "./ReactionsButtons";

const PostList = () => {
  const posts = useSelector(selectAllPosts);

  const orderedPost = [...posts].sort((a, b) => b.date.localeCompare(a.date));

  const renderPosts = orderedPost.map((post) => {
    return (
      <article key={post.id}>
        <h3>{post.title}</h3>
        <p>{post.content.substring(0, 100)}</p>
        <p className="postCredit">
          <PostAuthor userId={+post.userId} />
          <TimeAgo timeStamp={post.date} />
        </p>
        <ReactionsButtons post={post} />
      </article>
    );
  });
  return (
    <section>
      <h2>Posts</h2>
      {renderPosts}
    </section>
  );
};

export default PostList;
