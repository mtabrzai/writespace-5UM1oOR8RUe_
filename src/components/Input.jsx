import PropTypes from 'prop-types';

const Input = ({
  id,
  name,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  label,
  error,
  disabled = false,
  required = false,
  className = '',
  inputClassName = '',
  labelClassName = '',
  errorClassName = '',
  fullWidth = false,
  prefix,
  suffix
}) => {
  const baseInputClasses = 'block w-full rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-200';
  const disabledClasses = 'bg-gray-100 dark:bg-gray-700 cursor-not-allowed';
  const errorClasses = 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500';
  const normalClasses = 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100';

  const inputClasses = `${baseInputClasses} ${error ? errorClasses : normalClasses} ${disabled ? disabledClasses : ''} ${inputClassName}`;
  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <div className={`${widthClass} ${className}`}>
      {label && (
        <label htmlFor={id} className={`block text-sm font-medium text-gray-700 dark:text-gray-300 ${labelClassName}`}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="mt-1 relative rounded-md shadow-sm">
        {prefix && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 dark:text-gray-400 sm:text-sm">
              {prefix}
            </span>
          </div>
        )}
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={inputClasses}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${id}-error` : undefined}
          style={prefix ? { paddingLeft: '2.5rem' } : {}}
        />
        {suffix && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-500 dark:text-gray-400 sm:text-sm">
              {suffix}
            </span>
          </div>
        )}
      </div>
      {error && (
        <p className={`mt-2 text-sm text-red-600 dark:text-red-400 ${errorClassName}`} id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['text', 'email', 'password', 'number', 'tel', 'url', 'search', 'date', 'time', 'datetime-local']),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  errorClassName: PropTypes.string,
  fullWidth: PropTypes.bool,
  prefix: PropTypes.node,
  suffix: PropTypes.node
};

export default Input;