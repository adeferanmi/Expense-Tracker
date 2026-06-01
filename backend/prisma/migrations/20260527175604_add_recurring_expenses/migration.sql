-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "isRecurring" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "recurringInterval" TEXT;
