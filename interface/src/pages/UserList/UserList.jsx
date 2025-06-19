import "./UserList.css";
import { PiMagnifyingGlass } from "react-icons/pi";
import { API_BASE_URL } from "../../constants/Constants";
import { useEffect, useState } from "react";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import ReactPaginate from 'react-paginate';
import SearchBar from "../../components/SearchBar/SearchBar";

function UserList() {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const usersPerPage = 8;

    const getAllUsers = async () => {
        const res = await fetch(`${API_BASE_URL}/users`, {
            method: "GET",
            headers: { Token: localStorage.getItem('token') },
        });

        if (res.status === 200) {
            const data = await res.json();
            setUsers(data.body);
        }
    }

    useEffect(() => {
        getAllUsers();
    }, []);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const offset = currentPage * usersPerPage;
    const currentUsers = users.slice(offset, offset + usersPerPage);
    const pageCount = Math.ceil(users.length / usersPerPage);

    return (
        <div className="user-list-container">
            <SearchBar/>
            {
                isNaN(users) && (
                    <>
                        <table className="user-list-table">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Prénom</th>
                                <th>Mail</th>
                                <th>DDN</th>
                                <th>Abonnement</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {currentUsers.map((user) => (
                                <tr key={user.id}>
                                    <td className="bold">{user.id}</td>
                                    <td className="user-name-cell">
                                        <img className="user-avatar" src={`${API_BASE_URL}/upload/${user.image}`} alt="avatar" />
                                        {user.name}
                                    </td>
                                    <td className="email-link">{user.mail}</td>
                                    <td>{user.ddn}</td>
                                    <td>{user.subscription === 0 ? "Free" : "Premium"}</td>
                                    <td>{user.city}</td>
                                    <td className="menu-icon">⋮</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <ReactPaginate
                            previousLabel={<MdNavigateBefore/>}
                            nextLabel={<MdNavigateNext/>}
                            breakLabel={"..."}
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={3}
                            onPageChange={handlePageClick}
                            containerClassName={"pagination"}
                            activeClassName={"active"}
                        />
                    </>
                )
            }
        </div>
    );
}

export default UserList;