const express = require('express');

const router = express.Router();

const postCtrl = require('../Controllers/post');
const auth = require('../Middleware/auth');
const multer = require('../Middleware/multer-post');

router.get('/', auth, postCtrl.getAllPosts);
// router.get('/:id', /*auth,*/ /*multer,*/ postCtrl.getOnePost);
router.post('/', /*auth,*/ multer, postCtrl.createPost);
router.put('/:id', /*auth,*/ multer, postCtrl.modifyPost);
router.delete('/:id', /*auth,*/ postCtrl.deletePost);

router.post('/like/:id', /*auth,*/ postCtrl.likePost);

router.patch('/commentaire-post/:id', postCtrl.createCommentaire);
router.patch('/modify-commentaire-post/:id', postCtrl.modifyCommentaire);
router.patch('/delete-commentaire-post/:id', postCtrl.deleteCommentaire);

module.exports = router;