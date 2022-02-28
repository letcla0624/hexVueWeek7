<template>
  <nav style="--bs-breadcrumb-divider: '>'" aria-label="breadcrumb">
    <ol class="breadcrumb mb-5">
      <li
        v-for="(item, idx) in breadcrumbList"
        :key="idx + `_${item}`"
        class="breadcrumb-item"
        @click="routeTo(idx)"
      >
        {{ item.name }}
      </li>
    </ol>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      breadcrumbList: [],
    };
  },
  watch: {
    $route() {
      this.nowBreadcrumb();
    },
  },
  methods: {
    nowBreadcrumb() {
      this.breadcrumbList = this.$route.meta.breadcrumb;
    },
    routeTo(idx) {
      if (this.breadcrumbList[idx].link) {
        this.$router.push(this.breadcrumbList[idx].link);
      }
    },
  },
  mounted() {
    this.nowBreadcrumb();
  },
};
</script>

<style lang="scss">
.breadcrumb > li {
  cursor: pointer;
  text-decoration: underline;
  color: var(--bs-warning);
  font-weight: bold;

  &:last-child {
    cursor: default;
    text-decoration: none;
    color: var(--bs-secondary);
    font-weight: normal;
  }
}
</style>
