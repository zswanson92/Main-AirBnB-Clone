const express = require('express')

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth')
const router = express.Router();

const validateLogin = [
    check('credential')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Please provide a valid email or username.'),
    check('password')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a password.'),
    handleValidationErrors
  ];

router.post(
    '/',
    validateLogin,
    async (req, res, next) => {
      const { credential, password } = req.body;

      const user = await User.login({ credential, password });

      if (!user) {
        const err = new Error('Login failed');

        err.title = 'Login failed';
        err.errors = ['The provided credentials were invalid.'];
        res.status(401)
        // return next(err);
        res.json({
            "message": "Invalid credentials",
            "statusCode": 401,
            "errors": "Invalid Credentials"
        })
      }

      await setTokenCookie(res, user);

      return res.json({
        "id": user.id,
        "firstName": user.firstName,
        "lastName": user.lastName,
        "email": user.email,
        "username": user.username
      });
    }
  );

  router.delete(
    '/',
    (_req, res) => {
      res.clearCookie('token');
      return res.json({ message: 'success' });
    }
  );

  router.get(
    '/',
    // restoreUser,
    (req, res) => {

      const { user } = req;
      // console.log(user.toSafeObject())
      // console.log(user)
      if (user) {
        return res.json({
          // user: user.toSafeObject()
          "id": user.id,
          "firstName": user.firstName,
          "lastName": user.lastName,
          "email": user.email,
          "username": user.username
        });
      } else return res.json(null);
    }
  );

  // router.get('/', (req, res) => {
  //   return res.json('hello world')
  // })


  // router.get('/', requireAuth, async (req, res) => {
  //   const user = await User.findAll()

  //   res.json(user)
  // })


module.exports = router;
