import PropTypes from 'prop-types';

const Card = ({
  children,
  title,
  footer,
  className = '',
  titleClassName = '',
  contentClassName = '',
  footerClassName = '',
  padding = 'p-6',
  shadow = 'shadow-sm',
  rounded = 'rounded-lg',
  border = true
}) => {
  return (
    <div className={`${rounded} ${shadow} ${border ? 'border border-gray-200 dark:border-gray-700' : ''} bg-white dark:bg-gray-800 ${className}`}>
      {title && (
        <div className={`border-b border-gray-200 dark:border-gray-700 ${padding} ${titleClassName}`}>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h3>
        </div>
      )}
      <div className={`${padding} ${contentClassName}`}>
        {children}
      </div>
      {footer && (
        <div className={`border-t border-gray-200 dark:border-gray-700 ${padding} ${footerClassName}`}>
          {footer}
        </div>
      )}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  footer: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  className: PropTypes.string,
  titleClassName: PropTypes.string,
  contentClassName: PropTypes.string,
  footerClassName: PropTypes.string,
  padding: PropTypes.string,
  shadow: PropTypes.string,
  rounded: PropTypes.string,
  border: PropTypes.bool
};

export default Card;