<template>
  <div id="app">

    <component :is='layout'>
      <router-view />
    </component>

  </div>
</template>

<script>
import MainLayout from '@/layouts/MainLayout';

export default {
  name: 'App',
  components: {MainLayout},
  computed: {
    layout() {
      return (this.$route.meta.layout ?? 'main') + '-layout'
    }
  },
}
</script>


<style lang="scss">
*,
*::before,
*::after {
  box-sizing: border-box;
}

#app {
  height: 100vh;
  max-height: 100vh;
  overflow: hidden;
}

.ml-auto {
  margin-left: auto;
}
</style>
