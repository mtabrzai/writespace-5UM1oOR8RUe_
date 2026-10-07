import PropTypes from 'prop-types';
import { format, formatDistanceToNow, isBefore, isAfter, isEqual, parseISO, differenceInDays } from 'date-fns';

const dateUtils = {
  formatDate: (date, dateFormat = 'PPP') => {
    try {
      if (!date) return '';
      const parsedDate = typeof date === 'string' ? parseISO(date) : date;
      return format(parsedDate, dateFormat);
    } catch (err) {
      console.error('Failed to format date:', err);
      return '';
    }
  },

  formatDateTime: (date, dateTimeFormat = 'PPpp') => {
    try {
      if (!date) return '';
      const parsedDate = typeof date === 'string' ? parseISO(date) : date;
      return format(parsedDate, dateTimeFormat);
    } catch (err) {
      console.error('Failed to format date time:', err);
      return '';
    }
  },

  formatRelativeTime: (date) => {
    try {
      if (!date) return '';
      const parsedDate = typeof date === 'string' ? parseISO(date) : date;
      return formatDistanceToNow(parsedDate, { addSuffix: true });
    } catch (err) {
      console.error('Failed to format relative time:', err);
      return '';
    }
  },

  isBeforeToday: (date) => {
    try {
      if (!date) return false;
      const parsedDate = typeof date === 'string' ? parseISO(date) : date;
      return isBefore(parsedDate, new Date());
    } catch (err) {
      console.error('Failed to compare dates:', err);
      return false;
    }
  },

  isAfterToday: (date) => {
    try {
      if (!date) return false;
      const parsedDate = typeof date === 'string' ? parseISO(date) : date;
      return isAfter(parsedDate, new Date());
    } catch (err) {
      console.error('Failed to compare dates:', err);
      return false;
    }
  },

  isToday: (date) => {
    try {
      if (!date) return false;
      const parsedDate = typeof date === 'string' ? parseISO(date) : date;
      return isEqual(parsedDate, new Date());
    } catch (err) {
      console.error('Failed to compare dates:', err);
      return false;
    }
  },

  daysBetween: (date1, date2) => {
    try {
      if (!date1 || !date2) return 0;
      const parsedDate1 = typeof date1 === 'string' ? parseISO(date1) : date1;
      const parsedDate2 = typeof date2 === 'string' ? parseISO(date2) : date2;
      return differenceInDays(parsedDate1, parsedDate2);
    } catch (err) {
      console.error('Failed to calculate days between dates:', err);
      return 0;
    }
  },

  parseDate: (dateString) => {
    try {
      if (!dateString) return null;
      return parseISO(dateString);
    } catch (err) {
      console.error('Failed to parse date string:', err);
      return null;
    }
  }
};

dateUtils.propTypes = {
  formatDate: PropTypes.func,
  formatDateTime: PropTypes.func,
  formatRelativeTime: PropTypes.func,
  isBeforeToday: PropTypes.func,
  isAfterToday: PropTypes.func,
  isToday: PropTypes.func,
  daysBetween: PropTypes.func,
  parseDate: PropTypes.func
};

export default dateUtils;