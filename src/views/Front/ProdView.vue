<template>
  <div class="container">
    <h1 class="text-center py-3">產品內頁</h1>
    <BreadComponent></BreadComponent>
    <div class="row row-cols-1 row-cols-md-2 g-3">
      <div class="col">
        <img
          :src="prod.imageUrl"
          :alt="prod.category"
          class="w-100"
          style="height: 500px; object-fit: cover"
        />
        <div class="otherPics d-flex">
          <div v-for="(pics, idx) in prod.imagesUrl" :key="pics">
            <img
              v-if="pics !== ''"
              :src="pics"
              :alt="`${prod.category}${Number.parseInt(idx) + 1}`"
              class="rounded cursor-pointer me-2 mt-2"
              @click="changeImg($event)"
              :class="[
                { border: pics === prod.imageUrl },
                { 'border-danger': pics === prod.imageUrl },
                { 'border-2': pics === prod.imageUrl },
              ]"
            />
          </div>
        </div>
      </div>
      <div class="col">
        <div class="d-flex align-items-center mb-3">
          <h1 class="h3 mb-0 me-2">
            {{ prod.title }}
          </h1>
          <span class="badge bg-warning text-dark">{{ prod.category }}</span>
        </div>
        <h2 class="h5 text-secondary lh-base">{{ prod.description }}</h2>
        <div class="text-end">
          <p v-if="prod.price === prod.origin_price">
            售價：<b class="">$NTD</b> <b class="fs-3">{{ prod.price }}</b>
            {{ prod.unit }} / 元
          </p>
          <p v-else class="text-end">
            <del>$NTD {{ prod.origin_price }}</del
            ><span class="text-danger fw-bold ms-2"
              >$NTD <b class="fs-3">{{ prod.price }}</b></span
            >
            {{ prod.unit }} / 元
          </p>
        </div>
        <div class="d-grid gap-2 d-md-flex">
          <div class="input-group">
            <button type="button" class="btn btn-dark" @click="minus">-</button>
            <input
              type="number"
              class="form-control"
              min="1"
              v-model="qty"
              readonly
            />
            <button type="button" class="btn btn-dark" @click="add">+</button>
          </div>
          <button
            type="button"
            class="btn btn-warning w-100"
            @click="addCart(prod.id, qty)"
            :disabled="isLoading === prod.id"
          >
            <div
              v-if="isLoading === prod.id"
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
</template>

<script>
import emitter from "@/libs/emitter.js";
import BreadComponent from "@/components/BreadComponent.vue";

export default {
  data() {
    return {
      prod: [],
      qty: 1,
      isLoading: "",
    };
  },
  components: {
    BreadComponent,
  },
  methods: {
    getProd() {
      let loader = this.$loading.show();
      // 取得單一產品的路由 id
      const id = this.$route.params.id;
      this.$http
        .get(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${id}`
        )
        .then((res) => {
          // console.log(res.data.product);
          loader.hide();
          this.prod = res.data.product;
          // 將 imageUrl 增加到 imagesUrl 陣列的第一張
          this.prod.imagesUrl.unshift(this.prod.imageUrl);
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
    // 增加數量
    add() {
      this.qty++;
    },
    // 減少數量
    minus() {
      this.qty--;
      if (this.qty <= 1) {
        this.qty = 1;
      }
    },
    changeImg(e) {
      this.prod.imageUrl = e.target.currentSrc;
    },
  },
  mounted() {
    this.getProd();
  },
};
</script>

<style lang="scss">
.otherPics img {
  width: 80px;
  height: 80px;
  object-fit: cover;
}
</style>
