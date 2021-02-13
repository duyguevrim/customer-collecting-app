<template>
 <div class="d-flex flex-column align-items-center">
   <div class="medium d-flex justify-content-center pt-5">
     <pie-chart v-if="loaded" :data="chartData" :options="chartOptions"></pie-chart>

   </div>
   <div class="mt-3 d-flex flex-column">
      <span class="font-weight-bold">Toplam Tahsilat Hedefi : ₺ {{totalAmount.toFixed(2)}} </span>
      <span class="font-weight-bold">Toplam Tahsilat Miktarı : ₺ {{totalCollection.toFixed(2)}}</span>
 </div>
   <div>

   </div>
 </div>
</template>

<script>
import PieChart from './PieChart.js'

export default {
  components: {
    PieChart
  },
  data () {
    return {

      totalAmount: null,
      totalCollection: null,
      loaded: false,
      datacollection: null,
      chartOptions: {
        hoverBorderWidth: 20
      },
      chartData: {
        hoverBackgroundColor: "red",
        hoverBorderWidth: 10,
        labels: ["Yapılan Tahsilat", "Kalan Tahsilat"],
        datasets: [
          {
            label: "Data One",
            backgroundColor: ["rgb(63, 81, 181)", "rgb(255, 152, 0)"],
            data: [0,100]
          }
        ]
      }
    }
  },

   mounted() {
      this.$http.get("http://localhost:8080/api/total").then(response => {
        this.totalAmount = response.body[0];
        this.totalCollection = response.body[1];
        const result = [(response.body[1] * 100 ) / response.body[0], 100 - ((response.body[1] * 100 ) / response.body[0])];
        this.chartData.datasets[0].data = result;
        this.loaded = true;
      });
  },
}
</script>

<style>
.small {
  max-width: 600px;
  margin:  150px auto;
}
</style>
