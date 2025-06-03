import { DrinkEntity, DrinkMenuEntity, DrinkMenuObj } from "@ts/types";
import { DrinkMenuAPI } from "@ts/utils/api";

export async function getDrinkMenuData() {
  const drinkMenus = await getDrinkMenus();
  const drinkMenuObjects = await Promise.all(
    drinkMenus.map(async (drinkMenu) => {
      const drinks = await getDrinks(drinkMenu.id);
      return { drinkMenu, drinks } as DrinkMenuObj;
    })
  );
  return drinkMenuObjects;
}

async function getDrinkMenus(): Promise<Array<DrinkMenuEntity>> {
  try {
    const api = new DrinkMenuAPI();
    return await api.getAllDrinkMenues();
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function getDrinks(id: string): Promise<Array<DrinkEntity>> {
  try {
    const api = new DrinkMenuAPI();
    return await api.getAllDrinksByMenuId(id);
  } catch (error) {
    console.error(error);
    return [];
  }
}
