// Date utility functions
module.exports = {
  // Format date as YYYY-MM-DD
  formatDate: (date) => {
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  },

  // Check if date is today
  isToday: (date) => {
    const today = new Date();
    const d = new Date(date);
    return d.getFullYear() === today.getFullYear() &&
      d.getMonth() === today.getMonth() &&
      d.getDate() === today.getDate();
  },

  // Get week range (Monday to Sunday) for a given date
  getWeekRange: (date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diffToMonday = d.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(d.setDate(diffToMonday));
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    return {
      start: monday,
      end: sunday
    };
  },
};
