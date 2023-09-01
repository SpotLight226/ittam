import ListItem from "./ListItem";

const MakeList = ({dummyData}) => {
    return (
        <tbody>
        {dummyData.map((data) => (
            <ListItem key={data.id} {...data} />
        ))}
        </tbody>
    );
}

export default MakeList;