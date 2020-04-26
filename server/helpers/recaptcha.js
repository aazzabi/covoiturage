const Bluebird = require('bluebird');
const Recaptcha = require('recaptcha-v2').Recaptcha;
var config = require('../config/config'); // get db config file

/**
 * Verify ReCaptcha
 * @param {Object} recaptchaData
 * @returns {Promise}
 */
exports.verifyRecaptcha = (recaptchaData) => {
    if (config.recaptcha.RECAPTCHA_SKIP_ENABLED === 'true') { // For development purpose only, you need to add SKIP_ENABLED in .env
        return Bluebird.resolve();
    }

    return new Bluebird((resolve, reject) => {
        const recaptcha = new Recaptcha(config.recaptcha.RECAPTCHA_SITE_KEY, config.recaptcha.RECAPTCHA_SECRET_KEY, recaptchaData);

        recaptcha.verify((success) => {
            if (success) {
                return resolve();
            }

            reject(new Error());
        });
    });
};
