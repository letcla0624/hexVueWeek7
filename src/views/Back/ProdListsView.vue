<template>
  <div class="container">
    <div class="d-sm-flex justify-content-between align-items-center py-3">
      <h1 class="h2">
        後台產品列表<span class="fs-5"
          >【目前有 {{ Object.keys(adminProds).length }} 項產品】</span
        >
      </h1>
      <div class="d-flex align-items-center justify-content-between">
        <button
          type="button"
          class="btn btn-dark ms-3"
          @click="openModal('new')"
        >
          <i class="bi bi-pencil-square me-1"></i>
          新增商品
        </button>
      </div>
    </div>
    <div class="table-responsive">
      <table class="table table-dark table-hover">
        <thead>
          <tr>
            <th>分類</th>
            <th>名稱</th>
            <th>原價</th>
            <th>售價</th>
            <th>是否啟用</th>
            <th>編輯／刪除</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="adminProd in adminProds" :key="adminProd.id">
            <td>{{ adminProd.category }}</td>
            <td
              class="text-decoration-underline cursor-pointer"
              @click="openModal('detail', adminProd)"
            >
              {{ adminProd.title }}
            </td>
            <td>$NTD {{ adminProd.origin_price }}</td>
            <td>$NTD {{ adminProd.price }}</td>
            <td>
              <p v-if="adminProd.is_enabled" class="mb-0 text-warning">啟用</p>
              <p v-else class="mb-0 text-secondary">未啟用</p>
            </td>
            <td>
              <div class="btn-group" role="group">
                <button
                  type="button"
                  class="btn btn-outline-warning btn-sm"
                  @click="openModal('edit', adminProd)"
                >
                  <i class="bi bi-pencil-fill"></i>
                </button>
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  @click="openModal('delete', adminProd)"
                >
                  <i class="bi bi-trash-fill"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <AdminProdViewComponent :show-prod="createProdTemp"></AdminProdViewComponent>

  <CreateProdComponent
    :admin-prod="createProdTemp"
    :is-new="isNew"
    @get-adminprods="getAdminProds"
  ></CreateProdComponent>

  <DeleteComponent
    :del-item="createProdTemp"
    :page-name="pageName"
    @get-item="getAdminProds"
  ></DeleteComponent>
</template>

<script>
// /* global bootstrap */
import CreateProdComponent, {
  prodModal,
} from "@/components/CreateProdComponent.vue";
import DeleteComponent, { delModal } from "@/components/DeleteComponent.vue";
import AdminProdViewComponent, {
  showAdminProdModal,
} from "@/components/AdminProdViewComponent.vue";

export default {
  data() {
    return {
      adminProds: {},
      pagination: "",
      temp: {},
      isLoading: "",
      isNew: true,
      pageName: "prodsList",
      createProdTemp: {
        imagesUrl: [],
      },
    };
  },
  components: {
    CreateProdComponent,
    DeleteComponent,
    AdminProdViewComponent,
  },
  methods: {
    getAdminProds() {
      let loader = this.$loading.show();
      this.$http
        .get(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products/all`
        )
        .then((res) => {
          loader.hide();
          // 物件轉陣列
          this.adminProds = Object.keys(res.data.products)
            .map((key) => res.data.products[key])
            .reverse();

          // this.adminProds = res.data.products;
          this.pagination = res.data.pagination;
        })
        .catch((err) => {
          loader.hide();
          console.dir(err);
        });
    },
    openModal(txt, adminProd) {
      // console.log(txt, adminProd);
      if (txt === "new") {
        this.isNew = true;
        this.createProdTemp = {
          imagesUrl: [],
        };
        prodModal.show();
      } else if (txt === "edit") {
        this.isNew = false;
        this.createProdTemp = JSON.parse(JSON.stringify(adminProd));
        prodModal.show();
        // console.log(this.createProdTemp);
      } else if (txt === "delete") {
        this.isNew = false;
        this.createProdTemp = { ...adminProd };
        delModal.show();
      } else if (txt === "detail") {
        this.isNew = false;
        this.createProdTemp = adminProd;
        showAdminProdModal.show();
      }
    },
  },
  mounted() {
    this.getAdminProds();
  },
};
</script>
