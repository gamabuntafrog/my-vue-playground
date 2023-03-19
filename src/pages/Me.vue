<template>
  <section>
    <div class="container">
      <div v-if="!isChangingInfo" class="user-info">
        <img :src="$store.state.avatar" alt="avatar"/>
        <h1>{{ $store.state.username }}</h1>
        <button @click="isChangingInfo = true" class="standard change-info-button">
          Змінити дані
        </button>
      </div>
      <div v-else class="change-user-info">
        <img :src="$store.state.avatar" alt="avatar"/>
        <input
            id="username"
            class="standard"
            v-model="newInfo.username"
            @blur="v$.newInfo.username.$touch"
        >
        <label class="error" v-if="v$.newInfo.username.$error" for="username">
          {{ v$.newInfo.username.$errors[0].$message }}
        </label>
        <div class="btns">
          <button @click="cancelChanges" class="standard">
            Відмінити
          </button>
          <button @click="updateProfile" class="standard">
            Зберегти
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {helpers, minLength, required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

export default {
  setup() {
    return {
      v$: useVuelidate()
    }
  },
  data() {
    return {
      isChangingInfo: false,
      newInfo: {
        username: this.$store.state.username,
      }
    }
  },
  methods: {
    async updateProfile() {
      const tryValidate = await this.v$.$validate()
      if (!tryValidate) return alert('Помилка')

      this.$store.commit('updateProfile', {username: this.newInfo.username})

      this.isChangingInfo = false
    },
    cancelChanges() {
      this.newInfo.username = this.$store.state.username

      this.isChangingInfo = false
    }
  },
  validations() {
    return {
      newInfo: {
        username: {
          required: helpers.withMessage("Це поле обов'язкове для заповнення", required),
          minLengthValue: helpers.withMessage(({$params}) => `Мінімальна допустима довжина ${$params.min} символів`, minLength(5))
        },
      }
    }
  },

}
</script>

<style lang="scss" scoped>
section {
  height: calc(100vh - 60px);
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  width: 50%;
  height: 50%;
}

img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
}

.change-user-info {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}


input.standard {
  margin-top: 20px;
  width: 30%;
  min-width: 200px;
  text-align: center;
}

button.standard {
  margin-top: 20px;
}

.btns {
  display: flex;
  justify-content: space-evenly;
  width: 50%;
}

label {
  margin-top: 5px;
  font-size: small;
}

label.error {
  color: firebrick;
}

.change-info-button {
  margin-left: auto;
  margin-right: auto;
}

</style>