const authService = require('../services/auth.service')


async function registerUser(req, res, next) { // req.body = {name,email,password,role}
    
    try {
        const user = await authService.register(req.body)

        res.status(201).json({
            "status" : "success",
            "message" : "ثبت نام با موفقیت انجام شد",
            "data" : user
        })

    } catch (error) {
        res.status(error.status).json({
            "status": "faild",
            "message": error.message
        })
    }
    

}


module.exports = { registerUser }