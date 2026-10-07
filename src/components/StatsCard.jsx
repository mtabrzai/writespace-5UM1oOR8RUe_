import PropTypes from 'prop-types';
import Card from './Card';

const StatsCard = ({
  title,
  value,
  icon,
  className = '',
  iconClassName = 'bg-indigo-500 dark:bg-indigo-600'
}) => {
  return (
    <Card className={className}>
      <div className="flex items-center">
        <div className={`flex-shrink-0 ${iconClassName} rounded-lg p-3`}>
          {icon}
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
        </div>
      </div>
    </Card>
  );
};

StatsCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.node.isRequired,
  className: PropTypes.string,
  iconClassName: PropTypes.string
};

export default StatsCard;