<template>
  <div :class="classObject">{{ day.format('D') }}</div>
</template>

<script>
export default {
  props: ['day'],
  computed: {
    classObject() {
      const now = this.$moment();
      const today = this.day.isSame(now, 'day');
      return {
        day: true,
        today,
        past: this.day.isSameOrBefore(now, 'day') && !today
      };
    }
  }
};
</script>

