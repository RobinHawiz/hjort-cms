export async function isUserAuth(): Promise<boolean> {
  try {
    const response = await fetch(
      "https://hjort-backend.azurewebsites.net/api/auth",
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    return response.ok;
  } catch (error) {
    console.log("Unexpected app error:", error);
    return false;
  }
}
