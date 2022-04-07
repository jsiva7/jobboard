const Joi = require('joi');
const jwt = require('jsonwebtoken');

//body validation
module.exports = {
    jobv: function () {
        return async function (req, res, next) {
            const jobSchema = Joi.object({
                JobTitle: Joi.string().required(),
                JobLocation: Joi.string().required(),
                JobDescription: Joi.string().required(),
            })

            try {
                const valid = await jobSchema.validateAsync(req.body);
                if (valid) {
                    next();
                }
            } catch (err) {
                const { details } = err;
                const message = details.map(i => i.message).join(',');

                res.status(422).json({
                    error: message
                })
            }
        };
    },
    tokenv: function () {
        return async function (req, res, next) {
            // check header or url parameters or post parameters for token
            var authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1]

            if (!token)
                return res.status(403).send({ auth: false, message: 'No token provided.' });

            // verifies secret and checks exp
            jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
                if (err)
                    return res.status(500).send({ auth: false, message: 'Auth failed.' });

                if (decoded.purpose == "demo") {
                    next();
                }
            });
        };
    },
};