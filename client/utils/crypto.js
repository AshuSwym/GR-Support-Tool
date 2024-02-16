const crypto = require('crypto')

const algorithm = 'aes-256-cbc'
const key = process.env.NEXT_PUBLIC_ENCRYTION_KEY
const iv = process.env.NEXT_PUBLIC_INITIALIZATION_VECTOR

const encrypter = (data) => {
    console.log(key, iv)
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

export { encrypter, decrypter }

//+MJXSSa4SDugTMDOie6X7un2J+csoJCqVQM1bXRfybs=