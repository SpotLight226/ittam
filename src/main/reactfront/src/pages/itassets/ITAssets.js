import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import React from 'react';
import axios from 'axios';
import Pagenation from '../../component/Pagenation';
import ITAssetsInsert from './ITAssetsInsert';
import ITAssetsInfo from './ITAssetsInfo';
import ITAssetsModify from './ITAssetsModify';
import PurchaseApproval from './PurchaseApproval';


function ITAssets() {
  // const contextValues = useContext(userInfoContext); // 항상 가장 위에서 선언해야 사용 가능
  let username = localStorage.getItem('username');
  const token = localStorage.getItem('token');

  // const { userId, role } = contextValues || {}; // 들어온 값 없으면 공백으로
  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   let payload = token.substring(
  //     token.indexOf('.') + 1,
  //     token.lastIndexOf('.')
  //   );
  //   let dec = JSON.parse(base64.decode(payload));
  //   let role = dec.role;
  //   if (role !== 'ROLE_ADMIN' && role !== 'ROLE_HIGH_ADMIN') {
  //     alert('접근 권한이 없습니다.');
  //     window.history.back();
  //   }
  // }, []);

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
    /* 승인요청 */
    username: '',
    appro_title: '',
    appro_comment: '',
  };

  /* ITAssets테이블 데이터가져오기 */
  const [data, setData] = useState([]);
  const itassetList = () => {
    axios
      .get('/assets/getITList', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      })
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
  const [selectedParent, setSelectedParent] = useState('선택하지않음');
  const [selectedChild, setSelectedChild] = useState(null);
  useEffect(() => {
    axios
      .get('/categories/categories', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      })
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
    수리: false,
    폐기: false,
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
    const matchesSearchTerm = item.assets_name.includes(searchTerm);

    /* 체크박스  */
    const statusList = ['사용가능', '사용중', '수리', '폐기'];

    // 체크된 상태인 것이 있는지 확인
    const isAnyFilterChecked = statusList.some(
      (status) => statusFilters[status]
    );

    const statusFilter = isAnyFilterChecked
      ? statusList.some(
          (status) => statusFilters[status] && item.assets_status === status
        )
      : true;

    return matchesSearchTerm && statusFilter;
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
      const response = await axios.post('/assets/specInsert', formData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });
      if (response.data) {
        setFormData({
          // 폼 데이터 초기화
          ...resetFormdata,
          assets_tag: '',
          assets_name: selectedType,
        });
      }
      closeModal();
      itassetList();
      setIsModalOpen1(false);
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

  /* 자산 상태 업데이트 */
  const [status, setStatus] = useState(null);
  const [formStatus, setFormStatus] = useState({
    assets_status: '',
    assets_num: '',
    username: '',
    appro_title: '',
    appro_comment: '',
    category_num: '',
    assets_name: '',
    assets_detail_name: '',
    spec_num: '',
  });
  const appro = (e) => {
    const { name, value } = e.target;
    setFormStatus((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [assetstatus, setAssetstatus] = useState(
    selectedItem ? selectedItem.assets_status : ''
  );
  const handleStatus = (e) => {
    const { value } = e.target;
    setAssetstatus(value); // 선택된 옵션 값을 status 상태에 설정합니다.
  };
  useEffect(() => {
    if (selectedItem) {
      setAssetstatus(selectedItem.assets_status);
    }
  }, [selectedItem]);

  const updateSubmit = async (e) => {
    e.preventDefault();

    const updatedStatus = {
      assets_status: assetstatus,
      assets_num: selectedItem ? selectedItem.assets_num : '',
      username: username || '',
      appro_title: formStatus.appro_title,
      appro_comment: formStatus.appro_comment,
      category_num: selectedItem ? selectedItem.category_num : '',
      assets_name: selectedItem ? selectedItem.assets_name : '',
      assets_detail_name: selectedItem ? selectedItem.assets_detail_name : '',
      spec_num: selectedItem ? selectedItem.spec_num : '',
    };
    try {
      const update = await axios.post('/stock/statusUpdate', updatedStatus, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });
      if (update.data) {
        setFormStatus({
          assets_status: status,
          assets_num: '',
          username: '',
          appro_title: '',
          appro_comment: '',
          category_num: '',
          assets_name: '',
          assets_detail_name: '',
          spec_num: '',
        });
      }
      itassetList();
    } catch (error) {
      console.log('에러남', error);
    }
  };
  /* 모달창 닫을때 리셋 */
  // const closeReset = () => {
  //   setSelectedType('선택하지않음');
  //   setSelectedParent('선택하지않음');
  // };
  const statusReset = () => {
    setAssetstatus(selectedItem ? selectedItem.assets_status : '');
    setFormStatus({
      appro_title: '',
      appro_comment: '',
    });
  };

  const approveReset = () => {
    setSelectedType('선택하지않음');
    setSelectedParent('선택하지않음');
    setFormapproval({
      appro_title: '',
      appro_comment: '',
    });
  };
  /* 최종구매승인개수 */
  const [count, setCount] = useState(0);
  const [itcount, setItcount] = useState(0);
  useEffect(() => {
    axios
      .get('/assets/yncount', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      })
      .then((response) => {
        setCount(response.data);
      });
  }, []);
  useEffect(() => {
    axios
      .get('/assets/itcount', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      })
      .then((response) => {
        setItcount(response.data);
      });
  }, []);

  const [isModalOpen1, setIsModalOpen1] = useState(false);
  function handleButtonClick(category) {
    if (count > itcount) {
      // 모달창 열기
      setIsModalOpen1(true);
      sendModal(category);
    } else {
      alert('최종관리자에게 구매승인을 받으세요.');
      return;
    }
  }
  function modalClose() {
    setIsModalOpen1(false);
    setSelectedType('선택하지않음');
    setSelectedParent('선택하지않음');
  }
  /* 구매요청 */
  const [formapproval, setFormapproval] = useState({
    username: username || '',
    category_num: selectedType,
    appro_title: '',
    appro_comment: '',
  });
  const handleSelectChange1 = (e) => {
    setSelectedType(e.target.value);

    setFormapproval((prevData) => ({
      category_num: e.target.value,
      username: username || '',
      appro_title: '',
      appro_comment: '',
    }));
  };

  const handleData = (e) => {
    const { name, value } = e.target;
    setFormapproval((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const purchaseSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        '/stock/purchaseApproval',
        formapproval,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        }
      );
      if (response.data) {
        setFormapproval({
          username: '',
          category_num: '',
          appro_title: '',
          appro_comment: '',
        });
        setSelectedType('선택하지않음');
        setSelectedParent('선택하지않음');
      }
    } catch (error) {
      console.log(error);
    }
  };
  /* 날씨 변환 */
  function formatDate(dateString) {
    if (!dateString || isNaN(new Date(dateString).getTime())) {
      return ''; // 원하는 기본값으로 변경 가능
    }

    const dateObject = new Date(dateString);

    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const day = String(dateObject.getDate()).padStart(2, '0');

    return `${year}년 ${month}월 ${day}일 `;
  }

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>관리자 재고 관리</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">Tables</li>
            <li className="breadcrumb-item active">Data</li>
          </ol>
        </nav>
      </div>
      {/* <!-- End Page Title --> */}
      {/* 등록하기 모달창 */}

      {/* 등록하기 모달 정보 */}
      <div
        className={`modal fade ${isModalOpen1 ? 'show' : ''}`}
        tabIndex="-1"
        style={{ display: isModalOpen1 ? 'block' : 'none' }}
      >
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
              modalClose={modalClose}
            />
          </div>
        </div>
      </div>
      {/* 구매요청 */}
      <PurchaseApproval
        handleParentChange={handleParentChange}
        selectedParent={selectedParent}
        handleSelectChange={handleSelectChange}
        selectedType={selectedType}
        categories={categories}
        handleData={handleData}
        formapproval={formapproval}
        purchaseSubmit={purchaseSubmit}
        handleSelectChange1={handleSelectChange1}
        modalClose={modalClose}
      />
      <section className="section">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">재고 관리</h5>
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
                    <input
                      type="checkbox"
                      name="수리"
                      onChange={handleCheckboxChange}
                      value="수리"
                    />
                    수리
                    <input
                      type="checkbox"
                      name="폐기"
                      onChange={handleCheckboxChange}
                      value="폐기"
                    />
                    폐기
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
                      <button
                        type="button"
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#verticalycentered"
                        onClick={() => sendModal(category)}
                        style={{ marginLeft: '10px' }}
                      >
                        구매요청
                      </button>
                      {/* <div className="text-end" style={{ marginBottom: '10px' }}> */}
                      <button
                        type="button"
                        className="btn btn-primary"
                        // data-bs-toggle="modal"
                        // data-bs-target="#scrollingModal"
                        onClick={() => handleButtonClick(category)}
                        style={{ marginLeft: '10px' }}
                      >
                        등록하기
                      </button>
                      {/* </div> */}
                    </div>
                  </div>
                </div>
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
                        <Link to="#" className="datatable-sorter">
                          등록일
                        </Link>
                      </th>
                      <th scope="col">
                        <Link to="#" className="datatable-sorter">
                          대여일
                        </Link>
                      </th>

                      <th scope="col">
                        <Link to="#" className="datatable-sorter">
                          폐기/수리요청
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
                        <tr key={index}>
                          <th scope="row">
                            {(currentPage - 1) * itemsPerPage + index + 1}
                          </th>

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
                          <td>{item.username}</td>
                          <td>{formatDate(item.add_date)}</td>
                          <td>{formatDate(item.rent_date)}</td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-primary"
                              data-bs-toggle="modal"
                              data-bs-target="#basicModal"
                              onClick={() => handleModal(item)}
                            >
                              폐기/수리요청
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                {/* 수정하기 모달 */}
                <ITAssetsModify
                  selectedItem={selectedItem}
                  handleStatus={handleStatus}
                  updateSubmit={updateSubmit}
                  assetstatus={assetstatus}
                  statusReset={statusReset}
                  appro={appro}
                  formStatus={formStatus}
                />
                {/* 상세정보 모달창 */}
                <div
                  className="modal fade"
                  id="modalDialogScrollable"
                  tabIndex="-1"
                >
                  <ITAssetsInfo selectedItem={selectedItem} />
                </div>
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
