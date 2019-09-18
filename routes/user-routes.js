const express = require('express');
const router = express.Router();

const Users = require('../models/users-model.js');
const restricted = require('../middleware/restricted-route.js')

router.get('/', restricted, (req, res) => {
    Users.find()
        .then( users => res.status(200).json(users))
        .catch( err => res.status(500).json(err))
})

module.exports = router