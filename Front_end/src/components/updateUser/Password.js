import { useState } from "react";
import { updatePassword } from "../../service/userService/UserService";
import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";

function Password() {
    const token = localStorage.getItem("token");
    const [message, setMessage] = useState("");
    const name = localStorage.getItem("userName");
    const navigate = useNavigate();

    const handleSubmit =  (values, { setSubmitting, setFieldError }) => {

            const updatePass = { ...values };
             updatePassword(updatePass, {
                headers: { Authorization: `Bearer ${token}` },

            }).then(res => {
                 if (res.code === "ERROR") {
                     setFieldError("oldPassword","Old password is incorrect")
                 }else{
                     localStorage.removeItem("token");
                     localStorage.removeItem("userName");
                     localStorage.removeItem("roles");
                     localStorage.removeItem("idUser");
                     navigate("/login");
                     toast.success("update password successful");
                 }

             }).catch(err => {
                 console.log("err",err)
             }).finally(
                 setSubmitting(false)
             );



    };

    return (
        <>
            <div className="d-flex justify-content-center row">
                <h2 className="col-12 d-flex justify-content-center mt-5 mb-3">
                    Update Password
                </h2>
            </div>
            <div className="d-flex justify-content-center row mb-5">
                <div className="col-5">
                    <Formik
                        initialValues={{
                            userName: name,
                            oldPassword: "",
                            newPassword: "",
                        }}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting, errors }) => (
                            <Form>
                                <div className="mb-3">
                                    <label htmlFor="kk1" className="form-label">
                                        UserName
                                    </label>
                                    <Field
                                        name="userName"
                                        className="form-control"
                                        id="kk1"
                                        readOnly
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="kk2" className="form-label">
                                        Old Password
                                    </label>
                                    <Field
                                        name="oldPassword"
                                        type="password"
                                        className="form-control"
                                        id="kk2"
                                    />
                                    {errors.oldPassword && (
                                        <div className="text-danger">{errors.oldPassword}</div>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="kk3" className="form-label">
                                        New Password
                                    </label>
                                    <Field
                                        name="newPassword"
                                        type="password"
                                        className="form-control"
                                        id="kk3"
                                    />
                                </div>
                                <div className="d-grid gap-2">
                                    <button className="btn btn-success" type="submit" disabled={isSubmitting}>
                                        Cập nhật
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                    {message && <div className="alert alert-info mt-3">{message}</div>}
                </div>
            </div>
        </>
    );
}

export default Password;

