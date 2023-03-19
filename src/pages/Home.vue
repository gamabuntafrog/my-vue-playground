<template>
  <section>
    <div class="left-side">
      <h1 v-if="$store.state.isLoggedIn">Ласкаво просимо, {{ $store.state.username }}!</h1>
      <h1 v-else>Доброго дня, увійдіть в аккаунт</h1>
    </div>
    <div class="right-side">
      <div v-if="!isWeatherLoading"  class="right-container">
        <div v-if="weatherInfo">
          <h1>{{ weatherInfo.country }}, {{ weatherInfo.name }}</h1>
          <h2>{{ weatherInfo.temp }} градусів по Цельсію</h2>
          <strong>По відчуттям {{ weatherInfo.feels_like }}</strong>
        </div>
        <div v-else-if="!Number.isNaN(geolocationErrorCode)">
          <h2 v-if="geolocationErrorCode === 1">
            Будь ласка дозвольте геолокацію для веб сайту
          </h2>
          <h2 v-else>
            Невдалося отримати дані про геолокацію
          </h2>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      weatherInfo: null,
      geolocationErrorCode: null,
      isWeatherLoading: true
    }
  },
  mounted() {
    const key = process.env.VUE_APP_WEATHER_KEY
    const url = 'https://api.openweathermap.org/data/2.5/weather'

    // console.log(navigator.geolocation)

    navigator.geolocation.getCurrentPosition(
        async (position) => {
          let lat = position.coords.latitude;
          let long = position.coords.longitude;

          try {
            const data = await fetch(`${url}?lat=${lat}&lon=${long}&appid=${key}&units=metric&lang=uk`)
                .then((res) => res.json())

            const {
              main: {temp, feels_like, temp_min, temp_max},
              name,
              sys: {country},
              weather: [{description}],
            } = data

            this.weatherInfo = {
              temp: Math.ceil(temp),
              feels_like: Math.ceil(feels_like),
              temp_min,
              temp_max,
              description,
              country,
              name
            }

            console.log(data)

          } catch (e) {
            console.log(e)
          } finally {
            this.isWeatherLoading = false
          }

        },
        (err) => {
          const {code} = err

          this.geolocationErrorCode = code

          console.log(err)
          this.isWeatherLoading = false
        })

  }
}
</script>

<style lang="scss" scoped>
h1 {
  font-size: 30px;
}

section {
  height: calc(100vh - 60px);
  display: flex;
  justify-content: space-around;
  align-items: center;
  min-height: 500px;
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;

  background: linear-gradient(70deg, blanchedalmond 50%, #2c3e50 50%);
}

.left-side {
  width: 40%;

}

.right-side {
  height: 100%;
  width: 40%;
  color: blanchedalmond;

}

.right-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

}

strong {
  margin-top: 5px;
  display: block;
}

@media screen and (max-width: 560px){
  section {
    flex-direction: column;
    background: linear-gradient(350deg, blanchedalmond 50%, #2c3e50 50%);
  }

  .right-side, .left-side {
    width: 80%;
    height: 50%;
  }

  .right-side {
    color: #2c3e50;
  }

  .left-side {
    color: blanchedalmond;
    display: flex;
    justify-content: center;
    align-items: center;
  }

}


</style>