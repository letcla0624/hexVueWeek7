<template>
  <div
    class="modal fade"
    tabindex="-1"
    aria-labelledby="prodModalLabel"
    aria-hidden="true"
    ref="prodModal"
  >
    <div class="modal-dialog modal-xl modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="prodModalLabel">
            {{ isNew ? "新增商品" : "編輯商品" }}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p class="text-secondary">
            <span class="text-danger me-1">*</span>為必填欄位
          </p>
          <div class="row">
            <div class="col-lg-7">
              <h5 class="h5">商品內容</h5>
              {{ adminProd }}
              <div class="form-floating mb-3">
                <input
                  type="text"
                  class="form-control border-0 border-bottom rounded-0"
                  id="title"
                  placeholder="商品名稱"
                  v-model="adminProd.title"
                />
                <label for="title">
                  <span class="text-danger me-1">*</span>商品名稱(title)
                </label>
              </div>
              <div class="row g-3">
                <div class="col-sm">
                  <div class="form-floating mb-3">
                    <select
                      class="form-select border-0 border-bottom rounded-0"
                      id="categories"
                      aria-label="Floating label select"
                    >
                      <option disabled>請選擇</option>
                      <option
                        v-for="category in categories"
                        :key="category"
                        :value="category"
                      >
                        {{ category }}
                      </option>
                    </select>
                    <label for="categories"
                      ><span class="text-danger me-1">*</span
                      >分類(category)</label
                    >
                  </div>
                </div>
                <div class="col-sm">
                  <div class="form-floating mb-3">
                    <input
                      type="text"
                      class="form-control border-0 border-bottom rounded-0"
                      id="unit"
                      placeholder="單位"
                    />
                    <label for="unit"
                      ><span class="text-danger me-1">*</span>單位(unit)</label
                    >
                  </div>
                </div>
              </div>
              <div class="row g-3">
                <div class="col-sm">
                  <div class="form-floating mb-3">
                    <input
                      type="number"
                      class="form-control border-0 border-bottom rounded-0"
                      id="origin_price"
                      placeholder="原價"
                      min="0"
                    />
                    <label for="origin_price"
                      ><span class="text-danger me-1">*</span>原價(origin
                      price)</label
                    >
                  </div>
                </div>
                <div class="col-sm">
                  <div class="form-floating mb-3">
                    <input
                      type="number"
                      class="form-control border-0 border-bottom rounded-0"
                      id="price"
                      placeholder="售價"
                      min="0"
                    />
                    <label for="price"
                      ><span class="text-danger me-1">*</span>售價(price)</label
                    >
                  </div>
                </div>
              </div>
              <div class="form-floating mb-3">
                <textarea
                  class="form-control border-0 border-bottom rounded-0"
                  placeholder="Leave a comment here"
                  id="description"
                  style="height: 200px"
                ></textarea>
                <label for="description">商品描述(description)</label>
              </div>
              <div class="form-floating mb-3">
                <textarea
                  class="form-control border-0 border-bottom rounded-0"
                  placeholder="Leave a comment here"
                  id="content"
                  style="height: 200px"
                ></textarea>
                <label for="content">商品規格(content)</label>
              </div>
              <div class="form-check my-5">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="is_enabled"
                  :true-value="1"
                  :false-value="0"
                />
                <label class="form-check-label" for="is_enabled">
                  {{ adminProd.is_enabled ? "啟用" : "不啟用 " }}
                </label>
              </div>
            </div>
            <div class="col-lg-5"></div>
          </div>
        </div>

        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-link text-decoration-none text-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button
            type="button"
            class="btn"
            :class="[{ 'btn-dark': isNew }, { 'btn-warning': !isNew }]"
            @click="upProdBtn"
          >
            <i
              class="bi me-2"
              :class="[{ 'bi-check-lg': isNew }, { 'bi-check-all': !isNew }]"
            ></i
            >{{ isNew ? "確定新增" : "確定修改" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* global bootstrap */

export let prodModal = null;
export default {
  props: ["adminProd", "isNew"],
  data() {
    return {
      categories: ["蛋糕", "甜甜圈", "馬卡龍"],
    };
  },

  methods: {
    upProdBtn() {
      let api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product`;
      let httpMethod = "post";

      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${this.adminProd.id}`;
        httpMethod = "put";
      }

      this.$http[httpMethod](api, { data: this.adminProd })
        .then((res) => {
          // console.log(res.data);
          this.$emit("get-adminprods");
          prodModal.hide();
          setTimeout(() => {
            alert(res.data.message);
          }, 1000);
        })
        .catch((err) => {
          console.dir(err.response);
          prodModal.hide();
        });
    },
  },
  mounted() {
    prodModal = new bootstrap.Modal(this.$refs.prodModal, {
      backdrop: "static",
      keyboard: false,
    });
  },
};
</script>
