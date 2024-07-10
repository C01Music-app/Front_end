import { useEffect, useState } from "react";
import { findUser, updateUser } from "../../service/userService/UserService";
import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";

export function UserDetail() {
    const [user, setUser] = useState(null);
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("idUser");
    const navigate = useNavigate();

    const getUser = async (id) => {
        try {
            const response = await findUser(id, { headers: { Authorization: `Bearer ${token}` } });
            console.log(response);
            setUser(response);
        } catch (err) {
            console.error("Error fetching user:", err);
        }
    };

    useEffect(() => {
        if (id) {
            getUser(id);
        }
    }, [id]);

    const handleSubmit = async (values) => {
        try {
            const userUpdate ={...values,roles: [{ id: 2, name: "USER" }]}
            await updateUser(id, userUpdate, { headers: { Authorization: `Bearer ${token}` } });
            localStorage.removeItem("token");
            localStorage.removeItem("userName");
            localStorage.removeItem("roles");
            localStorage.removeItem("idUser");
            toast.success("Successfully updated user");
            navigate("/login");

        } catch (err) {
            console.error("Error updating user:", err);
        }
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="d-flex justify-content-center row">
                <h2 className="col-12 d-flex justify-content-center mt-5 mb-3">Profile</h2>
            </div>
            <div className="d-flex justify-content-center row mb-5">
                <div className="col-5">
                    <Formik
                        initialValues={{
                            userName: user.userName ,
                            phone: user.phone ,
                            email: user.email ,
                            password: "",
                        }}
                        onSubmit={handleSubmit}
                    >
                        <Form>
                            <div className="mb-3">
                                <label htmlFor="kk1" className="form-label">UserName</label>
                                <Field name="userName" type="text" className="form-control" id="kk1" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="kk2" className="form-label">Phone</label>
                                <Field name="phone" type="text" className="form-control" id="kk2" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="kk3" className="form-label">Email</label>
                                <Field name="email" type="text" className="form-control" id="kk3" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="kk4" className="form-label">Password</label>
                                <Field name="password" type="text" className="form-control" id="kk4" placoholder="nhập lại mật khẩu" required />
                            </div>
                            <div className="d-grid gap-2">
                                <button className="btn btn-success" type="submit">Cập nhật</button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </>
    );
}
