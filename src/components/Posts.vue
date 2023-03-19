<template>
  <section class="posts">
    <h2>Create post</h2>
    <PostForm @create="addPost" :add-post="addPost" />
    <h2>Posts</h2>
    <PostsList @remove="removePost" :posts="posts"/>
  </section>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostsList from "@/components/PostsList";

export default {
  data() {
    return {
      posts: [
        {id: 1, title: 'Title 1'},
        {id: 2, title: 'Title 2'},
        {id: 3, title: 'Title 3'},
      ]
    }
  },
  emits: [
    'remove'
  ],
  methods: {
    addPost(newPost) {
      this.posts.push(newPost)
    },
    removePost(id) {
      this.posts = this.posts.filter(el => el.id !== id)
    }
  },
  watch: {
    posts(e) {

    }
  },
  components: {
    PostForm,
    PostsList
  }
}
</script>

<style scoped>
section {
  background-color: #2c3e50;
  color: wheat;
  padding: 20px;

}

h2 {
  margin: 20px;
}

ul {
  display: flex;
  flex-direction: column;
  align-items: center;
}

li {
  display: flex;
  margin-bottom: 15px;
}

input {
  padding: 4px;
}
</style>