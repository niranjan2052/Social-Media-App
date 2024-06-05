/* eslint-disable react/prop-types */
import "./online.css";

const Online = ({ user }) => {
  const publicFolder = import.meta.env.VITE_APP_PUBLIC_FOLDER;

  return (
    <li className="rightBarFriend">
      <div className="rightbarProfileImgContainer">
        <img
          src={publicFolder + user.profilePicture}
          alt="person3_img"
          className="rightbarProfileImg"
        />
        <span className="rightbarOnline"></span>
      </div>
      <span className="rightbarUsername">{user.username}</span>
    </li>
  );
};

export default Online;
