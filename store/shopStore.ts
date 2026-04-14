import { shops as initialShops } from "@/data/shops";

let globalShops = [...initialShops];

export const getShops = () => globalShops;

export const addShop = (shop: any) => {
  globalShops.push(shop);
};