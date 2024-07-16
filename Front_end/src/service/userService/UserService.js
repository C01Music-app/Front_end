import axios from "axios";

export const getAllUsers = async (header) => {
    try {
        const res = await axios.get("http://localhost:8080/user", header);
        console.log(res.data);
        return res.data;
    } catch (err) {
        console.error("Error fetching users:", err);
    }
};

export const addUser = async (user) => {
    try {
        const res = await axios.post("http://localhost:8080/user/create", user);
        return res.data;
    } catch (err) {
        console.error("Error adding user:", err);
    }
};

export const updateUser = async (id, user, header) => {
    try {
        const res = await axios.put(`http://localhost:8080/user/${id}`, user, header);
        return res.data;
    } catch (err) {
        console.error("Error updating user:", err);
    }
};

export const findUser = async (id, header) => {
    try {
        const res = await axios.get(`http://localhost:8080/user/find/${id}`, header);
        return res.data;
    } catch (err) {
        console.error("Error finding user:", err);
    }
};

export const findByUserName = async (userName) => {
    try {
        const res = await axios.get(`http://localhost:8080/user/search/${userName}`);
        return res.data;
    } catch (err) {
        console.error("Error finding user by username:", err);
    }
};
export const updateUserDetail = async (id, user, header) => {
        try {
            const res = await axios.put(`http://localhost:8080/user/detail/${id}`, user, header);
            return res.data;
        } catch (err) {
            console.error("Error updating user:", err);
        }
};

export const updateUserPassword = async (id, user, header) => {
    try {
        const res = await axios.put(`http://localhost:8080/user/password/${id}`, user, header);
        return res.data;
    } catch (err) {
        console.error("Error updating user:", err);
    }
};