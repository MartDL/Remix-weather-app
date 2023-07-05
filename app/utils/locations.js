import fs from "fs/promises";

export async function getStoredLocations() {
  const rawFileContent = await fs.readFile("locations.json", {
    encoding: "utf-8",
  });
  const data = JSON.parse(rawFileContent);
  const storedLocations = data.locations ?? [];
  return storedLocations;
}

export function clearAllLocations() {
  return fs.writeFile("locations.json", JSON.stringify({ locations: [] }));
}

export function storeLocation(locations) {
  return fs.writeFile(
    "locations.json",
    JSON.stringify({ locations: locations || [] })
  );
}
