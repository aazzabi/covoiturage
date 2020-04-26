const nodemailer = require('nodemailer');

module.exports = {
    env: {
        port: process.env.PORT || 3000,
        host: process.env.HOST || "localhost"
    },
    db: {
        url: "mongodb://localhost:27017/covoiturage",
    },
    authentification: {
        secret: "nodeauthsecret",
        access_token: "ya29.GlviBsSxYrdvo41s1ptz_muNzVyX-B7YnAgme3UiiwXMlGu82dWIwjN4P9hso6FclLig2BKepnTJwv6DzOnyLpRAu6ffqKLFK49BaB18V3rFc5CBIGwpqErZaqQF",
        refreshTokenSecret: "1/uN9olQ172AHtwf1U3fp2GYRBK4KQUhaCSIeFknMgteg",
        tokenLife: 900,
        refreshTokenLife: 86400
    },
    upload: {
        directoryUsersImage: 'D:\\covoiturageImages\\uploads\\users\\',
        directoryDrivers: 'D:\\covoiturageImages\\uploads\\drivers\\',
    },
    smtpTransport: nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        auth: {
            user: "prisma.crm.2019@gmail.com",
            pass: "prismacrm2019"
        }
    }),
    google : {
        // clientId: "871066785220-82c81c51vgc954etqo4fo5d5b9505c3c.apps.googleusercontent.com", // proket2
        // clientSecret : "Vv-_PfASmufjO7FvyWUQJpEt", // projet2
        clientId: "871066785220-82c81c51vgc954etqo4fo5d5b9505c3c.apps.googleusercontent.com",
        clientSecret : "Vv-_PfASmufjO7FvyWUQJpEt", // projet3
    },
    facebook : {
        clientId: "556643301916298",
        clientSecret : "72d4ffc99e254c57a30744e966c45db4",
    }
};
