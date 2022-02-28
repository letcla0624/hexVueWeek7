<template>
  <div class="container mb-5">
    <h1 class="text-center py-3">產品頁</h1>
    <BreadComponent></BreadComponent>
    <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-3">
      <div class="col" v-for="item in products" :key="item.id">
        <div class="card">
          <router-link :to="`/prod/${item.id}`">
            <img
              :src="item.imageUrl"
              class="card-img-top"
              alt=""
              style="height: 200px; object-fit: cover"
            />
          </router-link>
          <div class="card-body">
            <h5 class="card-title text-truncate">{{ item.title }}</h5>
            <p class="card-text text-truncate">
              {{ item.description }}
            </p>
            <p class="text-end">
              <del>$NTD {{ item.origin_price }}</del
              ><span class="text-danger fw-bold ms-2"
                >$NTD <b class="fs-3">{{ item.price }}</b></span
              >
            </p>
          </div>
          <div class="card-footer">
            <div class="btn-group w-100">
              <router-link
                :to="`/prod/${item.id}`"
                class="btn btn-outline-dark w-50"
                >商品資訊</router-link
              >
              <button
                type="button"
                class="btn btn-warning w-50"
                @click="addCart(item.id)"
                :disabled="isLoading === item.id"
              >
                <div
                  v-if="isLoading === item.id"
                  class="spinner-border spinner-border-sm"
                  role="status"
                >
                  <span class="visually-hidden">Loading...</span>
                </div>
                加入購物車
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <PageComponent :pages="pagination" @emit-page="getProducts"></PageComponent>
  </div>
</template>

<script>
import PageComponent from "@/components/PageComponent.vue";
import emitter from "@/libs/emitter.js";
import BreadComponent from "@/components/BreadComponent.vue";

export default {
  data() {
    return {
      products: [],
      pagination: {},
      isLoading: "",
    };
  },
  components: {
    PageComponent,
    BreadComponent,
  },
  methods: {
    getProducts(page = 1) {
      let loader = this.$loading.show();
      this.$http
        .get(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products?page=${page}`
        )
        .then((res) => {
          loader.hide();
          this.products = res.data.products;
          this.pagination = res.data.pagination;
        })
        .catch((err) => {
          loader.hide();
          console.dir(err);
        });
    },
    addCart(id, qty = 1) {
      this.isLoading = id;
      const data = {
        product_id: id,
        qty,
      };
      this.$http
        .post(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`,
          { data }
        )
        .then((res) => {
          // console.log(res.data);
          alert(res.data.message);
          this.isLoading = "";
          emitter.emit("get-cart");
        })
        .catch((err) => {
          console.dir(err);
        });
    },
  },
  mounted() {
    this.getProducts();
  },
};
</script>
