<template>
  <input class="form-control" type="file" accept="image/*" @change="getFile" />
</template>

<script>
export default {
  name: "InputFile",
  props: {},
  methods: {
    getFile(e) {
      const [file] = e.target.files;

      this.$emit("get-file", file);
    },
  },
};
</script>
