const express = require('express');
const router = express.Router();

const { updateProfile, getFavourites, addFavourite, removeFavourite } = require('../controllers/user.controller');
const { protect } = require('../middlewares/auth.middleware');
const { authorizeRoles } = require('../middlewares/role.middleware');

router.use(protect, authorizeRoles('user'));

router.put('/profile', updateProfile);
router.get('/favourites', getFavourites);
router.post('/favourites/:workerId', addFavourite);
router.delete('/favourites/:workerId', removeFavourite);

module.exports = router;