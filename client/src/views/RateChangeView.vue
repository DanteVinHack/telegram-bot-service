<template>
  <form @submit="changeRate" class="rate container-sm bg-white">
    <SectionHeader class="w-100 text-secondary border-secondary">
      Редактирование товара
    </SectionHeader>

    <h2 class="mt-5 fs-3 text-secondary">Название</h2>

    <input
      type="text"
      class="form-control w-25"
      id="basic-url"
      aria-describedby="basic-addon3"
      v-model="rate.title"
    />

    <h2 class="fs-3 text-secondary">Описание</h2>

    <textarea
      rows="8"
      class="form-control w-50"
      placeholder="Описание"
      id="floatingTextarea"
      v-model="rate.body"
    ></textarea>

    <div class="input-group mt-3 w-50">
      <span class="input-group-text" id="basic-addon3">Ссылка</span>
      <input
        type="text"
        class="form-control"
        id="basic-url"
        aria-describedby="basic-addon3"
        v-model="rate.link"
      />
    </div>

    <div class="input-group mt-3 w-50">
      <span class="input-group-text" id="basic-addon3">Сумма</span>
      <input
        type="text"
        class="form-control"
        id="basic-url"
        aria-describedby="basic-addon3"
        v-model="rate.price"
      />
    </div>

    <div class="rate__wrapper mt-3 d-flex gap-3">
      <button type="submit" class="btn btn-primary w-auto">Сохранить</button>

      <button type="button" class="btn btn-light w-auto">Отменить</button>
    </div>
  </form>
</template>

<script>
  export default {
    name: "OrderChangeView",
    data() {
      return {
        rate: {
          title: "",
          body: "",
          price: "",
          link: "",
          _id: this.$route.params.id,
        },
      };
    },
    methods: {
      async changeRate(e) {
        try {
          e.preventDefault();

          await this.axios.put(`http://localhost:4000/rate/`, this.rate);

          this.$router.push("/rates");
        } catch (error) {
          console.log(error);
        }
      },
      async getRate() {
        const response = await this.axios.get(
          `http://localhost:4000/rate/${this.rate._id}`,
          { _id: this.id }
        );

        return await response.data;
      },
    },
    async mounted() {
      this.rate = await this.getRate();
    },
  };
</script>

<style></style>
