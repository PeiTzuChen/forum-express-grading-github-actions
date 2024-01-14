const express = require('express')
const router = express.Router()
const admin = require('./modules/admin.js')
const restController = require('../controllers/restaurant-controller.js')
const userController = require('../controllers/user-controller.js')
const generalErrorHandler = require('../middleware/error-handler.js')
const passport = require('../config/passport')
const { authenticated, authenticatedAdmin } = require('../middleware/auth.js')

router.use('/admin', authenticatedAdmin, admin)
router.get('/signup', userController.signUpPage)
router.post('/signup', userController.signUp)
router.get('/signin', userController.signInPage)
router.post(
  '/signin',
  passport.authenticate('local', {
    failureRedirect: '/signin',
    failureFlash: true
  }),
  userController.signIn
)
router.post('/logout', userController.logout)
router.get('/restaurants', authenticated, restController.getRestaurant)
router.use('/', (req, res) => {
  res.redirect('/restaurants')
})
router.use(generalErrorHandler)

module.exports = router
