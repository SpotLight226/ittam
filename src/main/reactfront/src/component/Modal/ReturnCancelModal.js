import "../../styles/Style.css";
import "../../styles/MainPageStyle/ReturnDetailModal.css";
import axios from "axios";


function ReturnCancelModal({ setOpenCancelModal, myAssetList, myAssetNum, getMyAssetList}) {

  let thisList = () => {
    return myAssetList.find(x => x.ASSETS_NUM == myAssetNum)
  }


  const cancelReq = () => {
    if(window.confirm('정말 요청을 취소하시겠습니까?')) {

    axios.delete("/mainPage/deleteCancelReq", {params: {return_num: thisList().RETURN_NUM}})
        .then(response => {alert('요청이 취소되었습니다.'); setOpenCancelModal(false); getMyAssetList();})
        .catch(error => console.log(error))
    }

  }



  return (

      <div className="modal modalmodal" onClick={() => { setOpenCancelModal(false); }}>


        <div className="card" style={{width: '600px', borderRadius: "8px"}} onClick={(e) => e.stopPropagation()}>
          <div className="card-body">

            <h5 className="card-title" style={{ paddingBottom: "0px" }}>교환 및 반납 신청</h5>
            <hr />


              <fieldset className="row mb-3">
                <legend className="col-form-label col-sm-2 pt-0">요청종류</legend>
                <div className="col-sm-10">
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="return_kind" id="gridRadios1" value="교환" checked={thisList().RETURN_KIND === '교환'} disabled/>
                    <label className="form-check-label" htmlFor="gridRadios1">
                      교환
                    </label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="return_kind" id="gridRadios2" value="반납" checked={thisList().RETURN_KIND === '반납'} disabled/>
                    <label className="form-check-label" htmlFor="gridRadios2">
                      반납
                    </label>
                  </div>

                </div>
              </fieldset>
              <div className="row mb-3">
                <label htmlFor="" className="col-sm-2 col-form-label">신청자산</label>
                <div className="col-sm-10">
                  <input type="text" className="form-control" value={thisList().ASSETS_NAME} disabled />

                </div>
              </div>
              <div className="row mb-3">
                <label className="col-sm-2 col-form-label">신청자</label>
                <div className="col-sm-10">
                  <input type="text" className="form-control" value="###사원명" disabled />

                </div>
              </div>
              <div className="row mb-3">
                <label for="inputText" className="col-sm-2 col-form-label">신청날짜</label>
                <div className="col-sm-10">
                  <input type="email" className="form-control" value={thisList().RETURN_DATE} disabled />
                </div>
              </div>

              <div className="row mb-3 position-relative">
                <label for="validationTooltip03" className="col-sm-2 col-form-label needs-validation" novalidate>신청제목</label>
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



              <div className="row mb-3 userModalAsk-btn">
                <label className="col-sm-2 col-form-label"></label>
                <div className="col-sm-10">
                  <button type="button" className="btn btn-primary" style={{ marginRight: '10px', backgroundColor: 'gray', border: 'gray' }} onClick={() => { setOpenCancelModal(false)}}>뒤로가기</button>

                  <button type="submit" className="btn btn-primary" onClick={cancelReq}>취소하기</button>

                </div>
              </div>



          </div>
        </div>

        {/* </div> */}


        {/* </div> */}
      </div>



  )
}
export default ReturnCancelModal;