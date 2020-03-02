const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

// Path starts at 'api/v1'

// -------- Cities Routes

router.get('/cities', ctrl.cities.index);
router.get('/cities/:id', ctrl.cities.show);
router.post('/cities', ctrl.cities.create);
router.put('/cities/:id', ctrl.cities.update);
router.delete('/cities/:id', ctrl.cities.destroy);


// -------- Post Routes

router.get('/posts', ctrl.posts.index);
router.post('/cities/:cityId/posts', ctrl.posts.create);
router.delete('/cities/:cityId/posts/:postId', ctrl.posts.destroy);


// -------- Auth Routes

router.post('/register', ctrl.auth.register);
router.post('/login', ctrl.auth.login);
router.delete('/logout', ctrl.auth.logout);


module.exports = router;
