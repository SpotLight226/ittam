import React from "react";

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
  onUserClick,// 모달 열기 함수
  currentPage, itemsPerPage,

}) => {
  const isClickable = isUser && !user_leavedate; // isUser가 true인 경우에만 클릭 가능하도록 설정

  const handleClick = () => {
    if (isClickable) {
      onUserClick(username);
    }
  };

  return (
    <tr className="prod-box">
        <th scope="row">
            {`${(currentPage - 1) * itemsPerPage + id}`.padStart(4, '\u00A0')}
        </th>
      <td
        className={`userName ${isClickable ? "clickable" : ""}`} // 클릭 가능한 경우에 클래스를 추가
        onClick={handleClick}
        data-bs-toggle="modal" // 모달을 열도록 설정
        data-bs-target="#userModal" // 모달의 ID를 여기에 설정
        style={{ cursor: "pointer" }}
      >
        <span className="hover-bold">{user_name}</span>
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
          <td className="userEmail" style={{ whiteSpace: "nowrap" }}>
            {user_email}
          </td>
          <td className="userLeaveDate">{user_leavedate}</td>
          <td className="userDenyBtn">
            <button
              className="btn btn-primary denyBtn"
              type="button"
              onClick={() => onUserClick(username)}
              data-bs-toggle="modal" // 모달을 열도록 설정
              data-bs-target="#userModal" // 모달의 ID를 여기에 설정
            >
              처리
            </button>
          </td>
        </>
      )}
    </tr>
  );
};

export default UserItem;
