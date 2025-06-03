import { ReservationEntity } from "@ts/types";
import { ReservationAPI } from "@ts/utils/api";

export async function getReservations(): Promise<Array<ReservationEntity>> {
  try {
    const api = new ReservationAPI();
    return await api.getAll();
  } catch (error) {
    console.error(error);
    return [];
  }
}
