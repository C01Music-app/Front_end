import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../service/userService/UserService";

export function UserList() {
    const [users, setUsers] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;

    const getUserList = async () => {
        try {
            const userList = await getAllUsers({ headers: { "Authorization": `Bearer ${token}` } });
            console.log(userList);
            setUsers(userList);
        } catch (err) {
            console.error("Failed to fetch users", err);
        }
    };

    useEffect(() => {
        getUserList();
    }, []);

    if (users.length === 0) {
        return <div>Loading...</div>;
    }


    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);


    const totalPages = Math.ceil(users.length / usersPerPage);

    return (
        <>
            <table className="table table-hover">
                <thead>
                <tr>
                    <th>#</th>
                    <th>UserName</th>
                    <th>Phone</th>
                    <th>Email</th>
                </tr>
                </thead>
                <tbody>
                {currentUsers.map((user, index) => (
                    <tr key={user.id}>
                        <td>{indexOfFirstUser + index + 1}</td>
                        <td>{user.userName}</td>
                        <td>{user.phone}</td>
                        <td>{user.email}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="pagination">
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span> Page {currentPage} of {totalPages} </span>
                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </>
    );
}
