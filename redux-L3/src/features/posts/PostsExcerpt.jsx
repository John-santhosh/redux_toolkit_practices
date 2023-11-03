import PostAuthor from "./PostAuthor";
import ReactionsButtons from "./ReactionsButtons";
import TimeAgo from "./TimeAgo";

const postsExcerpt = ({ post }) => {
  // console.log(post);
  return (
    <article>
      <h3>{post.title.substring(0, 30)}</h3>
      <p>{post.body.substring(0, 100)}</p>
      <p className="postCredit">
        <PostAuthor userId={post.userId} />
        <TimeAgo timeStamp={post.date} />
      </p>
      <ReactionsButtons post={post} />
    </article>
  );
};

export default postsExcerpt;
