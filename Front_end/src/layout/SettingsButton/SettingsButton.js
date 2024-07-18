import React, { useState } from 'react';
import { FaCog } from 'react-icons/fa';
import './SettingsButton.css';
import {Dropdown} from "react-bootstrap";
import {Link} from "react-router-dom";
import {DropdownSubmenu} from "react-bootstrap-submenu";

const SettingsButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const isRoleName = localStorage.getItem("roles");

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <Dropdown className="d-flex align-items-center tr2">
            <Dropdown.Toggle  id="dropdown-basic">
                <FaCog />
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {isRoleName === "ADMIN" && (
                    <Dropdown.Item as={Link} to="/UserList">UserList</Dropdown.Item>
                )}
                <DropdownSubmenu title="Profile">
                    <Dropdown.Item as={Link} to="/UserDetail">UserDetail</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/UserDetail">UserDetail</Dropdown.Item>
                </DropdownSubmenu>
                <Dropdown.Item href="#/action-3">Setting</Dropdown.Item>
                <Dropdown.Item as={Link} to="/artists" >List Artists</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
        // <div className="setting-item">
        //     <button
        //         className="zm-btn zm-tooltip-btn is-hover-circle button"
        //         onClick={toggleDropdown}
        //     >
        //         <FaCog />
        //     </button>
        //     {isOpen && (
        //         <div className="dropdown-menu">
        //             <ul>
        //                 <a className="dropdown-item" href="#">Action</a>
        //                 <a className="dropdown-item" href="#">Another action</a>
        //                 <a className="dropdown-item" href="#">Something else here</a>
        //             </ul>
        //         </div>
        //     )}
        // </div>
    );
};

export default SettingsButton;
