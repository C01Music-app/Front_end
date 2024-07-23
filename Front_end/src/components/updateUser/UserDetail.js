import { useEffect, useState } from "react";
import { findUser, updateUserDetail } from "../../service/userService/UserService";
import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {useSelector} from "react-redux";

export function UserDetail() {
    const [user, setUser] = useState(null);
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("idUser");
    const users = useSelector(state => state.user);
    const navigate = useNavigate();

    const getUser = async () => {
        try {
            const res = await findUser(id, { headers: { Authorization: `Bearer ${token}` } });
            setUser(res);
        } catch (err) {
            console.error("Error fetching user:", err);
        }
    }

    useEffect(() => {
        if (id) {
            getUser(id);
        }
    }, [id]);

    const handleSubmit = async (values) => {
        try {
            const userUpdate = { ...values };
            await updateUserDetail(id, userUpdate, { headers: { Authorization: `Bearer ${token}` } });
            // localStorage.removeItem("token");
            // localStorage.removeItem("userName");
            // localStorage.removeItem("roles");
            // localStorage.removeItem("idUser");
            toast.success("Successfully updated user");
        } catch (err) {
            console.error("Error updating user:", err);
        }
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <p>{users.userName}</p>
            <div className="d-flex justify-content-center row">
                <h2 className="col-12 d-flex justify-content-center mt-5 mb-3">Profile</h2>
            </div>
            <div className="d-flex justify-content-center row mb-5">
                <div className="col-5">
                    <Formik
                        initialValues={{
                            userName: user.userName,
                            phone: user.phone,
                            email: user.email,
                        }}
                        onSubmit={handleSubmit}
                    >
                        <Form>
                            <div className="mb-3">
                                <label htmlFor="kk1" className="form-label">UserName</label>
                                <Field name="userName"  className="form-control" id="kk1" readOnly />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="kk2" className="form-label">Phone</label>
                                <Field name="phone" type="text" className="form-control" id="kk2" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="kk3" className="form-label">Email</label>
                                <Field name="email" type="text" className="form-control" id="kk3" />
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
