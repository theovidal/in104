// Get all the courses associated with the lectures
import { endpoints, request } from '@/utils/api.js'

export async function getLectureCourses(lectures) {
  let courses = {}
  for (const lecture of lectures) {
    // Get all the courses associated with these lectures
    if (courses[lecture.courseId] === undefined) {
      const response = await request(endpoints.courses)
      courses[lecture.courseId] = await response.json()
    }
  }
  return courses;
}
