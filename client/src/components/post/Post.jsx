/* eslint-disable react/prop-types */
import { MoreVert } from "@mui/icons-material";
import "./post.css";
import { useEffect, useState } from "react";
import http from "../../http";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Loading } from "../loading";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
dayjs.extend(relativeTime);

const Post = ({ post }) => {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);

  const currentUser = useSelector((store) => store.user.value);
  const publicFolder = import.meta.env.VITE_APP_PUBLIC_FOLDER;

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    fetchUser();
  }, [post.userId]);
  const fetchUser = async () => {
    setLoading(true);
    http
      .get(`users/?userId=${post.userId}`)
      .then(({ data }) => setUser(data))
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const handleLike = () => {
    try {
      http
        .put("/posts/" + post._id + "/like", { userId: currentUser._id })
        .then(() => {
          setLike(isLiked ? like - 1 : like + 1);
          setIsLiked(!isLiked);
        });
    } catch (err) {
      console.log(err);
    }
  };
  return loading ? (
    <Loading />
  ) : (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img
                className="postProfileImg"
                src={
                  publicFolder + (user.profilePicture || `person/noAvatar.png`)
                }
                alt="prof_Img"
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{dayjs().to(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img
            className="postImg"
            src={publicFolder + post.img}
            alt="post_img"
          />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              onClick={handleLike}
              src={publicFolder + "like.png"}
              alt="like"
            />
            <img
              className="likeIcon"
              onClick={handleLike}
              src={publicFolder + "heart.png"}
              alt="heart"
            />
            <span className="postLikeCounter">{like} poeple liked it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} Comments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
