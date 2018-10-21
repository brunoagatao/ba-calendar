import moment from 'moment-timezone';
import VueCalendar from './entry.js';
import './style.scss';

moment.tz.setDefault('UTC');

const events = window.__INITIAL_STATE__.map((event) => {
  return {
    description: event.description,
    date: moment(event.date)
  };
});

setTimeout(() => {
  VueCalendar(events).$mount('#app');
}, 2000);
