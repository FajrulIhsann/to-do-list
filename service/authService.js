const bcrypt = require('bcrypt')

module.exports = {
    comparePassword: async(plainPassword, hashedPassword) => {
        return await bcrypt.compare(plainPassword, hashedPassword)
    },

    hashPassword: async(plainPassword) => {
        const salt = 10
        return await bcrypt.hash(plainPassword, salt)
    }
}