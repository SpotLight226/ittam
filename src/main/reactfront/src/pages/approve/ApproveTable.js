const ApproveTable = ({index, userq_NUM, user_ID, userq_COUNT, userq_KIND, userq_REGDATE, userq_TITLE, userq_COMMENT, func, funcClose}) => {
 

  return (
   
    <tr className="prod-box">
      <th scope="row">{index + 1}</th>
      <td className="user_ID">{user_ID}</td>
      <td className="userq_KIND">{userq_KIND}</td>
      <td className="userq_COUNT">{userq_COUNT}</td>
      <td className="userq_REGDATE">{userq_REGDATE}</td>
      <th className="userq_TITLE" style={{display :"none"}}>{userq_TITLE}</th>
      <th className="userq_COMMENT" style={{display :"none"}}>{userq_COMMENT}</th>
      <th className="userq_NUM" style={{display :"none"}}>{userq_NUM}</th>
      <td>
      <button className="btn btn-primary approveBtn" type="button"  data-bs-formtarget="#basicModal" onClick={func} id="approveBtn">승인</button>
      </td>
      <td>
      <button className="btn btn-primary approveBtn" type="button"  data-bs-formtarget="#basicModal" onClick={funcClose}>반려</button>
      </td>
    </tr>
  

  )
}

export default ApproveTable;