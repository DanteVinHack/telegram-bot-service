<template>
  <form @submit='submitLink' class="links">

    <SectionHeader>
      Сообщение пользователям
    </SectionHeader>

    <div class="links__inner w-50">

    <h2 class="links__title fs-4 mb-4 mt-5">
      Сообщения для прользователей
    </h2>

    <textarea 
      class="form-control resize" 
      placeholder="Сообщения для всех пользователей бота"
      v-model='text'
    ></textarea>

    <InputFile
      class='mt-3'
      disabled
      @get-file='getImage'
    />

    <div class="alert alert-warning mt-3 w-50" role="alert">
      Отправка фотографии в режиме разработки
    </div>

    <button class="btn btn-primary">
      Отправить
    </button>

    </div>

  </form>
</template>

<script>
export default {
  name: 'LinksView',
  data() {
    return {
      image: '',
      text: ''
    }
  },
  methods: {
    async submitLink(e) {
      e.preventDefault();
      await this.axios.post('http://localhost:4000/links', {message: this.text});
    },
    getImage(file) {
      this.image = file;
      console.log(file)
    }
  }
}
</script>

<style>

</style>