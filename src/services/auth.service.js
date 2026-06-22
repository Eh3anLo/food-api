const bcrypt = require('bcrypt')
const prisma = require('../config/prisma');

async function register(data) {

    const { name, email, password } = data;

    const role = data.role || "USER";
    
    const existingUser = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if(existingUser){
        // handle error and return
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
        data: {
            name,
            password: hashedPassword,
            email,
            role
        }
    })

    console.log(user)
    return user

    
}


module.exports = { register }