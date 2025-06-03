/**
 * Represents a single course menu entry stored in a database.
 */
export type CourseMenuEntity = {
  /** Unique identifier */
  id: string;
  title: string;
  priceTot: number;
};

export type CourseMenuPayload = Omit<CourseMenuEntity, "id">;

/**
 * Represents a single course entry stored in a database.
 */
export type CourseEntity = {
  /** Unique identifier */
  id: string;
  courseMenuId: string;
  name: string;
  type: CourseType;
};

export type CourseType = "starter" | "main" | "dessert";

export type CoursePayload = Omit<CourseEntity, "id">;

export type CourseUpdatePayload = Omit<CoursePayload, "courseMenuId">;

/**
 * Represents a single course menu and it's associated courses to be edited in the edit menu page.
 */
export type CourseMenuObj = {
  courseMenu: CourseMenuEntity;
  courses: Array<CourseEntity>;
};
