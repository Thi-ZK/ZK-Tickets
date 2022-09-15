// Generates All Groups Names With IDs Object (ex: { 1: Mahaen, 2: Chydra, 3: Irimia})
const generate_groups_names_with_ids_obj = (all_ticket_groups) => {
    let groups_ids_with_names = {};

	for (let i = 0; i < all_ticket_groups.length; i++) {
		groups_ids_with_names[all_ticket_groups[i].id] = all_ticket_groups[i].name;
	}

    return groups_ids_with_names;
}

module.exports = {
    generate_groups_names_with_ids_obj: generate_groups_names_with_ids_obj
};