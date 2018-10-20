<template>
  <div :class="classObject" @click="captureClick">
    {{ day.format('D') }}
    <ul class="event-list">
      <li v-for="(event, index) in events" :key="index">{{ event.description }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['day'],
  computed: {
    events() {
      return this.$store.state.events.filter((event) =>
        event.date.isSame(this.day, 'day')
      );
    },
    classObject() {
      const now = this.$moment();
      const today = this.day.isSame(now, 'day');
      const eventFormDate = this.$store.state.eventFormDate;
      const eventFormActive = this.$store.state.eventFormActive;

      return {
        day: true,
        today,
        past: this.day.isSameOrBefore(now, 'day') && !today,
        active: eventFormDate.isSame(this.day, 'day') && eventFormActive
      };
    }
  },
  methods: {
    captureClick(event) {
      this.$store.commit('eventFormSetPos', {
        x: event.clientX,
        y: event.clientY
      });

      this.$store.commit('eventFormSetActive', true);
      this.$store.commit('eventFormSetDate', this.day);
    }
  }
};
</script>

