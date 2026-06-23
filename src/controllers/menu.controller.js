const menuService = require("../services/menu.service");

async function getMenu(req, res, next) {
  try {
    const menu = await menuService.getAllMenuItems();

    res.status(200).json({
      status: "success",
      data: menu,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
}


async function getMenuItem(req, res, next) {
  try {
    const id = Number(req.params.id);

    const menuItem = await menuService.getMenuItem(id);

    res.status(200).json({
      status: "success",
      data: {
        menu_item: menuItem,
      },
    });

  } catch (error) {
    res.status(error.status).json({
        "status": "error",
        "message": error.message
    })
  }
}

module.exports = { getMenu, getMenuItem };
