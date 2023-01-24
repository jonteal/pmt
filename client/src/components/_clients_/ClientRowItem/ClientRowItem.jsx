import "./clientRowItem.css";

const rootClass = "client-row-item";

const ClientRowItem = ({ item }) => {
  return (
    <div className={`${rootClass}-container`}>
      <p>{item}</p>
    </div>
  );
};

export default ClientRowItem;
