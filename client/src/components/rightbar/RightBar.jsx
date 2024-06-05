/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import "./rightbar.css";
import { Users } from "../../dummyData";
import { Online } from "..";
import { useEffect, useState } from "react";
import http from "../../http";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Add, Remove } from "@mui/icons-material";

const RightBar = ({ user }) => {
  const publicFolder = import.meta.env.VITE_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const [followed, setFollowed] = useState(false);
  const currentUser = useSelector((store) => store.user.value);
  useEffect(() => {
    setFollowed(currentUser.followings.includes(user?._id));
  }, [currentUser, user?._id]);
  useEffect(() => {
    getFriends();
  }, [user?._id]);
  const getFriends = () => {
    try {
      http
        .get("/users/friends/" + user._id)
        .then(({ data }) => {
          setFriends(data);
        })
        .catch(() => {})
        .finally(() => {});
    } catch (error) {
      console.log(error);
    }
  };
  const handleFollow = () => {
    try {
      if (followed) {
        http.put(`/users/${user._id}/unfollow`, { userId: currentUser._id });
      } else {
        http.put(`/users/${user._id}/follow`, { userId: currentUser._id });
      }
      setFollowed(!followed);
    } catch (error) {
      console.log(error);
    }
  };
  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img
            className="birthdayImg"
            src="/assets/gift.png"
            alt="birthdayImg"
          />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>2 other friends</b> have birthday today;
          </span>
        </div>
        <img className="rightbarAd" src="assets/ad.png" alt="Ad" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((user) => {
            return <Online key={user.id} user={user} />;
          })}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightBarFollowButton" onClick={handleFollow}>
            {followed ? "UnFollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="rightbarTitle">User Information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City :</span>
            <span className="rightbarInfoValue"> {user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From :</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship :</span>
            <span className="rightbarInfoValue">
              {(user.relationship == 1 && "Single") ||
                (user.relationship == 2 && "Married") ||
                (user.relationship == 3 && "-")}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link
              key={friend._id}
              to={`/profile/${friend.username}`}
              style={{ textDecoration: "none" }}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? publicFolder + friend.profilePicture
                      : publicFolder + "person/noAvatar.png"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };
  return (
    <div className="rightBar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
};

export default RightBar;
