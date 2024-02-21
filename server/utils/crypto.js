const crypto = require('crypto')
require('dotenv').config();

const algorithm = 'aes-256-cbc'
const key = process.env.ENCRYTION_KEY;
const iv = process.env.INITIALIZATION_VECTOR

const encrypter = (data) => {
    const cipher = crypto.createCipheriv(algorithm, key, iv)
    const encrypted = cipher.update(data, 'utf8', 'hex') + cipher.final('hex')
    return encrypted
}

const decrypter = (data) => {
    const decipher = crypto.createDecipheriv(algorithm, key, iv)
    const decrypted =
        decipher.update(data, 'hex', 'utf8') + decipher.final('utf8')
    return decrypted
}

module.exports = { encrypter, decrypter };