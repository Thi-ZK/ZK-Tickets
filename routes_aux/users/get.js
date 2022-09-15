// Generates All Users Names With IDs Object (ex: { 1: Mahaen, 2: Chydra, 3: Irimia})
const generate_user_names_with_ids_obj = (all_users) => {
    let users_ids_with_names = {};

	for (let i = 0; i < all_users.length; i++) {
		users_ids_with_names[all_users[i].id] = all_users[i].name;
	}

    return users_ids_with_names;
}

module.exports = {
    generate_user_names_with_ids_obj: generate_user_names_with_ids_obj
};