const db = require("../../db");
const users = require("../controllers/users");
const tokens = require("../controllers/tokens");

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
		expireAt.setDate(expireAt.getDate()+1);

		await tokens.create(user.id, "abcde1992", expireAt);

		expect( await tokens.test(1, "abcde1992") ).toBe(true);
		expect( await tokens.test(1, "abddcde1992") ).toBe(false);
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