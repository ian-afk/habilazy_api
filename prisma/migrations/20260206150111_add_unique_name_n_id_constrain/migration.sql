/*
  Warnings:

  - A unique constraint covering the columns `[userId,title]` on the table `Goal` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,task]` on the table `SubTask` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,task]` on the table `Task` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Goal_title_key";

-- DropIndex
DROP INDEX "SubTask_task_key";

-- DropIndex
DROP INDEX "Task_task_key";

-- CreateIndex
CREATE UNIQUE INDEX "Goal_userId_title_key" ON "Goal"("userId", "title");

-- CreateIndex
CREATE UNIQUE INDEX "SubTask_userId_task_key" ON "SubTask"("userId", "task");

-- CreateIndex
CREATE UNIQUE INDEX "Task_userId_task_key" ON "Task"("userId", "task");
