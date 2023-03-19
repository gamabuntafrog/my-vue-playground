<template>
  <section>
    <div class="container">
      <h1>Погода</h1>
      <input v-debounce:300ms="inputCity" :value="cityName" placeholder="Введіть назву населеного пункту" class="standard">
      <div v-if="isError" class="weather-info">
        <h1>
          Не знайдено
        </h1>
      </div>
      <div v-else-if="isWeatherLoading" class="weather-info">
        <div class="loader"/>
      </div>
      <div v-else-if="weatherInfo" class="weather-info">
        <div>
          <h1>{{ weatherInfo.country }}, {{ weatherInfo.name }}</h1>
          <h2>{{ weatherInfo.temp }} градусів по Цельсію</h2>
          <strong>По відчуттям {{ weatherInfo.feels_like }}</strong>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      cityName: '',
      weatherInfo: null,
      isWeatherLoading: false,
      isError: false
    }
  },
  methods: {
    async inputCity(name) {
      this.cityName = name

    },
    async getWeather() {
      this.isWeatherLoading = true

      const key = process.env.VUE_APP_WEATHER_KEY
      const url = 'https://api.openweathermap.org/data/2.5/weather'

      try {
        const response = await fetch(`${url}?q=${this.cityName}&appid=${key}&units=metric&lang=uk`)

        if (!response.ok) {
          throw new Error('Not found')
        }

        const data = await response.json()

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

        this.isError = false
        this.isWeatherLoading = false

      } catch (e) {
        this.isError = true
        this.isWeatherLoading = false

        console.log(e)
      }
    },
    clearData() {
      this.weatherInfo = null;
      this.isError = false;
      this.isWeatherLoading = false;
    }
  },
  watch: {
    cityName(name) {
      if (name.length < 3) {
        return this.clearData()
      }

      this.getWeather()
    }
  }
}
</script>

<style lang="scss" scoped>
  section {
    display: flex;
    height: calc(100vh - 60px);
    min-height: 500px;
    justify-content: center;
    align-items: center;
  }

  .weather-info {
    margin-top: 50px;
    color: blanchedalmond;
    background-color: #2c3e50;
    padding: 20px;
    border-radius: 8px;
  }

  .container {
    padding: 50px;
    border-radius: 8px;
    width: 50%;
    height: 70%;
    display: flex;
    //justify-content: center;
    align-items: center;
    flex-direction: column;

  }

  strong {
    margin-top: 5px;
    display: block;
  }

  input.standard {
    margin-top: 30px;
    width: 80%;

  }

  @media screen and (max-width: 1280px) {
    .container {
      width: 70%;
    }
  }

    @media screen and (max-width: 760px) {
    .container {
      width: 80%;
      padding: 0;
    }


    input.standard {
      width: 100%;
    }
  }


</style>