<template>
  <input class="form-control" type="file" accept="image/*" @change="getFile" />
</template>

<script>
  export default {
    name: "InputFile",
    props: {
      msg: {
        typeof: String,
        require: true,
      },
    },
    methods: {
      getFile(e) {
        const [file] = e.target.files;

        this.$emit("get-image", file);
      },
    },
  };
</script>
