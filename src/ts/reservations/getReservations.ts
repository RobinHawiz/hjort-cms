import { ReservationEntity } from "@ts/types";
import { ReservationAPI } from "@ts/utils/api";

/**
 * Retrieves reservation data from the backend.
 *
 * Is to be used by rendering logic in DOM factories.
 *
 * @returns A Promise resolving to an array of reservations or an empty array on failure.
 */
export async function getReservations(): Promise<Array<ReservationEntity>> {
  try {
    const api = new ReservationAPI();
    return await api.getAll();
  } catch (error) {
    console.error(error);
    return [];
  }
}
