import { Users } from '../../api/users/users.js';

export const createdBy = {
	async getUser(userId) {
		if (!userId) return null;

		const user = await Users.findOneAsync(
			{ _id: userId },
			{
				projection: {
					_id: 1,
					profile: 1,
				},
			}
		);

		if (!user) {
			return {
				id: userId,
				name: 'Unknown User',
			};
		}

		const firstName = user.profile?.firstName || '';
		const lastName = user.profile?.lastName || '';

		return {
			id: user._id,
			name: `${firstName} ${lastName}`.trim(),
		};
	},
};
