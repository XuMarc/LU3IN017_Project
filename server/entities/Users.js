class Users {
	constructor(database) {
		this.database = database
	}

	createUser(login, password, name, lastname) {
		return new Promise( async (resolve, reject) => {

			const exists = await this.database.db('Birdy').collection('Users').findOne({login})
			.catch ((error) => {
				console.log(error);
			})

			console.log("exists : ", exists)

			if (exists) {
				console.log("on entre dans le if");
				resolve("login already exists");

			} else {
				this.database.db('Birdy').collection('Users')
				.insertOne({ login, password, name, lastname }, (error, result) => {
					if (error) {
						reject(error);
					} else {
						resolve(result.insertedId)
					}
				});
			}
		});
	}


	login(login, password) {
		return new Promise((resolve, reject) => {
			const result = this.database.db('Birdy').collection('Users').findOne({
				login : {$eq : login},
				password : {$eq : password}
			});
			if (result) {
				resolve(result);
			} else {
				reject();
			}
		});
	}


	getId() {

	}

	getInfo() {

	}

	getAllUssers() {

	}

	getById(userid) {
		const ObjectId = require('mongodb').ObjectId; //
		const query = { _id: new ObjectId(userid) }; // On fait ça prc que le id est un objet dans la bd
		return new Promise((resolve, reject) => {
			this.db.collection('users').findOne(query, (error, user) => {
				if (error) {
					reject(error);
				} else {
					resolve(user);
				}
			})
		})
	}

	/*
	exists(login) {
		return new Promise((resolve, reject) => {
			console.log("function exists : login =", login)
			this.database.db('Birdy').collection('Users').findOne({ login }, (err, user) => {
				if (err) {
					console.log("errei",err);
				} else {
					console.log("dans le resolve")
					resolve(user ? user : "!exists")
				}
			});
		});
	}
	*/

	checkpassword(login, password) {
		return new Promise((resolve, reject) => {
			this.db.collection('users').findOne({ login, password }, (err, user) => {
				if (err) {
					reject(err);
				} else {
					resolve(user ? user._id : null);
				}
			});
		});
	}
}

module.exports = Users;

