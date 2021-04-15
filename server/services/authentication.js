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
    const jwtBody = { id: user.id, username: user.username };

    const token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60), // 1 Hr expiration
        user: jwtBody
    }, JWT_SECRET);

    return token;
}

passport.use('login', new LocalStrategy(
    { usernameField: "username", passwordField: "password"},
    async (username, password, done) => {
        let user = await db.User.findOne({where: {username: username}});

        if (user === null || !await checkPassword(password, user.passwordDigest)) {
            return done('Invalid credentials.', null);
        }
        return done(null, user);
    }
));

passport.use('jwt', new JwtStrategy({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: JWT_SECRET || "secret",
        },
        (jwtPayload, done) => {
            console.log("Payload:" ,jwtPayload);
            db.User.findByPk(jwtPayload.user.id)
                .then((user) => done(null, user || false))
                .catch((err) => done(err, false));
        }
    )
);



/*
passport.serializeUser((user, done) => {
    //console.log("Hello from serializeUser")
    done(null, user.id)
});

passport.deserializeUser(function(id, done) {
    //console.log("Hello from deserializeUser")
    db.User.findByPk(id)
        .then(user => { done(null, user); })
        .catch(err => {console.log(err); done(err, null); });
});
*/

module.exports = {
    authenticateMiddleware: passport.authenticate("jwt", { session: false }),

    async register(username, oneTimeId, password) {
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
            passwordDigest: await hashPassword(password)
        })

        return generateJWT(user);
    },

    async login(username, password, req, res) {

        return new Promise((resolve, reject) => {
            passport.authenticate("login", {}, (err, user) => {
                if (err)
                    reject(err);
                else resolve(generateJWT(user));
            })(req, res);
        })

    }
}

