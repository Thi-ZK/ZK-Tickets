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

// Check & Redirects User If Ticket ID Searched Is Too High (Avoid Too Much Processing For Obvious Non Existing Ticket)
const handle_too_high_id_ticket_search = (ticket_id) => {
    if (ticket_id > 5000) { 
        window.location.href = "/ticket_does_not_exist";
    }
}

module.exports = {
    generate_aggregatives_utils_obj:  generate_aggregatives_utils_obj,
    handle_too_high_id_ticket_search: handle_too_high_id_ticket_search
};