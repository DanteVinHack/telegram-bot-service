const Setting = require('../../models/Setting');
const QiwiPaymentApi = require('@qiwi/bill-payments-node-js-sdk');

const getQiwiPayment = async () => {
  try {
    const { publicKey, secretKey } = await Setting.findOne();

    QiwiPaymentApi.prototype.publicKey = publicKey;

    const wallet = new QiwiPaymentApi(secretKey);

    return wallet

  } catch (error) {
    console.log(error.message)
  }
}

module.exports = getQiwiPayment;