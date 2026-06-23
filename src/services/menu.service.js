const primsa = require("../config/prisma");

async function getAllMenuItems() {
  const categoryLable = {
    MAIN_COURSE: "غذای اصلی",
    APPETIZER: "پیش غذا",
    DESSERT: "دسر",
    DRINK: "نوشیدنی",
  };
  const menuItems =  await primsa.menuItem.findMany({
    orderBy: {
      created_at: "desc",
    },
  });

  return menuItems.map(item => ({
    ...item,
    category: categoryLable[item.category]
  }))
}

module.exports = { getAllMenuItems };
