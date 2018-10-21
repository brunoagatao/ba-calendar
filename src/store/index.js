import Vue from 'vue';
import Vuex from 'vuex';
import moment from 'moment-timezone';
import Axios from 'axios';
moment.tz.setDefault('UTC');

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentYear: parseInt(moment().format('YYYY')),
    currentMonth: parseInt(moment().format('M')),
    eventFormPosX: 0,
    eventFormPosY: 0,
    eventFormActive: false,
    eventFormDate: moment(),
    events: []
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
      state.events.push(payload);
    },
    eventFormSetDate(state, payload) {
      state.eventFormDate = payload;
    }
  },
  actions: {
    addEvent(context, payload) {
      return new Promise((resolve, reject) => {
        const obj = {
          description: payload,
          date: context.state.eventFormDate
        };

        Axios.post('/add_event', obj).then((res) => {
          if (res.status === 200) {
            context.commit('addEvent', obj);
            resolve();
          } else {
            reject();
          }
        });
      });
    }
  }
});
