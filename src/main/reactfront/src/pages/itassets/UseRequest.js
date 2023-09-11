import React, { Component, useState } from 'react';
import '../../App.css';
import {Link} from "react-router-dom";
import '../../styles/Style.css'

function UserRequest() {


    return (
        <div>

            <main id="main" className="main">
                <form>
                    <div className="pagetitle">
                        <h1>자산 사용 신청</h1>
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
                        <label htmlFor="inputDate" className="col-sm-2 col-form-label">반납날짜</label>
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
                    {/*안 쓰는 것*/}
                    {/*<div className="row mb-3">*/}
                    {/*    <label htmlFor="inputNumber" className="col-sm-2 col-form-label">File Upload</label>*/}
                    {/*    <div className="col-sm-10">*/}
                    {/*        <input className="form-control" type="file" id="formFile"/>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/*<div className="row mb-3">*/}
                    {/*    <label htmlFor="inputTime" className="col-sm-2 col-form-label">Time</label>*/}
                    {/*    <div class="col-sm-10">*/}
                    {/*        <input type="time" class="form-control"/>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/*<div className="row mb-3">*/}
                    {/*    <label htmlFor="inputColor" className="col-sm-2 col-form-label">Color Picker</label>*/}
                    {/*    <div className="col-sm-10">*/}
                    {/*        <input type="color" className="form-control form-control-color" id="exampleColorInput" value="#4154f1" title="Choose your color"/>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/*<fieldset className="row mb-3">*/}
                    {/*    <legend className="col-form-label col-sm-2 pt-0">Radios</legend>*/}
                    {/*    <div className="col-sm-10">*/}
                    {/*        <div className="form-check">*/}
                    {/*            <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" checked/>*/}
                    {/*            <label className="form-check-label" htmlFor="gridRadios1">*/}
                    {/*                First radio*/}
                    {/*            </label>*/}
                    {/*        </div>*/}
                    {/*        <div className="form-check">*/}
                    {/*            <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2"/>*/}
                    {/*            <label className="form-check-label" htmlFor="gridRadios2">*/}
                    {/*                Second radio*/}
                    {/*            </label>*/}
                    {/*        </div>*/}
                    {/*        <div className="form-check disabled">*/}
                    {/*            <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios" value="option" disabled/>*/}
                    {/*            <label className="form-check-label" htmlFor="gridRadios3">*/}
                    {/*                Third disabled radio*/}
                    {/*            </label>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</fieldset>*/}
                    {/*<div className="row mb-3">*/}
                    {/*    <legend className="col-form-label col-sm-2 pt-0">Checkboxes</legend>*/}
                    {/*    <div className="col-sm-10">*/}

                    {/*        <div className="form-check">*/}
                    {/*            <input className="form-check-input" type="checkbox" id="gridCheck1"/>*/}
                    {/*            <label className="form-check-label" htmlFor="gridCheck1">*/}
                    {/*                Example checkbox*/}
                    {/*            </label>*/}
                    {/*        </div>*/}

                    {/*        <div className="form-check">*/}
                    {/*            <input className="form-check-input" type="checkbox" id="gridCheck2" checked/>*/}
                    {/*            <label className="form-check-label" htmlFor="gridCheck2">*/}
                    {/*                Example checkbox 2*/}
                    {/*            </label>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/*<div className="row mb-3">*/}
                    {/*    <label className="col-sm-2 col-form-label">Disabled</label>*/}
                    {/*    <div className="col-sm-10">*/}
                    {/*        <input type="text" className="form-control" value="Read only / Disabled" disabled/>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    {/*<div className="row mb-3">*/}
                    {/*    <label className="col-sm-2 col-form-label">Select</label>*/}
                    {/*    <div className="col-sm-10">*/}
                    {/*        <select className="form-select" aria-label="Default select example">*/}
                    {/*            <option selected>Open this select menu</option>*/}
                    {/*            <option value="1">One</option>*/}
                    {/*            <option value="2">Two</option>*/}
                    {/*            <option value="3">Three</option>*/}
                    {/*        </select>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/*<div className="row mb-3">*/}
                    {/*    <label className="col-sm-2 col-form-label">Multi Select</label>*/}
                    {/*    <div className="col-sm-10">*/}
                    {/*        <select className="form-select" multiple aria-label="multiple select example">*/}
                    {/*            <option selected>Open this select menu</option>*/}
                    {/*            <option value="1">One</option>*/}
                    {/*            <option value="2">Two</option>*/}
                    {/*            <option value="3">Three</option>*/}
                    {/*        </select>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label"></label>
                        <div className="col-sm-10">
                            <button type="submit" className="btn btn-primary">사용 신청</button>
                        </div>
                    </div>
                </form>
            </main>
        </div>

    )
};
export default UserRequest;