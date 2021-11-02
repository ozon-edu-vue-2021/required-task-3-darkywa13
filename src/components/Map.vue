<template>
  <div class="map" @click="deselectPerson">
    <h3>Карта офиса</h3>

    <div v-if="!isLoading" class="map-root">
      <MapSVG ref="svgMap" />
      <Table v-show="false" ref="svgTable" />
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<script>
import * as d3 from "d3";
import MapSVG from "@/assets/images/map.svg";
import tables from "@/assets/data/tables.json";
import Table from "@/assets/images/workPlace.svg";
import people from "@/assets/data/people.json";

export default {
  props: {
    isUserOpenned: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    MapSVG,
    Table,
  },
  inject: ["legendCollection"],
  data() {
    return {
      isLoading: false,
      svgMap: null,
      svgTable: null,
      mainGroup: null,
      tables,
      people,
    };
  },
  async mounted() {
    this.isLoading = true;

    this.svgMap = d3.select(this.$refs.svgMap);
    this.svgTable = d3.select(this.$refs.svgTable);
    this.mainGroup = this.svgMap.select("g");

    if (this.mainGroup) {
      this.drawTables();
    } else {
      alert("SVG is incorrect");
    }

    this.isLoading = false;
  },
  methods: {
    drawTables() {
      const svgTablesGroupPlace = this.mainGroup
        .append("g")
        .classed("groupPlaces", true);

      this.tables.map((table) => {
        const targetSeat = svgTablesGroupPlace
          .append("g")
          .attr("transform", `translate(${table.x}, ${table.y}) scale(0.5)`)
          .attr("id", table._id)
          .classed("employer-place", true)
          .on("click", this.selectPerson.bind(this, table));

        targetSeat
          .append("g")
          .attr("transform", `rotate(${table.rotate || 0})`)
          .attr("group_id", table.group_id)
          .classed("table", true)
          .html(this.svgTable.html())
          .attr(
            "fill",
            this.legendCollection[table.group_id]?.color ?? "transparent"
          );
      });
    },
    deselectPerson() {
      if (this.isUserOpenned) {
        this.$emit("update:isUserOpenned", false);
      }
    },
    selectPerson(table, $e) {
      $e.stopPropagation();

      const person = this.people.find((p) => p.tableId === table._id);

      this.$emit("set-person", person || null);
    },
  },
};
</script>

<style scoped>
.map {
  height: 100%;
  width: 100%;
  padding: 24px;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.map-root {
  height: 100%;
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
}

h3 {
  margin-top: 0px;
}

::v-deep svg {
  height: 100%;
  width: 100%;
}

::v-deep .table {
  cursor: pointer;
}
</style>
