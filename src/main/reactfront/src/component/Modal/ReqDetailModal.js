import "../../styles/Style.css";
import "../../styles/MainPageStyle/ReturnDetailModal.css";
import axios from "axios";


function ReqDetailModal({ setOpenReqDetailModal, username, myRequestList, userq_num, getMyRequestList}) {

  let thisList = () => {
    return myRequestList.find(x => x.userq_num === userq_num)
  }

  const reqTime = () => {
    let now = new Date(thisList().userq_regdate);
    let todayYear = now.getFullYear();
    let todayMonth = now.getMonth();
    let todayDate = now.getDate();
    const week = ['(일)', '(월)', '(화)', '(수)', '(목)', '(금)', '(토)'];
    let dayOfWeek = week[now.getDay()];
    let hours = now.getHours();
    let minutes = now.getMinutes();

    return todayYear + "년 " + todayMonth + "월 " + todayDate + "일 " + dayOfWeek + " " +  hours + "시 " + minutes + "분";
  }


  const cancelReq_btn = () => {
    if(window.confirm('정말 요청을 취소하시겠습니까?')) {

    axios.delete("/mainPage/deleteUsingPerchaseReq", {params: {userq_num: thisList().userq_num}})
        .then(response => {
          alert('요청이 취소되었습니다.');
          setOpenReqDetailModal(false);
          getMyRequestList(username);})
        .catch(error => console.log(error))
    }

  }



  return (

      <div className="modal modalmodal" onClick={() => { setOpenReqDetailModal(false); }}>


        <div className="card" style={{width: '600px', borderRadius: "8px"}} onClick={(e) => e.stopPropagation()}>
          <div className="card-body">

            <h5 className="card-title" style={{ paddingBottom: "0px" }}>사용 및 구매 신청</h5>
            <hr />




              <div className="row mb-3">
                <label htmlFor="" className="col-sm-2 col-form-label">신청자산</label>
                <div className="col-sm-10">
                  <input type="text" className="form-control" value={thisList().userq_kind} disabled />

                </div>
              </div>
              <div className="row mb-3">
                <label className="col-sm-2 col-form-label">신청자</label>
                <div className="col-sm-10">
                  <input type="text" className="form-control" value={username} disabled />

                </div>
              </div>
              <div className="row mb-3">
                <label for="inputText" className="col-sm-2 col-form-label">신청날짜</label>
                <div className="col-sm-10">
                  <input type="email" className="form-control" value={reqTime()} disabled />
                </div>
              </div>

              <div className="row mb-3 position-relative">
                <label for="validationTooltip03" className="col-sm-2 col-form-label needs-validation">신청제목</label>
                <div className="col-sm-10">
                  <input type="text" className="form-control" name="return_title" id="validationTooltip01" value={thisList().userq_title} disabled/>
                  <div className="invalid-tooltip">
                    Please provide a valid city.
                  </div>
                </div>
              </div>


              <div className="row mb-3">
                <label for="inputText" className="col-sm-2 col-form-label">신청사유</label>
                <div className="col-sm-10">
                  <textarea className="form-control userModalAst-text" name="return_comment" disabled>{thisList().userq_comment}</textarea>
                </div>
              </div>



              <div className="row mb-3 userModalAsk-btn">
                <label className="col-sm-2 col-form-label"></label>
                <div className="col-sm-10">
                  <button type="button" className="btn btn-primary" style={{ marginRight: '10px', backgroundColor: 'gray', border: 'gray' }} onClick={() => { setOpenReqDetailModal(false)}}>뒤로가기</button>

                  <button type="submit" className="btn btn-primary" onClick={cancelReq_btn}>취소하기</button>

                </div>
              </div>



          </div>
        </div>


      </div>



  )
}
export default ReqDetailModal;