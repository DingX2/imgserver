const { default: mongoose } = require('mongoose');

const userSchema = mongoose.Schema({
    image: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
