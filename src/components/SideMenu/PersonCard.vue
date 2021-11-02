<template>
  <div class="person">
    <div class="person__photo">
      <img :src="person.picture" alt="photo" />
      <a href="#" class="action action_grey" type="button" target="_blink">
        <span class="icon material-icons-outlined"> house </span>
      </a>
    </div>
    <div class="person__info">
      <div class="person__info-name">
        <b>{{ person.name }} ({{ person.age }})</b>
      </div>

      <div class="person__info-date">Дата: {{ formatedDate }}</div>
      <div class="person__info-depart">Почта: {{ person.email }}</div>

      <div class="person__info-actions">
        <a
          v-if="person.email"
          :href="'mailto:' + person.email"
          class="action"
          type="button"
          target="_blink"
        >
          <span class="icon material-icons-outlined"> email </span>
        </a>
        <a href="#" class="action" type="button" target="_blink">
          <span class="action__label">K3</span>
          <span class="icon material-icons-outlined"> link </span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { format } from "date-fns";

export default {
  props: {
    person: {
      type: Object,
      required: true,
    },
  },
  computed: {
    formatedDate() {
      return format(new Date(this.person.registered), "dd.MM.yyyy hh:mm");
    },
  },
};
</script>

<style scoped>
.person {
  display: grid;
  grid-template-columns: 200px minmax(0, 1fr);
  grid-gap: 15px;
}

.person__photo {
  position: relative;
}

.person__photo .action {
  position: absolute;
  left: -10px;
  bottom: 10px;
}

.person__photo img {
  height: 200px;
  width: 200px;
  display: block;
  border-radius: 5px;
}

.person__info {
  display: flex;
  flex-direction: column;
}

.person__info-name {
  color: #2859f1;
  font-size: 18px;
  margin-bottom: 10px;
}

.person__info-date {
  font-weight: bold;
  margin-bottom: 10px;
  font-size: 16px;
}

.person__info-depart {
  color: #a3a3a3;
  font-size: 16px;
}

.person__info-actions {
  display: flex;
  contain: content;
  justify-content: space-between;
  flex: 1;
  align-items: self-end;
  padding-bottom: 10px;
}

.action {
  display: inline-flex;
  align-items: center;
  background-color: #e3eaff;
  text-decoration: none;
  border-radius: 5px;
  padding: 5px;
  color: #2859f1;
}

.action__label {
  font-weight: bold;
  margin-right: 10px;
}

.action.action_grey {
  background-color: rgb(68 68 68 / 50%);
  -webkit-backdrop-filter: blur(140px);
  backdrop-filter: blur(20px);
  color: #fff;
}
</style>
