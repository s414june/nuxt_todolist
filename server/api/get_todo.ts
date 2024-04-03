import fs from "fs";
import path from "path";

// 指定要寫入的檔案路徑
const filePath = path.resolve("static", "todo.json");

function getTodo() {
  // 寫入檔案
  // 以同步方式读取JSON文件
  //todo:readFile
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  // 返回JSON数据
  return data;
}

export default defineEventHandler(async (event) => {
  const todo = await getTodo();
  return todo;
});
