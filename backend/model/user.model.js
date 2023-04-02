const userData = require("../data/user.json");
const productModel = require("./post.model");
const fs = require("fs");
var path = require('path');
let file = path.join(__dirname, '..', 'data', 'user.json');

/**
 * Create user and save it in json data file
 * @param {*} user the user to save
 */
exports.create = (user, password) => {
    if (checkData(user, password)) {
        user.id = ++userData.id;
        userData.list.push(user);
        fs.writeFileSync(file, JSON.stringify(userData, null, 4));
    } else {
        throw new Error("Veuillez saisir un email et un mot de passe valide (6 caractère mini pour le mot de passe)");
    }
}

/**
 * Get one user by email
 * @param {String} email email of user to find
 * @returns the user if found, or error if it does not exist
 */
exports.getByEmail = (email) => {
    let user = userData.list.find(user => user.email === email);
    if (user) {
        return user;
    } else {
        throw new Error("Utilisateur non trouvé");
    }
}

/**
 * Get one user by id
 * @param {int} id id of user to find
 * @returns the user if found, or error if it does not exist
 */
exports.getOne = (id) => {
    let user = userData.list.find(user => user.id === id);
    if (user) {
        return user;
    } else {
        throw new Error("Utilisateur non trouvé");
    }
}

function checkData(user, password) {
    return (user.email && password && password.length >= 6);
}