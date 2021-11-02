<template>
  <div class="menu">
    <div class="toolbar">
      <div class="toolbar__header">
        <h3>{{ title }}</h3>

        <div v-if="isUserOpenned" class="action">
          <button class="close" type="button" @click="closeProfile">
            <span class="icon material-icons-outlined"> close </span>
          </button>
        </div>
      </div>
    </div>
    <div class="content">
      <keep-alive>
        <component :is="activeComponent" :person="person" />
      </keep-alive>
    </div>
  </div>
</template>

<script>
// можно подгрузить асинхронно
import SideLegend from "./SideMenu/SideLegend.vue";
import SidePerson from "./SideMenu/SidePerson.vue";

export default {
  props: {
    isUserOpenned: {
      type: Boolean,
      default: false,
    },
    person: {
      type: Object,
      default: null,
    },
  },
  components: {
    SideLegend,
    SidePerson,
  },
  data() {
    return {};
  },
  computed: {
    activeComponent() {
      return !this.isUserOpenned ? "SideLegend" : "SidePerson";
    },
    title() {
      return !this.isUserOpenned ? "Информация" : "Профиль";
    },
  },
  methods: {
    closeProfile() {
      if (this.isUserOpenned) {
        this.$emit("update:isUserOpenned", false);
      }
    },
  },
};
</script>

<style scoped>
.menu {
  border-left: 1px solid #ccd8e4;
  padding: 24px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.toolbar .toolbar__actions button {
  font-size: 0.76rem;
  text-transform: uppercase;
  letter-spacing: 0.08rem;
  padding: 2px 6px;
}

.toolbar__header {
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.toolbar__header .action {
  flex: 1;
  margin-left: 14px;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.toolbar__header .action .close {
  display: flex;
  background-color: transparent;
  border: none;
  padding: 0;
}

.toolbar__header .action .close:hover {
  cursor: pointer;
}

.toolbar__header .action .close .icon {
  font-size: 30px;
  color: black;
}

h3 {
  margin: 0;
}

.content {
  flex: 1;
  margin-top: 40px;
}
</style>
