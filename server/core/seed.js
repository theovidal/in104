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

  const teacher1 = await users.create({
    firstname: "Laurent",
    lastname: "Bourgeois",
    email: "laurent.bourgeois@ensta-paris.fr",
    role: "professeur",
    password: "abcd"
  });

  const teacher2 = await users.create({
    firstname: "Sabine",
    lastname: "Ortiz",
    email: "sabine.ortiz@ensta-paris.fr",
    role: "professeur",
    password: "efgh"
  });

  await users.create({
    firstname: 'Mégane',
    lastname: 'Perez',
    email: "megane.perez@ensta-paris.fr",
    role: "administration",
    password: "admin"
  })

  const course1 = await courses.create(teacher1.id, "MA102 - Groupe 7");
  const course2 = await courses.create(teacher2.id, "MF101 - Groupe 1");
  await courses.addAttendantById(course1.id, theo.id);
  await courses.addAttendantById(course1.id, arnaud.id);
  await courses.addAttendantById(course2.id, theo.id);
  const date1 = new Date()
  const date2 = new Date();
  date2.setDate(date2.getDate() + 1);
  await lectures.create(date1, 60, course1.id);
  await lectures.create(date1, 60, course2.id);
  await lectures.create(date2, 60, course1.id);
}