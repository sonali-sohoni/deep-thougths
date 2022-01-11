//Generate the token
const jwt = require("jsonwebtoken");
const secret = "mysecrestsshhhh";
const expiration = "2h";

//
module.exports = {
	//Create token
	signToken: function ({ username, email, _id }) {
		const payload = { username, email, _id };
		return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
	},
	//Verify as middleware
	authMiddleware: ({ req }) => {
		let token = req.body.token || req.query.token || req.headers.authorization;

		//separate the token from Bearer
		if (req.headers.authorization) {
			token = token.split(" ").pop().trim();
		}

		if (!token) {
			return req;
		}

		//Decode the token and attach the request data to user object.
		try {
			const { data } = jwt.verify(token, secret, { maxAge: expiration });
			req.user = data;
		} catch {
			console.log("invalid token");
		}
		return req;
	},
};
