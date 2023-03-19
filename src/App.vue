<template>
  <div id="app">
    <Header/>
    <RouterView/>
  </div>
</template>

<script>

import Header from "@/components/Header";

export default {
  name: 'App',
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
  border-top: 16px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

</style>
