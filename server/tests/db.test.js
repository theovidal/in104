const db = require("../../db");
const users = require("../controllers/users");
const tokens = require("../controllers/tokens");

test("token db controller", async() => {
	db.sync({force: true}).then(async() => {
		try {
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
			expect(true).toBe(false);
		}
	}).catch( () => {
		expect(true).toBe(false);
	})
})

test("user db controller", async() => {
	db.sync({force: true}).then(async() => {
		try {
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

			await users.removeByEmail("aa@aa.aa")

			expect( (await users.getByEmail("aa@aa.aa")).id ).toBe(undefined)
		}
		catch(err) {
			expect(true).toBe(false);
		}
	}).catch( () => {
		expect(true).toBe(false);
	})
})