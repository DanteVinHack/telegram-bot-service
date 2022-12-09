<template>
  <div class="settings">
    <SectionHeader class="text-primary"> Настройки </SectionHeader>

    <form class="section__form w-50" @submit.prevent="submitSettings">
      <div class="mt-3">
        <label for="formFile" class="form-label">Токен бота</label>
        <input class="form-control" type="text" v-model="settings.token" />
      </div>
      <div class="mt-3">
        <label for="formFile" class="form-label">Публичный ключ Qiwi</label>
        <input class="form-control" type="text" v-model="settings.publicKey" />
      </div>
      <div class="mt-3">
        <label for="formFile" class="form-label">Секретный ключ Qiwi</label>
        <input class="form-control" type="text" v-model="settings.secretKey" />
      </div>

      <h2 class="setting__title fs-4 mb-0 mt-4">Приветсвие бота</h2>

      <p class="fs-5 mt-4 mb-2">Фотография:</p>

      <InputFile class="w-50" v-model="settings.image" @get-file="getImage" />

      <!-- <div class="alert alert-warning mt-3 w-50" role="alert">
        Прикрипление фото в режиме разработке
      </div> -->

      <button
        class="btn btn-danger d-block mt-2"
        @click="settings.startImage = ''"
      >
        Удалить
      </button>

      <p class="fs-5 mt-3 mb-2">Текст сообщения:</p>

      <textarea class="form-control" rows="7" v-model="settings.startText">
      </textarea>

      <button class="btn btn-primary mt-3">Сохранить</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "SettingsView",
  data() {
    return {
      settings: {
        token: "",
        publicKey: "",
        secretKey: "",
        image: "",
        startText: "",
      },
    };
  },
  methods: {
    async submitSettings() {
      try {
        const formData = new FormData();

        Object.keys(this.settings).forEach(async key => {
          formData.append(key, this.settings[key]);
        });

        await this.axios.post("http://localhost:4000/settings", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } catch (error) {
        console.log(error.message);
      }
    },
    getImage(image) {
      this.settings.image = image;
    },
    async getSettings() {
      const response = await this.axios.get("http://localhost:4000/settings");
      return response.data;
    },
  },
  async mounted() {
    this.getSettings().then(settings => {
      this.settings = settings;
    });
  },
};
</script>

<style></style>
