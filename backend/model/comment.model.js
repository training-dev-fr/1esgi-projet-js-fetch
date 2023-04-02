const postData = require("../data/post.json");
const postModel = require("./post.model.js");
const fs = require("fs");
var path = require('path');
let file = path.join(__dirname, '..', 'data', 'post.json');
/**
 * create a new comment
 * @param {Object} comment the comment to create
 * @returns true if created, false on error
 */
exports.create = (comment, postId) => {

    if (checkData(comment, postId)) {
        let post = postData.list.find(post => post.id === postId);
        if (post) {
            comment.date = Date.now();
            comment.id = ++postData.commentId;
            post.commentList.push(comment);
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
 * Get one comment by id
 * @param {int} id the id of comment to find
 * @returns the comment if found, or error if it does not exist
 */
exports.getOne = (id) => {
    let comment = undefined;
    for (let post of postData.list) {
        comment = post.commentList.find(comment => comment.id === id);
        if (comment) {
            break;
        }
    };
    if (comment) {
        return comment;
    } else {
        throw new Error("Commentaire non trouvé");
    }
}

/**
 * Get one comment by name
 * @param {String} name the name of comment to find
 * @returns the comment if found, or error if it does not exist
 */
exports.delete = (id) => {
    let post = postData.list.find(post => post.commentList.some(comment => comment.id == id));
    if (post) {
        post.commentList = post.commentList.filter(comment => comment.id != id);
        fs.writeFileSync(file, JSON.stringify(postData, null, 4));
    } else {
        throw new Error("Commentaire non trouvé");
    }
}

function checkData(comment, postId) {
    return (comment.message && Number.isInteger(comment.userId) && Number.isInteger(postId) && Object.keys(comment).length == 2);
}