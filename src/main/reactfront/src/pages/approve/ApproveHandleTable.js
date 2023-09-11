const ApproveHandleTable = ({index, userq_yn, userq_num, user_id, userq_count, userq_kind, userq_regdate, userq_title, userq_comment, userq_okdate, userq_grantor, func, }) => {
  return(

    <tr className="prod-box">
      <th scope="row">{index + 1}</th>
      <td className="user_ID">{user_id}</td>
      <td className="userq_KIND">{userq_kind}</td>
      <td className="userq_COUNT">{userq_count}</td>
      <td className="userq_REGDATE">{userq_regdate}</td>
      <td className="userq_YN">{userq_yn}</td>
      <td className="userq_grantor">{userq_grantor}</td>

      <th className="userq_TITLE" style={{display :"none"}}>{userq_title}</th>
      <th className="userq_COMMENT" style={{display :"none"}}>{userq_comment}</th>
      <th className="userq_NUM" style={{display :"none"}}>{userq_num}</th>
      <th className="userq_OKDATE" style={{display :"none"}}>{userq_okdate}</th>
      <th className="userq_GRANTOR" style={{display :"none"}}>{userq_grantor}</th>

      <td>
      <button className="btn btn-primary approveBtn" type="button"  data-bs-formtarget="#basicModal" onClick={func} id="approveBtn">조회</button>
      </td>
      
    </tr>

  )
}

export default ApproveHandleTable