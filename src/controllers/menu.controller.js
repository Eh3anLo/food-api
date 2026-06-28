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
      status: "error",
      message: error.message,
    });
  }
}

async function createMenuItem(req, res, next) {
  try {
    const menuItem = await menuService.createMenuItem(req.body);

    res.status(201).json({
      status: "success",
      data: menuItem,
    });
  } catch (error) {
    res.status(error.status).json({
      status: "error",
      message: error.message,
    });
  }
}

async function updateMenuItem(req, res, next) {
  try {
    const id = Number(req.params.id)
    const updatedMenuItem = await menuService.updateMenuItem(
      id,
      req.body,
    );

    res.status(200).json({
      status: "success",
      data: updatedMenuItem,
    });

  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}

async function deleteMenuItem(req, res, next) {
  try {
    const id = Number(req.params.id)
    const deletedMenuItem = await menuService.deleteMenuItem(id)

    res.status(200).json({
      status: "success",
      data: deletedMenuItem
    })
    
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}

module.exports = { getMenu, getMenuItem, createMenuItem, updateMenuItem, deleteMenuItem };
