const UserItem = ({
  user_email,
  username,
  user_name,
  role,
  user_depart,
  user_joindate,
  user_leavedate,
  id,
  isUser,
  idx,
}) => {
  return (
    <tr className="prod-box">
      <th scope="row">{isUser ? id : idx + 1}</th>
      <td className="userName">{user_name}</td>
      <td className="userId">{username}</td>
      <td className="userDepart">{user_depart}</td>
      {isUser ? (
        <>
          <td className="userAuth">
            {role === "ROLE_USER" ? "사용자" : "관리자"}
          </td>
          <td className="userEmail" style={{ whiteSpace: "nowrap" }}>
            {user_email}
          </td>
          <td className="userJoinDate">{user_joindate}</td>
        </>
      ) : (
        <>
          <td className="userLeaveDate">{user_leavedate}</td>
          <td className="userConfirmBtn">
            <button
              className="btn btn-primary approveBtn"
              type="button"
              id="approveBtn"
            >
              상세
            </button>
          </td>
          <td className="userDenyBtn">
            <button className="btn btn-primary denyBtn" type="button">
              반려
            </button>
          </td>
        </>
      )}
    </tr>
  );
};

export default UserItem;
