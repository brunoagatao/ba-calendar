<template>
  <div>
    <div v-for="(week, index) in weeks" v-bind:key="index">
      Week
      <div v-for="(day, index) in week" v-bind:key="index">
        {{ day }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      month: 2,
      year: 2017
    };
  },
  computed: {
    days() {
      const days = [];

      let currentDay = this.$moment(`${this.year}-${this.month}-1`, 'YYYY-M-D');
      do {
        days.push(currentDay);
        currentDay = this.$moment(currentDay.add(1, 'days'));
      } while (currentDay.month() + 1 === this.month);

      const SUNDAY = 0;
      const MONDAY = 1;

      currentDay = this.$moment(days[0]);
      if (currentDay.day() !== MONDAY) {
        do {
          currentDay = this.$moment(currentDay).subtract(1, 'days');
          days.unshift(currentDay);
        } while (currentDay.day() !== MONDAY);
      }

      currentDay = this.$moment(days[days.length - 1]);
      if (currentDay.day() !== SUNDAY) {
        do {
          currentDay = this.$moment(currentDay).add(1, 'days');
          days.push(currentDay);
        } while (currentDay.day() !== SUNDAY);
      }

      return days;
    },
    weeks() {
      const weeks = [];

      let week = [];
      for (let day of this.days) {
        week.push(day);
        if (week.length === 7) {
          weeks.push(week);
          week = [];
        }
      }

      return weeks;
    }
  }
};
</script>