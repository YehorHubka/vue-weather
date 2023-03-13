<template>
  <Header />
  <main class="main">
    <div class="container">
      <router-view />
    </div>
  </main>
</template>

<script>
import Header from "./components/Header";
export default {
  components: { Header },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");
* {
  box-sizing: border-box;
}
body {
  margin: 0;
  min-width: 360px;
  font-family: "Roboto", sans-serif;
}
.main {
  padding: 40px 0;
  h1 {
    margin: 0 0 30px;
    text-align: center;
    font-size: 30px;
  }
}
.container {
  max-width: 1230px;
  padding: 0 15px;
  margin: 0 auto;
}
</style>
