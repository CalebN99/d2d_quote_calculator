const mongoose = require('mongoose')
bcrypt = require('bcrypt'),
SALT_WORK_FACTOR = 10;

const Admin = mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    dateCreated: {type: Date, default: Date.now},
    
})


// All user authentication code below retrieved from following link:
// https://stackoverflow.com/questions/14588032/mongoose-password-hashing
Admin.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});



Admin.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('Admin', Admin);