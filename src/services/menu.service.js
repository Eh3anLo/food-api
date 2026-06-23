const prisma = require("../config/prisma");

const categoryLabel = {
  MAIN_COURSE: "غذای اصلی",
  APPETIZER: "پیش غذا",
  DESSERT: "دسر",
  DRINK: "نوشیدنی",
};

const categoryValue = {
  "غذای اصلی": "MAIN_COURSE",
  "پیش غذا": "APPETIZER",
  "دسر": "DESSERT",
  "نوشیدنی": "DRINK",
};

async function getAllMenuItems() {
  const menuItems = await prisma.menuItem.findMany({
    orderBy: {
      created_at: "desc",
    },
  });

  return menuItems.map((item) => ({
    ...item,
    category: categoryLabel[item.category],
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

async function createMenuItem(item) {
  console.log("SERVICE_CREATEasdasdads")
  console.log(item)
  const existingItem = await prisma.menuItem.findFirst({
    where: {
      name: item.name
    }
  })

  console.log(existingItem)

  if(existingItem){
    const error = new Error("آیتم در منو وجود دارد")
    error.status = 409
    throw error
  }


  console.log("SERVICE _ Address")
  const menuItem = await prisma.menuItem.create({
    data:{
      ...item,
      category: categoryValue[item.category],
    }
  })

  return menuItem
}

module.exports = { getAllMenuItems, getMenuItem, createMenuItem };
