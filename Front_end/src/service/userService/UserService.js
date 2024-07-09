import axios from "axios";

export const getAllUsers = async(header) => {
    try{
        const res = await axios.get("http://localhost:8080/user", header)
        console.log(res.data)
        return res.data
    }catch(err){}
}
export const addUser =async (user) => {
    try {
        const res = await axios.post("http://localhost:8080/user/create", user);
        return res.data
    }
    catch(err){}
}
export const updateUser = async (id) => {
    try {
       const res = await axios.put("http://localhost:8080/user/", id);
       return res.data
    }catch(err){}
}
export const findUser = async (id) => {
    try {
        const res = await axios.get("http://localhost:8080/user/" + id);
        return res.data
    }catch(err){}
}
export const findByUserName =async (userName) => {
    try {
        const res = await axios.get("http://localhost:8080/user/search/" + userName);
        return res.data
    }catch(err){}
}