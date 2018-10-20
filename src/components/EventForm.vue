<template>
  <div id="event-form" :class="{active: active}" :style="{top: top, left: left}">
    <h4>Add an event</h4>
    <p>{{ date.format('dddd, MMM Do') }}</p>
    <div class="text">
      <input type="text" v-focus v-model="description" @keyup.enter="create" placeholder="Dinner at Pancho's">
    </div>
    <div class="buttons">
      <button @click="create">Create</button>
    </div>
    <button id="close-button" @click="close">&#10005</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      description: ''
    };
  },
  methods: {
    create() {
      if (!this.description.length) return;

      this.$store.commit('addEvent', this.description);
      this.description = '';
      this.$store.commit('eventFormSetActive', false);
    },
    close() {
      this.$store.commit('eventFormSetActive', false);
    }
  },
  computed: {
    date() {
      return this.$store.state.eventFormDate;
    },
    active() {
      return this.$store.state.eventFormActive;
    },
    top() {
      return `${this.$store.state.eventFormPosY}px`;
    },
    left() {
      return `${this.$store.state.eventFormPosX}px`;
    }
  },
  directives: {
    focus: {
      update(el) {
        el.focus();
      }
    }
  }
};
</script>
