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

async function loginUser(req, res, next) {
    try {
        const { email , password } = req.body
        const result = await authService.login(email,password)

        res.status(200).json({
            "status": "success",
            "message": "با موفقیت وارد شدید",
            "data": {
                "user" : {
                    "id" : result.user.id,
                    "name": result.user.name,
                    "email": result.user.email
                },
                "token" : result.token
            }
        })
        
    } catch (error) {
        res.status(error.status).json({
            "status": "faild",
            "message": error.message
        })
    }
}


module.exports = { registerUser, loginUser }