const db = require('../data/db-config.js');

module.exports = {
    add,
    find,
    findById,
    findByUsername
}

function findById(id){
    return db('users')
        .where({id})
        .first()
        .then(user => user)
        .catch( err => err)
}

function add(values){
    return db('users')
        .insert(values)
        .then( ([id]) => findById(id))
        .catch( err => err)
}

function find(){
    return db('users')
        .then( users => users)
        .catch( err => err)
}

function findByUsername(username){
    return db('users')
        .where({username: username})
        .first()
        .then( user => user)
        .catch( err => err)
}