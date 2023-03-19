

<template>
  <form @submit.prevent >
    <input
        v-model="form.title"
        type="text"
        placeholder="Title"
    >
    <button type="submit" @click="createPost" class="submit">
      Create
    </button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        title: ''
      }
    }
  },
  props: {
    addPost: {
      type: Function,
      required: true
    }
  },
  methods: {
    createPost() {
      const newPost = {
        id: Date.now(),
        title: this.form.title,
      }

      this.$emit('create', newPost)

      this.form.title = ''
    }
  }
}
</script>

<style>
.submit {
  margin-left: 10px;
  padding: 4px;
}
</style>