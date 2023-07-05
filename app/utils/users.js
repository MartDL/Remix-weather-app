import fs from "fs/promises";

export async function getUser() {
  const rawFileContent = await fs.readFile("users.json", {
    encoding: "utf-8",
  });
  const data = JSON.parse(rawFileContent);
  const storedUser = data.user ?? [];
  return storedUser;
}

export function storeUser(user) {
  return fs.writeFile("users.json", JSON.stringify({ user: user || [] }));
}
