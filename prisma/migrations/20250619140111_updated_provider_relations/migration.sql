/*
  Warnings:

  - You are about to drop the `Provider` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Availability" DROP CONSTRAINT "Availability_providerId_fkey";

-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_providerId_fkey";

-- DropForeignKey
ALTER TABLE "Provider" DROP CONSTRAINT "Provider_userId_fkey";

-- DropTable
DROP TABLE "Provider";

-- AddForeignKey
ALTER TABLE "Availability" ADD CONSTRAINT "Availability_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
