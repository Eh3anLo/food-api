const menuService = require("../services/menu.service")

async function getMenu(req, res, next) {
    try{
        const menu = await menuService.getAllMenuItems()

        res.status(200).json({
            "status": "success",
            "data" : menu
        })

    } catch (error){
        res.status(500).json({
            "status": "failed",
            "message": error.message
        })
    }

}

module.exports = { getMenu }