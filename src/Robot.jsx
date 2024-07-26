import { Link } from "react-router-dom";

export default function Robot({ user }) {
  return (
    <Link to={`robotDetails/${user._id}`}>
      <div className="robot">
        <img
          src={user.pic}
          alt={`${user.name}'s picture`}
          className="robotImage"
        />
        <div className="robotInfo">
          <div>{user.name}</div>
          <div>{user.email}</div>
        </div>
      </div>
    </Link>
  );
}
