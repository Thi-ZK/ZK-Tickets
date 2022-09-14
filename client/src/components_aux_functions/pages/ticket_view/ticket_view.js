// Generate Aggregatives Utils Object (Contains All States & Util Functions / Data) (Aggregatives = Groups & Assigneds)
const generate_aggregatives_utils_obj = (assigneds, groups, updateAssigneds, updateGroups, allPopulationData) => {
    return {
		assigneds:         assigneds,
		updateAssigneds:   updateAssigneds,
		groups:            groups,
		updateGroups:      updateGroups,
		usersNamesWithIds: allPopulationData.usersNamesWithIds,
		ticketGroups:      allPopulationData.ticketGroups
	};
}

// Get Ticket Data
const get_ticket_data = (allTickets, ticket_id) => {
	return allTickets.filter((elem) => { return elem.id === Number(ticket_id) })[0];
}

module.exports = {
    generate_aggregatives_utils_obj:  generate_aggregatives_utils_obj,
	get_ticket_data:                  get_ticket_data
};