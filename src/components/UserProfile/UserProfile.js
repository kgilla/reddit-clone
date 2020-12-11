import moment from "moment";
import "./UserProfile.css";

const UserProfile = ({ user }) => {
  return <div>{user.user.username}</div>;
};

export default UserProfile;
