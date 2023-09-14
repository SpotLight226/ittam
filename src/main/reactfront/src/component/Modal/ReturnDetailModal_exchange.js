import "../../styles/Style.css";
import "../../styles/MainPageStyle/ReturnDetailModal.css";

function ReturnDetailModal({ setOpenModal_exchange, num, returnList, getreturnList }) {

  let thisList = () => {
    return returnList.find(x => x.RETURN_NUM == num)
  }

  const reqTime = () => {
    let now = new Date(thisList().RETURN_DATE);
    let todayYear = now.getFullYear();
    let todayMonth = now.getMonth();
    let todayDate = now.getDate();
    const week = ['(일)', '(월)', '(화)', '(수)', '(목)', '(금)', '(토)'];
    let dayOfWeek = week[now.getDay()];
    let hours = now.getHours();
    let minutes = now.getMinutes();

    return todayYear + "년 " + todayMonth + "월 " + todayDate + "일 " + dayOfWeek + " " +  hours + "시 " + minutes + "분";
  }


  return (

   
    
    <div className="modal modalmodal" onClick={() => { setOpenModal_exchange(false);}}>
      
      <div className="modalContainer" onClick={(e) => e.stopPropagation()}>

        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal_exchange(false);
            }}
          >
          
            X
          </button>
        </div>
        <div className="title">
          <h5>상세정보</h5>
            <hr/>
        </div>
        <div className="body">
          {/*<div className="tab-pane fade show active profile-overview" id="profile-overview">*/}

          {/*  /!* <div className="card-title" style={{ fontWeight: "800", paddingTop: '0px' }}></div> *!/*/}
          {/*  <div className="row" style={{ marginBottom: "20px" }}>*/}
          {/*    <div className="col-lg-3 col-md-4 label">요청종류</div>*/}
          {/*    <div className="col-lg-9 col-md-8">{thisList().RETURN_KIND}</div>*/}
          {/*  </div>*/}

          {/*  <div className="row" style={{ marginBottom: "20px" }}>*/}
          {/*    <div className="col-lg-3 col-md-4 label">사원명</div>*/}
          {/*    <div className="col-lg-9 col-md-8">{thisList().USER_NAME}</div>*/}
          {/*  </div>*/}

          {/*  <div className="row" style={{ marginBottom: "20px" }}>*/}
          {/*    <div className="col-lg-3 col-md-4 label">신청날짜</div>*/}
          {/*    <div className="col-lg-9 col-md-8">{reqTime()}</div>*/}
          {/*  </div>*/}

          {/*  <div className="row" style={{ marginBottom: "20px" }}>*/}
          {/*    <div className="col-lg-3 col-md-4 label">제목</div>*/}
          {/*    <div className="col-lg-9 col-md-8">{thisList().RETURN_TITLE}</div>*/}
          {/*  </div>*/}

          {/*  <div className="row" style={{ marginBottom: "20px" }}>*/}
          {/*    <div className="col-lg-3 col-md-4 label">사유</div>*/}
          {/*    <div className="col-lg-9 col-md-8">{thisList().RETURN_COMMENT}</div>*/}
          {/*  </div>*/}


          {/*</div>*/}



          <form>

            <div className="row mb-3">
              <label htmlFor="" className="col-sm-2 col-form-label">신청자산</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" value={thisList().ASSETS_NAME} disabled />

              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="" className="col-sm-2 col-form-label">신청자산</label>
              <div className="col-sm-10">
                <select name="" id=""  className="select-assets">
                  <option value="">dfffdfd</option>
                  <option value="">dfffdfd</option>
                  <option value="">dfffdfd</option>
                  <option value="">dfffdfd</option>
                  <option value="">dfffdfd</option>
                </select>

              </div>
            </div>



            <div className="row mb-3">
              <label className="col-sm-2 col-form-label">신청자</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" value={thisList().USER_NAME} disabled />

              </div>
            </div>
            <div className="row mb-3">
              <label for="inputText" className="col-sm-2 col-form-label">신청날짜</label>
              <div className="col-sm-10">
                <input type="email" className="form-control" value={reqTime()} disabled />
              </div>
            </div>

            <div className="row mb-3 position-relative">
              <label for="validationTooltip03" className="col-sm-2 col-form-label">신청제목</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" name="return_title" id="validationTooltip01" value={thisList().RETURN_TITLE} disabled/>
                <div className="invalid-tooltip">
                  Please provide a valid city.
                </div>
              </div>
            </div>


            <div className="row mb-3">
              <label for="inputText" className="col-sm-2 col-form-label">신청사유</label>
              <div className="col-sm-10">
                <textarea className="form-control userModalAst-text" name="return_comment" disabled>{thisList().RETURN_COMMENT}</textarea>
              </div>
            </div>





          </form>{/* <!-- End General Form Elements --> */}













        </div>
        <div className="footer">
          <button onClick={() => { alert('승인처리되었습니다'); setOpenModal_exchange(false); }} id="cancelBtn">승인</button>
          <button onClick={() => { alert('반려처리되었습니다.'); setOpenModal_exchange(false) }}>반려</button>
        </div>
      </div>
    </div>

   

  )
}
export default ReturnDetailModal;
