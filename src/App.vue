<template>
  <router-view></router-view>
</template>

<style lang="scss">
*:focus {
  box-shadow: none !important;
}
html,
body {
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
nav {
  a {
    font-weight: bold;
    color: #2c3e50;
    &.active {
      color: var(--bs-warning) !important;
    }
  }
}
.container {
  min-height: calc(100vh - 56px - 60.8px);
}
.cursor-pointer {
  cursor: pointer;
}
.form-floating > .form-control:focus {
  box-shadow: none;
  border-bottom: 2px solid var(--bs-secondary) !important;
}
</style>
