const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user_model');
const router = express.Router();

// New Login 
router.post('/', async (req, res) => {
  const { username, password } = req.body;
  try{
  const userExists = await User.findOne({ username });
  if (userExists) {
  res.json({ message: 'User already exists' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { username, password: hashedPassword };
  await newUser.save();
  res.json({ message: 'Created successfully' });
}catch(err){
   res.status(400).send({message:err.message});
}
});

// Login API
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try{
  const user = await User.findOne({ username });
  if (!user) {
    res.json({ message: 'User not found' });
  }
  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) {
    res.json({ message: 'Wrong password' });
  }
    const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '7d' });
  res.json({ message: 'Login successful',token });
}catch(err){
 res.status(400).send({message:err.message});
}
});

module.exports = router;
