<template>
  <header class="header">
    <Logo />
    <TopMenu />
  </header>
</template>

<script>
import Logo from "../components/Logo.vue";
import TopMenu from "../components/TopMenu.vue";
export default {
  components: { Logo, TopMenu },
};
</script>

<style lang="scss" scoped>
.header {
  padding: 15px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
@media (max-width: 767px) {
  .header {
    flex-direction: column;
    gap: 15px;
  }
}
</style>