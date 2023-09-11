import React, { Component, useState } from 'react';
import '../../App.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';



const PurchaseRequest = () => {

  // 구매버튼 스타일
  const accodianWidth = {
    width: '100px',
  };

  return (

      <div>

        <main id="main" className="main">
          <form>
            <div className="pagetitle">
              <h1>자산 구매 신청</h1>
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

            <div className="row mb-3">
              <label htmlFor="inputText" className="col-sm-2 col-form-label">카테고리 선택</label>
              <div className="col-sm-10">
                <div className="datatable-search">
                  <input
                      className="datatable-input form-control"
                      placeholder="검색"
                      type="search"
                      title="Search within table"
                  />
                </div>
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="inputText" className="col-sm-2 col-form-label">자산 선택</label>
              <div className="col-sm-10">
                <div className="datatable-search">
                  <input
                      className="datatable-input form-control"
                      placeholder="검색"
                      type="search"
                      title="Search within table"
                  />
                </div>
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="inputEmail" className="col-sm-2 col-form-label">신청자</label>
              <div className="col-sm-10">
                <input type="email" className="form-control"/>
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="inputDate" className="col-sm-2 col-form-label">신청날짜</label>
              <div className="col-sm-10">
                <input type="date" className="form-control"/>
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="inputPassword" className="col-sm-2 col-form-label">신청사유</label>
              <div className="col-sm-10">
                <textarea className="form-control"></textarea>
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-2 col-form-label"></label>
              <div className="col-sm-10">
                <button type="submit" className="btn btn-primary">구매 신청</button>
              </div>
            </div>
          </form>

          {/*사이드바 카테고리*/}

          <div class="accordion accordion-flush" id="accordionFlushExample">
            <li className="accordion-item">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                  <i className="bi bi-circle"></i>
                  <span>카테고리별</span>
                </button>
              <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                <div className="accordion-body bi bi-circle">하드웨어</div>
              </div>
              <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                <div className="accordion-body bi bi-circle">소프트웨어</div>
              </div>
              <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                <div className="accordion-body bi bi-circle">서버</div>
              </div>
              <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                <div className="accordion-body bi bi-circle">기타</div>
              </div>
            </li>
          </div>



        </main>

      </div>

  )
}

export default PurchaseRequest;