
const ListItem = ({id, name, number, department, auth}) => {

    return (
        <tr className="prod-box">
            <th scope="row">{id}</th>
            <td className="userName">{name}</td>
            <td className="prodName">{number}</td>
            <td className="prodCount">{department}</td>
            <td className="prodRegDate">{auth}</td>
        </tr>
    );
}

export default ListItem;