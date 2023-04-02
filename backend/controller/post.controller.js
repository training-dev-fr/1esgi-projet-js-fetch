const Post = require("../model/post.model");

exports.getAll = (req, res, next) => {
    let postList = Post.getAll(req.params.number);
    res.status(200).json(postList);
}

exports.getOne = (req, res, next) => {
    try {
        let post = Post.getOne(Number.parseInt(req.params.id));
        if (post) {
            res.status(200).json(post);
        }
    } catch (error) {
        res.status(404).json({ message: "Post non trouvé" });
    }
}

exports.create = (req, res, next) => {
    try {
        let post = req.body.post;
        post.userId = req.token.id;
        Post.create(post);
        res.status(201).json({ message: "post créé" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.update = (req, res, next) => {
    try {

        let post = req.body.post;
        post.id = Number.parseInt(req.params.id);
        post.userId = req.token.id;
        let p = Post.getOne(post.id);
        if (p.userId == post.userId) {
            Post.update(post);
            res.status(201).json({ message: "Post mis à jour" });
        } else {
            res.status(401).json({ message: "Vous n'avez pas les droits pour modifier ce post" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.delete = (req, res, next) => {
    try {
        let id = Number.parseInt(req.params.id);
        let p = Post.getOne(id);
        if (p.userId == req.token.id) {
            Post.delete(req.params.id);
            res.status(201).json({ message: "Post supprimé" });
        } else {
            res.status(401).json({ message: "Vous n'avez pas les droits pour modifier ce post" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.update