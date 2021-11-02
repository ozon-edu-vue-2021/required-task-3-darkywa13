<template>
  <div class="legend">
    <div class="legend__data">
      <div v-if="legend.length > 0" class="legend__items">
        <Draggable v-model="legend">
          <LegendItem
            v-for="(item, index) in legend"
            :key="index"
            :color="item.color"
            :text="item.text"
            :counter="item.counter"
            class="legend__item"
          />
        </Draggable>
      </div>
      <span v-else class="legend--empty"> Список пуст </span>
    </div>
    <div class="legend__chart">
      <div class="legend__chart-time">
        {{ formatedDate }}
      </div>

      <div class="legend__chart-canvas">
        <PieChart ref="chart" />
      </div>
    </div>
  </div>
</template>

<script>
import Draggable from "vuedraggable";
import { Doughnut as PieChart } from "vue-chartjs";
import { format } from "date-fns";
import LegendItem from "./LegendItem.vue";

export default {
  components: {
    LegendItem,
    Draggable,
    PieChart,
  },
  inject: ["legendCollection"],
  data() {
    return {
      legend: [],
    };
  },
  computed: {
    formatedDate() {
      return format(new Date(), "dd.MM.yyyy hh:mm");
    },
  },
  created() {
    this.loadLegend();
  },
  mounted() {
    this.makeChart();
  },
  methods: {
    loadLegend() {
      this.legend = Object.keys(this.legendCollection).map(
        (l) => this.legendCollection[l]
      );
    },
    makeChart() {
      const backgroundColor = [];
      const data = [];

      this.legend.forEach((l) => {
        backgroundColor.push(l.color);
        data.push(l.counter);
      });

      const legendChartData = {
        labels: this.legend.map((it) => it.text),
        datasets: [
          {
            label: "Легенда",
            backgroundColor,
            data,
          },
        ],
      };

      const options = {
        borderWidth: "10px",
        legend: {
          display: false,
        },
      };

      this.$refs.chart.renderChart(legendChartData, options);
    },
  },
};
</script>

<style scoped>
.legend {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.legend__chart-time {
  text-align: center;
  margin-bottom: 20px;
  font-weight: bold;
}

.legend__chart-canvas {
  width: 70%;
  margin: 0 auto;
}

.legend .legend__data {
  display: flex;
  height: 100%;
}

.legend .legend__items {
  flex: 1;
  width: 100%;
}

.legend .legend__items .legend__item:not(:first-child) {
  margin-top: 16px;
}

.legend .legend__items .legend__item {
  cursor: pointer;
}

.legend .legend__items .legend__item.sortable-chosen {
  opacity: 25%;
}

.legend .legend--empty {
  align-self: center;
  width: 100%;
  text-align: center;
}
</style>
