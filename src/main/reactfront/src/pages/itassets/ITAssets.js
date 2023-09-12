import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import React from 'react';
import axios from 'axios';
import Pagenation from '../../component/Pagenation';
import ITAssetsInsert from './ITAssetsInsert';
import ITAssetsInfo from './ITAssetsInfo';

function ITAssets() {
  const [selectedType, setSelectedType] = useState('선택하지않음');
  /* 폼데이터 초기화 */
  const resetFormdata = {
    sw_mfg: '',
    sw_spec_seriel: '',
    sw_spec_warranty: '',
    sw_purchase_date: '',
    sw_price: '',
    /* etcspec */
    etc_mfg: '',
    etc_spec_warranty: '',
    etc_purchase_date: '',
    etc_price: '',
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
    spec_purchase_date: '',
    /* serverspec */
    server_mfg: '',
    server_spec_warranty: '',
    server_capa: '',
    server_price: '',
    server_purchase_date: '',
    server_interface: '',
    server_average_life: '',
    server_rpm: '',
    server_datarecovery_life: '',
  };

  /* ITAssets테이블 데이터가져오기 */
  const [data, setData] = useState([]);
  const itassetList = () => {
    axios
      .get('/assets/getITList')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    itassetList();
  }, []);
  /* 카테고리테이블 데이터 가져오기 */
  const [category, setCategory] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedParent, setSelectedParent] = useState([]);
  const [selectedChild, setSelectedChild] = useState(null);
  useEffect(() => {
    axios
      .get('/categories/categories')
      .then((response) => {
        setCategories(response.data);
        const parents = response.data.filter((category) => !category.parent_id);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const parentCategories = categories.filter((category) => !category.parent_id);
  const childCategories = categories.filter(
    (category) => category.parent_id === selectedParent
  );
  /* insert모달창에 비동기데이터 보내기 */
  const [selectCategory, setSelectCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };
  const sendModal = (category) => {
    setSelectCategory(category);
    closeModal();
  };

  const handleParentChange = (e) => {
    setSelectedParent(e.target.value);
    setSelectedType('선택하지않음');
    setFormData((prevData) => ({
      ...prevData,
      assets_tag: e.target.value,
    }));
    console.log(e.target.value);
    setFormData({
      /* swspec */
      ...resetFormdata,
      assets_tag: e.target.value,
    });
  };

  const handleChildChange = (e) => {
    const selectedValue = parseInt(e.target.value);
    setSelectedChild(selectedValue);
  };

  /* 체크박스 */
  const [statusFilters, setStatusFilters] = useState({
    사용가능: false,
    사용중: false,
  });

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setStatusFilters((prev) => ({
      ...prev,
      [name]: checked,
    }));
    setCurrentPage(1);
  };

  /* 검색기능 */
  const [searchTerm, setSearchTerm] = useState('');
  const filteredData = data.filter((item) => {
    const matchesSearchTerm =
      item.assets_name.includes(searchTerm) ||
      item.assets_status.includes(searchTerm);

    /* 체크박스  */
    const statusList = ['사용가능', '사용중'];
    const nameList = ['노트북', '데스크탑'];

    const statusFilter =
      statusList.some((status) =>
        statusFilters[status] ? item.assets_status === status : false
      ) || !statusList.some((status) => statusFilters[status]);

    const nameFilter =
      nameList.some((name) =>
        statusFilters[name] ? item.assets_name === name : false
      ) || !nameList.some((name) => statusFilters[name]);

    return matchesSearchTerm && statusFilter && nameFilter;
  });

  const [searchInput, setSearchInput] = useState('');

  const handleSearchKeyPress = (event) => {
    if (event.key === 'Enter') {
      setSearchTerm(searchInput);
    }
    setCurrentPage(1);
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
    ...resetFormdata,
    assets_tag: '',
    assets_name: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/assets/specInsert', formData);
      if (response.data) {
        alert('등록완료');
        setFormData({
          // 폼 데이터 초기화
          ...resetFormdata,
          assets_tag: '',
          assets_name: selectedType,
        });
      }

      /* const scrollingModal = document.getElementById('scrollingModal');
      scrollingModal.style.display = 'none';
      scrollingModal.classList.toggle('show');
      document.body.style = 'none';
      document.body.classList.remove('modal-open');
      scrollingModal.removeAttribute('aria-modal');
      scrollingModal.setAttribute('aria-hidden', 'true');
      let backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) {
        backdrop.remove();
      } */
      closeModal();
      itassetList();
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
      <div className="text-end" style={{ marginBottom: '10px' }}>
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#scrollingModal"
          onClick={() => sendModal(category)}
        >
          등록하기
        </button>
      </div>
      {/* 등록하기 모달 정보 */}
      <div className="modal fade" id="scrollingModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content" style={{ width: '700px' }}>
            <ITAssetsInsert
              handleSubmit={handleSubmit}
              handleSelectChange={handleSelectChange}
              handleChange={handleChange}
              selectedType={selectedType}
              formData={formData}
              handleChildChange={handleChildChange}
              parentCategories={parentCategories}
              childCategories={childCategories}
              selectedParent={selectedParent}
              handleParentChange={handleParentChange}
              selectedChild={selectedChild}
              categories={categories}
            />
          </div>
        </div>
      </div>
      <div>
        <input
          type="checkbox"
          name="사용가능"
          onChange={handleCheckboxChange}
          value="사용가능"
        />
        사용가능
        <input
          type="checkbox"
          name="사용중"
          onChange={handleCheckboxChange}
          value="사용중"
        />
        사용중
        {/* <input
                      type="checkbox"
                      name="노트북"
                      onChange={handleCheckboxChange}
                      value="노트북"
                    />
                    노트북
                    <input
                      type="checkbox"
                      name="데스크탑"
                      onChange={handleCheckboxChange}
                      value="데스크탑"
                    />
                    데스크탑 */}
        {categories
          .filter((cat) => cat.category_parent_num !== null)
          .map((cat) => (
            <>
              <input
                type="checkbox"
                key={cat.category_num}
                value={cat.category_name}
                name={cat.category_name}
                onChange={handleCheckboxChange}
                style={{ marginLeft: '5px' }}
              />

              {cat.category_name}
            </>
          ))}
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
                          style={{ marginRight: '10px' }}
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
                      <th scope="col">
                        <Link to="#" className="datatable-sorter">
                          #
                        </Link>
                      </th>
                      <th scope="col">
                        <Link to="#" className="datatable-sorter">
                          ASSETS_NUM(나중에 안보이게)
                        </Link>
                      </th>
                      <th scope="col">
                        <Link to="#" className="datatable-sorter">
                          CATEGORY_NUM(나중에안보이게)
                        </Link>
                      </th>
                      <th scope="col">
                        <Link to="#" className="datatable-sorter">
                          자산 이름
                        </Link>
                      </th>
                      <th scope="col">
                        <Link to="#" className="datatable-sorter">
                          자산 상태
                        </Link>
                      </th>
                      <th scope="col">
                        <Link to="#" className="datatable-sorter">
                          사용중인 사원번호
                        </Link>
                      </th>
                      <th scope="col">
                        <Link href="#" className="datatable-sorter">
                          spec_num(나중에안보이게)
                        </Link>
                      </th>
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
                              {item.assets_name + ' ' + item.assets_detail_name}
                            </Link>
                          </td>
                          <td>{item.assets_status}</td>
                          <td>{item.user_id}</td>
                          <td>{item.spec_num}</td>
                          <td>
                            <button
                              className="btn btn-primary"
                              data-bs-toggle="modal"
                              data-bs-target="#scrollingModal"
                            >
                              수정하기
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                  {/* 상세정보 모달창 */}
                  <div
                    className="modal fade"
                    id="modalDialogScrollable"
                    tabIndex="-1"
                  >
                    <ITAssetsInfo selectedItem={selectedItem} />
                  </div>
                </table>
                {/* <!-- End Table with stripped rows --> */}
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
    </main> /* <!-- End #main --> */
  );
}

export default ITAssets;
