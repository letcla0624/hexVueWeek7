<template>
  <div class="container">
    <h1 class="text-center py-3">顧客訂單</h1>
    <div class="table-responsive">
      <table class="table table-dark table-hover">
        <thead>
          <tr>
            <th>序號</th>
            <th>訂單編號</th>
            <th>姓名</th>
            <th>總價</th>
            <th>已付款</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.id">
            <td># {{ order.num }}</td>
            <td>{{ order.create_at }}</td>
            <td>{{ order.user.name }}</td>
            <td>$NTD {{ order.total }}</td>
            <td>{{ order.is_paid }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <PageComponent :pages="pagination" @emit-page="getOrders"></PageComponent>
  </div>
</template>

<script>
import PageComponent from "@/components/PageComponent.vue";
export default {
  data() {
    return {
      orders: [],
      pagination: {},
      temp: {},
    };
  },
  components: {
    PageComponent,
  },
  methods: {
    getOrders(page = 1) {
      let loader = this.$loading.show();
      this.$http
        .get(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/orders?page=${page}`
        )
        .then((res) => {
          // console.log(res.data);
          loader.hide();
          this.orders = res.data.orders;
          this.pagination = res.data.pagination;
        })
        .catch((err) => {
          console.log(err.response);
          loader.hide();
        });
    },
  },
  mounted() {
    this.getOrders();
  },
};
</script>
