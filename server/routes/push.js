const express = require('express');
const router = express.Router();
const webpush = require('web-push');
const User = require('../models/User');
const RequestParcel = require('../models/RequestParcels');

router.post('/subscribe/:id', async (req, res) => {
    const subscription = req.body;
    const users = await User.findById(req.params.id)
        .then(async user => {
            console.log(user)
            if (!user) {
                res.status(404).json({msg: " not found"});
            } else {

                await RequestParcel.find({
                    "userId._id": user._id,
                    "confirmationSend": true,
                    "confirmationRecive": false
                }).then((aa) => {
                        if (aa && aa.length) {
                            user.subscription = JSON.stringify(subscription);
                            user.save();
                            console.log("done")
                        } else {
                            console.log("confirmation Required")
                        }

                    }
                ).catch(
                    err => {
                        console.log(err);
                        console.log("aaaa")
                    }
                )
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
