import React from 'react';
import "../../component-css/menuLogin.css"
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";

const MenuLogin = ({closeModal, changeStatusLogin}) => {
    const navigate = useNavigate()
    const [token, setToken] = React.useState(localStorage.getItem('token'));
    function login() {
        // handler(false);
        closeModal();
        navigate("/login")
    }
    const handleLogout = () => {
        axios.get("http://localhost:8080/auth/logout", { headers: {"Authorization" : `Bearer ${token}`}}).then((res) =>{
            localStorage.removeItem("token");
            localStorage.removeItem("userName");
            localStorage.removeItem("role");
            localStorage.removeItem("idUser");
            setToken("");
            closeModal();
            changeStatusLogin();
            toast.success("logout successful");
            navigate("/");
        })
    }
    return (
        <>
            <div className="menuLogin">
                {!token && <div onClick={login} className="login">
                    <button className="button">
                        Login
                    </button>
                </div>}
                {token && <div onClick={handleLogout} className="login">
                    <button className="button">
                        logout
                    </button>
                </div>}
                <div className="menuLogin_content">
                    Đăng ký gói
                </div>
                <div className="voucher1">
                    <h2>
                        ZingMP3
                    </h2>
                    <h3>
                        Chỉ từ 11.000 đ/tháng
                    </h3>
                    <h3>
                        Nghe nhạc với chất lượng cao nhất, không quảng cáo
                    </h3>
                    <a>Tìm hiểu thêm</a>
                </div>
                <div className="voucher2">
                    <h2>
                        ZingMP3
                    </h2>
                    <h3>
                        Chỉ từ 37.500 đ/tháng
                    </h3>
                    <h3>
                        Toàn bộ đặc quyền Plus cùng kho nhạc premium
                    </h3>
                    <a>Tìm hiểu thêm</a>
                </div>
            </div>
        </>
    );
};

export default MenuLogin;
