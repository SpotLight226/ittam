import "../../styles/Style.css"
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link,useNavigate} from "react-router-dom";
import NoticeUserTable from "./NoticeUserTable";
import Pagenation from "../../component/Pagenation";
import { BsArrowClockwise } from "react-icons/bs";

function NoticeUser(){

  const token = localStorage.getItem("token");

   // 공지사항 목록 저장 하는 STATE
   const [noticeList, setNoticeList] = useState([]);

   // 선택한 공지사항의 state를 저장
   const [noticeData, setNoticeData] = useState({
     notice_regdate: "",
     notice_title: "",
     notice_name: "",
     notice_enddate: "",
     notice_content: "",
     notice_hits: "",
     notice_num: "",
   });
   
   const [searchText, setSearchText] = useState({
     notice_regdate: "",
     notice_title: "",
     notice_name: "",
     notice_enddate: "",
     notice_content: "",
     notice_hits: "",
     notice_num: "",
   });
   
   // 각 검색어 필드에 대한 핸들러 함수
   const handleSearchInputChange = (fieldName, value) => {
     setSearchText((prevSearchText) => ({
       ...prevSearchText,
       [fieldName]: value,
     }));
   };
   
   const handleSearch = () => {
 
     // 검색어를 서버로 보내고 검색 결과를 받아옴
     axios({
       url: "http://localhost:9191/noticelist/searchTitle", // 검색을 처리할 서버 엔드포인트
       method: "get",
       headers: {
        Authorization : token
      },
       params: searchText
     })
       .then((response) => {
         // 검색 결과를 처리
         console.log(response.data);
         setNoticeList(response.data);
       })
       .catch((error) => {
         alert("에러 발생: " + error);
        
       });
   };
 
   const handleSearchAll = () => {
 
     // 검색어를 서버로 보내고 검색 결과를 받아옴
     axios({
       url: "http://localhost:9191/noticelist", // 검색을 처리할 서버 엔드포인트
       method: "get",
       headers: {
        Authorization : token
      }
     })
       .then((response) => {
         // 검색 결과를 처리
         console.log(response.data);
         setNoticeList(response.data);
        // 페이지를 1페이지로 설정
        setCurrentPage(1);
       })
       .catch((error) => {
         alert("에러 발생: " + error);
        
       });
   };
 
 
   const handleSearchActive = () => {
 
     // 검색어를 서버로 보내고 검색 결과를 받아옴
     axios({
       url: "http://localhost:9191/noticelist/active", // 검색을 처리할 서버 엔드포인트
       method: "get",
       headers: {
        Authorization : token
      }
     })
     
       .then((response) => {
         // 검색 결과를 처리
         console.log(response.data);
         setNoticeList(response.data);
        // 페이지를 1페이지로 설정
        setCurrentPage(1);
       })
       .catch((error) => {
         alert("에러 발생: " + error);
        
       });
   };

   const handleSearchExpire = () => {
 
     // 검색어를 서버로 보내고 검색 결과를 받아옴
     axios({
       url: "http://localhost:9191/noticelist/expire", // 검색을 처리할 서버 엔드포인트
       method: "get",
       headers: {
         Authorization : token
       }
     })
       .then((response) => {
         // 검색 결과를 처리
         console.log(response.data);
         setNoticeList(response.data);
         // 페이지를 1페이지로 설정
         setCurrentPage(1);
       })
       .catch((error) => {
         alert("에러 발생: " + error);
        
       });
   };
 
   const handleSearchDate = () => {
 
     const searchStartDate = document.getElementById("searchStartDate");
     const searchEndDate = document.getElementById("searchEndDate");

     const startDate = searchStartDate.value;
     const endDate = searchEndDate.value;
    
    // 시작일과 종료일 중 적어도 하나가 비어 있는 경우
    if (!startDate || !endDate) {
      alert('등록일과 만료일을 모두 설정해주세요.');
      return; // 검색을 중지하고 알림만 표시
    }

    const data = {
      notice_regdate: startDate,
      notice_enddate: endDate,
    }



 
     axios({
       url: "http://localhost:9191/noticelist/searchDate", // 검색을 처리할 서버 엔드포인트
       method: "post",
       headers: {
         'Content-Type' : 'application/json;charset=utf-8',
         Authorization : token
       },
       data: data
     }).then((response) => {
       // 검색 결과를 처리
       console.log(response.data);
       setNoticeList(response.data);
     })
     .catch((error) => {
       alert("에러 발생: " + error);
      
     });
 };
 
   
  
   const navigate = useNavigate();
 
   const handleBackToggle = () => {
     let basicModalBack = document.getElementById("basicModalBack");
     basicModalBack.classList.toggle("show");
     basicModalBack.style.display =
       basicModalBack.style.display !== "none" ? "none" : "block";
   };
 
   const handleBackClose = () => {
     let basicModalBack = document.getElementById("basicModalBack");
     basicModalBack.style.display = "none";
     basicModalBack.classList.toggle("show");
   };
 
   const getList = () => {
     axios({
       url: "http://localhost:9191/noticelist",
       method: "get",
       headers: {
        Authorization : token
      }
     })
       .then((response) => {
         setNoticeList(response.data);
       })
       .catch((error) => {
         alert("에러발생" + error);
       });
   }
 
 
   useEffect(() => {
       getList();
   }, []);
  
   const [itemsPerPage, setItemPerPage] = useState(10); // 페이지당 10개의 아이템  useState(처음에 보이고싶은 개수)
   const handleSelectorChange = (event) => {
     setItemPerPage(Number(event.target.value));
   };
 
   const totalPages = Math.ceil(noticeList.length / itemsPerPage);
   /* 페이지네이션 */
   const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
   /* const totalPages = Math.ceil(data.length / itemsPerPage); */
   const pagesPerGroup = 10; // 한 그룹에 표시할 페이지 수
   const currentGroup = Math.ceil(currentPage / pagesPerGroup); // 현재 페이지 그룹
 
   const startPage = (currentGroup - 1) * pagesPerGroup; // 시작 페이지
   const endPage = Math.min(currentGroup * pagesPerGroup, totalPages); // 끝 페이지
 
   const handleClick = (pageNumber) => {
     setCurrentPage(pageNumber);
   };

   const resetBtn = () => {
    setSearchText({
      notice_regdate: "",
      notice_title: "",
      notice_name: "",
      notice_enddate: "",
      notice_content: "",
      notice_hits: "",
      notice_num: "",
    });
  
    // 날짜 입력 필드 초기화
    const searchStartDate = document.getElementById("searchStartDate");
    const searchEndDate = document.getElementById("searchEndDate");
  
    if (searchStartDate && searchEndDate) {
      searchStartDate.value = "";
      searchEndDate.value = "";
    }
  
    // 페이지를 다시 로드 (원상태로 돌아감)
    getList();
  };








  return (
    <div>
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>공지사항</h1>
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
                  <h5 className="card-title">공지사항</h5>
                  <div className="datatable-wrapper datatable-loading nofooter sortable searchable fixed-columns">
                    <div className="datatable-top">
                      <div className="datatable-dropdown">
                      </div>

                      <div className="tag-element tag-element--faq">
                          <button className="btn btn-primary" style={{ marginRight: '10px' }} onClick={handleSearchAll}>전체</button>
                        <button className="btn btn-primary" style={{ marginRight: '10px' }} onClick={handleSearchActive}>진행중</button>
                        <button className="btn btn-primary" style={{ marginRight: '10px' }} onClick={handleSearchExpire}>만료</button>
                      </div>

                      <div className="col-sm-2">
                        <input type="date" 
                        id="searchStartDate"
                        className="form-control"                  
                        />
                      </div>
                      <span className="cal-line">-</span>
                      <div className="col-sm-2">
                        <input type="date" 
                        id="searchEndDate"
                        className="form-control"
                        />
                      </div>
                      <div className="col-sm-2">
                      <button className="btn btn-primary searchBtn" type="button" onClick={handleSearchDate} > 
                      검색 
                      </button>
                      </div>

                      <div className="datatable-search">
                      <button type="button" className="btn btn-primary reset-btn"style={{ marginBottom: "5px" }}><BsArrowClockwise style={{width : "30px", height : "30px", color : "gray"}}
                                                                                                        onClick={resetBtn}/></button>

                        <input
                          type="search"
                          value={searchText.notice_title}
                          onChange={(e) => handleSearchInputChange("notice_title", e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              handleSearch();
                            }
                          }}
                          placeholder="검색"
                        />
                      </div>
                    </div>
                  </div>

                  <table className="table datatable">
                    <thead>
                      <tr>
                        <th data-sortable="true">
                          <Link to="#" className="datatable-sorter" >
                            번호
                          </Link>
                        </th>
                        <th data-sortable="true">
                          <Link to="#" className="datatable-sorter">
                            등록날짜
                          </Link>
                        </th>
                        <th data-sortable="true">
                          <Link to="#" className="datatable-sorter">
                            제목
                          </Link>
                        </th>
                        <th data-sortable="true">
                          <Link to="#" className="datatable-sorter">
                            작성자
                          </Link>
                        </th>

                        <th data-sortable="true">
                          <Link to="#" 
                          className="datatable-sorter">
                            만료날짜
                          </Link>
                        </th>
                        <th data-sortable="true">
                          <Link to="#" 
                          className="datatable-sorter">
                            조회수
                          </Link>
                        </th>
                      </tr>
                    </thead>
                     <tbody>
                      {noticeList.slice(
                        (currentPage - 1) * itemsPerPage,
                        currentPage * itemsPerPage
                      ).map((item, index) => (
                        <NoticeUserTable
                          key={index}
                          {...item}
                          index={(currentPage - 1) * itemsPerPage + index} // 순번 계산
                          setNoticeData={setNoticeData}
                          currentPage={currentPage}
                          itemsPerPage={itemsPerPage}
                        />
                      ))}
                      {/* {noticeList.map((notice) => (
                        <tr key={notice.id}>
                          <th scope="row">{notice.id}</th>
                          <td>{notice.createDate}</td>
                          <td>{notice.status}</td>
                          <td>
                            <Link to={`/NoticeDetail/${notice.id}`}>
                              {notice.title}
                            </Link>
                          </td>
                          <td>{notice.author}</td>
                          <td>{notice.expirationDate}</td>
                          <td>{notice.views}</td>
                        </tr>
                      ))} */}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
          <Pagenation
            currentPage={currentPage}
            totalPages={totalPages}
            startPage={startPage}
            endPage={endPage}
            handleClick={handleClick}
          />
    </div>
  );
}

export default NoticeUser;