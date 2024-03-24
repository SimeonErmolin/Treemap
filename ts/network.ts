import { CoinCategory } from "./interfaces";

const options = {
  method: "GET",
  headers: { "x-cg-demo-api-key": "CG-tRqtMH5Fg7UARHsUWEVqziuJ" },
};
const URL = "https://api.coingecko.com/api/v3/coins/categories";

export async function getCoinData(): Promise<CoinCategory[]> {
  try {
    const response = await fetch(URL, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch coin data:", error);
    throw error;
  }
}
