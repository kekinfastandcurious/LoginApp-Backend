const bcrypt = require('bcrypt');

async function encryptPasswords(password) {
    const encryptedPassword = await bcrypt.hash(password, 10);
    return encryptedPassword;
}

exports.encryptPasswords = encryptPasswords;