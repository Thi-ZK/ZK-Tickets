import axios from '../../../api/axios';
import texts from '../../../languages/Pages/TicketView/TicketOverViewInformation.json';
import AF    from '../../../components_aux_functions/pages/ticket_view/ticket_overview_information.js'; // Aux Functions

function TicketOverviewInformation ({ ticket_data, aggregatives_utils, language, userData }) {
    // Aliases For Aggregatives States
    const assigneds = aggregatives_utils.assigneds;
    const groups    = aggregatives_utils.groups;

    // Aliases For Selections Elements Population Data
    const users_names      = Object.values(aggregatives_utils.usersNamesWithIds);
    const users_ids        = Object.keys(aggregatives_utils.usersNamesWithIds);
    const all_groups_names = Object.values(aggregatives_utils.ticketGroups);
    const all_groups_ids   = Object.keys(aggregatives_utils.ticketGroups);

    // Assign Aggregative Handler
    const assign_aggregative = (event) => {
        let data = {
            aggregative_id:   AF.get_aggregative_id(event.target),
            aggregative_name: AF.get_aggregative_name(event.target),
            ticket_id:        ticket_data.id,
            ticket_creator:   ticket_data.creator,
            aggregative_type: event.target.getAttribute("aggregative-type")
        };

        AF.set_aux_aggregative_option_disabled_status(true, event); // Disables Double Dash Option "--"

        if ( AF.is_aggregative_already_set(data, aggregatives_utils) ) {
            return; 
        }

        if ( !AF.is_user_legit(userData, ticket_data.creator) ) { // Max Strict
            return AF.display_assignment_legitimacy_error();
        }
        
        axios.post(AF.gen_assign_req_url(data.aggregative_type), data).then((res) => { console.log(res.data);
            AF.update_aggregative_state_with_added(data, aggregatives_utils);
            window.__was_ticket_interacted = true;
        })
    }

    // Unassign Aggregative Handler
    const unassign_aggregative = (event) => {
        let data = {
            aggregative_id:      null,
            aggregative_name:    event.target.innerText,
            ticket_creator:      ticket_data.creator,
            ticket_creator_name: ticket_data.creator_name,
            ticket_id:           ticket_data.id,
            aggregative_type:    event.target.getAttribute("aggregative-type")
        }
        data["aggregative_id"] = AF.get_aggregative_id_for_unassign(data);

        if ( !AF.is_user_legit(userData, ticket_data.creator, data.aggregative_id) ) { // Strict
            return AF.display_assignment_legitimacy_error();
        }
        
        axios.post(AF.gen_unassign_req_url(data.aggregative_type), data).then((res) => { console.log(res.data);
            AF.update_aggregative_state_with_removed(data, aggregatives_utils);
            window.__was_ticket_interacted = true;
        })
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
                {/* Rectangle Blocks Of Groups */}
                <div className='TV-INF-line-info-key-aggregative rectangle-span-selected_pieces' id='TV-INF-groups-rectangles-span-direct-container'>
                    <small id="TV-INF-groups-text-key">{ticket_data.groups_names.length > 1 ? texts.groups_plural[language] : texts.groups[language]}:</small>
                    <div>
                        {groups.map((group, index) => (
                            <span className='TV-INF-groups-rectangle-span' aggregative-type="group" onClick={unassign_aggregative} key={index}>{group}</span>
                        ))}
                    </div>
                </div>
                {/* List (Selection) Of Ticket Groups To Be Assigned */}
                <p className='TV-INF-line-info-value-aggregative'>{texts.add_groups[language]}:
                    <select onChange={assign_aggregative} id='TV-INF-groups-selector' aggregative-type="group">
                        <option id="TV-INF-no-group-aux-option" name="none">--</option>
                        {all_groups_names.map((option, index) => (
                            <option id={all_groups_ids[index]} name={option} key={index}>{option.length <= 15 ? option : option.substring(0, 10) + "."}</option>
                        ))}
                    </select>
                </p>
            </div>
            <div className='TV-INF-info-line-direct-container'>
                {/* Rectangle Blocks Of Assigned Users */}
                <div className='TV-INF-line-info-key-aggregative rectangle-span-selected_pieces'>
                    <small id="TV-INF-assumers-text-key">{ticket_data.assumers_names.length > 1 ? texts.assigneds_plural[language] : texts.assigneds[language]}:</small>
                    <div>
                        {assigneds.map((assumer, index) => (
                            <span className='TV-INF-assigneds-rectangle-span' aggregative-type="assumer" onClick={unassign_aggregative} key={index}>{assumer}</span>
                        ))}
                    </div>
                </div>
                {/* List (Selection) Of Users To Be Assigned */}
                <p className='TV-INF-line-info-value-aggregative'>{texts.add_assigneds[language]}:
                    <select onChange={assign_aggregative} id='TV-INF-assigneds-selector' aggregative-type="assumer">
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