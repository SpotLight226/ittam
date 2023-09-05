import { useEffect, useState } from "react";
import axios from 'axios';
import ApproveHandleTable from "./ApproveHandleTable";


function Approve() { // 관리자 사용 신청 내역 조회 페이지

  const [userRequest, setUserRequest] = useState([]); // 유저 리스트
  const [msg, setMsg] = useState(); // 리랜더링을 위해 useState 생성해서 응답 메시지 넣기
  const [inputText, setInputText] = useState(); // 검색창 value 값 state로 관리
  const [innerData, setInnerDate] = useState({ // 승인, 반려 버튼 눌렀을 때 해당 행의 값 state로 관리
    userqNUM : "",
    userqKIND : "",
    userqCOUNT : "",
    userID : "",
    userqTITLE : "",
    userqCOMMENT : "",
    userqOKDATE : "",
    userqGRANTOR : "",
    userqYN : ""
  });
  const [inputInnerData, setInputInnerDate] = useState({ // 검색 시 list 관리를 위한 state
    userqNUM : "",
    userqKIND : "",
    userqCOUNT : "",
    userID : "",
    userqTITLE : "",
    userqCOMMENT : "",
    userqOKDATE : "",
    userqGRANTOR : "",
    userqYN : ""
  });
  const handleToggle = (e) => { // 승인 모달창 핸들러
    let basicModal = document.getElementById("basicModal");
    basicModal.classList.toggle("show");
    basicModal.style.display = ((basicModal.style.display !== 'none') ? 'none' : 'block'); 
    setInnerDate({
      ...innerData,
      userqKIND : e.target.closest(".prod-box").querySelector(".userq_KIND").textContent,
      userqCOUNT : e.target.closest(".prod-box").querySelector(".userq_COUNT").textContent,
      userID : e.target.closest(".prod-box").querySelector(".user_ID").textContent,
      userqTITLE : e.target.closest(".prod-box").querySelector(".userq_TITLE").textContent,
      userqCOMMENT : e.target.closest(".prod-box").querySelector(".userq_COMMENT").textContent,
      userqNUM : e.target.closest(".prod-box").querySelector(".userq_NUM").textContent, 
      userqOKDATE : e.target.closest(".prod-box").querySelector(".userq_OKDATE").textContent,
      userqGRANTOR : e.target.closest(".prod-box").querySelector(".userq_GRANTOR").textContent,
      userqYN : e.target.closest(".prod-box").querySelector(".userq_YN").textContent
    });
   };
  const handleClose =() =>  { // 승인 모달창 닫는 핸들러
    let basicModal = document.getElementById("basicModal");
    basicModal.style.display = "none";
    basicModal.classList.toggle("show");
  };
  const activeEnter = (e) => { // Enter 눌렀을 때 axios 함수 호출
    if(e.key === 'Enter'){
      let searchInput = document.getElementById("search-input");
      SearchForm(inputText);
      searchInput.value = "";
    }
  }
  const SearchForm = (inputText) => { // 검색 String boot로 전달
    axios({
      url: 'http://localhost:9191/UserRequest/UserRequestHandleSearch',
      method: 'post',
      data: {
        inputText: inputText
      }
    })
      .then((response) => {
        setInputInnerDate(response.data);
      })
      .catch((error) => {
        alert("검색에 실패하였습니다.");
      });
  };

  useEffect(() => { // 랜더링
    if(inputInnerData.userID === "" || inputInnerData.length === 0){
      // axios.get('http://localhost:9191/UserRequest/UserRequestHandlePage').then(res => console.log(res.data));
      axios.get('http://localhost:9191/UserRequest/UserRequestHandlePage').then(res => setUserRequest(res.data));
    } else {
      setUserRequest(inputInnerData);
    }
  },[msg, inputInnerData]);

  return (
    <div>
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>사용 처리내역 조회</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Home</a>
              </li>
              <li className="breadcrumb-item">Tables</li>
              <li className="breadcrumb-item active">Data</li>
            </ol>
          </nav>
        </div>

        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">자산 사용 처리내역 조회</h5>
                  <div className="datatable-wrapper datatable-loading nofooter sortable searchable fixed-columns">
                    <div className="datatable-top">
                      <div className="datatable-dropdown">
                        <label htmlFor="">
                          <select className="datatable-selector">
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                            <option value="25">25</option>
                          </select>
                        </label>
                      </div>

                      <div>
                        
                      </div>
                      <div className="datatable-search">
                        <input
                          className="datatable-input"
                          placeholder="검색"
                          type="search"
                          title="Search within table"
                          id="search-input"
                          onChange={(e) => setInputText(e.target.value)}
                          onKeyPress={(e) => activeEnter(e)} 
                        />
                      </div>
                    </div>
                  </div>
                  <table className="table datatable">
                    <thead>
                      <tr>
                        <th data-sortable="true">
                          <a href="#" className="datatable-sorter">
                            #
                          </a>
                        </th>
                        <th data-sortable="true">
                          <a href="#" className="datatable-sorter">
                            신청자
                          </a>
                        </th>
                        <th data-sortable="true">
                          <a href="#" className="datatable-sorter">
                            자산명
                          </a>
                        </th>
                        <th data-sortable="true">
                          <a href="#" className="datatable-sorter">
                            수량
                          </a>
                        </th>
                        <th data-sortable="true">
                          <a href="#" className="datatable-sorter">
                            처리날짜
                          </a>
                        </th>
                        
                        <th data-sortable="true">
                          <a href="#" className="datatable-sorter">
                            처리상태
                          </a>
                        </th>

                        <th data-sortable="true" className="handle">
                          <a href="#" className="datatable-sorter">
                            조회
                          </a>
                        </th>
                        
                      </tr>
                    </thead>
                    <tbody>
                      
                      {/* 테이블리스트 */}


                      {userRequest.map((item,index) => (
                        <ApproveHandleTable key={index} {...item} index={index} func={handleToggle}/> 
                      ))}


                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 승인 모달창 */}
      <div className="modal fade" id="basicModal" tabIndex="-1" style={{display : "none"}} 
      aria-modal="true"  role="dialog" >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">처리 상태 확인</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}></button>
                    </div>
                    
                      <form action="#" name="ApproveForm">
                        <div className="modal-body">
                          <p>처리상태 : {innerData.userqYN}</p>
                          <hr />
                          <p>신청자명 : {innerData.userID}</p>
                          <p>자산명 : {innerData.userqKIND}</p>
                          <p>수량 : {innerData.userqCOUNT}개</p>
                          <p>처리 날짜 : {innerData.userqOKDATE}</p>
                          <p>처리 담당자 : {innerData.userqGRANTOR}</p>
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleClose}>닫기</button>
                        </div>
                     </form>
                  </div>
                </div>
      </div>

      
    </div>
  );
}
export default Approve;
