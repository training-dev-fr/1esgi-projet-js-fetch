const postData = require("../data/post.json");
const userModel = require("./user.model.js");
const fs = require("fs");
var path = require('path');
let file = path.join(__dirname, '..', 'data', 'post.json');

/**
 * Retreive 5 post by page order
 * @param {int} n page number to get
 * @returns {array} list of posts
 */
exports.getAll = (n) => {
    let listPost = postData.list.sort((a, b) => b.date - a.date).slice((n - 1) * 5, n * 5);
    for (let post of listPost) {
        post.user = userModel.getOne(post.userId);
        delete post.user.password;
        post.date = new Date(post.date);
        for (let comment of post.commentList) {
            comment.user = userModel.getOne(comment.userId);
            delete comment.user.password;
            comment.date = new Date(comment.date);
        }
    }
    return listPost;
}

/**
 * Get one post by id
 * @param {int} id the id of post to find
 * @returns the post if found, or error if it does not exist
 */
exports.getOne = (id) => {
    let post = postData.list.find(post => post.id === id);
    if (post) {
        return post;
    } else {
        throw new Error("Post non trouvé");
    }
}

/**
 * create a new post
 * @param {Object} post the post to create
 * @returns true if created, false on error
 */
exports.create = (post) => {
        if (checkData(post)) {
            post.date = Date.now();
            post.id = ++postData.id;
            post.commentList = [];
            postData.list.push(post);
            fs.writeFileSync(file, JSON.stringify(postData, null, 4));
        } else {
            throw new Error("Problème dans le format de données.");
        }
    }
    /**
     * Get one post by name
     * @param {String} name the name of post to find
     * @returns the post if found, or error if it does not exist
     */
exports.update = (post) => {
        if (checkData(post)) {
            let postFound = postData.list.find(p => p.id === post.id);
            if (postFound) {
                postFound.message = post.message;
                fs.writeFileSync(file, JSON.stringify(postData, null, 4));
                return true;
            } else {
                throw new Error("Post non trouvé");
            }

        } else {
            throw new Error("Problème dans le format de données.");
        }
    }
    /**
     * Get one post by name
     * @param {String} name the name of post to find
     * @returns the post if found, or error if it does not exist
     */
exports.delete = (id) => {
    let count = postData.list.length;
    postData.list = postData.list.filter(post => post.id != id);
    if (count - 1 == postData.list.length) {
        fs.writeFileSync(file, JSON.stringify(postData, null, 4));
        return true;
    } else {
        throw new Error("Post non trouvé");
    }
}

function checkData(post) {
    return (post.message && post.userId && (Object.keys(post).length == 2 || post.id && Object.keys(post).length == 3));
}
