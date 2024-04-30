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