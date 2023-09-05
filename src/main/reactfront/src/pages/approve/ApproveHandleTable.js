const ApproveHandleTable = ({index, userq_YN, userq_NUM, user_ID, userq_COUNT, userq_KIND, userq_REGDATE, userq_TITLE, userq_COMMENT, userq_OKDATE, userq_GRANTOR, func, }) => {
  return(

    <tr className="prod-box">
      <th scope="row">{index + 1}</th>
      <td className="user_ID">{user_ID}</td>
      <td className="userq_KIND">{userq_KIND}</td>
      <td className="userq_COUNT">{userq_COUNT}</td>
      <td className="userq_REGDATE">{userq_REGDATE}</td>
      <td className="userq_YN">{userq_YN}</td>

      <th className="userq_TITLE" style={{display :"none"}}>{userq_TITLE}</th>
      <th className="userq_COMMENT" style={{display :"none"}}>{userq_COMMENT}</th>
      <th className="userq_NUM" style={{display :"none"}}>{userq_NUM}</th>
      <th className="userq_OKDATE" style={{display :"none"}}>{userq_OKDATE}</th>
      <th className="userq_GRANTOR" style={{display :"none"}}>{userq_GRANTOR}</th>

      <td>
      <button className="btn btn-primary approveBtn" type="button"  data-bs-formtarget="#basicModal" onClick={func} id="approveBtn">조회</button>
      </td>
      
    </tr>

  )
}

export default ApproveHandleTable