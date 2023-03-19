<template>
  <h3 v-if="posts.length > 0">
    Posts amount: {{posts.length}}
  </h3>
  <h3 v-else>
    Posts list is clear
  </h3>
  <ul v-if="posts.length > 0">
    <post-item @remove="removePost" v-for="post in posts" :post="post" :key="post.id"/>
  </ul>
</template>

<script>
import PostItem from "@/components/PostItem";
export default {
  components: {PostItem},
  props: {
    posts: {
      type: Array,
      required: true
    },
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