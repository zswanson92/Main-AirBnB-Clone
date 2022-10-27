const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spots.js')
const reviewsRouter = require('./reviews.js')
const bookingsRouter = require('./bookings.js')
const spotImage = require('./spot-images.js')
const reviewImgRouter = require('./review-images.js')
const { restoreUser } = require('../../utils/auth.js');
const { route } = require('./session.js');

router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/spots', spotsRouter)

router.use('/reviews', reviewsRouter)

router.use('/bookings', bookingsRouter)

router.use('/spot-images', spotImage)

router.use('/review-images', reviewImgRouter)

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;
