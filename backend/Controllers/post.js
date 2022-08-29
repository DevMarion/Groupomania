const postModels = require('../Models/post');

exports.getAllPosts = (req, res, next) => {
    postModels.find()
        .sort({ createdAt: -1 })
        .then(posts => res.status(200).json({ posts }))
        .catch(error => res.status(400).json({ error }))

};

exports.createPost = async (req, res, next) => {
    console.log('message', req.body);
    const post = new postModels({
        userId: req.body.userId,
        message: req.body.message,
        photo: req.file ? `${req.protocol}://${req.get('host')}/photos/${req.file.filename}` : '',
        video: req.body.video,
        commentaires: [],
    });
    post.save()
        .then(() => res.status(201).json({ message: "Post créé" }))
        .catch(error => res.status(400).json({ erreur: error }));

};

exports.modifyPost = (req, res, next) => {
    const postObject = { ...req.body }
    postModels.updateOne({ _id: req.params.id },
        { ...postObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: "Post modifié" }))
        .catch(error => res.status(400).json({ error: 'La requête n a pas aboutie' }));
};

exports.deletePost = (req, res, next) => {
    postModels.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "Post supprimé" }))
        .catch(error => res.status(400).json({ error }));
    console.log('id2', req.params.id);
};

// exports.deletePost = (req, res, next) => {
//     console.log('id2', req.params.id)
//     postModels.findOne({ _id: req.params.id })
//         .then((post) => {
//             const filename = post.photo.split('/photos/')[1];
//             fs.unlink(`photos/${filename}`, () => {
//                 postModels.deleteOne({ _id: req.params.id })
//                     .then(() => res.status(200).json({ message: 'Publication supprimée' }))
//                     .catch(error => res.status(400).json({ error }));
//             })
//         })
//         .catch(error => res.status(400).json({ message: error }));
// };





// // exports.getOnePost = (req, res, next) => {
//     postModels.findOne({ _id: req.params.id })
//     .then(post => res.status(200).json({ post }))
//     .catch(error => res.status(400).json({ error }));
// };

exports.likePost = (req, res, next) => {
    postModels.findOne({ _id: req.params.id })
        .then(post => {
            if (!post.usersLiked.includes(req.body.userId) && req.body.like === 1) {
                postModels.updateOne(
                    { _id: req.params.id },
                    {
                        $inc: { likes: +1 },
                        $push: { usersLiked: req.body.userId }
                    }
                )
                    .then(() => res.status(201).json({ message: "Post liké" }))
                    .catch((error) => res.status(400).json({ error }));
            }
            else if (post.usersLiked.includes(req.body.userId) && req.body.like === 0) {
                postModels.updateOne(
                    { _id: req.params.id },
                    {
                        $inc: { likes: -1 },
                        $pull: { usersLiked: req.body.userId }
                    }
                )
                    .then(() => res.status(201).json({ message: "like supprimé" }))
                    .catch((error) => res.status(400).json({ error }));
            }
            else if (!post.usersDisliked.includes(req.body.userId) && req.body.like === -1) {
                postModels.updateOne(
                    { _id: req.params.id },
                    {
                        $inc: { dislikes: +1 },
                        $push: { usersDisliked: req.body.userId }
                    }
                )
                    .then(() => res.status(201).json({ message: "Post disliké" }))
                    .catch((error) => res.status(400).json({ error }));
            }
            else if (post.usersDisliked.includes(req.body.userId) && req.body.like === 0) {
                postModels.updateOne(
                    { _id: req.params.id },
                    {
                        $inc: { dislikes: -1 },
                        $pull: { usersDisliked: req.body.userId }
                    }
                )
                    .then(() => res.status(201).json({ message: "dislike supprimé" }))
                    .catch((error) => res.status(400).json({ error }));
            }
        })
        .catch((error) => res.status(400).json({ error }));
};

exports.createCommentaire = (req, res, next) => {
    try {
        return postModels.findByIdAndUpdate(
            req.params.id,
            {
                $push: {
                    commentaires: {
                        userId: req.body.userId,
                        userPseudo: req.body.userPseudo,
                        texte: req.body.texte,
                        timestamp: new Date().getTime(),
                    },
                },
            },
            { new: true },
            (err, data) => {
                if (!err) return res.send(data);
                else return res.status(400).send(err);
            }
        );
    } catch (err) {
        return res.status(400).send(err);
    }
};

exports.modifyCommentaire = (req, res, next) => {
    try {
        return postModels.findById(
            req.params.id,
            (err, data) => {
                const commentaire = data.commentaires.find((commentaire) =>
                    commentaire._id.equals(req.body.commentaireId)
                )
                if (!commentaire) return res.status(404).send('Commentaire non trouve')
                commentaire.texte = req.body.texte;
                return data.save((err) => {
                    if (!err) return res.status(200).send(data);
                    return res.status(500).send(err);
                })
            }
        )
    } catch (err) {
        return res.status(400).send(err);
    }
};

exports.deleteCommentaire = (req, res, next) => {
    try {
        return postModels.findByIdAndUpdate(
            req.params.id,
            {
                $pull: {
                    commentaires: {
                        _id: req.body.commentaireId,
                    },
                },
            },
            { new: true },
            (err, data) => {
                if (!err) return res.send(data);
                else return res.status(400).send(err);
            }
        )
    } catch (err) {
        return res.status(400).send(err);
    }
};