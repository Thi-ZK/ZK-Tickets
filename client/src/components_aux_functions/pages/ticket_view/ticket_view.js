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

module.exports = {
    generate_aggregatives_utils_obj:  generate_aggregatives_utils_obj
};