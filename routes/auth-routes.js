const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Users = require('../models/users-model.js')
const secrets = require('../config/secrets.js')

router.post('/login', (req, res) => {
    let { username, password } = req.body

    Users.findByUsername(username)
        .then( user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user)
                res.status(200).json({
                  message: `Welcome ${user.username}!`, token
                });
              } else {
                res.status(401).json({ message: 'Invalid Credentials' });
              }
        })
        .catch( err => res.status(500).json(err))
})

router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
    user.password = hash;

    Users.add(user)
        .then(newUser => {
            const token = generateToken(newUser)
            res.status(201).json({newUser: newUser, token: token});
        })
        .catch(error => {
            res.status(500).json(error);
        });
})


function generateToken(user){
    const payload = {
        user:user.username
    }
    const options ={
        expiresIn: '1d'
    }
    return jwt.sign(payload, secrets.jwtSecret, options)
}

module.exports = router