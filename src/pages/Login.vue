<template>
  <section>
    <div class="loader-backdrop" v-if="isLoading">
      <div class="loader">
        <h1>
          Loading...
        </h1>
      </div>
    </div>
    <div v-if="step === 0" class="left-side">
      <h1>Вхід</h1>
      <form @submit.prevent="validateForm">
        <div class="input-wrapper">
          <label v-if="!v$.username.$error" for="username">
            Ім`я користувача
          </label>
          <label v-else for="username">
            {{ v$.username.$errors[0].$message }}
          </label>
          <input
              :class="{error: v$.username.$error, standard: true}"
              @blur="v$.username.$touch"
              id="username"
              type="text"
              v-model="username"
          >
        </div>
        <div class="input-wrapper">
          <label v-if="!v$.password.$error" for="password">
            Пароль
          </label>
          <label v-else for="password">
            {{ v$.password.$errors[0].$message }}
          </label>
          <input
              :class="{error: v$.password.$error, standard: true}"
              @blur="v$.password.$touch"
              id="password"
              type="password"
              v-model="password"
          >
        </div>
        <button class="standard" type="submit">
          Увійти
        </button>
      </form>
    </div>
    <div v-else class="left-side">
      <h2>Крок 2 - оберіть аватар</h2>
      <input @change="inputAvatar" class="file" type="file">
      <img v-if="avatar" :src="avatar" alt="avatar"/>
      <button class="standard" v-if="avatar" @click="fakeSubmitWithImage">
        Завершити вхід
      </button>
      <button class="standard" v-else @click="fakeSubmit">
        Пропустити цей крок
      </button>
    </div>
    <div class="right-side"/>
  </section>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import {helpers, minLength, required} from "@vuelidate/validators";
import convertImageToString from "@/utils/convertImageToString";

export default {
  setup() {
    return {
      v$: useVuelidate()
    }
  },
  data() {
    return {
      isLoading: false,
      username: '',
      password: '',
      avatar: null,
      step: 0
    }
  },
  methods: {
    async validateForm() {
      const tryValidate = await this.v$.$validate()
      if (!tryValidate) return alert('Помилка')

      this.step = 1
    },
    async inputAvatar(e) {
      this.avatar = await convertImageToString(e.target.files)
    },
    async fakeSubmitWithImage() {
      this.isLoading = true

      setTimeout(async () => {
        await this.$store.commit('login', {username: this.username, password: this.password, avatar: this.avatar})
        this.$router.push('/')

        this.isLoading = false
      }, 2000)
    },
    async fakeSubmit() {
      this.isLoading = true

      setTimeout(async () => {
        await this.$store.commit('login', {username: this.username, password: this.password})
        this.$router.push('/')

        this.isLoading = false
      }, 2000)
    }
  },
  validations() {
    return {
      username: {
        required: helpers.withMessage("Це поле обов'язкове для заповнення", required),
        minLengthValue: helpers.withMessage(({$params}) => `Мінімальна допустима довжина ${$params.min} символів`, minLength(5))
      },
      password: {
        required: helpers.withMessage("Це поле обов'язкове для заповнення", required),
        minLengthValue: helpers.withMessage(({$params}) => `Мінімальна допустима довжина ${$params.min} символів`, minLength(5))
      },
    }
  },
}
</script>

<style lang="scss" scoped>
section {
  display: flex;
  height: calc(100vh - 60px);
  min-height: 400px;
}

.left-side {
  width: 30%;
  min-width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.right-side {
  background-image: url("https://images.hdqwalls.com/wallpapers/vue-js-kk.jpg");
  background-size: cover;
  background-position: center;
  width: 70%;
  height: 100%;
}

.loader-backdrop {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.3);


  display: flex;
  justify-content: center;
  align-items: center;
}

.loader {

  width: 30%;
  min-width: fit-content;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: blanchedalmond;

  h1 {
    margin-bottom: 0;
  }
}

h1 {
  margin-bottom: 10vh;
  font-size: 50px;
}

form {
}

img {
  width: 200px;
  height: 200px;

  border-radius: 50%;
  object-fit: cover;

  margin-left: auto;
  margin-right: auto;
}

.input-wrapper {
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

label {
  display: block;
  margin-top: 10px;
  margin-bottom: 5px;
  margin-right: auto;
  margin-left: 0;
}


input.error {
  border-color: firebrick;
}

.file {
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
  margin-top: 20px;
}

button.standard {
  width: 40%;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
}

</style>