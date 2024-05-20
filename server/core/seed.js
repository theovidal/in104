const users = require('../controllers/users')
const courses = require('../controllers/courses')
const lectures = require('../controllers/lectures')

// Provide the database with some data to start with
module.exports = async function seedDatabase() {
  const arnaud = await users.create({
    firstname: "Arnaud",
    lastname: "Pelissier",
    email: "arnaud.pelissier@ensta-paris.fr",
    role: "eleve",
    password: "1234"
  });

  const theo = await users.create({
    firstname: "Théo",
    lastname: "Vidal",
    email: "theo.vidal@ensta-paris.fr",
    role: "eleve",
    password: "taep"
  })

  const teacher = await users.create({
    firstname: "Laurent",
    lastname: "Bourgeois",
    email: "laurent.bourgeois@ensta-paris.fr",
    role: "professeur",
    password: "abcd"
  });

  const course = await courses.create(teacher.id, "MA102 - Groupe 7");
  await courses.addAttendantById(course.id, theo.id);
  await courses.addAttendantById(course.id, arnaud.id);
  const date1 = new Date()
  const date2 = new Date();
  date2.setDate(date2.getDate() + 1);
  await lectures.create(date1, 60, course.id);
  await lectures.create(date2, 60, course.id);
}