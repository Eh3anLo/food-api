const prisma = require("../config/prisma");
const ApiError = require("../utils/ApiError");
const categoryLabel = {
  MAIN_COURSE: "غذای اصلی",
  APPETIZER: "پیش غذا",
  DESSERT: "دسر",
  DRINK: "نوشیدنی",
};

const categoryValue = {
  "غذای اصلی": "MAIN_COURSE",
  "پیش غذا": "APPETIZER",
  دسر: "DESSERT",
  نوشیدنی: "DRINK",
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

  if (!menuItem) {
    throw new ApiError(404, "آیتم یافت نشد");
  }

  return menuItem;
}

async function createMenuItem(item) {
  console.log("SERVICE_CREATEasdasdads");
  console.log(item);
  const existingItem = await prisma.menuItem.findFirst({
    where: {
      name: item.name,
    },
  });

  console.log(existingItem);

  if (existingItem) {
    throw new ApiError(409, "این آیتم قبلا ثبت شده است");
  }

  console.log("SERVICE _ Address");
  const menuItem = await prisma.menuItem.create({
    data: {
      ...item,
      category: categoryValue[item.category],
    },
  });

  return menuItem;
}

async function updateMenuItem(id, data) {
  const existedItem = await prisma.menuItem.findUnique({
    where: { id },
  });

  if (!existedItem) {
    throw new ApiError(404, "آیتم یافت نشد");
  }

  return await prisma.menuItem.update({
    where: { id },
    data: {
      ...data,
    },
  });
}

async function deleteMenuItem(id) {
  const menuItemId = await   prisma.menuItem.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
    },
  });

  console.log(menuItemId)
  if (!menuItemId) {
    throw new ApiError(404, "آیتم یافت نشد");
  }

  return await prisma.menuItem.delete({
    where: {
      id: menuItemId.id,
    },
  });
}

module.exports = {
  getAllMenuItems,
  getMenuItem,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
};
