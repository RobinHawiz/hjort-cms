const DEFAULT_API_BASE_URL = "https://hjort-backend.azurewebsites.net/api";
const baseUrl = import.meta.env.VITE_API_BASE_URL ?? DEFAULT_API_BASE_URL;

export async function isUserAuth(): Promise<boolean> {
  try {
    const response = await fetch(`${baseUrl}/auth`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    return response.ok;
  } catch (error) {
    console.log("Unexpected app error:", error);
    return false;
  }
}
