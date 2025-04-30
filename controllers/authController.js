const dotenv = require('dotenv');
dotenv.config();

const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { SECRET_JWT } = process.env;

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { email: user.email, password: user.password },
      SECRET_JWT,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Login exitoso',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
        gender: user.gender,
        profilePhoto: user.profilePhoto,
      },
    });
  } catch (error) {
    console.error('[ERROR]', error.message);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

module.exports = { loginUser };
