import axios from '../../../api/axios';
import texts from '../../../languages/Pages/TicketView/TicketOverViewInformation.json';
import AF    from '../../../components_aux_functions/pages/ticket_view/ticket_overview_information.js'; // Aux Functions

function TicketOverviewInformation ({ ticket_data, aggregatives_utils, language }) {
    // Aliases For Aggregatives States
    const assigneds       = aggregatives_utils.assigneds;
    const updateAssigneds = aggregatives_utils.updateAssigneds;
    const groups          = aggregatives_utils.groups;

    // Aliases For Selections Elements Population Data
    const users_names      = Object.values(aggregatives_utils.usersNamesWithIds);
    const users_ids        = Object.keys(aggregatives_utils.usersNamesWithIds);
    const all_groups_names = Object.values(aggregatives_utils.ticketGroups);
    const all_groups_ids   = Object.keys(aggregatives_utils.ticketGroups);

    // Aliases For Ticket Data
    const ticket_creator      = ticket_data.creator;
    const ticket_creator_name = ticket_data.creator_name;

    // Set Aggregative Function (Add Assigned Or Groups)
    const assign_user = (event) => {
        let aggregative_id   = AF.get_aggregative_id(event.target);
        let aggregative_name = AF.get_aggregative_name(event.target);

        AF.set_aux_aggregative_option_disabled_status(true, event); // Disables Double Dash Option "--"
        if ( AF.is_aggregative_already_set(aggregative_name, event, assigneds, groups) ) { return; }

        axios.post('/tickets/update/single/assigneds/set', { assigned_id: aggregative_id, assigned_name: aggregative_name, ticket_id: ticket_data.id })
        .then((res) => { updateAssigneds([...assigneds, aggregative_name]); console.log(res.data); })
    }

    // Unassign User Function
    const unassign_user = (event) => {
        let unassigned_name = event.target.innerText;
        let unassigned_id   = Number(document.querySelector("option[assigned-name='" + unassigned_name + "']").id);

        let data = {
            assigned_id:         unassigned_id,
            assigned_name:       unassigned_name, 
            ticket_creator:      ticket_creator,
            ticket_creator_name: ticket_creator_name,
            ticket_id:           ticket_data.id
        }
        
        axios.post('/tickets/update/single/assigneds/delete', data)
        .then((res) => { updateAssigneds(assigneds.filter((assigned) => { return assigned !== unassigned_name })); console.log(res.data); })
    }
    
  return (
    <div id='TV-ticket-info-container' css-marker="INF">
        <div className='TV-INF-info-line-direct-container'>
            <p className='TV-INF-line-info-key'>{texts.ticket_creator[language]}: <span>{ticket_data.creator_name}</span></p>
            <p className='TV-INF-line-info-value'>{texts.creation_date[language]}: <span>{AF.date_formater(ticket_data.creation_date)}</span></p>
        </div>
        <div className='TV-INF-info-line-direct-container'>
            <p className='TV-INF-line-info-key'>{texts.ticket_id[language]}: <span> #{ticket_data.id}</span></p>
            <p className='TV-INF-line-info-value'>{texts.due_date[language]}: <span>{ticket_data.due_date ? AF.date_formater(ticket_data.due_date) : "--"}</span></p>
        </div>
        <div className='TV-INF-info-line-direct-container'>
            <p className='TV-INF-line-info-key'>Status: <span>{texts[ticket_data.status][language]}</span></p>
            <p className='TV-INF-line-info-value'>{"Last Status Update Date"}: <span>{AF.date_formater(ticket_data.last_status_update_date)}</span></p>
        </div>
        <div className='TV-INF-info-line-direct-container'>
            <p className='TV-INF-line-info-key'>{texts.priority[language]}: <span>{texts[ticket_data.priority][language]}</span></p>
            <p className='TV-INF-line-info-value'>{texts.concluded_date[language]}: <span>{ticket_data.status === "Concluded" ? AF.date_formater(ticket_data.last_status_update_date) : "--"}</span></p>
        </div>
        <div id='TV-INF-aggregatives-container'>
            <div className='TV-INF-info-line-direct-container'>
                <p className='TV-INF-line-info-key-aggregative rectangle-span-selected_pieces' id='TV-INF-groups-rectangles-span-direct-container'>
                    <small id="TV-INF-groups-text-key">{ticket_data.groups_names.length > 1 ? texts.assigneds_plural[language] : texts.assigneds[language]}:</small>
                    {groups.map((group, index) => (
                        <span className='TV-INF-groups-rectangle-span' onClick={unassign_user} key={index}>{group}</span>
                    ))}
                </p>
                <p className='TV-INF-line-info-value-aggregative'>{texts.add_assigneds[language]}:
                    <select onChange={assign_user} id='TV-INF-groups-selector'>
                        <option id="TV-INF-no-group-aux-option" name="none">--</option>
                        {all_groups_names.map((option, index) => (
                            <option id={all_groups_ids[index]} name={option} key={index}>{option.length <= 15 ? option : option.substring(0, 10) + "."}</option>
                        ))}
                    </select>
                </p>
            </div>
            <div className='TV-INF-info-line-direct-container'>
                <p className='TV-INF-line-info-key-aggregative rectangle-span-selected_pieces'>
                    <small id="TV-INF-assumers-text-key">{ticket_data.assumers_names.length > 1 ? texts.assigneds_plural[language] : texts.assigneds[language]}:</small>
                    {assigneds.map((assumer, index) => (
                        <span className='TV-INF-assigneds-rectangle-span' onClick={unassign_user} key={index}>{assumer}</span>
                    ))}
                </p>
                <p className='TV-INF-line-info-value-aggregative'>{texts.add_assigneds[language]}:
                    <select onChange={assign_user} id='TV-INF-assigneds-selector'>
                        <option id="TV-INF-no-assigment-aux-option" name="none">--</option>
                        {users_names.map((option, index) => (
                            <option id={users_ids[index]} name={option} key={index}>{option.length <= 15 ? option : option.substring(0, 10) + "."}</option>
                        ))}
                    </select>
                </p>
            </div>
        </div>
    </div>
  )
}

export default TicketOverviewInformation