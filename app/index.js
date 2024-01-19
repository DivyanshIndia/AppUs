import NewsFeed from "../components/posts/NewsFeed";
import dummyPosts from "../components/posts/dummyPosts";
const index = () => {
  return (
    <>
      <NewsFeed posts={dummyPosts} />
    </>
  );
};

export default index;
