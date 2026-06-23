/*
  Warnings:

  - Changed the type of `category` on the `menu_items` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Category" AS ENUM ('غذای اصلی', 'پیش عذا', 'دسر', 'نوشیدنی');

-- AlterTable
ALTER TABLE "menu_items" DROP COLUMN "category",
ADD COLUMN     "category" "Category" NOT NULL;
