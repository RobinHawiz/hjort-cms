import { ReservationEntity } from "@ts/types";
import { fetchData } from "@ts/utils/api";

/**
 * Provides methods to interact with the Reservation API.
 */
export class ReservationAPI {
  constructor(
    private readonly apiUrl = "https://hjort-backend.azurewebsites.net/api/protected"
  ) {}

  /**
   * Retrieves all reservation entities via GET /api/protected/reservations
   * @returns A parsed array containing WorkExperienceEntity objects
   */
  async getAll(): Promise<Array<ReservationEntity>> {
    return await fetchData(`${this.apiUrl}/reservations`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  }

  /**
   * Deletes a specific reservation entry via DELETE /api/protected/reservations/:id.
   * @param id - The ID of the entry to delete
   */
  async delete(id: string): Promise<void> {
    const options: RequestInit = {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    await fetchData<void>(`${this.apiUrl}/reservations/${id}`, options);
  }
}
