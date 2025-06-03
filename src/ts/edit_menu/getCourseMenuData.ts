import { CourseEntity, CourseMenuEntity, CourseMenuObj } from "@ts/types";
import { CourseMenuAPI } from "@ts/utils/api";

/**
 * Retrieves course menu data along with its associated course items from the backend.
 *
 * Combines both into a single structured object to simplify rendering logic
 * for DOM factories.
 *
 * @returns A Promise resolving to an array of CourseMenuObj entries.
 */
export async function getCourseMenuData(): Promise<Array<CourseMenuObj>> {
  const courseMenus = await getCourseMenus();
  const courseMenuObjects = await Promise.all(
    courseMenus.map(async (courseMenu) => {
      const courses = await getCourses(courseMenu.id);
      return { courseMenu, courses } as CourseMenuObj;
    })
  );
  return courseMenuObjects;
}

async function getCourseMenus(): Promise<Array<CourseMenuEntity>> {
  try {
    const api = new CourseMenuAPI();
    return await api.getAllCourseMenues();
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function getCourses(id: string): Promise<Array<CourseEntity>> {
  try {
    const api = new CourseMenuAPI();
    return await api.getAllCoursesByMenuId(id);
  } catch (error) {
    console.error(error);
    return [];
  }
}
