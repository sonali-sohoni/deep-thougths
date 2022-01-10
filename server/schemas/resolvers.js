const { User, Thought } = require("../models");

const resolvers = {
	Query: {
		thoughts: async (parent, { username }) => {
			const params = username ? { username } : {};
			return Thought.find(params).sort({ createdAt: -1 });
		},
		thought: async (parent, { _id }) => {
			//get thought by id
			return Thought.findOne({ _id });
		},
		users: async () => {
			//get all users
			return User.find()
				.select("-__v -password")
				.populate("friends")
				.populate("thoughts");
		},
		user: async (parent, { username }) => {
			//get user by username
			return User.findOne({ username })
				.select("-__v -password")
				.populate("friends")
				.populate("thoughts");
		},
	},
};
module.exports = resolvers;
