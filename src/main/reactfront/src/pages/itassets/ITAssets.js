import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import React from 'react';
import axios from 'axios';
import Pagenation from '../../component/Pagenation';
import ITAssetsInsert from './ITAssetsInsert';
import ITAssetsInfo from './ITAssetsInfo';
import ITAssetsModify from './ITAssetsModify';
import PurchaseApproval from './PurchaseApproval';
import { useContext } from 'react';
import { userInfoContext } from '../../App';
import base64 from 'base-64';
import ControlMenu from '../../component/ControlMenu';
import { ItassetsOptionList } from '../../constants/OptionList';
import ITAssetsItem from './ITAssetsItem';

function ITAssets() {
  const contextValues = useContext(userInfoContext); // 항상 가장 위에서 선언해야 사용 가능
  let username = localStorage.getItem('username');
  const token = localStorage.getItem('token');

  // const { userId, role } = contextValues || {}; // 들어온 값 없으면 공백으로
  useEffect(() => {
    const token = localStorage.getItem('token');
    let payload = token.substring(
      token.indexOf('.') + 1,
      token.lastIndexOf('.')
    );
    let dec = JSON.parse(base64.decode(payload));
    let role = dec.role;
    if (role !== 'ROLE_ADMIN' && role !== 'ROLE_HIGH_ADMIN') {
      alert('접근 권한이 없습니다.');
      window.history.back();
    }
  }, []);

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

  const [selectedStatus, setSelectedStatus] = useState('');
  const handleSelectChange2 = (e) => {
    setSelectedStatus(e.target.value);
  };

  /* 검색기능 */
  const [searchTerm, setSearchTerm] = useState('');
  const filteredData = data.filter((item) => {
    const matchesSearchTerm = item.assets_name.includes(searchTerm);

    const selectFilter = selectedStatus
      ? item.assets_status === selectedStatus
      : true;

    return matchesSearchTerm && selectFilter;
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
        setSelectedType('선택하지않음');
        setSelectedParent('선택하지않음');
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
  const getProcessedOption = () => {
    const copyOptionList = JSON.parse(JSON.stringify(ItassetsOptionList));

    return copyOptionList.filter(
      (it) =>
        it.value !== 'leaveDate' &&
        it.value !== 'detail' &&
        it.value !== 'process'
    );
  };

  // 1. 정렬을 위한 state
  const [sortType, setSortType] = useState('number'); // 정렬 컬럼 state
  const [checkClass, setCheckClass] = useState(false); // 내림, 오름 차순 선택 state

  // 2. 각 정렬 선택에 따른 데이터 정렬 함수
  const getProcessedList = () => {
    // 기존 리스트는 수정하지 않기 위해서 깊은 복사
    const copyList = JSON.parse(JSON.stringify(filteredData));

    // 각 선택된 링크에 대한 비교함수
    const compare = (a, b) => {
      // 선택된 컬럼에 대해서 case 별로 분류
      switch (sortType) {
        case 'assets_num': {
          // 번호 : 숫자 비교 => 문자열 일 수도 있으니 parseInt 로 감싼다
          if (checkClass) {
            return parseInt(b.assets_num) - parseInt(a.assets_num); // 오름차순
          } else {
            return parseInt(a.assets_num) - parseInt(b.assets_num); // 내림차순
          }
        }
        case 'assets_name': {
          // 이름 : 문자열을 사전 순으로 비교한다
          if (checkClass) {
            return b.assets_name.localeCompare(a.assets_name);
          } else {
            return a.assets_name.localeCompare(b.assets_name);
          }
        }
        case 'assets_status': {
          // 부서
          if (checkClass) {
            return b.assets_status.localeCompare(a.assets_status);
          } else {
            return a.assets_status.localeCompare(b.assets_status);
          }
        }
        case 'username': {
          // 두 문자열이 모두 존재하는지 확인
          const aExists = a.username !== null && a.username !== undefined;
          const bExists = b.username !== null && b.username !== undefined;

          // 둘 중 하나만 존재한다면, 그 존재하는 문자열을 먼저 오게 합니다.
          if (aExists && !bExists) return -1;
          if (!aExists && bExists) return 1;

          // 둘 다 존재하지 않는다면 같은 값으로 간주합니다.
          if (!aExists && !bExists) return 0;

          // 둘 다 존재할 때는 정상적인 비교를 수행합니다.
          if (checkClass) {
            return b.username.localeCompare(a.username);
          } else {
            return a.username.localeCompare(b.username);
          }
        }
        case 'add_date': {
          // 입사일 : Date 를 비교해야 하므로 state의 날짜 문자열을 가지고 와서 새로운 Date 객체에 넣고 getTime()을 사용해 ms로 변환 후 비교
          const a_add_date = new Date(a.add_date).getTime();
          const b_add_date = new Date(b.add_date).getTime();

          if (checkClass) {
            return b_add_date - a_add_date;
          } else {
            return a_add_date - b_add_date;
          }
        }
        case 'rent_date': {
          // 입사일 : Date 를 비교해야 하므로 state의 날짜 문자열을 가지고 와서 새로운 Date 객체에 넣고 getTime()을 사용해 ms로 변환 후 비교
          const a_rent_date = new Date(a.rent_date).getTime();
          const b_rent_date = new Date(b.rent_date).getTime();

          if (checkClass) {
            return b_rent_date - a_rent_date;
          } else {
            return a_rent_date - b_rent_date;
          }
        }
        default: {
          return null;
        }
      }
    };

    // 비교함수에따라 정렬
    const sortedList = copyList.sort(compare);
    return sortedList;
  };

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

                    <div className="datatable-dropdown assetsDrop">
                      <label htmlFor="">
                        <select
                          className="datatable-selector"
                          id="assets-select"
                          onChange={handleSelectChange2}
                        >
                          <option value="0">자산 상태</option>
                          <option value="사용가능">사용가능</option>
                          <option value="사용중">사용중</option>
                          <option value="폐기">폐기</option>
                          <option value="수리">수리</option>
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
                      {/* <th scope="col">
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
                      </th> */}
                      {getProcessedOption().map((it, idx) => (
                        <ControlMenu
                          key={idx}
                          {...it}
                          checkClass={checkClass}
                          sortType={sortType}
                          setSortType={setSortType}
                          setCheckClass={setCheckClass}
                        />
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {getProcessedList()
                      .slice(
                        (currentPage - 1) * itemsPerPage,
                        currentPage * itemsPerPage
                      )
                      .map((item, index) => (
                        /* <tr key={index}>
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
                        </tr> */
                        <ITAssetsItem
                          key={index}
                          isUser={true}
                          currentPage={currentPage}
                          itemsPerPage={itemsPerPage}
                          index={index}
                          handleModal={() => handleModal(item)}
                          assets_name={item.assets_name}
                          assets_detail_name={item.assets_detail_name}
                          assets_status={item.assets_status}
                          username={item.username}
                          add_date={item.add_date}
                          rent_date={item.rent_date}
                          formatDate={formatDate}
                        />
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
