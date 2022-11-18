<template>
  <div class='orders'>

    <SectionHeader class='text-primary'>
      Список заказов
    </SectionHeader>

    <table class="table table-striped table-hover mt-2">
      <thead>
        <tr>
          <th class='user-select-none text-secondary border' scope="col">
            Пользователь
          </th>
          <th class='user-select-none text-secondary border' scope="col">
            Канал
          </th>
          <th class='user-select-none text-secondary border' scope="col">
            Сумма
          </th>
          <th class='user-select-none text-secondary border' scope="col">
            Оплата
          </th>
          <th class='user-select-none text-secondary border' scope="col">
            Дата
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for='order in orders'
          :key='order._id'
        >
          <td class='border'>
            {{ order.username }}
          </td>
          <td class='border'>
            {{ order.rate }}
          </td>
          <td class='border'>
            {{ order.amount }}
          </td>
          <td class='border text-center align-middle'>
            <button
              class='
                btn
                btn-sm
                disabled
                rounded-5
              '
              :class='order.paid ? "btn-success" : "btn-danger"'
            >

              {{ order.paid ? 'Успешно' : 'Ожидание'  }}

            </button>
          </td>
          <td class='border col-2'>
            {{ order.registerDate }}
          </td>
        </tr>
      </tbody>

    </table>

    <tr v-if='!orders.length && !$store.getters.getIsLoading' class='col-12 text-center fs-3 d-flex justify-content-center'>
      Создайте первый тариф
    </tr>
    <tr v-if='$store.getters.getIsLoading' class='col-12 text-center fs-3 d-flex justify-content-center'>
      <VLoader />
    </tr>

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'OrdersView',
  computed: mapGetters(['orders']),
  methods: mapActions(['getOrders']),
  async mounted() {
    await this.getOrders()

    this.websocket.send('orders')
  }
}
</script>
