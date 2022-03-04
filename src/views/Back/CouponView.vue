<template>
  <div class="container">
    <h1 class="text-center py-3">優惠券</h1>
    <div class="text-end mb-3">
      <button type="button" class="btn btn-dark ms-3" @click="openModal('new')">
        <i class="bi bi-pencil-square me-1"></i>
        新增優惠券
      </button>
    </div>
    <div class="table-responsive">
      <table class="table table-dark table-hover">
        <thead>
          <tr>
            <th>標題</th>
            <th>折扣百分比</th>
            <th>到期日</th>
            <th>是否啟用</th>
            <th>編輯／刪除</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="coupon in coupons" :key="coupon.id">
            <td>{{ coupon.title }}</td>
            <td>{{ coupon.percent }}%</td>
            <td>{{ new Date(coupon.due_date * 1000).toLocaleDateString() }}</td>
            <td>
              <span
                v-if="coupon.is_enabled"
                :true-value="1"
                :false-value="0"
                class="text-success"
                >啟用</span
              >
              <span v-else class="text-muted">未啟用</span>
            </td>
            <td>
              <div class="btn-group">
                <button
                  class="btn btn-outline-warning btn-sm"
                  @click="openModal('edit', coupon)"
                >
                  <i class="bi bi-pencil-fill"></i>
                </button>
                <button
                  class="btn btn-outline-danger btn-sm"
                  @click="openModal('delete', coupon)"
                >
                  <i class="bi bi-trash-fill"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <PageComponent :pages="pagination" @emit-page="getCoupons"></PageComponent>
    <CreateCouponComponent
      :coupon="tempCoupon"
      :is-new="isNew"
      @update-coupons="getCoupons"
    ></CreateCouponComponent>
    <DeleteComponent
      :del-item="tempCoupon"
      :page-name="pageName"
      @get-item="getCoupons"
    ></DeleteComponent>
  </div>
</template>

<script>
import PageComponent from "@/components/PageComponent.vue";
import CreateCouponComponent, {
  couponModal,
} from "@/components/CreateCouponComponent.vue";
import DeleteComponent, { delModal } from "@/components/DeleteComponent.vue";
export default {
  data() {
    return {
      coupons: {
        is_enabled: false,
      },
      tempCoupon: {
        is_enabled: false,
      },
      pageName: "coupons",
      pagination: {},
      isNew: true,
    };
  },
  components: {
    PageComponent,
    CreateCouponComponent,
    DeleteComponent,
  },
  methods: {
    getCoupons(page = 1) {
      let loader = this.$loading.show();
      this.$http
        .get(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupons?page=${page}`
        )
        .then((res) => {
          // console.log(res.data);
          loader.hide();
          this.coupons = res.data.coupons;
          this.pagination = res.data.pagination;
        })
        .catch((err) => {
          console.dir(err.response);
          loader.hide();
        });
    },
    openModal(txt, coupon) {
      if (txt === "new") {
        this.isNew = true;
        this.tempCoupon = {};
        couponModal.show();
      } else if (txt === "edit") {
        this.isNew = false;
        this.tempCoupon = { ...coupon };
        this.isNew = false;
        couponModal.show();
      } else if (txt === "delete") {
        this.isNew = false;
        this.tempCoupon = { ...coupon };
        this.isNew = false;
        delModal.show();
      }
    },
  },
  mounted() {
    this.getCoupons();
  },
};
</script>
