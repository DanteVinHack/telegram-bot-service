<template>
  <div class="main-layout h-100">
    <NavBar />
    <div class="d-flex g-0 h-100">
      <div class="col-md-2">
        <SideBar class="bg-dark" />
      </div>
      <div class="col-md-10 bg-secondary bg-opacity-25 overflow-auto">
        <router-view class="m-3 mb-5 w-auto bg-light p-3" />
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";
import { mapGetters } from "vuex";

export default {
  name: "main-layout",
  components: { NavBar, SideBar },
  methods: mapGetters(["getUsers"]),
  mounted() {
    this.getUsers();
  },
};
</script>

<style>
.main-layout {
  overflow-y: hidden;
  max-height: 100vh !important;
}

.overflow-auto {
  overflow-y: auto !important;
}
</style>
