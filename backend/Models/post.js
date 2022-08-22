const mongoose = require("mongoose");

const postsSchema = mongoose.Schema({
    userId: { type: String, required: true },
    message: { type: String, required: true },
    photo: { type: String },
    video: { type: String },
    likes: { type: Number, defaut: 0 },
    dislikes: { type: Number, defaut: 0 },
    usersLiked: { type: [String] },
    usersDisliked: { type: [String] },
    commentaires: {
        type: [
            {
                userId: String,
                userPseudo: String,
                texte: String,
                timestamp: Number,
            }
        ],
        required: true,
    },
},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Post", postsSchema);