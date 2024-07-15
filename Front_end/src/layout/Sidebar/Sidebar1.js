import React from "react";
import "./Sidebar.css";

export function Sidebar1() {
    return (
        <div className="sidebar-container">
            <div className="sidebar-header">
                <a className="sidebar-brand" href="/">
                    <div className="sidebar-brand-icon">
                        <i className="fas fa-laugh-wink"></i>
                    </div>
                    <div className="sidebar-brand-text">Zing MP3</div>
                </a>
            </div>
            <ul className="sidebar-menu">
                <li className="sidebar-item">
                    <a className="sidebar-link" href="#">
                        <i className="sidebar-icon fas fa-book"></i>
                        <span className="sidebar-text">Thư viện</span>
                    </a>
                </li>
                <li className="sidebar-item">
                    <a className="sidebar-link" href="#">
                        <i className="sidebar-icon fas fa-compass"></i>
                        <span className="sidebar-text">Khám Phá</span>
                    </a>
                </li>
                <li className="sidebar-item">
                    <a className="sidebar-link" href="#">
                        <i className="sidebar-icon fas fa-chart-line"></i>
                        <span className="sidebar-text">#zingchart</span>
                    </a>
                </li>
                <li className="sidebar-item">
                    <a className="sidebar-link" href="#">
                        <i className="sidebar-icon fas fa-radio"></i>
                        <span className="sidebar-text">Radio</span>
                    </a>
                </li>
            </ul>
        </div>
    );
}
