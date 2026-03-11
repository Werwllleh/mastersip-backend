/*
  Warnings:

  - You are about to drop the column `email` on the `SalesLead` table. All the data in the column will be lost.
  - Added the required column `privacyPolicyAccepted` to the `SalesLead` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SalesLead" DROP COLUMN "email",
ADD COLUMN     "privacyPolicyAccepted" BOOLEAN NOT NULL;
