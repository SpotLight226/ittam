import {useState} from "react";
import MakeList from "./MakeList";

const UserList = () => {

    // localhost axios 가져올 시, 전체 주소

    const dummyData = [{
        id: 1,
        name: "장성욱",
        number: 111,
        department: "웹 개발",
        auth: "사원"
    },
        {
            id: 2,
            name: "이찬한",
            number: 112,
            department: "웹 개발",
            auth: "관리자"
        },
        {
            id: 3,
            name: "유재영",
            number: 113,
            department: "웹 개발",
            auth: "사원"
        },
        {
            id: 4,
            name: "김지유",
            number: 114,
            department: "웹 개발",
            auth: "관리자"
        }];


    return (
        <div>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>사용자 목록</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <a href="index.html">Home</a>
                            </li>
                            <li className="breadcrumb-item">users</li>
                            <li className="breadcrumb-item active">userList</li>
                        </ol>
                    </nav>
                </div>

                <section className="section">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">사용자 목록</h5>
                                    <div
                                        className="datatable-wrapper datatable-loading nofooter sortable searchable fixed-columns">
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
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <table className="table datatable">
                                        <thead>
                                        <tr>
                                            <th data-sortable="true">
                                                <a href="#" className="datatable-sorter">
                                                    #
                                                </a>
                                            </th>
                                            <th data-sortable="true">
                                                <a href="#" className="datatable-sorter">
                                                    이름
                                                </a>
                                            </th>
                                            <th data-sortable="true">
                                                <a href="#" className="datatable-sorter">
                                                    사원번호
                                                </a>
                                            </th>
                                            <th data-sortable="true">
                                                <a href="#" className="datatable-sorter">
                                                    부서
                                                </a>
                                            </th>
                                            <th data-sortable="true">
                                                <a href="#" className="datatable-sorter">
                                                    권한
                                                </a>
                                            </th>
                                        </tr>
                                        </thead>
                                        <MakeList dummyData={dummyData}/>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default UserList;