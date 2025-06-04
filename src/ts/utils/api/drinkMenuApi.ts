import {
  DrinkEntity,
  DrinkMenuEntity,
  DrinkMenuPayload,
  DrinkPayload,
  DrinkUpdatePayload,
} from "@ts/types";
import { fetchData } from "@ts/utils/api";
const DEFAULT_API_BASE_URL = "https://hjort-backend.azurewebsites.net/api";
const baseUrl = import.meta.env.VITE_API_BASE_URL ?? DEFAULT_API_BASE_URL;

/**
 * Provides methods to interact with the Drink menu API.
 */
export class DrinkMenuAPI {
  constructor(private readonly apiUrl = baseUrl) {}

  /**
   * Retrieves all drink menu entities via GET /api/public/drink-menu
   * @returns A parsed array containing DrinkMenuEntity objects
   */
  async getAllDrinkMenues(): Promise<Array<DrinkMenuEntity>> {
    return await fetchData(`${this.apiUrl}/public/drink-menu`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  }

  /**
   * Retrieves all drink entities via GET /api/public/drink/id
   * @returns A parsed array containing DrinkEntity objects
   */
  async getAllDrinksByMenuId(id: string): Promise<Array<DrinkEntity>> {
    return await fetchData(`${this.apiUrl}/public/drink/${id}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  }

  /**
   * Updates a specific drink menu entry via PUT /api/protected/drink-menu/:id
   * @param id - The ID of the drink menu entry to update
   * @param payload - The updated drink menu data
   */
  async updateDrinkMenu(id: string, payload: DrinkMenuPayload): Promise<void> {
    const options: RequestInit = {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    await fetchData<void>(`${this.apiUrl}/protected/drink-menu/${id}`, options);
  }

  /**
   * Creates a drink entry via POST /api/protected/drink
   * @param payload - The drink data to insert
   */
  async insertDrink(payload: DrinkPayload): Promise<void> {
    const options: RequestInit = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    await fetchData<void>(`${this.apiUrl}/protected/drink`, options);
  }

  /**
   * Updates a specific drink entry via PUT /api/protected/drink/:id
   * @param id - The ID of the drink entry to update
   * @param payload - The updated drink data
   */
  async updateDrink(id: string, payload: DrinkUpdatePayload): Promise<void> {
    const options: RequestInit = {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    await fetchData<void>(`${this.apiUrl}/protected/drink/${id}`, options);
  }

  /**
   * Deletes a specific drink entry via DELETE /api/protected/drink/:id
   * @param id - The ID of the drink entry to delete
   */
  async deleteDrink(id: string): Promise<void> {
    const options: RequestInit = {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    await fetchData<void>(`${this.apiUrl}/protected/drink/${id}`, options);
  }
}
