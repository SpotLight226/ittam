function UserModalAsk({open, onClose, dataa}) {
  if(!open) return null;

  const todayTime = () => {
    let now = new Date();
    let todayYear = now.getFullYear();
    let todayMonth = now.getMonth();
    let todayDate = now.getDate();
    const week = ['(일)', '(월)', '(화)', '(수)', '(목)', '(금)', '(토)'];
    let dayOfWeek = week[now.getDay()];
    let hours = now.getHours();
    let minutes = now.getMinutes();

    return todayYear + "년 " + todayMonth + "월 " + todayDate + "일 " + dayOfWeek + " " + hours + "시 " + minutes + "분";
  }

  return (

      <div className="modal fade" id="basicModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Basic Modal</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">


  <div className="overlay">
    <div className="modalContainer" onClick={(e) => {e.stopPropagation()}}>

 <section className="section userModalAsk-section">
      <div className="row">
        <div className="col-lg-12 userModalAsk-col">

          <div className="card">
            <div className="card-body userModalAsk-body">
              <h5 className="card-title" style={{paddingBottom: "0px"}}>교환 및 반납 신청</h5>
              <hr/>
              {/* <!-- General Form Elements --> */}
              <form>
              <fieldset className="row mb-3">
                  <legend className="col-form-label col-sm-2 pt-0">교환/반납</legend>
                  <div className="col-sm-10">
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="교환" checked/>
                      <label className="form-check-label" for="gridRadios1">
                        교환
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="반납"/>
                      <label className="form-check-label" for="gridRadios2">
                        반납
                      </label>
                    </div>
                
                  </div>
                </fieldset>
                <div className="row mb-3">
                  <label for="" className="col-sm-2 col-form-label">신청자산</label>
                  <div className="col-sm-10">
                    {/*<input type="text" className="form-control" value="###자산명" disabled/>*/}

                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label">신청자</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control" value="###사원명" disabled/>

                  </div>
                </div>
                <div className="row mb-3">
                  <label for="inputEmail" className="col-sm-2 col-form-label">신청날짜</label>
                  <div className="col-sm-10">
                    <input type="email" className="form-control" value={todayTime()} disabled/>
                  </div>
                </div>

                <div className="row mb-3">
                  <label for="inputText" className="col-sm-2 col-form-label">신청제목</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control"/>
                  </div>
                </div>
             
                <div className="row mb-3">
                  <label for="inputPassword" className="col-sm-2 col-form-label">신청사유</label>
                  <div className="col-sm-10">
                    <textarea className="form-control userModalAst-text"></textarea>
                  </div>
                </div>
      


                <div className="row mb-3 userModalAsk-btn">
                  <label className="col-sm-2 col-form-label"></label>
                  <div className="col-sm-10">
                    <button type="submit" className="btn btn-primary" onClick={onClose} style={{marginRight: '10px', backgroundColor: 'gray', border: 'gray'}}>뒤로가기</button>
                    <button type="submit" className="btn btn-primary" onClick={onClose}>신청하기</button>

                  </div>
                </div>

              </form>{/* <!-- End General Form Elements --> */}

            </div>
          </div>

        </div>
        </div>
        </section>



      
    </div>
      
  </div>
            </div>

          </div>
        </div>
      </div>
   
  )
}
export default UserModalAsk;
