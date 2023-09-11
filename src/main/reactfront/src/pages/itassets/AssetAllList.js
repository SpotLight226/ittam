import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AssetAllListTable from './AssetAllListTable';
import {Link, useParams, useLocation} from 'react-router-dom';

const AssetAllList = () => {
  const [AssetRequest, setAssetRequest] = useState([]); // 전체 자산 리스트
  const [inputText, setInputText] = useState('');

  const url = useLocation(); // 현재 url 가져오기 뒤에 파라미터는 짤라서 쓰시면 될 것 같아요 !
  console.log(url.pathname);

  const [inputInnerData, setInputInnerDate] = useState({ // 검색 시 list 관리를 위한 state
    assets_name : "",
    assets_status : "",
    spec_mfg : "",
    spec_seriel : "",
    spec_warranty : "",
    category_name : "",
    spec_num : "",
    assets_num : "",
  });

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
    })
        .then((response) => {
          setInputInnerDate(response.data);
        })
        .catch((error) => {
          alert('검색에 실패하였습니다.');
        });
  };

  // 자산 목록 리스트
  useEffect(() => {

    if(inputInnerData.assets_name === "" || inputInnerData.length === 0){
      axios.get('http://localhost:9191/AssetRequest/AssetRequestList')
          .then((res) => setAssetRequest(res.data));
    }else{
      setAssetRequest(inputInnerData);
    }
  }, [inputInnerData]);

  // 구매버튼 스타일
  const buttonStyle = {
    marginLeft: '10px',
    marginRight: '40px',
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
                            <select className="datatable-selector">
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
                      {AssetRequest.map((i, index) => (
                          <AssetAllListTable key={index} {...i} index={index} />
                      ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
  );
};

export default AssetAllList;
