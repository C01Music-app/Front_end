import {useNavigate} from "react-router-dom";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {addUser, findByUserName} from "../../service/userService/UserService";
import * as Yup from "yup";
import {useEffect, useState} from "react";

export function Register() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [userTemp, setUserTemp] = useState("");

    const handleUserNameChange = (e, setFieldValue) => {
        setUserTemp(e.target.value);
        setFieldValue("userName", e.target.value);
    };

    useEffect(() => {
        async function fetchUsers() {
            try {
                const userList = await findByUserName(userTemp);
                setUsers(userList || []);
            } catch (err) {
                console.log(err);
            }
        }
        if (userTemp) {
            fetchUsers();
        }
    }, [userTemp]);

    const isUserNameUnique = async (userName) => {
        const existingUser = users.find(user => user.userName === userName);
        return !existingUser;
    };

    const handleSubmit = async (values) => {
        try {
            const isUnique = await isUserNameUnique(values.userName);
            if (!isUnique) {
                throw new Error("Username must be unique.");
            }
            const newUser = { ...values, roles: [{ id: 2, name: "USER" }] };
            await addUser(newUser);
            navigate("/login");
        } catch (err) {
            console.log(err);
        }
    };

    const validationSchema = Yup.object({
        userName: Yup.string()
            .required("Username is required")
            .test("checkUserNameUnique", "Username already exists", async function (value) {
                return await isUserNameUnique(value);
            }),
        email: Yup.string()
            .required("Email is required")
            .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Email is not formatted correctly"),
        password: Yup.string()
            .required("Password is required")
    });

    return (
        <>
            <div>
                <Formik
                    initialValues={{
                        userName: "",
                        email: "",
                        phone: "",
                        password: ""
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        handleSubmit(values);
                    }}
                >
                    {({ isSubmitting, setFieldValue }) => (
                        <div className="h-screen w-screen flex items-center justify-center">
                            <Form>
                                <div
                                    className="h-[80vh] w-[80vw] flex items-center justify-center rounded-md bg-white shadow-lg">
                                    <div className="relative w-1/2 h-full flex flex-col">
                                        <img src="img/image-zingmp3.png" className="w-full h-full" alt="Zing MP3" />
                                    </div>
                                    <div className="w-1/2 h-full bg-[#f5f5f5] flex flex-col p-20 justify-between rounded-md">
                                        <div className="w-full flex flex-col">
                                            <div className="w-full flex flex-col mb-5">
                                                <h1 className="text-base mb-2" style={{ fontSize: '2em' }}>
                                                    Sign up <span className="text-blue-500" style={{ fontSize: '3em' }}>Z</span>
                                                    <span className="text-green-500" style={{ fontSize: '3em' }}>i</span>
                                                    <span className="text-orange-500" style={{ fontSize: '3em' }}>n</span>
                                                    <span className="text-pink-500" style={{ fontSize: '3em' }}>g</span>
                                                    <span className="text-purple-500">mp3</span>
                                                </h1>
                                            </div>
                                            <div className="w-full flex flex-col">
                                                <div>
                                                    <Field
                                                        type="text"
                                                        placeholder="UserName"
                                                        name="userName"
                                                        className="w-full text-black my-2 py-2 bg-transparent border-b border-black outline-none focus:outline-none"
                                                        onChange={(e) => handleUserNameChange(e, setFieldValue)}
                                                    />
                                                    <ErrorMessage name="userName" component="div" className="text-danger" />
                                                </div>
                                                <div>
                                                    <Field
                                                        type="text"
                                                        placeholder="Phone"
                                                        name="phone"
                                                        className="w-full text-black my-2 py-2 bg-transparent border-b border-black outline-none focus:outline-none"
                                                    />
                                                </div>
                                                <div>
                                                    <Field
                                                        type="text"
                                                        placeholder="Email"
                                                        name="email"
                                                        className="w-full text-black my-2 py-2 bg-transparent border-b border-black outline-none focus:outline-none"
                                                    />
                                                    <ErrorMessage name="email" component="div" className="text-danger" />
                                                </div>
                                                <div>
                                                    <Field
                                                        type="password"
                                                        placeholder="Password"
                                                        name="password"
                                                        className="w-full text-black my-2 py-2 bg-transparent border-b border-black outline-none focus:outline-none"
                                                    />
                                                    <ErrorMessage name="password" component="div" className="text-danger" />
                                                </div>
                                            </div>
                                            <div className="w-full flex flex-col my-4">
                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="w-full text-white my-2 font-semibold bg-fuchsia-900 rounded-md p-3 text-center flex items-center justify-center"
                                                >
                                                    Sign in
                                                </button>
                                            </div>
                                            <div className="w-full flex items-center justify-center relative py-2">
                                                <div className="w-full h-[1px] bg-black"></div>
                                                <p className="text-lg absolute text-black/100 bg-blue-50 my-4">or</p>
                                            </div>
                                            <div>
                                                <a href="https://accounts.google.com/o/oauth2/auth?scope=email
                                                &redirect_uri=http://localhost:8080/login-google&response_type=code
                                                &client_id=429933962028-7fp58kknkiedmvf5lue15e88ju1dl7sq.apps.googleusercontent.com
                                                &approval_prompt=force"
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
