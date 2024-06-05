import { useSelector } from "react-redux";
import { Loading, Post, Share } from "..";
import http from "../../http";
import "./feed.css";
import { useEffect, useState } from "react";

const Feed = ({ username }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user.value);
  useEffect(() => {
    fetchPosts();
  }, [username, user._id]);
  const fetchPosts = async () => {
    setLoading(true);

    if (username) {
      http
        .get("posts/profile/" + username)
        .then(({ data }) =>
          setPosts(
            data.sort((p1, p2) => {
              return new Date(p2.createdAt) - new Date(p1.createdAt);
            })
          )
        )
        .catch(() => {})
        .finally(() => {
          setLoading(false);
        });
    } else {
      http
        .get("posts/timeline/" + user._id)
        .then(({ data }) =>
          setPosts(
            data.sort((p1, p2) => {
              return new Date(p2.createdAt) - new Date(p1.createdAt);
            })
          )
        )
        .catch(() => {})
        .finally(() => {
          setLoading(false);
        });
    }
  };
  return loading ? (
    <Loading />
  ) : (
    <div className="feed">
      <div className="feedWrapper">
        {username == user.username && <Share />}
        {posts.map((post) => {
          return <Post key={post._id} post={post} />;
        })}
      </div>
    </div>
  );
};

export default Feed;
