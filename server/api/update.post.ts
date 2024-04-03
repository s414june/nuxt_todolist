import fs from "fs";
import path from "path";

// 指定要寫入的檔案路徑
const filePath = path.resolve("static", "todo.json");

function updateTodo(myJSON: object) {
  const jsonString = JSON.stringify(myJSON);
  // 寫入檔案
  fs.writeFile(filePath, jsonString, "utf8", (err: any) => {
    if (err) throw err;
    console.log("The file has been saved!");
  });
}

export default defineEventHandler(async (event) => {
  const myJSON = await readBody(event);
  updateTodo(myJSON);
  return "ok";
});
