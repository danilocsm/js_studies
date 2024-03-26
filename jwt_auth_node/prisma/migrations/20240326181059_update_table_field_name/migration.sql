/*
  Warnings:

  - You are about to drop the column `passowrd` on the `accounts` table. All the data in the column will be lost.
  - Added the required column `password` to the `accounts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "passowrd",
ADD COLUMN     "password" TEXT NOT NULL;
