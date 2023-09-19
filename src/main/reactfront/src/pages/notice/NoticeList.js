import "../../styles/Style.css";
import NoticeListTable from "./NoticeListTable";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { logDOM } from "@testing-library/react";
import React, { useEffect, useLayoutEffect, useState } from "react";
import "../../styles/NoticeList.css"

function NoticeList() {

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
      method: "get"
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


  const handleSearchActive = () => {

    // 검색어를 서버로 보내고 검색 결과를 받아옴
    axios({
      url: "http://localhost:9191/noticelist/active", // 검색을 처리할 서버 엔드포인트
      method: "get"
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




  const handleSearchExpire = () => {

    // 검색어를 서버로 보내고 검색 결과를 받아옴
    axios({
      url: "http://localhost:9191/noticelist/expire", // 검색을 처리할 서버 엔드포인트
      method: "get"
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

  const handleSearchDate = () => {

    const searchStartDate = document.getElementById("searchStartDate");
    const searchEndDate = document.getElementById("searchEndDate");

    console.log(searchStartDate.value);
    console.log(searchEndDate.value);

    const data = {
      notice_regdate : searchStartDate.value,
      notice_enddate : searchEndDate.value
    }


    axios({
      url: "http://localhost:9191/noticelist/searchDate", // 검색을 처리할 서버 엔드포인트
      method: "post",
      headers: {
        'Content-Type' : 'application/json;charset=utf-8'
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
    })
      .then((response) => {
        console.log(response)
        setNoticeList(response.data);
      })
      .catch((error) => {
        alert("에러발생" + error);
      });
  }


  useLayoutEffect(() => {
      getList();
  }, []);

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
                      <div className="datatable-dropdown"></div>

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
                      <button className="btn btn-primary searchBtn" type="button" onClick={handleSearchDate}  > 
                      검색 
                      </button>
                      </div>
                  

                      <div className="datatable-search">
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
                          <Link to="#" className="datatable-sorter">
                            #
                          </Link>
                        </th>
                        <th data-sortable="true" className="col-sm-1">
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
                        <th data-sortable="true" className="handle">
                          <Link to="#" className="datatable-sorter">
                            만료날짜
                          </Link>
                        </th>
                        <th data-sortable="true" className="handle">
                          <Link to="/NoticeEdit" className="datatable-sorter">
                            수정
                          </Link>
                        </th>
                        <th data-sortable="true" className="handle">
                          <Link to="#" className="datatable-sorter">
                            삭제
                          </Link>
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {noticeList.map((item, index) => (
                        <NoticeListTable
                          key={index}
                          {...item}
                          index={index}
                          setNoticeData={setNoticeData}
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
          <div className="d-flex justify-content-end">
            {" "}
            {/* 글작성 버튼을 Link 컴포넌트로 수정 */}
            <Link to="/NoticeWrite" className="btn btn-primary writeBtn">
              글작성
            </Link>
          </div>
        </section>
        <nav
          aria-label="Page navigation example"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <ul className="pagination">
            <li className="page-item">
              <Link className="page-link" to="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </Link>
            </li>
            <li className="page-item">
              <Link className="page-link" to="#">
                1
              </Link>
            </li>
            <li className="page-item">
              <Link className="page-link" to="#">
                2
              </Link>
            </li>
            <li className="page-item">
              <Link className="page-link" to="#">
                3
              </Link>
            </li>
            <li className="page-item">
              <Link className="page-link" to="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </Link>
            </li>
          </ul>
        </nav>
      </main>
      <div
        className="modal fade"
        id="basicModalBack"
        tabIndex="-1"
        style={{ display: "none" }}
        aria-modal="true"
        role="dialog"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">삭제 확인</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleBackClose}
              ></button>
            </div>
            <div className="modal-body">해당 게시글을 삭제하시겠습니까?</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={handleBackClose}
              >
                취소
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleBackClose}
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  
  
    
  );
}

export default NoticeList;