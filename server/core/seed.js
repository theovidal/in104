const users = require('../controllers/users')
const courses = require('../controllers/courses')

// Provide the database with some data to start with
module.exports = async function seedDatabase() {
  const user = await users.create({
    firstname: "arnaud",
    lastname: "pelissier",
    email: "a@a.a",
    role: "eleve",
    password: "1234"
  });

  const teacher = await users.create({
    firstname: "teacher",
    lastname: "teacher",
    email: "t@t.ta",
    role: "professeur",
    password: "abcd"
  });

  const course = await courses.create(teacher.id, "MA103 - Groupe 7")
  await courses.addAttendantById(course.id, user.id)
}