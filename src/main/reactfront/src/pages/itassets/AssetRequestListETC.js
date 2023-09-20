import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link, useParams, useLocation} from 'react-router-dom';
import AssetRequestListETCTable from "./AssetRequestListETCTable";
import Pagenation from "../../component/Pagenation";
import AssetAllListTable from "./AssetAllListTable";
import AssetDetailModal from "./AssetDetailModal";

const AssetRequestListETC = () => {
  const token = localStorage.getItem("token");
  const [AssetRequest, setAssetRequest] = useState([]); // 전체 자산 리스트
  const [inputText, setInputText] = useState('');

  const [inputInnerData, setInputInnerDate] = useState({ // 검색 시 list 관리를 위한 state
    assets_name : "",
    assets_status : "",
    etc_mfg : "",
    spec_seriel : "",
    spec_warranty : "",
    category_name : "",
    spec_num : "",
    assets_num : "",
  });

  const url = useLocation();
  const path = url.pathname;


  // 검색
  const activeEnter = (e) => {
    if (e.key === 'Enter') {
      searchAssets(inputText);
    }
  };
  const searchAssets = (inputText) => {
    axios({
      url: 'http://localhost:9191/AssetRequest/AssetRequestSearch',
      method: 'post',
      data: {
        inputText: inputText
      },
      headers: {
        Authorization : token
      },
    })
        .then((response) => {
          setInputInnerDate(response.data);
          if (response.data.length === 0) { // response.data가 빈 배열인 경우
            window.alert("일치하는 자산이 없습니다");}
        })
        .catch((error) => {
          alert('검색에 실패하였습니다.');
        });
  };

  //전체 자산

  useEffect(() => {
    if (inputInnerData.assets_name === "" || inputInnerData.length === 0) {
      // Axios를 사용하여 서버로 데이터를 보냅니다.
      axios.get(`http://localhost:9191/AssetRequest/AssetRequestListCategory?path=${encodeURIComponent(path)}`,{
        headers: {
          Authorization : token
        },
      })
          .then((res) => {setAssetRequest(res.data)})
          .catch((error) => {
            console.error('요청 실패:', error);
          });
    } else {
      setAssetRequest(inputInnerData);
    }
  }, [inputInnerData]);

  // 구매버튼 스타일
  const buttonStyle = {
    marginLeft: '10px',
    marginRight: '40px',
  };

  /* 몇개씩 보이고 싶은지 */
  const [itemsPerPage, setItemPerPage] = useState(10); // 페이지당 10개의 아이템  useState(처음에 보이고싶은 개수)
  const handleSelectorChange = (event) => {
    setItemPerPage(Number(event.target.value));
    console.log(Number(event.target.value))
  };

  /* 페이지네이션 */
  const totalPages = Math.ceil(AssetRequest.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const pagesPerGroup = 10; // 한 그룹에 표시할 페이지 수
  const currentGroup = Math.ceil(currentPage / pagesPerGroup); // 현재 페이지 그룹

  const startPage = (currentGroup - 1) * pagesPerGroup; // 시작 페이지
  const endPage = Math.min(currentGroup * pagesPerGroup, totalPages); // 끝 페이지

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //사용/구매 신청 모달창

  const [innerData, setInnerDate] = useState({ // 승인, 반려 버튼 눌렀을 때 해당 행의 값 state로 관리
    userqNUM : "",
    userqKIND : "",
    userqCOUNT : "",
    username : "",
    userqTITLE : "",
    userqCOMMENT : "",
    userqOKDATE : "",
    userqGRANTOR : "",
    userqYN : "",
    categoryNUM : ""
  });

  const handleToggle = (e) => { // 승인 모달창 핸들러
    let basicModal = document.getElementById("basicModal");
    // console.log("하하하하하")

    basicModal.classList.toggle("show");
    basicModal.style.display = ((basicModal.style.display !== 'none') ? 'none' : 'block');
    setInnerDate({
      ...innerData,
      userqKIND: e.target.closest(".prod-box").querySelector(".userq_KIND"),
      userqCOUNT: e.target.closest(".prod-box").querySelector(".userq_COUNT"),
      username: e.target.closest(".prod-box").querySelector(".user_name"),
      userqTITLE: e.target.closest(".prod-box").querySelector(".userq_TITLE"),
      userqCOMMENT: e.target.closest(".prod-box").querySelector(".userq_COMMENT"),
      userqNUM: e.target.closest(".prod-box").querySelector(".userq_NUM"),
      userqOKDATE: e.target.closest(".prod-box").querySelector(".userq_OKDATE"),
      userqGRANTOR: e.target.closest(".prod-box").querySelector(".userq_GRANTOR"),
      userqYN: e.target.closest(".prod-box").querySelector(".userq_YN"),
      categoryNUM: e.target.closest(".prod-box").querySelector(".category_NUM"),
    });
    // 모달 센터로 이동
    const modal = document.querySelector(".modalmodal .card");
    modal.style.left = `calc(50% - ${modal.clientWidth / 2}px)`;
    modal.style.top = `calc(50% - ${modal.clientHeight / 2}px)`;
  };

  const handleClose =() =>  { // 승인 모달창 닫는 핸들러
    let basicModal = document.getElementById("basicModal");
    basicModal.style.display = "none";
    basicModal.classList.toggle("show");
  };

  const ApproveForm = (e, userqNUM) => { // Spring Boot로 승인 요청
    e.preventDefault();
    axios({
      url: 'http://localhost:9191/UserRequest/UserRequestApprove',
      method: 'post',
      data: {
        userq_NUM: userqNUM
      },
      headers: {
        Authorization : token
      },
    })
        .then((response) => {

          if (inputInnerData.userqNUM !== "") {
            setInputInnerDate(prevState => {
              // userqNUM이 일치하지 않는 요소만 필터링하여 새로운 배열 생성
              const updatedInputInnerData = prevState.filter(item => item.userqNUM !== inputInnerData.userqNUM);
              return updatedInputInnerData;
            });
          }
          handleClose();
          alert("정상적으로 사용 승인처리 되었습니다.");
        })
        .catch((error) => {
          alert("승인처리에 실패하였습니다.");
        });
  };

  const handleBackClose = () => { // 반려 모달창 닫는 핸들러
    let basicModalBack = document.getElementById("basicModalBack");
    basicModalBack.style.display = "none";
    basicModalBack.classList.toggle("show");
  };

//상세페이지
  /* 모달창에 비동기 데이터 가져오기 */
  const [selectedItem, setSelectedItem] = useState(null);
  const handleModal = (item) => {
    setSelectedItem(item);
    // console.log(item);
    // console.log(selectedItem);
  };

  return (
      <div>
        <main id="main" className="main">
          <div className="pagetitle">
            <h1>IT자산 목록</h1>
            <nav>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="index.html">Home</Link>
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
                    <h5 className="card-title">전체 자산 수 : </h5>
                    <div className="datatable-wrapper datatable-loading nofooter sortable searchable fixed-columns">
                      <div className="datatable-top">
                        <div className="datatable-dropdown">
                          <label htmlFor="">
                            <select
                                className="datatable-selector"
                                value={itemsPerPage}
                                onChange={handleSelectorChange}
                            >
                              <option value="5">5</option>
                              <option value="10">10</option>
                              <option value="15">15</option>
                              <option value="20">20</option>
                              <option value="25">25</option>
                            </select>
                          </label>
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
                          <Link to="/itassets/purchase">
                            <button className="btn btn-primary" type="button" style={buttonStyle}>+ 구매 신청</button>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <table className="table datatable">
                      <thead>
                      <tr>
                        <th data-sortable="true">
                            <input type={"checkbox"}/>
                        </th>
                        <th data-sortable="true">
                          <Link to="#" className="datatable-sorter">
                            #
                          </Link>
                        </th>
                        <th data-sortable="true">
                          <Link to="#" className="datatable-sorter">
                            자산명
                          </Link>
                        </th>
                        <th data-sortable="true">
                          <Link to="#" className="datatable-sorter">
                            자산상태
                          </Link>
                        </th>
                        <th data-sortable="true">
                          <Link to="#" className="datatable-sorter">
                            제조사
                          </Link>
                        </th>
                        <th data-sortable="true">
                          <Link to="#" className="datatable-sorter">
                            시리얼
                          </Link>
                        </th>
                        <th data-sortable="true">
                          <Link to="#" className="datatable-sorter">
                            보증기간
                          </Link>
                        </th>
                        <th data-sortable="true">
                          <Link to="#" className="datatable-sorter">
                            카테고리
                          </Link>
                        </th>
                        <th data-sortable="true">
                          <Link to="#" className="datatable-sorter">
                            사용신청
                          </Link>
                        </th>
                      </tr>
                      </thead>

                      {/* 테이블 시작 */}

                      <tbody>
                      {AssetRequest.slice(
                          (currentPage - 1) * itemsPerPage,
                          currentPage * itemsPerPage
                      ).map((item, index) => (
                          <AssetAllListTable
                              key={index}
                              {...item}
                              index={index}
                              func={handleToggle}
                              handleModal={handleModal}
                              // handleAssetClick={handleAssetClick} // 클릭 이벤트 추가
                          />
                      ))}
                      </tbody>
                    </table>
                    {/* 상세정보 모달창 */}
                    <div
                        className="modal fade"
                        id="modalDialogScrollable"
                        tabIndex="-1"
                    >
                      <AssetDetailModal selectedItem={selectedItem} />
                    </div>
                    {/* 상세정모 모달창 끝*/}
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* 페이징네이션 */}

          <Pagenation
              currentPage={currentPage}
              totalPages={totalPages}
              startPage={startPage}
              endPage={endPage}
              handleClick={handleClick}
          />
        </main>

        {/* 승인 모달창 */}
        <div className="modal modalmodal" id="basicModal"  style={{display : "none"}} >
          <div className="card" style={{width: '600px', borderRadius: "8px"}} onClick={(e) => e.stopPropagation()}>
            <div className="card-body">

              <h5 className="card-title" style={{ paddingBottom: "0px" }}>교환 및 반납 신청</h5>
              <hr />


              <form method="post" >

                <fieldset className="row mb-3">
                  <legend className="col-form-label col-sm-2 pt-0">요청종류</legend>
                  <div className="col-sm-10">
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="return_kind" id="gridRadios1" value="사용신청"/>
                      <label className="form-check-label" htmlFor="gridRadios1">
                        사용신청
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="return_kind" id="gridRadios2" value="구매신청" />
                      <label className="form-check-label" htmlFor="gridRadios2">
                        구매신청
                      </label>
                    </div>

                  </div>
                </fieldset>
                <div className="row mb-3">
                  <label htmlFor="" className="col-sm-2 col-form-label">신청자산</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control" disabled />

                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label">신청자</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control" value="###사원명" disabled />

                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="inputText" className="col-sm-2 col-form-label">신청날짜</label>
                  <div className="col-sm-10">
                    <input type="email" className="form-control" disabled />
                  </div>
                </div>

                <div className="row mb-3 position-relative">
                  <label htmlFor="validationTooltip03" className="col-sm-2 col-form-label needs-validation" novalidate>신청제목</label>
                  <div className="col-sm-10">
                    {/*<input type="text" className="form-control" name="return_title"  id="validationTooltip01"  onChange={handleChange} value={inputTitle} onChange={(e) => setInputTitle(e.target.value)} required/>*/}
                    <input type="text" className="form-control" name="return_title" id="validationTooltip01" required />
                    <div className="invalid-tooltip">
                      Please provide a valid city.
                    </div>
                  </div>
                </div>


                <div className="row mb-3">
                  <label htmlFor="inputText" className="col-sm-2 col-form-label">신청사유</label>
                  <div className="col-sm-10">
                    {/*<textarea className="form-control userModalAst-text" name="return_comment" onChange={handleChange} value={inputComment} onChange={(e) => setInputComment(e.target.value)} required></textarea>*/}
                    <textarea className="form-control userModalAst-text" name="return_comment" required></textarea>
                  </div>
                </div>



                <div className="row mb-3 userModalAsk-btn">
                  <label className="col-sm-2 col-form-label"></label>
                  <div className="col-sm-10">
                    <button type="button" className="btn btn-primary" style={{ marginRight: '10px', backgroundColor: 'gray', border: 'gray' }} onClick={handleClose}>뒤로가기</button>
                    <button type="submit" className="btn btn-primary">신청하기</button>

                  </div>
                </div>

              </form>{/* <!-- End General Form Elements --> */}


            </div>
          </div>
        </div>

      </div>
  );
};

export default AssetRequestListETC;
