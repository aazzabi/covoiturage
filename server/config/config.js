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
        clientId: "871066785220-hldeeag52kteqd0krje4cvmcfkvci3ui.apps.googleusercontent.com",
        clientSecret : "QD_M2V8hvU5p63Vzz_-CrjRX",
        callbackUrl: "http://localhost:3000/auth/google/callback"
    },
    recaptcha: {
        RECAPTCHA_SKIP_ENABLED: false,
        RECAPTCHA_SITE_KEY: '6LfQlO4UAAAAAFcny4jQrGlJS_y87irTjS7j3bbL',// v2
        RECAPTCHA_SECRET_KEY: '6LfQlO4UAAAAAOYUPjbElWIqiU_whZzRlE6TIo-F'//v2

        // RECAPTCHA_SITE_KEY: '6Leiku4UAAAAABFTa1RAtTm9Zt1sZOJ2mZWtFnDe',// v3
        // RECAPTCHA_SECRET_KEY: '6Leiku4UAAAAADo_CyVmgjbXOR5jKUMsbkq8i3HA'//v3
    }
};
