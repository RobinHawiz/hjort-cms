import { DrinkEntity, DrinkMenuEntity, DrinkMenuObj } from "@ts/types";
import { DrinkMenuAPI } from "@ts/utils/api";

/**
 * Retrieves drink menu data along with its associated drink items from the backend.
 *
 * Combines both into a single structured object to simplify rendering logic
 * for DOM factories.
 *
 * @returns A Promise resolving to an array of DrinkMenuObj entries.
 */
export async function getDrinkMenuData(): Promise<Array<DrinkMenuObj>> {
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
