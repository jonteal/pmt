
import './chartContainer.css';

const rootClass = "chart-container";

const ChartContainer = ({ title, children, width }) => {
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
