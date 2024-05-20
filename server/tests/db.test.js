const db = require("../../db");
const users = require("../controllers/users");
const courses = require("../controllers/courses");
const lectures = require("../controllers/lectures");
const presences = require("../controllers/presences");

test("course db controller", async() => {
	try {
		await db.sync({force:true})

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
			email: "a@a.a",
			role: "professeur",
			password: "abcd"
		});
		
		const course = await courses.create(teacher.id, "MA103 - Groupe 7");
	
		const same1 = await courses.getById(course.id);
		expect(same1.name).toBe(course.name);
		
		await courses.addAttendantById(course.id, user.id)
		
		expect((await courses.getAttendantsByName("MA103 - Groupe 7"))[0].id).toBe(user.id)

		expect((await courses.getAttendantsById(course.id))[0].id).toBe(user.id)

		expect((await courses.getAttendantsById(course.id)).length).toBe(1)
	
		await courses.updateById(course.id, {name: "MA103 - Groupe 6"})
	
		const same2 = await courses.getByName("MA103 - Groupe 6");

		expect(same2.id).toBe(course.id);
	
		await courses.updateByName("MA103 - Groupe 6", {name: "non"});
	
		await courses.removeByName("MA103 - Groupe 7");
		const same3 = await courses.getByName("non");

		expect(same3.id).toBe(course.id);
	
		await courses.removeById(course.id);
		
		const nothing = await courses.getById(course.id);
	
		expect(nothing).toBe(null);	
	} catch(err) {
		console.error(err)
		expect(true).toBe(false)
	}
})

test("presences db controller", async() => {
	try {
		await db.sync({force:true})

		const teacher = await users.create({
			firstname: "teacher",
			lastname: "teacher",
			email: "a@a.a",
			role: "prof",
			password: "abcd"
		})

		const user = await users.create({
			firstname: "arnaud",
			lastname: "pelissier",
			email: "a@a.a",
			role: "eleve",
			password: "1234"
		})

		const course = await courses.create( teacher.id, "IN104");

		await courses.addAttendantById(course.id, teacher.id)
		await courses.addAttendantById(course.id, user.id)

		const lecture = await lectures.create(new Date(), 120, course.id);

		let presences_res = await lectures.getPresences(lecture.id);
		presences_res = presences_res.map( el => el.id);

		for(let id of presences_res) {
			const predicate = id === teacher.id || id === user.id;
			expect(predicate).toBe(true);
		}

		const lectureFound = await lectures.getById(lecture.id);

		expect(lecture.id).toBe(lectureFound.id);

		const isPresent = await lectures.isUserPresent(lecture.id, user.id);

		await lectures.updatePresence(lecture.id, user.id, true);

		const andNow = await lectures.isUserPresent(lecture.id, user.id);

		expect(isPresent).toBe(false);
		expect(andNow).toBe(true);

		const pres1 = await presences.getPresences(
			undefined,
			undefined,
			undefined,
			true, false
		);

		const pres2 = await presences.getPresences(
			undefined,
			2,
			undefined,
			true, false
		);

		const pres3 = await presences.getPresences(
			1,
			undefined,
			undefined,
			true, false
		);

		const pres4 = await presences.getPresences(
			undefined,
			undefined,
			true,
			true, false
		);

		expect(pres1.length).toBe(2)
		expect(pres2.length).toBe(1)
		expect(pres3.length).toBe(2)
		expect(pres4.length).toBe(1)

	} catch (error) {
		console.error(error)
		expect(true).toBe(false)
	}
})