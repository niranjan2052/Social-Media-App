import { useEffect, useState } from "react";
import { Topbar, Feed, RightBar, SideBar } from "../../components";
import "./profile.css";
import http from "../../http";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Profile = () => {
  const publicFolder = import.meta.env.VITE_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const username = params.username;

  useEffect(() => {
    fetchUser();
  }, [username]);
  const fetchUser = async () => {
    setLoading(true);
    http
      .get(`users?username=${username}`)
      .then(({ data }) => setUser(data))
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Topbar />
      <div className="profile">
        <SideBar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={
                  user.coverPicture
                    ? publicFolder + user.coverPicture
                    : `${publicFolder}person/noCover.png`
                }
                alt=""
              />
              <img
                className="profileUserImg"
                src={user.profilePicture
                  ? publicFolder + user.profilePicture
                  : `${publicFolder}person/noAvatar.png`}
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDisc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <RightBar user={user} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
