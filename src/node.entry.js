import VueCalendar from './entry.js';

export default (context) => {
  return VueCalendar(context.events);
};
