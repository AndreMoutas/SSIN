const db = require("../database");
const bcrypt = require("bcrypt"); // bcrypt will encrypt passwords to be saved in db
const jwt = require("jsonwebtoken");

const passport = require('passport')
const JwtStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const { ExtractJwt } = require("passport-jwt");


function hashPassword(password, salt = 12) {
    return bcrypt.hash(password, salt);
}

function checkPassword(password, passwordDigest) {
    return bcrypt.compare(password, passwordDigest);
}

const JWT_SECRET = process.env.JWT_SECRET;

function generateJWT(user) {
    const jwtBody = {
        id: user.id,
        username: user.username,
        endpoint: user.endpoint
    };

    return jwt.sign({
        user: jwtBody
    }, JWT_SECRET);
}

passport.use('login', new LocalStrategy(
    { usernameField: "username", passwordField: "password"},
    async (username, password, done) => {
        let user = await db.User.findOne({where: {username: username}});

        try {
            if (user === null || !await checkPassword(password, user.passwordDigest)) {
                return done('Invalid credentials.', null);
            }
            return done(null, user);
        } catch (error) {
            return done('Invalid credentials.', null);
        }
    }
));

passport.use('jwt', new JwtStrategy({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: JWT_SECRET || "secret",
        },
        (jwtPayload, done) => {
          //  console.log("Payload:" ,jwtPayload);
            db.User.findByPk(jwtPayload.user.id)
                .then((user) => done(null, user || false))
                .catch((err) => done(err, false));
        }
    )
);

module.exports = {
    authenticateMiddleware: passport.authenticate("jwt", { session: false }),

    minClearance: (clearanceLevel) => {
        return (req, res, next) => {
            if (req.user.clearanceLevel < clearanceLevel)
                return res.status(403).json("Not enough clearance level: " + req.user.clearanceLevel)
            return next();
        }
    },

    async register(username, oneTimeId, password, endpoint) {
        if (!username)
            throw Error('Username must be valid')
        if (password.length < 6)
            throw Error('Password is too short')

        const user = await db.User.findOne({
            where: { username: username }
        });
        if (!user)
            throw Error('User does not exist')
        if (user.oneTimeId !== oneTimeId)
            throw Error('User oneTimeId is not correct')
        if (user.passwordDigest !== null)
            throw Error('User is already registered')


        await user.update({
            passwordDigest: await hashPassword(password),
            endpoint: endpoint
        })

        return generateJWT(user);
    },

    async login(username, password, endpoint, req, res) {
        if (!username || !password)
            throw Error("Invalid username/password")

        return new Promise((resolve, reject) => {
            if (!username || !password)
                reject("Invalid username/password")
            passport.authenticate("login", {}, async (err, user) => {
                if (err)
                    reject(err);
                else {
                    await user.update({ endpoint: endpoint })
                    resolve(generateJWT(user));
                }
            })(req, res);
        })

    }
}

