const db = require("../../db");
const users = require("../controllers/users");
const courses = require("../controllers/courses");
const tokens = require("../controllers/tokens");
const lectures = require("../controllers/lectures");

test("token db controller", async() => {
	try {
		await db.sync({force: true})
		const user = await users.create({
			firstname: "arnaud",
			lastname: "pelissier",
			email: "a@a.a",
			role: "eleve",
			password: "1234"
		});

		let expireAt = new Date();

		const token = await tokens.create(user.id, expireAt);

		expireAt.setDate(expireAt.getDate()+1);

		const other_token = await tokens.create(user.id, expireAt);

		expect( await tokens.test(other_token.token) ).not.toBe(null);
		expect( await tokens.test("1234") ).toBe(null);

		await tokens.removeExpiredTokens(user.id)

		expect( await tokens.test(token.token) ).toBe( null );

		const user_data = await tokens.test(other_token.token);
		expect(user_data.id).toBe(user.id);
	}
	catch(err) {
		console.error(err);
		expect(true).toBe(false);
	}
})

test("user db controller", async() => {
	try {
		await db.sync({force: true})

		const user = await users.create({
			firstname: "arnaud",
			lastname: "pelissier",
			email: "a@a.a",
			role: "eleve",
			password: "1234"
		});

		expect( (await users.getByEmail("a@a.a")).id ).toBe(user.id)

		await users.updateById(user.id, {email: "aa@aa.aa"})

		expect( (await users.getByEmail("aa@aa.aa")).id ).toBe(user.id)

		expect( await users.testCredentialsById(user.id, "1234") ).toBe(true)
		expect( await users.testCredentialsById(user.id, "12345") ).toBe(false)

		await users.removeByEmail("aa@aa.aa")

		expect( (await users.getByEmail("aa@aa.aa")) ).toBe(null)
	} catch(err) {
		console.error(err)
		expect(true).toBe(false)
	}
})

test("course db controller", async() => {
	try {
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
			role: "eleve",
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

		let presences = await lectures.getPresences(lecture.id);
		presences = presences.map( el => el.id);

		for(let id of presences) {
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

	} catch (error) {
		console.error(error)
		expect(true).toBe(false)
	}
})