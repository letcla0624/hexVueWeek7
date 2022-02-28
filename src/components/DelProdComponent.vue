<template>
  <div
    class="modal fade"
    tabindex="-1"
    aria-labelledby="delModalLabel"
    aria-hidden="true"
    ref="delModal"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="delModalLabel">
            <i class="bi bi-exclamation-triangle-fill text-danger me-2"></i
            >熊孩子，您確定要刪除<span class="text-danger mx-1">{{
              adminProd.title
            }}</span
            >嗎？
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">刪除之後資料不可逆，不可反悔喔！</div>
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
            class="btn btn-danger"
            @click="delProdBtn(adminProd.id)"
          >
            <i class="bi bi-trash-fill me-1"></i>確定刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* global bootstrap */

export let delModal = null;
export default {
  props: ["adminProd"],
  methods: {
    // 刪除單一商品
    delProdBtn(adminProdId) {
      this.$http
        .delete(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${adminProdId}`
        )
        .then((res) => {
          this.$emit("get-adminprods");
          delModal.hide();
          setTimeout(() => {
            alert(res.data.message);
          }, 1000);
        })
        .catch((err) => {
          console.dir(err.response);
          delModal.hide();
          alert(err.response.data.message);
        });
    },
  },
  mounted() {
    delModal = new bootstrap.Modal(this.$refs.delModal, {
      backdrop: "static",
      keyboard: false,
    });
  },
};
</script>
