<template>
  <form @submit.prevent="submitLink" class="links">
    <SectionHeader> Сообщение пользователям </SectionHeader>

    <div class="links__inner w-50">
      <h2 class="links__title fs-4 mb-4 mt-5">Сообщения для прользователей</h2>

      <textarea
        class="form-control resize"
        placeholder="Сообщения для всех пользователей бота"
        v-model="text"
      ></textarea>

      <InputFile class="mt-3" @get-file="getImage" />

      <button class="btn btn-primary mt-3">Отправить</button>
    </div>
  </form>
</template>

<script>
export default {
  name: "LinksView",
  data() {
    return {
      image: null,
      text: "",
    };
  },
  methods: {
    async submitLink() {
      const formData = new FormData();
      formData.append("message", this.text);
      formData.append("image", this.image);

      console.log(this.text, this.image);
      console.log(formData);

      await this.axios.post("http://localhost:4000/links", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    getImage(image) {
      this.image = image;
      console.log(this.image);
    },
  },
};
</script>

<style></style>
