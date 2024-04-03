import fs from "fs";
import path from "path";

// 指定要寫入的檔案路徑
const filePath = path.resolve("static", "todo.json");

async function getTodo(): Promise<TodoItem[]> {
  // 寫入檔案
  // 以同步方式读取JSON文件
  //todo:readFile
  // const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  // // 返回JSON数据
  // return data;
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        reject([]);
      }
      try {
        const jsonData = JSON.parse(data);
        resolve(jsonData);
      } catch (parseErr) {
        console.error("Error parsing JSON:", parseErr);
        reject([]);
      }
    });
  });
}

export default defineEventHandler(async (event) => {
  try {
    const todo = await getTodo();
    return todo;
  } catch (error) {
    console.error("Failed to get todo:", error);
    return []; // 或者返回一个错误消息，取决于您的应用如何处理这种情况
  }
});

interface TodoItem {
  todo: string;
  done: Boolean;
  editing: Boolean;
}
