
import { Link } from 'react-router-dom';
import "../../styles/Style.css";
import { useEffect, useState } from 'react';
import axios from 'axios';
import DepartChart from '../../component/Chart/DepartChart';
import AssetStickChart from '../../component/Chart/AssetStickChart';
import CPUChart from '../../component/Chart/CPUChart';
import GPUChart from '../../component/Chart/GPUChart';
import MFGChart from '../../component/Chart/MFGChart';

function Reports() {

  const [cardNum, setCardNum] = useState({});
  const [departNum, setDepartNum] = useState();
  const [stickNum, setStickNum] = useState();
  const [CPUNum, setCPUNum] = useState();
  const [GPUNum, setGPUNum] = useState();
  const [MFGNum, setMFGNum] = useState();



  const getCardNum = () => {
    axios.get("/reports/getCardNum")
        .then(response => { setCardNum(response.data) })
        .catch(error => console.log(error))
  }
  const getDepartNum = () => {
    axios.get("/reports/getDepartNum")
        .then(response => { setDepartNum(response.data) })
        .catch(error => console.log(error))
  }
  const getAssetStickNum = () => {
    axios.get("/reports/getAssetStickNum")
        .then(response => { setStickNum(response.data) })
        .catch(error => console.log(error))
  }
  const getCPUNum = () => {
    axios.get("/reports/getCPUNum")
        .then(response => { setCPUNum(response.data) })
        .catch(error => console.log(error))
  }
  const getGPUNum = () => {
    axios.get("/reports/getGPUNum")
        .then(response => { setGPUNum(response.data) })
        .catch(error => console.log(error))
  }
  const getMFGNum = () => {
    axios.get("/reports/getMFGNum")
        .then(response => { setMFGNum(response.data) })
        .catch(error => console.log(error))
  }


  useEffect(() => {
    getCardNum();
    getDepartNum();
    getAssetStickNum();
    getCPUNum();
    getGPUNum();
  }, [])



  return (
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>리포트</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item active"><Link to="/admin/adminMain">Report</Link></li>
            </ol>
          </nav>
        </div>

        <section className="section dashboard">
          <div className="row">

            {/* <!-- Left side columns --> */}
            <div className="col-lg-12">
              <div className="row">

                {/*  <!-- Sales Card --> */}
                <div className="col-xxl-3 col-md-3">
                  <div className="card info-card sales-card" style={{ backgroundColor: 'rgb(219 228 245)'}}>



                    <div className="card-body">
                      <h5 className="card-title" style={{ fontWeight: "800", fontSize: '20px' }}>총 사원수</h5>

                      <div className="d-flex align-items-center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {/* <div className="card-icon rounded-circle d-flex align-items-center justify-content-center AdminMain-icon">
                          <i className="bi bi-box-arrow-in-up-right"></i>
                        </div> */}
                        <div className="ps-3">
                          <h6 style={{ fontSize: '50px' }}>{cardNum.allUsersNum}</h6>
                        </div>
                      </div>
                    </div>


                  </div>
                </div>{/* <!-- End Sales Card --> */}
                {/*  <!-- Sales Card --> */}
                <div className="col-xxl-3 col-md-3">
                  <div className="card info-card sales-card" style={{ backgroundColor: 'rgb(219 228 245)' }}>



                    <div className="card-body">
                      <h5 className="card-title" style={{ fontWeight: "800", fontSize: '20px' }}>총 자산수</h5>

                      <div className="d-flex align-items-center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {/* <div className="card-icon rounded-circle d-flex align-items-center justify-content-center AdminMain-icon">
                          <i className="bi bi-box-arrow-in-up-right"></i>
                        </div> */}
                        <div className="ps-3">
                          <h6 style={{ fontSize: '50px' }}>{cardNum.allAssetsNum}</h6>
                        </div>
                      </div>
                    </div>


                  </div>
                </div>{/* <!-- End Sales Card --> */}
                {/*  <!-- Sales Card --> */}
                <div className="col-xxl-3 col-md-3">
                  <div className="card info-card sales-card" style={{ backgroundColor: 'rgb(219 228 245)' }}>



                    <div className="card-body">
                      <h5 className="card-title" style={{ fontWeight: "800", fontSize: '20px' }}>자산사용률</h5>

                      <div className="d-flex align-items-center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                        <div className="ps-3">
                          {cardNum != undefined ? <h6 style={{ fontSize: '50px' }}>{Math.round((cardNum.usingAssetsNum / cardNum.allAssetsNum) * 100)}%</h6> :
                              <div className="d-flex justify-content-center">
                                <div className="spinner-border text-primary" role="status">
                                  <span className="visually-hidden">Loading...</span>
                                </div>
                              </div>}
                        </div>
                      </div>

                    </div>


                  </div>
                </div>{/* <!-- End Sales Card --> */}
                {/*  <!-- Sales Card --> */}
                <div className="col-xxl-3 col-md-3">
                  <div className="card info-card sales-card" style={{ backgroundColor: 'rgb(219 228 245)' }}>



                    <div className="card-body">
                      <h5 className="card-title" style={{ fontWeight: "800", fontSize: '20px' }}>이번 달 자산 구매비</h5>

                      <div className="d-flex align-items-center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {/* <div className="card-icon rounded-circle d-flex align-items-center justify-content-center AdminMain-icon">
                          <i className="bi bi-box-arrow-in-up-right"></i>
                        </div> */}
                        <div className="ps-3">
                          <h6 style={{ fontSize: '50px' }}>256</h6>
                        </div>
                      </div>
                    </div>


                  </div>
                </div>{/* <!-- End Sales Card --> */}


                <section className="section">
                  <div className="row">
                    <div className="col-lg-4">

                      <div className="card" >
                        <div className="card-body" style={{ backgroundColor: 'rgb(219 228 245)', borderRadius: '8px' }}>
                          <h5 className="card-title" style={{ fontWeight: "800" }}>부서별 사원 비율</h5>
                          {departNum !== undefined ? <DepartChart departNum={departNum} /> :
                              <div className="d-flex justify-content-center">
                                <div className="spinner-border text-primary" role="status">
                                  <span className="visually-hidden">Loading...</span>
                                </div>
                              </div>}

                        </div>
                      </div>

                    </div>

                    <div className="col-lg-8">

                      <div className="card" >
                        <div className="card-body" style={{ backgroundColor: 'rgb(219 228 245)', borderRadius: '8px'  }}>
                          <h5 className="card-title" style={{ fontWeight: "800" }}>자산 현황</h5>
                          {stickNum != undefined ? <AssetStickChart stickNum={stickNum} /> :
                              <div className="d-flex justify-content-center">
                                <div className="spinner-border text-primary" role="status">
                                  <span className="visually-hidden">Loading...</span>
                                </div>
                              </div>}

                        </div>
                      </div>

                    </div>


                    <div className="col-lg-4">

                      <div className="card" >
                        <div className="card-body" style={{ backgroundColor: 'rgb(219 228 245)', borderRadius: '8px'  }}>
                          <h5 className="card-title" style={{ fontWeight: "800" }}>CPU</h5>
                          {CPUNum != undefined ? <CPUChart CPUNum={CPUNum} /> :
                              <div className="d-flex justify-content-center">
                                <div className="spinner-border text-primary" role="status">
                                  <span className="visually-hidden">Loading...</span>
                                </div>
                              </div>}

                        </div>
                      </div>

                    </div>

                    <div className="col-lg-4">

                      <div className="card" >
                        <div className="card-body" style={{ backgroundColor: 'rgb(219 228 245)', borderRadius: '8px'  }}>
                          <h5 className="card-title" style={{ fontWeight: "800" }}>GPU</h5>
                          {GPUNum != undefined ? <GPUChart GPUNum={GPUNum} /> :
                              <div className="d-flex justify-content-center">
                                <div className="spinner-border text-primary" role="status">
                                  <span className="visually-hidden">Loading...</span>
                                </div>
                              </div>}

                        </div>
                      </div>

                    </div>

                    <div className="col-lg-4">

                      <div className="card" >
                        <div className="card-body" style={{ backgroundColor: 'rgb(219 228 245)', borderRadius: '8px' }}>
                          <h5 className="card-title" style={{ fontWeight: "800" }}>제조사</h5>
                          <MFGChart />

                        </div>
                      </div>

                    </div>



                  </div>
                </section>














              </div>
            </div>

          </div>
        </section>










      </main>
  );
}

export default Reports;