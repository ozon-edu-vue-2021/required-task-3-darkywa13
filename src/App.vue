<template>
  <div id="app">
    <div class="office">
      <Map :is-user-openned.sync="isUserOpenned" @set-person="setPerson" />
      <SideMenu :is-user-openned.sync="isUserOpenned" :person="person" />
    </div>
  </div>
</template>

<script>
import Map from "./components/Map.vue";
import SideMenu from "./components/SideMenu.vue";
import legend from "@/assets/data/legend.json";

const legendCollection = legend.reduce((p, c) => {
  p[c.group_id] = c;

  return p;
}, {});

export default {
  name: "App",
  components: {
    Map,
    SideMenu,
  },
  provide: {
    legendCollection,
  },
  data() {
    return {
      isUserOpenned: false,
      person: null,
    };
  },
  methods: {
    setPerson(person) {
      this.person = person;
      this.isUserOpenned = true;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  background-color: #fafafa;
  padding: 24px;
  box-sizing: border-box;
}

html,
body,
#app {
  height: 100%;
}

* {
  box-sizing: border-box;
}

h3 {
  margin-top: 0px;
}

.office {
  display: grid;
  grid-template-columns: 1fr 520px;
  border-radius: 6px;
  border: 1px solid #ccd8e4;
  height: 100%;
  background: white;
  max-width: 1500px;
  margin: 0 auto;
}
</style>
