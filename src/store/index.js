import Vue from 'vue';
import Vuex from 'vuex';
import moment from 'moment-timezone';
moment.tz.setDefault('UTC');

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentYear: 2018,
    currentMonth: 10,
    eventFormPosX: 0,
    eventFormPosY: 0,
    eventFormActive: false,
    eventFormDate: moment(),
    events: [
      {
        description: 'Random event 1',
        date: moment('2018-10-10', 'YYYY-MM-DD')
      },
      {
        description: 'Random event 2',
        date: moment('2018-10-12', 'YYYY-MM-DD')
      },
      {
        description: 'Random event 3',
        date: moment('2018-10-14', 'YYYY-MM-DD')
      }
    ]
  },
  mutations: {
    setCurrentMonth(state, payload) {
      state.currentMonth = payload;
    },
    setCurrentYear(state, payload) {
      state.currentYear = payload;
    },
    eventFormSetPos(state, payload) {
      state.eventFormPosX = payload.x;
      state.eventFormPosY = payload.y;
    },
    eventFormSetActive(state, payload) {
      state.eventFormActive = payload;
    },
    addEvent(state, payload) {
      state.events.push({
        description: payload,
        date: state.eventFormDate
      });
    },
    eventFormSetDate(state, payload) {
      state.eventFormDate = payload;
    }
  }
});
