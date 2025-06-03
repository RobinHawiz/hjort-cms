import {
  CourseEntity,
  CourseMenuEntity,
  CourseMenuPayload,
  CoursePayload,
  CourseUpdatePayload,
} from "@ts/types";
import { fetchData } from "@ts/utils/api";

/**
 * Provides methods to interact with the Course menu API.
 */
export class CourseMenuAPI {
  constructor(private readonly apiUrl = "http://localhost:4000/api") {}

  /**
   * Retrieves all course menu entities via GET /api/public/course-menu
   * @returns A parsed array containing CourseMenuEntity objects
   */
  async getAllCourseMenues(): Promise<Array<CourseMenuEntity>> {
    return await fetchData(`${this.apiUrl}/public/course-menu`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  }

  /**
   * Retrieves all course entities via GET /api/public/course/id
   * @returns A parsed array containing CourseEntity objects
   */
  async getAllCoursesByMenuId(id: string): Promise<Array<CourseEntity>> {
    return await fetchData(`${this.apiUrl}/public/course/${id}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  }

  /**
   * Updates a specific course menu entry via PUT /api/protected/course-menu/:id
   * @param id - The ID of the course menu entry to update
   * @param payload - The updated course menu data
   */
  async updateCourseMenu(
    id: string,
    payload: CourseMenuPayload
  ): Promise<void> {
    const options: RequestInit = {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    await fetchData<void>(
      `${this.apiUrl}/protected/course-menu/${id}`,
      options
    );
  }

  /**
   * Creates a course entry via POST /api/protected/course
   * @param payload - The course data to insert
   */
  async insertCourse(payload: CoursePayload): Promise<void> {
    const options: RequestInit = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    await fetchData<void>(`${this.apiUrl}/protected/course`, options);
  }

  /**
   * Updates a specific course entry via PUT /api/protected/course/:id
   * @param id - The ID of the course entry to update
   * @param payload - The updated course data
   */
  async updateCourse(id: string, payload: CourseUpdatePayload): Promise<void> {
    const options: RequestInit = {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    await fetchData<void>(`${this.apiUrl}/protected/course/${id}`, options);
  }

  /**
   * Deletes a specific course entry via DELETE /api/protected/course/:id
   * @param id - The ID of the course entry to delete
   */
  async deleteCourse(id: string): Promise<void> {
    const options: RequestInit = {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    await fetchData<void>(`${this.apiUrl}/protected/course/${id}`, options);
  }
}
