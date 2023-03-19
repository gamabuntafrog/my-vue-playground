

<template>
  <section>
    <h2>Amount of counts: {{count}}</h2>
    <button @click="increment">
      increment
    </button>
    <label style="display: block; margin-top: 20px;" for="1">{{ title }}</label>
    <input id="1" value="Standard title" @input="changeTitle">

  </section>
</template>

<script>
  export default {
    data() {
      return {
        count: 0,
        title: 'Standard title'
      }
    },
    methods: {
      increment() {
        this.count++
      },
      changeTitle(e) {
        this.title = e.target.value
      }
    }
  }
</script>

<style scoped>
 section {
   background-color: burlywood;
   padding: 50px;
 }
 input, button {
   padding: 4px;
   margin: 4px;
 }

 input {
   display: block;
   margin-left: auto;
   margin-right: auto;
 }
</style>