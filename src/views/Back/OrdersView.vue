<template>
  <div class="container">
    <h1 class="text-center py-3">顧客訂單</h1>
    <div class="table-responsive">
      <table class="table table-dark table-hover">
        <thead>
          <tr>
            <th>訂單日期</th>
            <th>姓名</th>
            <th>購買項目</th>
            <th>應收帳款</th>
            <th>已付款</th>
            <th>編輯／刪除</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.id">
            <td>
              {{ new Date(order.create_at * 1000).toLocaleDateString() }}
            </td>
            <td>{{ order.user.name }}</td>
            <td>
              <ul class="list-unstyled">
                <li v-for="product in order.products" :key="product.id">
                  {{ product.product.title }}／數量：{{ product.qty }}
                  {{ product.product.unit }}
                </li>
              </ul>
            </td>
            <td>$NTD {{ order.total }}</td>
            <td>
              <p v-if="order.is_paid === true" class="mb-0 text-success">
                <i class="bi bi-check-circle-fill me-1"></i>已付款
              </p>
              <p v-else class="mb-0">未付款</p>
            </td>
            <td>
              <div class="btn-group" role="group">
                <button
                  type="button"
                  class="btn btn-outline-warning btn-sm"
                  @click="openModal('edit', order)"
                >
                  <i class="bi bi-pencil-fill"></i>
                </button>
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  @click="openModal('delete', order)"
                >
                  <i class="bi bi-trash-fill"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <PageComponent :pages="pagination" @emit-page="getOrders"></PageComponent>

    <EditOrderComponent
      :order="tempOrder"
      @update-pay="getOrders"
    ></EditOrderComponent>

    <DeleteComponent
      :del-item="tempOrder"
      :page-name="pageName"
      @get-item="getOrders"
    ></DeleteComponent>
  </div>
</template>

<script>
import PageComponent from "@/components/PageComponent.vue";
import EditOrderComponent, {
  orderModal,
} from "@/components/EditOrderComponent.vue";
import DeleteComponent, { delModal } from "@/components/DeleteComponent.vue";

export default {
  data() {
    return {
      orders: {},
      pagination: {},
      tempOrder: {},
      pageName: "orders",
    };
  },
  components: {
    PageComponent,
    EditOrderComponent,
    DeleteComponent,
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
          console.dir(err.response);
          loader.hide();
        });
    },
    openModal(txt, order) {
      // console.log(txt, order);
      if (txt === "edit") {
        this.tempOrder = { ...order };
        orderModal.show();
      } else if (txt === "delete") {
        this.tempOrder = { ...order };
        delModal.show();
      }
    },
  },
  mounted() {
    this.getOrders();
  },
};
</script>
