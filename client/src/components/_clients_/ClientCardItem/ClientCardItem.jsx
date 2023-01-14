
import '../ClientCard/clientCard.css';

const ClientCardItem = ({ value, header }) => {
  const rootClass = 'client-card';
  return (
    <div className={`${rootClass}-item-container`}>
      <p className={`${rootClass}-header`}>{header}</p>
      <p className={`${rootClass}-first-name`}>{value}</p>
    </div>
  );
};

export default ClientCardItem;
