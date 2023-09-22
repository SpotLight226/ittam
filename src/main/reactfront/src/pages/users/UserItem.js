import { Fragment } from "react";

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
  onUserClick, // 모달 열기 함수
}) => {
  return (
    <tr className="prod-box">
      <th scope="row">{isUser ? id : idx + 1}</th>
      <td
        className="userName"
        onClick={() => onUserClick(username)}
        data-bs-toggle="modal" // 모달을 열도록 설정
        data-bs-target="#userModal" // 모달의 ID를 여기에 설정
      >
        {user_name}
      </td>
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
          <td className="userDenyBtn">
            <button className="btn btn-primary denyBtn" type="button">
              처리
            </button>
          </td>
        </>
      )}
    </tr>
  );
};

export default UserItem;
