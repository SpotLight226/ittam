import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import React from 'react';
import axios from 'axios';
import Pagenation from '../component/Pagenation';

function ITAssets() {
  const [selectedType, setSelectedType] = useState('데스크탑');
  /* ITAssets테이블 데이터가져오기 */
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get('/assets/getITList')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  /* 카테고리테이블 데이터 가져오기 */

  /* 검색기능 */
  const [searchTerm, setSearchTerm] = useState('');
  const filteredData = data.filter(
    (item) =>
      item.assets_name.includes(searchTerm) ||
      item.assets_status.includes(searchTerm)
  );

  const [searchInput, setSearchInput] = useState('');

  const handleSearchKeyPress = (event) => {
    if (event.key === 'Enter') {
      setSearchTerm(searchInput);
    }
  };

  /* 몇개씩 보이고 싶은지 */
  const [itemsPerPage, setItemPerPage] = useState(10); // 페이지당 10개의 아이템  useState(처음에 보이고싶은 개수)
  const handleSelectorChange = (event) => {
    setItemPerPage(Number(event.target.value));
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
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

  /* 모달창에 비동기 데이터 가져오기 */
  const [selectedItem, setSelectedItem] = useState(null);
  const handleModal = (item) => {
    setSelectedItem(item);
  };

  /* 비동기로 db에 (insert)등록하기 */
  const [formData, setFormData] = useState({
    assets_name: '',
    /* swspec */
    sw_mfg: '',
    sw_spec_seriel: '',

    /* etcspec */
    etc_mfg: '',
    /* pcspec */
    spec_cpu: '',
    spec_ram: '',
    spec_mainboard: '',
    spec_power: '',
    spec_gpu: '',
    spec_hdd: '',
    spec_ssd: '',
    spec_ops: '',
    spec_mfg: '',
    spec_seriel: '',
    /* serverspec */
    server_mfg: '',
    server_capa: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // 폼의 기본 제출 행동을 방지
    try {
      const response = await axios.post('/assets/specInsert', formData);
      if (response.data) {
        alert('등록완료');
        setFormData({
          // 폼 데이터 초기화
          assets_name: selectedType,
          /* swspec */
          sw_mfg: '',
          sw_spec_seriel: '',

          /* etcspec */
          etc_mfg: '',
          /* pcspec */
          spec_cpu: '',
          spec_ram: '',
          spec_mainboard: '',
          spec_power: '',
          spec_gpu: '',
          spec_hdd: '',
          spec_ssd: '',
          spec_ops: '',
          spec_mfg: '',
          spec_seriel: '',
          /* serverspec */
          server_mfg: '',
          server_capa: '',
        });
        // 필요한 경우, 페이지 새로고침 또는 추가 동작
      }
    } catch (error) {
      console.error('Error during data submission:', error);
    }
  };

  const handleSelectChange = (e) => {
    setSelectedType(e.target.value);

    setFormData((prevData) => ({
      ...prevData,
      assets_name: e.target.value,
    }));
  };

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>관리자 재고 관리</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li className="breadcrumb-item">Tables</li>
            <li className="breadcrumb-item active">Data</li>
          </ol>
        </nav>
      </div>
      {/* <!-- End Page Title --> */}
      {/* 등록하기 모달창 */}
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#scrollingModal"
      >
        등록하기
      </button>
      {/* 등록하기 모달 정보 */}
      <div className="modal fade" id="scrollingModal" tabIndex="-1">
        <div className="modal-dialog">
          <div
            className="modal-content"
            style={{ width: '555px', height: '777px' }}
          >
            <div className="modal-header">
              <h5 className="modal-title">등록하기</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            {/* 모달 안쪽 내용 */}
            <div className="modal-body">
              <form method="POST" onSubmit={handleSubmit}>
                <select onChange={handleSelectChange} value={selectedType}>
                  <option value="데스크탑">데스크탑</option>
                  <option value="소프트웨어">소프트웨어</option>
                  <option value="기타">기타</option>
                  <option value="서버">서버</option>
                </select>
                {/* SWSPEC FORM태그 */}
                {selectedType === '소프트웨어' && (
                  <>
                    <div className="row mb-3">
                      <label
                        for="inputText"
                        className="col-sm-2 col-form-label"
                      >
                        제조사
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="MFG"
                          name="sw_mfg"
                          onChange={handleChange}
                          value={formData.sw_mfg}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        for="inputEmail"
                        className="col-sm-2 col-form-label"
                      >
                        시리얼번호
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="SERIEL"
                          name="sw_spec_seriel"
                          onChange={handleChange}
                          value={formData.sw_spec_seriel}
                        />
                      </div>
                    </div>
                  </>
                )}
                {/* 기타 form태그 */}
                {selectedType === '기타' && (
                  <>
                    <div className="row mb-3">
                      <label
                        for="inputPassword"
                        className="col-sm-2 col-form-label"
                      >
                        제조사
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="MFG"
                          name="etc_mfg"
                          onChange={handleChange}
                          value={formData.etc_mfg}
                        />
                      </div>
                    </div>
                  </>
                )}
                {/* PCSPEC FORM 태그 */}
                {selectedType === '데스크탑' && (
                  <>
                    <div className="row mb-3">
                      <label
                        for="inputNumber"
                        className="col-sm-2 col-form-label"
                      >
                        CPU
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="CPU"
                          name="spec_cpu"
                          onChange={handleChange}
                          value={formData.spec_cpu}
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        for="inputNumber"
                        className="col-sm-2 col-form-label"
                      >
                        RAM
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="RAM"
                          name="spec_ram"
                          onChange={handleChange}
                          value={formData.spec_ram}
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        for="inputNumber"
                        className="col-sm-2 col-form-label"
                      >
                        MainBoard
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="MainBoard"
                          name="spec_mainboard"
                          onChange={handleChange}
                          value={formData.spec_mainboard}
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        for="inputNumber"
                        className="col-sm-2 col-form-label"
                      >
                        Power
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Power"
                          name="spec_power"
                          onChange={handleChange}
                          value={formData.spec_power}
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        for="inputNumber"
                        className="col-sm-2 col-form-label"
                      >
                        GPU
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="GPU"
                          name="spec_gpu"
                          onChange={handleChange}
                          value={formData.spec_gpu}
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        for="inputNumber"
                        className="col-sm-2 col-form-label"
                      >
                        HDD
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="HDD"
                          name="spec_hdd"
                          onChange={handleChange}
                          value={formData.spec_hdd}
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        for="inputNumber"
                        className="col-sm-2 col-form-label"
                      >
                        SSD
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="SSD"
                          name="spec_ssd"
                          onChange={handleChange}
                          value={formData.spec_ssd}
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        for="inputNumber"
                        className="col-sm-2 col-form-label"
                      >
                        SSD
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="OPS"
                          name="spec_ops"
                          onChange={handleChange}
                          value={formData.spec_ops}
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        for="inputNumber"
                        className="col-sm-2 col-form-label"
                      >
                        제조사
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="MFG"
                          name="spec_mfg"
                          onChange={handleChange}
                          value={formData.spec_mfg}
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        for="inputNumber"
                        className="col-sm-2 col-form-label"
                      >
                        시리얼번호
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="SERIEL"
                          name="spec_seriel"
                          onChange={handleChange}
                          value={formData.spec_seriel}
                        />
                      </div>
                    </div>
                  </>
                )}
                {/* 서버 */}
                {selectedType === '서버' && (
                  <>
                    <div className="row mb-3">
                      <label
                        for="inputNumber"
                        className="col-sm-2 col-form-label"
                      >
                        제조사
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="MFG"
                          name="server_mfg"
                          onChange={handleChange}
                          value={formData.server_mfg}
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        for="inputNumber"
                        className="col-sm-2 col-form-label"
                      >
                        시리얼번호
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="server_capa"
                          name="server_capa"
                          onChange={handleChange}
                          value={formData.server_capa}
                        />
                      </div>
                    </div>
                  </>
                )}

                <div className="row mb-3">
                  <div className="col-sm-10">
                    <button type="submit" className="btn btn-primary">
                      등록하기
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <section className="section">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
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
                    {/* 검색바 */}
                    <div className="datatable-search">
                      <input
                        className="datatable-input"
                        placeholder="검색"
                        type="search"
                        title="Search within table"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        onKeyPress={handleSearchKeyPress}
                      />
                    </div>
                  </div>
                </div>
                <h5 className="card-title">재고 관리</h5>

                {/* <!-- 데이터 테이블 --> */}
                <table className="table datatable">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">ASSETS_NUM(나중에 안보이게)</th>
                      <th scope="col">CATEGORY_NUM(나중에안보이게)</th>
                      <th scope="col">자산 이름</th>
                      <th scope="col">자산 상태</th>
                      <th scope="col">SPEC_NUM(나중에안보이게)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData
                      .slice(
                        (currentPage - 1) * itemsPerPage,
                        currentPage * itemsPerPage
                      )
                      .map((item, index) => (
                        <tr key={item.id}>
                          <th scope="row">
                            {(currentPage - 1) * itemsPerPage + index + 1}
                          </th>
                          <td>{item.assets_num}</td>
                          <td>{item.category_num}</td>
                          <td>
                            <Link
                              to="#"
                              style={{ color: 'black' }}
                              onClick={() => handleModal(item)}
                              data-bs-toggle="modal"
                              data-bs-target="#modalDialogScrollable"
                            >
                              {item.assets_name}
                            </Link>
                          </td>
                          <td>{item.assets_status}</td>
                          <td>{item.spec_num}</td>
                        </tr>
                      ))}
                  </tbody>
                  {/* 상세정보 모달창 */}
                  <div
                    className="modal fade"
                    id="modalDialogScrollable"
                    tabIndex="-1"
                  >
                    <div className="modal-dialog modal-dialog-scrollable">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title">상세내용</h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          {/* 데스크탑 노트북 상세내용 */}
                          {selectedItem && selectedItem.spec_cpu ? (
                            <>
                              <span>CPU:</span>
                              <input
                                className="modal-body"
                                style={{
                                  border: '0 solid black',
                                  outline: 'none',
                                }}
                                value={selectedItem.spec_cpu}
                                readOnly
                              />
                              <br />
                            </>
                          ) : null}
                          {selectedItem && selectedItem.spec_ram ? (
                            <>
                              <span>RAM:</span>
                              <input
                                className="modal-body"
                                style={{
                                  border: '0 solid black',
                                  outline: 'none',
                                }}
                                value={selectedItem.spec_ram}
                                readOnly
                              />
                              <br />
                            </>
                          ) : null}
                          {selectedItem && selectedItem.spec_mainboard ? (
                            <>
                              <span>MainBoard:</span>
                              <input
                                className="modal-body"
                                style={{
                                  border: '0 solid black',
                                  outline: 'none',
                                }}
                                value={selectedItem.spec_mainboard}
                                readOnly
                              />
                              <br />
                            </>
                          ) : null}
                          {selectedItem && selectedItem.spec_power ? (
                            <>
                              <span>Power:</span>
                              <input
                                className="modal-body"
                                style={{
                                  border: '0 solid black',
                                  outline: 'none',
                                }}
                                value={selectedItem.spec_power}
                                readOnly
                              />
                              <br />
                            </>
                          ) : null}
                          {selectedItem && selectedItem.spec_gpu ? (
                            <>
                              <span>GPU:</span>
                              <input
                                className="modal-body"
                                style={{
                                  border: '0 solid black',
                                  outline: 'none',
                                }}
                                value={selectedItem.spec_gpu}
                                readOnly
                              />
                              <br />
                            </>
                          ) : null}
                          {selectedItem && selectedItem.spec_hdd ? (
                            <>
                              <span>HDD:</span>
                              <input
                                className="modal-body"
                                style={{
                                  border: '0 solid black',
                                  outline: 'none',
                                }}
                                value={selectedItem.spec_hdd}
                                readOnly
                              />
                              <br />
                            </>
                          ) : null}
                          {selectedItem && selectedItem.spec_ssd ? (
                            <>
                              <span>SSD:</span>
                              <input
                                className="modal-body"
                                style={{
                                  border: '0 solid black',
                                  outline: 'none',
                                }}
                                value={selectedItem.spec_ssd}
                                readOnly
                              />
                              <br />
                            </>
                          ) : null}
                          {selectedItem && selectedItem.spec_ops ? (
                            <>
                              <span>운영체제:</span>
                              <input
                                className="modal-body"
                                style={{
                                  border: '0 solid black',
                                  outline: 'none',
                                }}
                                value={selectedItem.spec_ops}
                                readOnly
                              />
                              <br />
                            </>
                          ) : null}
                          {selectedItem && selectedItem.spec_mfg ? (
                            <>
                              <span>제조사:</span>
                              <input
                                className="modal-body"
                                style={{
                                  border: '0 solid black',
                                  outline: 'none',
                                }}
                                value={selectedItem.spec_mfg}
                                readOnly
                              />
                              <br />
                            </>
                          ) : null}
                          {selectedItem && selectedItem.spec_seriel ? (
                            <>
                              <span>시리얼 번호:</span>
                              <input
                                className="modal-body"
                                style={{
                                  border: '0 solid black',
                                  outline: 'none',
                                }}
                                value={selectedItem.spec_seriel}
                                readOnly
                              />
                              <br />
                            </>
                          ) : null}
                          {selectedItem && selectedItem.spec_warranty ? (
                            <>
                              <span>AS 보증기간:</span>
                              <input
                                className="modal-body"
                                style={{
                                  border: '0 solid black',
                                  outline: 'none',
                                }}
                                value={selectedItem.spec_warranty}
                                readOnly
                              />
                              <br />
                            </>
                          ) : null}
                          {/* 소프트웨어 */}
                          {selectedItem && selectedItem.sw_mfg ? (
                            <>
                              <span>제조사:</span>
                              <input
                                className="modal-body"
                                style={{
                                  border: '0 solid black',
                                  outline: 'none',
                                }}
                                value={selectedItem.sw_mfg}
                                readOnly
                              />
                              <br />
                            </>
                          ) : null}
                          {selectedItem && selectedItem.sw_spec_seriel ? (
                            <>
                              <span>시리얼 번호:</span>
                              <input
                                className="modal-body"
                                style={{
                                  border: '0 solid black',
                                  outline: 'none',
                                }}
                                value={selectedItem.sw_spec_seriel}
                                readOnly
                              />
                              <br />
                            </>
                          ) : null}
                          {selectedItem && selectedItem.sw_spec_warranty ? (
                            <>
                              <span>AS 보증기간:</span>
                              <input
                                className="modal-body"
                                style={{
                                  border: '0 solid black',
                                  outline: 'none',
                                }}
                                value={selectedItem.sw_spec_warranty}
                                readOnly
                              />
                              <br />
                            </>
                          ) : null}
                          {/* 기타 */}
                          {selectedItem && selectedItem.etc_mfg ? (
                            <>
                              <span>제조사:</span>
                              <input
                                className="modal-body"
                                style={{
                                  border: '0 solid black',
                                  outline: 'none',
                                }}
                                value={selectedItem.etc_mfg}
                                readOnly
                              />
                              <br />
                            </>
                          ) : null}
                          {selectedItem && selectedItem.etc_spec_warranty ? (
                            <>
                              <span>AS 보증기간:</span>
                              <input
                                className="modal-body"
                                style={{
                                  border: '0 solid black',
                                  outline: 'none',
                                }}
                                value={selectedItem.etc_spec_warranty}
                                readOnly
                              />
                              <br />
                            </>
                          ) : null}
                          {/* 서버 상새내용 */}
                          {selectedItem && selectedItem.server_mfg ? (
                            <>
                              <span>제조사:</span>
                              <input
                                className="modal-body"
                                style={{
                                  border: '0 solid black',
                                  outline: 'none',
                                }}
                                value={selectedItem.server_mfg}
                                readOnly
                              />
                              <br />
                            </>
                          ) : null}
                          {selectedItem && selectedItem.server_spec_warranty ? (
                            <>
                              <span>AS보증기간:</span>
                              <input
                                className="modal-body"
                                style={{
                                  border: '0 solid black',
                                  outline: 'none',
                                }}
                                value={selectedItem.server_spec_warranty}
                                readOnly
                              />
                              <br />
                            </>
                          ) : null}
                          {selectedItem && selectedItem.server_capa ? (
                            <>
                              <span>서버 용량:</span>
                              <input
                                className="modal-body"
                                style={{
                                  border: '0 solid black',
                                  outline: 'none',
                                }}
                                value={selectedItem.server_capa}
                                readOnly
                              />
                              <br />
                            </>
                          ) : null}
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                          <button type="button" className="btn btn-primary">
                            Save changes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </table>
                {/* <!-- End Table with stripped rows --> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 페이징네이션 */}
      {/* <div>
        <nav aria-label="Page navigation example">
          <ul className="pagination" style={{ justifyContent: 'center' }}>
            {currentPage !== 1 && (
              <li className="page-item">
                <button
                  onClick={() => handleClick(1)}
                  disabled={currentPage === 1}
                  to="/assets/adminassets"
                  className="page-link"
                  aria-label="Previous"
                >
                  <span aria-hidden="true">&laquo;</span>
                </button>
              </li>
            )}
            {currentPage - 10 >= 1 && (
              <li className="page-item">
                <button
                  onClick={() => handleClick(currentPage - 10)}
                  disabled={currentPage < 11}
                  to="/assets/adminassets"
                  className="page-link"
                  aria-label="Previous"
                >
                  <span aria-hidden="true">&lt;</span>
                </button>
              </li>
            )}
            {[...Array(endPage - startPage)].map((_, i) => (
              <li className="page-item" key={i}>
                <button
                  className="page-link"
                  onClick={() => handleClick(startPage + i + 1)}
                  style={
                    startPage + i + 1 === currentPage
                      ? { fontWeight: 'bold' }
                      : null
                  }
                >
                  <span aria-hidden="true">{startPage + i + 1}</span>
                </button>
              </li>
            ))}
            {currentPage + 10 <= totalPages && (
              <li className="page-item">
                <button
                  onClick={() =>
                    handleClick(Math.min(currentPage + 10, totalPages))
                  }
                  className="page-link"
                  aria-label="Next"
                >
                  <span aria-hidden="true">&gt;</span>
                </button>
              </li>
            )}
            {currentPage !== totalPages && (
              <li className="page-item">
                <button
                  onClick={() => handleClick(totalPages)}
                  className="page-link"
                  aria-label="Next"
                >
                  <span aria-hidden="true">&raquo;</span>
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div> */}
      <Pagenation
        currentPage={currentPage}
        totalPages={totalPages}
        startPage={startPage}
        endPage={endPage}
        handleClick={handleClick}
      />
    </main> /* <!-- End #main --> */
  );
}

export default ITAssets;
