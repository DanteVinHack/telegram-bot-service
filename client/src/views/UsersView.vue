<template>
  <div class="users">

    <SectionHeader class='text-primary'>
      Список пользователей
    </SectionHeader>

    <button
      @click='removeAllUsers'
      class="
        ml-auto
        mt-2
        btn
        btn-danger
        d-flex
        justify-content-between
        align-items-center
        gap-2
      "
    >
      <i class='bi bi-trash fs-5 rounded-5'></i>
      Удалить всех пользователей
    </button>

    <table class="table table-striped table-hover mt-2">
      <thead>
        <tr>
          <th class='border' scope="col">
            <i class="bi bi-person-fill"></i>
            Пользователь
          </th>
          <th class='border' scope="col">
            ₽
            Баланс
          </th>
          <th class='col-5 border' scope="col">
            <i class="bi bi-telegram"></i>
            Купленные товары
          </th>
          <th class='border col-2' scope="col">
            <i class="bi bi-calendar-month-fill"></i>
            Дата регистрации
          </th>
          <th class='col-1 border' scope="col">
              Действия
          </th>
        </tr>
      </thead>
      <tbody v-if="users.length">
        <tr
          v-for='user in users'
          :key='user._id'
        >
          <td class='border'>
            {{ user.username }}
          </td>
          <td class='border'>
            {{ user.balance }} ₽
          </td>
          <td class='border'>
            {{ user.rates.length ? user.rates.reduce((acc, rate) => `${rate} `, '') : 'Отсутствуют каналы' }}
          </td>
          <td class='border text-center'>
            {{ user.registerDate }}
          </td>
          <td class='text-center align-middle'>
            <button @click='removeUser(user._id)' class="btn btn-danger btn-sm">
              Удалить
            </button>
          </td>
        </tr>
      </tbody>

    </table>

    <tr v-if='!users.length && !$store.getters.getIsLoading' class='col-12 text-center fs-3 d-flex justify-content-center'>
      Пользователей пока что нет
    </tr>
    <tr v-if='$store.getters.getIsLoading' class='col-12 text-center fs-3 d-flex justify-content-center'>
      <VLoader />
    </tr>

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'UsersView',
  computed: mapGetters(['users']),
  methods: mapActions(['getUsers', 'removeUser', 'removeAllUsers']),
  async mounted() {
    await this.getUsers();
  }
}
</script>
