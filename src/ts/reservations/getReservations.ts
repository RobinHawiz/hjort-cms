import { ReservationAPI } from "@ts/utils/api";

export async function getReservations() {
  try {
    const api = new ReservationAPI();
    return await api.getAll();
  } catch (error) {
    console.error(error);
  }
}
