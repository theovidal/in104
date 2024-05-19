const courses = require("../controllers/courses");

// Return all the lectures a teacher has, so they can easily select one and start appointing pupils
module.exports = async function getLectures(req, res) {
  const data = await courses.getByTeacherId(res.locals.user.id)
  for (const i in data) {
    data[i].lectures = await courses.getCourseLectures(data[i].id);
  }
  return res.json({
    data
  })
}