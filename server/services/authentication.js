const db = require("../database");
const bcrypt = require("bcrypt"); // bcrypt will encrypt passwords to be saved in db
const passport = require('passport')
const LocalStrategy = require('passport-local')

function hashPassword(password, salt = 12) {
    return bcrypt.hash(password, salt);
}


function checkPassword(password, passwordDigest) {
    return bcrypt.compare(password, passwordDigest);
}


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

passport.use('login', new LocalStrategy(
    { usernameField: "username", passwordField: "password"},
    async (username, password, done) => {
        let user = await db.User.findOne({where: {username: username}});
        if (user === null || await !checkPassword(password, user.passwordDigest))
            return done({message: 'Invalid credentials.'}, null);
        return done(null, user);
    }
));

module.exports = {


    async register(username, oneTimeId, password) {
        const user = await db.User.findOne({
            where: { username: username }
        });
        if (!user)
            return BOOM
        if (user.oneTimeId !== oneTimeId) {
            console.error(user.oneTimeId, " ", oneTimeId)
            return nsei

        }
        if (user.passwordDigest !== null)
            return nse2

        await user.update({
            passwordDigest: await hashPassword(password)
        })
    },
    async login(req, res) {
        passport.authenticate("login", {}, (err, user) => {
            if (err)
                return res.status(401).json(err);
                req.login(user, console.error);
                return res.status(200).json(user);
            })(req, res);
    }
}

