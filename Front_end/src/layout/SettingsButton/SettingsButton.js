import React, { useState } from 'react';
import { FaCog } from 'react-icons/fa';
import './SettingsButton.css';

const SettingsButton = () => {

    return (
        <div className="setting-item">
            <button className="zm-btn zm-tooltip-btn is-hover-circle button">
                <FaCog />
            </button>
        </div>
    );
};

export default SettingsButton;
