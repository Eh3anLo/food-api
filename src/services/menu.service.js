const prisma = require("../config/prisma");

async function getAllMenuItems() {
  const categoryLable = {
    MAIN_COURSE: "غذای اصلی",
    APPETIZER: "پیش غذا",
    DESSERT: "دسر",
    DRINK: "نوشیدنی",
  };
  const menuItems = await prisma.menuItem.findMany({
    orderBy: {
      created_at: "desc",
    },
  });

  return menuItems.map((item) => ({
    ...item,
    category: categoryLable[item.category],
  }));
}

async function getMenuItem(id) {
  
  const menuItem = await prisma.menuItem.findUnique({
    where: {
      id,
    },
  });

  if(!menuItem){
    const error = new Error("آیتم مورد نظر یافت نشد")
    error.status = 404
    throw error
  }

  return menuItem
}

module.exports = { getAllMenuItems, getMenuItem };
