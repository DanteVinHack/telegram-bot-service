<template>
  <div class="rates">

    <SectionHeader class='text-primary'>
      Список товаров
    </SectionHeader>

    <button
      @click='addRate'
      class="
        ml-auto
        mt-2
        btn
        btn-success
        d-flex
        justify-content-between
        align-items-center
        gap-2
      "
    >
      <i class='bi bi-plus fs-5 rounded-5'></i>
      Создать
    </button>

    <table class="table table-striped table-hover mt-2">
      <thead>
        <tr>
          <th class='user-select-none text-secondary border' scope="col">
            Название
          </th>
          <th class='user-select-none text-secondary border' scope="col">
            Описание
          </th>
          <th class='user-select-none text-secondary border' scope="col">
            Стоимость
          </th>
          <th class='user-select-none text-secondary border' scope="col">
            Ссылка
          </th>
          <th class='user-select-none text-secondary border' scope="col">
            Действия
          </th>
        </tr>
      </thead>
      <tbody v-if='rates.length'>
        <tr
          v-for='rate in rates'
          :key='rate._id'
        >
          <td class='border text-center align-middle'>
            {{ rate.title }}
          </td>
          <td class='border col-3'>
            {{ rate.body.length > 60 && !ratesMore.find(more => more.id == rate._id).more ? rate.body.slice(0, 60) : rate.body }}

              <div class='w-auto d-flex justify-content-center mt-1'>

                <button @click='seeMore(rate._id)' class='rate-more btn btn-secondary' v-if='rate.body.length > 50 && !ratesMore.find(more => more.id == rate._id).more' >
                  Подробнее
                  <i class='bi bi-arrow-bar-down'></i>
                </button>
                <button @click='hideRateBody(rate._id)' class='rate-more btn btn-secondary ' v-if='ratesMore.find(more => more.id == rate._id).more && rate.body' >
                  Скрыть
                  <i class='bi bi-arrow-bar-up'></i>
                </button>

              </div>
            </td>
            <td class='border text-center align-middle'>
              {{ rate.price }} ₽
          </td>
          <td class='border text-center align-middle'>
            {{ rate.link }}
          </td>
          <td class='border col-2 align-middle'>

            <div class="d-flex m-auto justify-content-center align-items-center gap-2">
              <button class='btn btn-light btn-sm d-flex' @click='changeRate(rate._id)'>
                Редактировать
              </button>

              <button class='btn btn-danger btn-sm d-flex gap-1' @click='removeRate(rate._id)'>
                Удалить
              </button>
            </div>

          </td>
        </tr>
      </tbody>

    </table>
    <tr v-if='!rates.length && !$store.getters.getIsLoading' class='col-12 text-center fs-3 d-flex justify-content-center'>
      Создайте первый тариф
    </tr>
    <tr v-if='$store.getters.getIsLoading' class='col-12 text-center fs-3 d-flex justify-content-center'>
      <VLoader />
    </tr>
  </div>
</template>

<script>
export default {
  name: 'RatesView',
  data() {
    return {
      rates: [],
      ratesMore: []
    }
  },
  methods: {
    seeMore(idx) {
      this.ratesMore.find(more => more.id == idx).more = true
    },
    hideRateBody(idx) {
      this.ratesMore.find(more => more.id == idx).more = false
    },
    async addRate() {
      try {
        const rate = {
          title: '',
          body: '',
          price: 0,
          link: ''
        }

        const response = await this.axios.post('http://localhost:4000/rates', rate)

        this.rates.push(await response.data);

        this.rates.forEach(rate => this.ratesMore.push({id: rate._id, more: false}));

      } catch (error) {
        console.log(error.message)
      }
    },
    async getRates() {
      try {
        this.$store.commit('toggleIsLoading');
        const response = await this.axios.get('http://localhost:4000/rates');

        this.rates = await response.data

        this.$store.commit('toggleIsLoading');

        this.rates.forEach(rate => this.ratesMore.push({
            id: rate._id,
            more: false
          })
        )


      } catch (error) {
        console.log(error.message)
      }
    },
    changeRate(idx) {
      this.$router.push(`/rate/${idx}`)
    },
    async removeRate(idx) {
      try {
        await this.axios.delete(`http://localhost:4000/rate/${idx}`);

        this.rates = this.rates.filter(rate => rate._id !== idx)

      } catch (err) {
        console.log(err.message)
      }
    },
  },
  async mounted() {
    await this.getRates();
  }
}
</script>

<style>
.rate-more {
  cursor: pointer;
}

.more-enter-active, .more-leave-active {
  transition: all .5s;
}
.more-enter, .more-leave-to {
  transform: translateX(1rem);
  opacity: 0;
}
.more-leave-active {
  position: absolute;
}
</style>
