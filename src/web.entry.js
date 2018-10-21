import Vue from 'vue';
import moment from 'moment-timezone';
import store from './store';
import './style.scss';

import App from './components/App.vue';

// const events = [
//   {
//     description: 'Random event 1',
//     date: moment('2018-10-10', 'YYYY-MM-DD')
//   },
//   {
//     description: 'Random event 2',
//     date: moment('2018-10-12', 'YYYY-MM-DD')
//   },
//   {
//     description: 'Random event 3',
//     date: moment('2018-10-14', 'YYYY-MM-DD')
//   }
// ];

const events = window.__INITIAL_STATE__.map((event) => {
  return {
    description: event.description,
    date: moment(event.date)
  };
});

const initialState = Object.assign({}, store.state, { events });
store.replaceState(initialState);

moment.tz.setDefault('UTC');
Object.defineProperty(Vue.prototype, '$moment', {
  get() {
    return this.$root.moment;
  }
});

new Vue({
  el: '#app',
  data: {
    moment
  },
  components: {
    App
  },
  store,
  render(createElement) {
    return createElement('div', { attrs: { id: 'app' } }, [
      createElement('app')
    ]);
  }
});
