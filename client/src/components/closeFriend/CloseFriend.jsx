/* eslint-disable react/prop-types */
import "./closeFriend.css";

const CloseFriend = ({ user }) => {
  const publicFolder = import.meta.env.VITE_APP_PUBLIC_FOLDER;

  return (
    <li className="sidebarFriend">
      <img
        src={publicFolder + user.profilePicture}
        alt="friend_img"
        className="sidebarFriendImg"
      />
      <span className="sidebarFriendName">{user.username}</span>
    </li>
  );
};

export default CloseFriend;
