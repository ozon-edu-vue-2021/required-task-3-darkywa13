<template>
  <div class="profile">
    <div v-if="!person" class="profile__empty">Место пустое</div>

    <PersonCard v-else :person="person" />
  </div>
</template>

<script>
import PersonCard from "./PersonCard.vue";

export default {
  props: {
    person: {
      type: Object,
      default: null,
    },
  },
  components: { PersonCard },
};
</script>

<style scoped>
.profile__empty {
  text-align: center;
  font-weight: bold;
}
</style>
