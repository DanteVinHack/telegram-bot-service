<template>
  <ul class="nav d-flex flex-column justify-content-start gap-3 p-5 h-100">
    <div class="fs-4 text-secondary nav__description">Управление</div>
    <li class="nav-item">
      <router-link class="nav-link active" to="/main"> Главная </router-link>
    </li>
    <li class="nav-item">
      <router-link class="nav-link" to="/users"> Пользователи </router-link>
    </li>
    <li class="nav-item">
      <router-link class="nav-link" to="/orders"> Заказы </router-link>
    </li>
    <li class="nav-item">
      <router-link class="nav-link" to="/rates"> Товары </router-link>
    </li>
    <li class="nav-item">
      <router-link class="nav-link" to="/links"> Рассылки </router-link>
    </li>
    <li class="nav-item">
      <router-link class="nav-link" to="/settings"> Настройки </router-link>
    </li>

    <div class="fs-5 fw-semibold mt-3 text-secondary nav__description">
      Статистика
    </div>

    <div class="card border border-secondary bg-dark w-100 p-2">
      <div class="row g-0">
        <div
          class="col-md-5 d-flex justify-content-center align-items-center rounded-circle shadow bg-warning bg-gradient bg-opacity-75"
        >
          <i class="bi bi-wallet2 text-dark fw-bold fs-1 border-danger"></i>
        </div>
        <div class="col-md-7">
          <div class="card-body text-light">
            <p class="card-text">0</p>
          </div>
        </div>
      </div>
    </div>

    <div class="card border border-secondary bg-dark w-100 p-2">
      <div class="row g-0">
        <div
          class="col-md-5 d-flex justify-content-center align-items-center shadow rounded-circle bg-success bg-gradient bg-opacity-75"
        >
          <i
            class="bi bi-person-circle text-dark fw-bold fs-1 rounded-circle"
          ></i>
        </div>
        <div class="col-md-7">
          <div class="card-body text-light">
            <p class="card-text">{{ usersLength }}</p>
          </div>
        </div>
      </div>
    </div>
  </ul>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "SideBar",
  computed: mapGetters(["usersLength"]),
};
</script>

<style lang="scss">
.shadow {
  box-shadow: inset 0px 0px 50px var(--bs-dark) !important;
}

.nav {
  &__description {
    translate: -20px -10px;
  }
}

.nav-link {
  position: relative;
  z-index: 3;

  &::before {
    position: absolute;
    content: "";

    top: 0;
    left: 0;
    z-index: -1;

    width: 4px;
    height: 100%;

    background: var(--bs-blue);
    transition: 0.3s;
  }

  &:hover {
    color: var(--bs-dark) !important;
    transition: 0.3s;

    &::before {
      width: 100%;
    }
  }

  &.router-link-active {
    color: var(--bs-dark) !important;
    scale: 1.2;

    &::before {
      background: var(--bs-primary);
      width: 100% !important;
    }
  }
}

.router-link,
.nav-link {
  transition: 0.6s;
}
</style>
