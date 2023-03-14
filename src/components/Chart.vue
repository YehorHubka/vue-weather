<template>
  <div class="chart-box">
    <Line :data="data" :options="options" />
  </div>
</template>

<script>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "vue-chartjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default {
  name: "App",
  components: {
    Line,
  },
  props: {
    hourlyData: Object,
  },
  data() {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
      data: {
        labels: [],
        datasets: [
          {
            label: "Temperature, °C",
            backgroundColor: "#42b983",
            data: [],
          },
        ],
      },
    };
  },
  created() {
    let dataArray = this.hourlyData.hourly.slice(0, 24);
    dataArray.map((i) => {
      let date = new Date(i.dt * 1000).toLocaleString("en-US", {
        hour: "numeric",
        hour12: true,
      });
      this.data.labels.push(date);
      this.data.datasets[0].data.push(Math.round(i.temp - 273.15));
    });
  },
};
</script>

<style scoped lang="scss">
.chart-box {
  margin: 0 auto;
  max-width: 700px;
  canvas {
    width: 100%;
  }
}
</style>