<template>
  <header>
    <nav>
      <ul v-if="!$store.state.isLoggedIn">
        <li>
          <router-link active-class="active" to="/">
            Дім
          </router-link>
        </li>
        <li>
          <router-link active-class="active" to="/weather">
            Погода
          </router-link>
        </li>
        <li>
          <router-link active-class="active" to="/login">
            Вхід
          </router-link>
        </li>
        <li>
          <router-link active-class="active" to="/login">
            Реєстрація
          </router-link>
        </li>
      </ul>
      <ul v-else>
        <li>
          <router-link active-class="active" to="/">
            Дім
          </router-link>
        </li>
        <li>
          <router-link active-class="active" to="/weather">
            Погода
          </router-link>
        </li>
        <li class="avatarWrapper">
          <router-link active-class="active" to="/me">
            <img v-if="$store.state.avatar" class="avatar" :src="$store.state.avatar" alt="avatar"/>
            @{{ $store.state.username }}
          </router-link>
        </li>
        <li>
          <button class="standard logout" @click="logout" >
            Вийти
          </button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  methods: {
    async logout() {
      this.$router.push('/')
      this.$store.commit('logout');
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  padding: 10px 20px;
  height: 60px;

  display: flex;
  align-items: center;

  background-color: #2c3e50;
  color: whitesmoke;

  .logout {
   &:hover {
     background-color: blanchedalmond;
     color: crimson;
   }
  }

  nav {
    width: 100%;
    max-width: 900px;
    margin-left: auto;
    margin-right: auto;
  }

  .avatar {
    width: 40px;
    height: 40px;
    object-fit: cover;
    margin-right: 10px;
    border-radius: 50%;
  }

  ul {
    display: flex;
    align-items: center;
  }

  li {
    margin-right: 14px;
  }

  li:first-child {
    margin-right: auto;
  }

  li:last-child {
    margin-right: 0;
  }

  li.avatarWrapper > a {
    display: flex;
    align-items: center;

  }

  a {
    color: whitesmoke;

    &:hover {
      color: blanchedalmond;
    }
  }

  a.active {
    color: blanchedalmond;
  }

  @media screen and (max-width: 760px) {
    font-size: smaller;

  }
}


</style>