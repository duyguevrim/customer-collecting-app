<template>
  <div class="d-flex justify-content-end">
    <div class="info-card ml-3">
      <export-excel
          :data="customerList">
        <v-icon name="download" style="width: 30px; color: #1b4989;"></v-icon>
        <h1 class="pt-2">Excel Raporu</h1>

        <h4>İndir</h4>
      </export-excel>

    </div>
    <div class="info-card ml-3">
      <v-icon name="bar-chart-2" style="width: 30px; color: #1b4989;"></v-icon>
      <h1 class="pt-2">Toplam Sipariş Tutarı</h1>
      <h4>₺ {{ totalAmount.toFixed(2) }}</h4>
    </div>
    <div class="info-card ml-3">
      <v-icon name="check" style="width: 30px; color: #1b4989;"></v-icon>
      <h1 class="pt-2">Toplam Sipariş Tahsilatı</h1>
      <h4>₺ {{ totalCollection.toFixed(2) }}</h4>
    </div>
    <div class="info-card ml-3">
      <v-icon name="percent" style="width: 30px; color: #1b4989;"></v-icon>
      <h1 class="pt-2">Tahsilat Oranı</h1>
      <h4>% {{ ((totalCollection * 100) / totalAmount).toFixed(2) }}</h4>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReportCard",
  data() {
    return {
      customerList: [],
      totalAmount: null,
      totalCollection: null,
    }
  },
  mounted() {

    this.$http.get("http://localhost:8080/api/total").then(response => {
      this.totalAmount = response.body[0];
      this.totalCollection = response.body[1];

    });
  },
  created() {
    try {
      this.$http.get("http://localhost:8080/api/customers").then(response => {
        let data = response.data;
        this.customerList = [];
        for (let key in data) {
          this.customerList.push(data[key])
        }
        for (let i = 0; i < this.customerList.length; i++) {
          this.params.data.push([this.customerList[i].name, this.customerList[i].totalAmount, this.customerList[i].collectionAmount, (this.customerList[i].totalAmount - this.customerList[i].collectionAmount), (this.customerList[i].totalAmount - this.customerList[i].collectionAmount) === 0 ? 'Evet' : 'Hayır'])
        }
      });
    } catch (e) {
      console.log(e);
    }
  },
}
</script>

<style scoped>
body {
  color: #323232;
  font-family: 'Open Sans', arial, sans-serif;
}

h1 {
  color: #0075d2;
  font-size: 18px;
}


.info-card {
  align-self: flex-start;
  background-color: white;
  border: 2px solid #d8d8d8;
  border-radius: 5px;
  cursor: pointer;
  overflow: hidden;
  padding: 10px;
  text-align: center;
  margin-top: 18px;
  width: 250px;
  transition: all 0.2s ease-out;
  z-index: 0;
}

</style>
