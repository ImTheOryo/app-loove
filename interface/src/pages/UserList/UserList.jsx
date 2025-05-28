import "./UserList.css";
import women from "../../assets/images/women.png";
import { PiMagnifyingGlass } from "react-icons/pi";
function UserList(){

    const people = [
        { id: 1, name: "Julie", email: "julie@gmail.com", ddn: "01-01-1990", status: "Free", city: "Paris", avatar: "https://via.placeholder.com/50" },
        { id: 2, name: "Paul", email: "paul@gmail.com", ddn: "12-05-1985", status: "Premium", city: "Lyon", avatar: "https://via.placeholder.com/50" },
        { id: 3, name: "Sophie", email: "sophie@gmail.com", ddn: "22-09-1992", status: "Free", city: "Marseille", avatar: "https://via.placeholder.com/50" },
        { id: 4, name: "Lucas", email: "lucas@gmail.com", ddn: "30-07-1988", status: "Premium", city: "Toulouse", avatar: "https://via.placeholder.com/50" },
        { id: 5, name: "Emma", email: "emma@gmail.com", ddn: "15-03-1995", status: "Free", city: "Nice", avatar: "https://via.placeholder.com/50" },
        { id: 6, name: "Hugo", email: "hugo@gmail.com", ddn: "08-08-1987", status: "Premium", city: "Nantes", avatar: "https://via.placeholder.com/50" },
        { id: 7, name: "Chloé", email: "chloe@gmail.com", ddn: "19-11-1993", status: "Free", city: "Bordeaux", avatar: "https://via.placeholder.com/50" },
        { id: 8, name: "Maxime", email: "maxime@gmail.com", ddn: "04-02-1989", status: "Premium", city: "Strasbourg", avatar: "https://via.placeholder.com/50" },
    ];



    return (
        <div className="user-list-container">
            <div className="user-list-search-bar">
                <PiMagnifyingGlass className="self-center w-[24px] h-[24px] mr-2"/>
                <input
                    type="text"
                    placeholder={`Recherchez par un ID, prénom, mail, ou autre`}
                    className="w-[80%] font-nunito-regular bg-[#FAFAFA] text-[#808080]"
                />
            </div>
            <div>
                <table className="user-list-table">
                    <thead className="user-list-table-thead">
                        <tr>
                            <th scope="col"> ID </th>
                            <th scope="col"> Prénom </th>
                            <th scope="col"> Mail </th>
                            <th scope="col"> DDN </th>
                            <th scope="col"> Status </th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        people.map((user) => (
                            <tr className="font-nunito-regular">
                                <td className="font-nunito-bold font-bold">
                                    {user.id}
                                </td>
                                <td className="px-4 py-2 flex justify-center items-center gap-2">
                                    <img className="user-list-img" src={women} alt=""/>
                                    {user.name}
                                </td>
                                <td>{user.email}</td>
                                <td>{user.ddn}</td>
                                <td>{user.status}</td>

                            </tr>
                        ))
                    }

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UserList;