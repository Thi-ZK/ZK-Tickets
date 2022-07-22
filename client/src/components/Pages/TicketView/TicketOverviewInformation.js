import axios from '../../../api/axios';
import texts from '../../../languages/Pages/TicketView/TicketOverViewInformation.json';
import AF from '../../../components_aux_functions/pages/ticket_view/ticket_overview_information.js'; // Aux Functions

function TicketOverviewInformation ({ ticket_data, assignedsUtils, usersNamesWithIds }) {
    // Aliases For Assigneds
    const assigneds       = assignedsUtils.assigneds;
    const updateAssigneds = assignedsUtils.updateAssigneds;

    // Aliases For Population Data
    const language    = assignedsUtils.language;
    const users_names = Object.values(usersNamesWithIds);
    const users_ids   = Object.keys(usersNamesWithIds);

    // Aliases For Ticket Data
    const ticket_creator      = ticket_data.creator;
    const ticket_creator_name = ticket_data.creator_name;

    // Assign User Function
    const assign_user = (event) => {
        let assigned_id   = AF.get_assigned_id(event.target);
        let assigned_name = AF.get_assigned_name(event.target);

        document.querySelector("#no-assignment-id").disabled = true; // To Prevent Several Requests Before The Last Is Over
        if (assigneds.includes(assigned_name)) { return; }

        axios.post('/tickets/update/single/assigneds/set/' + ticket_data.id, {assigned_id: assigned_id, assigned_name: assigned_name})
        .then(() => {updateAssigneds([...assigneds, assigned_name])})
    }

    // Unassign User Function
    const unassign_user = (event) => {
        let unassigned_name = event.target.innerText;
        let unassigned_id = Number(document.querySelector("option[assigned-name='" + unassigned_name + "']").id);

        let data = {
            assigned_id: unassigned_id,
            assigned_name: unassigned_name, 
            ticket_creator: ticket_creator,
            ticket_creator_name: ticket_creator_name
        }
        
        axios.post('/tickets/update/single/assigneds/delete/' + ticket_data.id, data)
        .then(() => {updateAssigneds(assigneds.filter((assigned) => {return assigned !== unassigned_name}))})
    }
    
  return (
    <div id='tv-ticket-info'>
        <div className='nested-info'>
            <p className='larger-info-piece'>{texts.ticket_creator[language]}: <span>{ticket_data.creator_name}</span></p>
            <p className='smaller-info-piece'>{texts.creation_date[language]}: <span>{AF.date_formater(ticket_data.creation_date)}</span></p>
        </div>
        <div className='nested-info'>
            <p className='larger-info-piece'>{texts.ticket_id[language]}: <span> #{ticket_data.id}</span></p>
            <p className='smaller-info-piece'>{texts.due_date[language]}: <span>{ticket_data.due_date ? AF.date_formater(ticket_data.due_date) : "--"}</span></p>
        </div>
        <div className='nested-info'>
            <p className='larger-info-piece'>Status: <span>{texts[ticket_data.status][language]}</span></p>
            <p className='smaller-info-piece'>{texts.concluded_date[language]}: <span>{ticket_data.status === "Concluded" ? AF.date_formater(ticket_data.last_status_update_date) : "--"}</span></p>
        </div>
        <div className='nested-info'>
            <p className='larger-info-piece'>{texts.groups[language]}: <span>{ticket_data.groups_names.join(", ")}</span></p>
            <p className='smaller-info-piece'>{texts.priority[language]}: <span>{texts[ticket_data.priority][language]}</span></p>
        </div>
        <div className='nested-info'>
            <p className='larger-info-piece rectangle-span-selected_pieces'>
                <small id="ticket-assumer-pure-text">{ticket_data.assumers_names.length > 1 ? texts.assigneds_plural[language] : texts.assigneds[language]}:</small>
                {assigneds.map((assumer, index) => (
                    <span className='ticket-view-assigneds-blocks-span' onClick={unassign_user} key={index}>{assumer}</span>
                ))}
            </p>
            <p className='smaller-info-piece'>{texts.add_assigneds[language]}:
                <select onChange={assign_user} id='assignments-management'>
                    <option id="no-assignment-id" assigned-name="none">--</option>
                    {users_names.map((option, index) => (
                        <option id={users_ids[index]} assigned-name={option} key={index}>{option.length <= 15 ? option : option.substring(0, 10) + "."}</option>
                    ))}
                </select>
            </p>
        </div>
    </div>
  )
}

export default TicketOverviewInformation