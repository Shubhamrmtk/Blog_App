/*
  Warnings:

  - You are about to drop the column `reactionId` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "reactionId" INTEGER[];

-- AlterTable
ALTER TABLE "User" DROP COLUMN "reactionId";
