// Get All Provided Groups ID Array
const get_provided_groups_ids_as_array = (req_data) => {
    return req_data.groups_to_be_deleted.map(group => Number(group.id));
}

// Get Groups Complete Data Objects From req.session
const get_complete_groups_obj_from_req_session = (provided_group_ids, session_data) => {
    return session_data.ticket_groups.filter((group) => {
        return provided_group_ids.includes(group.id);
    }) 
}

module.exports = {
    get_provided_groups_ids_as_array:         get_provided_groups_ids_as_array,
    get_complete_groups_obj_from_req_session: get_complete_groups_obj_from_req_session
};