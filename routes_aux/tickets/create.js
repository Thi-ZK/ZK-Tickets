// Add New Group To Ticket Data Object & Database
const add_new_group_to_ticket_and_to_database = async (ticket_data, new_group_name, GroupModel, user_data) => {
    let group_provided = await GroupModel.findOne({ name: new_group_name }).select();
    let new_group_id   = null;
    
    if ( group_provided ) { // If New Provided Group Already Exists
        new_group_id = group_provided.id; 
    } else { 
        let last_group = await GroupModel.find().sort({_id:-1}).limit(1);
        new_group_id   = last_group[0].id + 1;

        await new GroupModel({ // Add New Group To Database
            name:         new_group_name.trim(),
            id:           new_group_id,
            creator_name: user_data.name,
            creator:      user_data.id
        }).save();
    }

    ticket_data.groups.push(new_group_id);
    ticket_data.groups_names.push(new_group_name);
}

// Add New Ticket ID To Groups In Database
const add_new_ticket_id_to_group_in_database = (GroupModel, group_id, ticket_id) => {
    return GroupModel.updateOne({ id: group_id }, {
        $addToSet: { tickets: ticket_id }
    });
}

// Get Last Existent Ticket
const get_last_id_ticket = (TicketModel) => {
    return TicketModel.find().sort({_id:-1}).limit(1);
}

module.exports = {
    add_new_group_to_ticket_and_to_database: add_new_group_to_ticket_and_to_database,
    add_new_ticket_id_to_group_in_database:  add_new_ticket_id_to_group_in_database,
    get_last_id_ticket:                      get_last_id_ticket
};