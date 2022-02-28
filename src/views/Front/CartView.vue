<template>
  <div class="container">
    <h1 class="text-center py-3">購物車</h1>
    <BreadComponent></BreadComponent>
    <div class="row g-5 g-lg-3">
      <div class="col-lg-6">
        <h2 class="h3 text-center mb-5">購物清單</h2>
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">名稱</th>
                <th scope="col">單價</th>
                <th scope="col" style="min-width: 90px">數量/單位</th>
                <th scope="col" class="text-end">價格</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in cart.carts" :key="item.id">
                <th scope="row">
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm"
                    @click="deleteItem(item.id)"
                  >
                    <div
                      v-if="isLoading === item.id"
                      class="spinner-border spinner-border-sm"
                      role="status"
                    >
                      <span class="visually-hidden">Loading...</span>
                    </div>
                    <i v-else class="bi bi-trash-fill"></i>
                  </button>
                </th>
                <td>{{ item.product.title }}</td>
                <td>$NTD {{ item.product.price }}</td>
                <td>
                  <div class="input-group input-group-sm">
                    <select
                      class="form-select form-select-sm"
                      v-model="item.qty"
                      @change="updateCart(item)"
                      :disabled="isLoading === item.id"
                    >
                      <option
                        v-for="num in 10"
                        :key="`${num}${item.product_id}`"
                        :value="num"
                      >
                        {{ num }}
                      </option>
                    </select>
                    <span>／{{ item.product.unit }}</span>
                  </div>
                </td>
                <td class="text-end">$NTD {{ item.total }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="4" class="text-end">總價</td>
                <td
                  class="fw-bold text-danger d-flex justify-content-end align-items-center"
                >
                  $NTD<b class="fs-4 ms-1">{{ cart.total }}</b>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div class="d-grid gap-3 d-sm-flex justify-content-sm-end mt-3">
          <router-link to="/products" class="btn btn-outline-dark"
            ><i class="bi bi-cart-fill me-1"></i>繼續購物</router-link
          >
          <button
            type="button"
            class="btn btn-outline-danger"
            @click="deleteCarts(cart.carts)"
            :disabled="cart.carts.length === 0"
          >
            <div
              v-if="isLoading === cart.carts"
              class="spinner-border spinner-border-sm"
              role="status"
            >
              <span class="visually-hidden">Loading...</span>
            </div>
            <i v-else class="bi bi-trash-fill me-1"></i>
            清空購物車
          </button>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="border border-dark py-5 px-3 p-md-5 rounded-3">
          <h2 class="h3 text-center mb-5">訂購資訊</h2>
          <VForm v-slot="{ errors }" ref="form" @submit="sentOrder">
            <div class="form-floating mb-3">
              <VField
                type="email"
                name="訂購者信箱"
                class="form-control border-0 border-bottom rounded-0"
                :class="{ 'is-invalid': errors['訂購者信箱'] }"
                id="email"
                placeholder="name@example.com"
                rules="email|required"
                v-model="form.user.email"
              ></VField>
              <ErrorMessage
                name="訂購者信箱"
                class="invalid-feedback"
              ></ErrorMessage>
              <label for="email"
                ><span class="text-danger me-1">*</span>訂購者信箱</label
              >
            </div>
            <div class="form-floating mb-3">
              <VField
                type="text"
                name="收件人姓名"
                class="form-control border-0 border-bottom rounded-0"
                :class="{ 'is-invalid': errors['收件人姓名'] }"
                id="name"
                placeholder="收件人姓名"
                rules="required"
                v-model="form.user.name"
              ></VField>
              <ErrorMessage
                name="收件人姓名"
                class="invalid-feedback"
              ></ErrorMessage>
              <label for="name"
                ><span class="text-danger me-1">*</span>收件人姓名</label
              >
            </div>
            <div class="form-floating mb-3">
              <VField
                type="tel"
                name="收件人手機號"
                class="form-control border-0 border-bottom rounded-0"
                :class="{ 'is-invalid': errors['收件人手機號'] }"
                id="tel"
                placeholder="收件人手機號"
                :rules="isPhone"
                v-model="form.user.tel"
              ></VField>
              <ErrorMessage
                name="收件人手機號"
                class="invalid-feedback"
              ></ErrorMessage>
              <label for="tel"
                ><span class="text-danger me-1">*</span>收件人手機號</label
              >
            </div>
            <div class="form-floating mb-3">
              <VField
                type="text"
                name="收件人地址"
                class="form-control border-0 border-bottom rounded-0"
                :class="{ 'is-invalid': errors['收件人地址'] }"
                id="address"
                placeholder="收件人地址"
                rules="required"
                v-model="form.user.address"
              ></VField>
              <ErrorMessage
                name="收件人地址"
                class="invalid-feedback"
              ></ErrorMessage>
              <label for="tel"
                ><span class="text-danger me-1">*</span>收件人地址</label
              >
            </div>
            <div class="form-floating mb-3">
              <textarea
                class="form-control border-0 border-bottom rounded-0"
                placeholder="留言"
                id="message"
                style="height: 150px"
                v-model="form.message"
              ></textarea>
              <label for="message">留言</label>
            </div>
            <button
              type="submit"
              class="btn btn-warning w-100 mt-3"
              :disabled="cart.carts.length === 0"
            >
              <i class="bi bi-credit-card-fill me-1"></i>
              送出訂單，並結帳
            </button>
          </VForm>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import emitter from "@/libs/emitter";
import BreadComponent from "@/components/BreadComponent.vue";

export default {
  data() {
    return {
      cart: {
        carts: [],
      },
      isLoading: "",
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: "",
        },
        message: "",
      },
    };
  },
  components: {
    BreadComponent,
  },
  methods: {
    getCart() {
      let loader = this.$loading.show();
      this.$http
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          loader.hide();
          this.cart = res.data.data;
          emitter.emit("get-cart");
        })
        .catch((err) => {
          loader.hide();
          console.dir(err);
        });
    },
    updateCart(item) {
      this.isLoading = item.id;
      const data = {
        product_id: item.product_id,
        qty: item.qty,
      };
      this.$http
        .put(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${item.id}`,
          { data }
        )
        .then((res) => {
          alert(res.data.message);
          this.isLoading = "";
          this.getCart();
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    deleteItem(id) {
      this.isLoading = id;
      this.$http
        .delete(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${id}`
        )
        .then((res) => {
          alert(res.data.message);
          this.isLoading = "";
          this.getCart();
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    deleteCarts(carts) {
      this.isLoading = carts;
      this.$http
        .delete(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/carts`
        )
        .then((res) => {
          alert(res.data.message);
          this.isLoading = "";
          this.getCart();
        })
        .catch((err) => {
          // console.dir(err);
          alert(err.response.data.message);
        });
    },
    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/;
      return phoneNumber.test(value) ? true : "需要正確的電話號碼";
    },
    sentOrder() {
      let loader = this.$loading.show();
      this.$http
        .post(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order`,
          { data: this.form }
        )
        .then((res) => {
          loader.hide();
          alert(
            `${res.data.message}, 訂單編號：${res.data.create_at}, 總金額：${res.data.total}`
          );
          this.$refs.form.resetForm();
          this.form.message = "";
          this.getCart();
          this.$router.push("/pay");
        })
        .catch((err) => {
          // console.dir(err);
          loader.hide();
          alert(err.response.data.message);
        });
    },
  },
  mounted() {
    this.getCart();
  },
};
</script>
