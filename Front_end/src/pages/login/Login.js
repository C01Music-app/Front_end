import {useNavigate} from "react-router-dom";
import {AppContext} from "../../context/AppContext";
import {useContext, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {FaEye, FaEyeSlash} from "react-icons/fa";


export default function Login() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const {toggleFlag} = useContext(AppContext);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    function register(){
        navigate("/register");
    }

    function setAcc (value){
        console.log(value)
        axios.post("http://localhost:8080/auth/login",value).then((res) =>{
            console.log(res.data);
            if(res.data === false){
                alert("Tài khoản không khả dụng.")
            }
            else {
                toggleFlag()
                console.log(res.data)
                localStorage.setItem("idUser", res.data.id);
                localStorage.setItem("userName", res.data.username);
                localStorage.setItem("roles",res.data.authorities[0].authority);
                localStorage.setItem("token",res.data.token);
                navigate("/");
                toast.success("đăng nhập thành công.")

            }


        }).catch(() =>{
            toast.error("Sai thông tin đăng nhập")
            navigate("/login");
        })
    }
    return(
        <>
            <div>

                <Formik
                    initialValues={{userName: '', password: ''}}
                    onSubmit={(values, {setSubmitting}) => {
                        setAcc(values)
                        setSubmitting(false)
                    }}
                >
                    {({isSubmitting}) => (
                        <div className="h-screen w-screen flex items-center justify-center ">
                            <Form>
                                <div
                                    className="h-[80vh] w-[80vw] flex items-center justify-center rounded-md bg-white shadow-lg">
                                    <div className="relative w-1/2 h-full flex flex-col">
                                        <img src="img/image-zingmp3.png" className="w-full h-full"/>
                                    </div>
                                    <div
                                        className="w-1/2 h-full bg-[#f5f5f5] flex flex-col p-20 justify-between rounded-md">
                                        <div className="w-full flex flex-col">
                                            <div className="w-full flex flex-col mb-5">
                                                <h1 className="text-black mb-2" style={{ fontSize: '2em' }}>
                                                    Welcome <span className="text-blue-500" style={{ fontSize: '2em' }}>Z</span>
                                                    <span
                                                    className="text-green-500" style={{ fontSize: '2em' }}>i</span>
                                                    <span
                                                    className="text-orange-500" style={{ fontSize: '2em' }}>n</span>
                                                    <span
                                                    className="text-pink-500" style={{ fontSize: '2em' }}>g</span>
                                                     <span
                                                    className="text-purple-500" >mp3</span>
                                                </h1>
                                            </div>
                                            <div className="w-full flex flex-col">
                                                <Field
                                                    type="text"
                                                    placeholder="UserName"
                                                    name="userName"
                                                    className="w-full text-black my-2 py-2 bg-transparent border-b border-black outline-none focus:outline-none"
                                                />
                                                <div className="relative w-full">
                                                <Field
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="Password"
                                                    name="password"
                                                    className="w-full text-black my-2 py-2 bg-transparent border-b border-black outline-none focus:outline-none"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={togglePasswordVisibility}
                                                    className="absolute right-0 top-1/2 transform -translate-y-1/2 text-black"
                                                >
                                                    {showPassword ? <FaEyeSlash/> : <FaEye/>}
                                                </button>
                                                </div>
                                            </div>
                                            <div className="w-full flex items-center justify-between">
                                                <div className="text-black w-full flex items-center">
                                                    <input type="checkbox" className="w-4 h-4 mr-2"/>
                                                    <p className="text-sm">Remember Me</p>
                                                </div>
                                                <p className="text-black text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2">Forgot
                                                    password?</p>
                                            </div>
                                            <div className="w-full flex flex-col my-4">
                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="w-full text-white my-2 font-semibold bg-fuchsia-900 rounded-md p-3 text-center flex items-center justify-center"
                                                >
                                                    Login
                                                </button>
                                                <div onClick={register}>
                                                <button
                                                    className="w-full text-white my-2 font-semibold bg-fuchsia-900 rounded-md p-3 text-center flex items-center justify-center">
                                                    Register
                                                </button>
                                                </div>
                                            </div>
                                            {/*<div className="w-full flex items-center justify-center relative py-2">*/}
                                            {/*    <div className="w-full h-[1px] bg-black"></div>*/}
                                            {/*    <p className="text-lg absolute text-black/100 bg-blue-50 my-4">or</p>*/}
                                            {/*</div>*/}
                                            <div>
                                                <a href="https://accounts.google.com/o/oauth2/auth?scope=email&redirect_uri=http://localhost:8080/login-google&response_type=code
    &client_id=429933962028-7fp58kknkiedmvf5lue15e88ju1dl7sq.apps.googleusercontent.com&approval_prompt=force"
                                                    type="button"
                                                    className="my-4 flex items-center justify-center p-3 w-full
                                                    text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4
                                                    focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg
                                                    text-sm px-5 py-2.5 text-center inline-flex items-center
                                                     dark:focus:ring-[#4285F4]/55 me-2 mb-2"
                                                    >
                                                    <svg
                                                        className="w-4 h-4 me-2"
                                                        aria-hidden="true"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="currentColor"
                                                        viewBox="0 0 18 19"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                    Sign in with Google
                                                </a>
                                            </div>
                                            <div className="w-full flex items-center justify-center my-2">
                                                <p className="text-sm font-normal text-black">
                                                Don't have a account ?<span
                                                    className="font-semibold underline underline-offset-2 cursor-pointer">Sign up for free!</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        </div>

                    )}
                </Formik>
            </div>
        </>
    )


}
