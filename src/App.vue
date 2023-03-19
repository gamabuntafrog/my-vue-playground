<template>
  <div v-if="!$store.state.isUserLoading" id="app">
    <Header/>
    <RouterView/>
  </div>
  <div v-else class="loader-backdrop">
    <div class="loader"/>
  </div>
</template>

<script>

import Header from "@/components/Header";

export default {
  name: 'App',
  data() {
    return {

    }
  },
  components: {
    Header
  },
  beforeCreate() {

    this.$store.commit('initialiseStore');
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: blanchedalmond;
  height: 100dvh;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box !important;
  list-style-type: none;
}

input.standard {
  all: unset;
  display: block;
  padding: 8px;
  border: 2px solid #2c3e50;
  border-radius: 12px;
  width: 100%;
  text-align: left;
}

button.standard {
  all: unset;
  padding: 8px;
  border-radius: 6px;
  transition: 0.2s;
  display: block;
  cursor: pointer;

  &:hover {
    background-color: #2c3e50;
    color: blanchedalmond;
  }
}

.loader {
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid #2c3e50 ; /* Blue */
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}

.loader-backdrop {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);


  display: flex;
  justify-content: center;
  align-items: center;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

</style>
