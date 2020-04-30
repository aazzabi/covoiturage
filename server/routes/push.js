const express = require('express');
const router = express.Router();
const webpush = require('web-push');
const User = require('../models/User');

router.post('/subscribe/:id', async (req, res) => {
    const subscription = req.body;
    const user = req.params.id;
  const users =  await  User.findById(user)
        .then(user => {
            console.log(user)
            if (!user) {
                res.status(404).json({msg: " not found"});
            } else {
                user.subscription = JSON.stringify(subscription);
                user.save();
                console.log("done")
            }
        });

    res.status(201).json({});
    const payload = JSON.stringify({
        title: "Add your current location please",
        username: users.username
    });

    webpush.sendNotification(subscription, payload)
     .catch(err => {
        console.log(err);
   });
});

router.get('/', (req, res) => {
    User.find()
        .then(users => {
            users.forEach(user => {
                const subscription = user.subscription;
                res.status(201).json({});
                const payload = JSON.stringify({
                    title: "Testttt",
                    username: user.username
                });

                webpush.sendNotification(subscription, payload)
                    .catch(err => {
                        console.log(err);
                    });
            });
        });
});

router.post('/unsubscribe', (req, res) => {
    User.findById(req.body.user.id)
        .then(user => {
            if (!user) {
                res.status(404).json({msg: "User not found for /api/push/unsubscribe"});
            } else {
                user.subscription = null;
                user.save();
            }
        });

    res.status(201).json({});
});

module.exports = router;
