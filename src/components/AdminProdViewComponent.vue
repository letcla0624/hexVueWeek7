<template>
  <div
    class="modal fade"
    tabindex="-1"
    aria-labelledby="adminProdModalLabel"
    aria-hidden="true"
    ref="showAdminProdModal"
  >
    <div class="modal-dialog modal-xl modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="adminProdModalLabel">商品預覽內容</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-5 col-lg-4">
              <div class="mainPic border border-5 border-danger rounded-3">
                <img :src="showProd.imageUrl" :alt="showProd.category" />
              </div>
              <div class="otherPics">
                <template v-for="(pics, idx) in showProd.imagesUrl" :key="idx">
                  <img
                    v-if="pics !== ''"
                    :src="pics"
                    :alt="showProd.title"
                    class="rounded cursor-pointer me-2 mt-2"
                    :class="{
                      border: pics == showProd.imageUrl,
                      'border-danger': pics == showProd.imageUrl,
                      'border-2': pics == showProd.imageUrl,
                    }"
                  />
                </template>
              </div>
            </div>
            <div class="col-md-7 col-lg-8">
              <div class="card border-0 bg-transparent">
                <div class="card-body px-0">
                  <div class="d-flex align-items-center">
                    <h2 class="h2 mb-0">{{ showProd.title }}</h2>
                    <span
                      class="badge rounded-pill bg-warning fs-6 text-dark ms-2 px-3"
                      >{{ showProd.category }}</span
                    >
                  </div>
                  <p class="fs-5 mt-1">{{ showProd.description }}</p>
                  <div class="row align-items-lg-end mt-lg-5">
                    <div class="col-lg-7">
                      <p
                        v-if="showProd.price === showProd.origin_price"
                        class="mb-0"
                      >
                        售價：<strong class="">NT$</strong
                        ><strong class="fs-2">{{ showProd.price }}</strong>
                        {{ showProd.unit }} / 元
                      </p>
                      <p v-else class="mb-0">
                        優惠價：<strong class="text-danger">NT$</strong
                        ><strong class="fs-2 text-danger">{{
                          showProd.price
                        }}</strong
                        ><del class="text-secondary ms-2"
                          >NT$ {{ showProd.origin_price }}</del
                        >
                        {{ showProd.unit }} / 元
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-warning" data-bs-dismiss="modal">
            關閉商品
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* global bootstrap */

export let showAdminProdModal = null;
export default {
  props: ["showProd"],
  mounted() {
    showAdminProdModal = new bootstrap.Modal(this.$refs.showAdminProdModal, {
      backdrop: "static",
      keyboard: false,
    });
  },
};
</script>

<style lang="scss">
.mainPic img {
  height: 308px;
  width: 100%;
  object-fit: cover;
}
.otherPics img {
  width: 80px;
  height: 80px;
  object-fit: cover;
}
</style>
