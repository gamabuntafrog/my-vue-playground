<template>
  <li>
    <h3>{{ post.title }}</h3>
    <button @click="removePost(post.id)" style="color: darkred; margin-left: 10px;">
      delete
    </button>
  </li>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  emits: [
    'remove'
  ],
  methods: {
    removePost(id) {
      this.$emit('remove', id)
    }
  }
}
</script>