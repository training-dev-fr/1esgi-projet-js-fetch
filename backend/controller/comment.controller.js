const Comment = require("../model/comment.model");

exports.create = (req, res, next) => {
    try {
        let comment = req.body.comment;
        comment.userId = req.token.id;
        Comment.create(comment, Number.parseInt(req.params.id));
        res.status(201).json({ message: "Commentaire créé" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


exports.delete = (req, res, next) => {
    try {
        let id = Number.parseInt(req.params.id);
        let c = Comment.getOne(id);
        if (c.userId == req.token.id) {
            Comment.delete(Number.parseInt(req.params.id));
            res.status(201).json({ message: "Commentaire supprimé" });
        } else {
            res.status(401).json({ message: "Vous n'avez pas les droits pour modifier ce post" });
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.update