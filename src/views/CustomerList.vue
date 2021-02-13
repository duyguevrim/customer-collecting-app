<template>
  <div style="width: 100%;" class="p-4">
    <report-card></report-card>
    <vue-table-dynamic
        :params="params"
        ref="table"
    >
    </vue-table-dynamic>
  </div>
</template>

<script>
import VueTableDynamic from 'vue-table-dynamic'
import ReportCard from "@/views/ReportCard";

export default {
  name: 'Demo',
  data() {
    return {
      params: {
        data: [
            ['Müşteri Adı', `Hedeflenen Toplam Bakiye`, `Tahsilat Miktarı`, `Kalan Bakiye`, `Ödeme Tamamlandı Mı?`]
        ],
        customerList: [],
        header: 'row',
        border: true,
        stripe: true,
        pagination: true,
        pageSize: 20,
        enableSearch: true,
        sort: [0, 1,2,3,4]
      }
    }
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
  components: {VueTableDynamic, ReportCard}
}
</script>
