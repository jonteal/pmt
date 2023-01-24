
import './chartContainer.css';

const ChartContainer = ({ title, children, width }) => {
  const rootClass = "chart-container";
  return (
    <div className={`${rootClass}-data-container`}>
      <h2 className={`${rootClass}-chart-title`}>{title}</h2>
      <div className={`${rootClass}-${width}`}>
        {children}
      </div>
    </div>
  );
};

export default ChartContainer;
