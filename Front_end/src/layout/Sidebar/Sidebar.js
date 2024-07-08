import React from 'react';

export function Sidebar() {
    return (
        <>
            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion fixed-sidebar" id="accordionSidebar">
                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                    <div className="sidebar-brand-icon rotate-n-15">
                        <i className="fas fa-laugh-wink"></i>
                    </div>
                    <div className="sidebar-brand-text mx-3">Zing mp3</div>
                </a>
                <li className="nav-item">
                    <a className="nav-link">
                        <span>Thư viện</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="index.html">
                        <span>Khám Phá</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="index.html">
                        <span>#zingchart</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="index.html">
                        <span>Radio</span>
                    </a>
                </li>
                <hr className="sidebar-divider"/>
                <li className="nav-item">
                    <a className="nav-link" href="index.html">
                        <span>BXH Nhạc Mới</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="index.html">
                        <span>Chủ Đề & Thể Loại</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="index.html">
                        <span>Top 100</span>
                    </a>
                </li>
                <hr className="sidebar-divider d-none d-md-block"/>
            </ul>
        </>
    );
}
