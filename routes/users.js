const User = require('../models/User');

const Router = require('express');
const router = Router();


router.get('/', async (req, res) => {
  const users = await User.find();

  res.status(200).json(users)
})

router.delete('/:id', async (req, res) => {
  const { id: _id } = req.params;

  await User.deleteOne({ _id });

  res.status(200).json(_id)
})

router.delete('/all', async (req, res) => {
  
  await User.deleteMany({});

  res.status(201).json('Все пользователи успешно удалены')
})

module.exports = {name: 'users', router};