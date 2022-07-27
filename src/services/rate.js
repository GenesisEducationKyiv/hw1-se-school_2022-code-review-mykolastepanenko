import axios from "axios";

export async function getRate(currency) {
  try {
    const response = await axios.get(
      `https://api.coinbase.com/v2/prices/spot?currency=${currency}`
    );
    const price = response.data.data.amount;
    return price;
  } catch (err) {
    return err;
  }
}
