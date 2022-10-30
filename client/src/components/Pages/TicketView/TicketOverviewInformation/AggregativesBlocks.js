import React from 'react';

import axios from '../../../../api/axios';
import texts from '../../../../languages/Pages/TicketView/TicketOverViewInformation.json';
import AF    from '../../../../components_aux_functions/pages/ticket_view/ticket_overview_information.js'; // Aux Functions

function AggregativeBlocks ({ which_aggregative, all_population_data, ticket_data_utils }) {
    // Population Data Aliases
    const userData             = all_population_data.userData;
    const language             = all_population_data.language;
    const update_all_tickets   = all_population_data.update_all_tickets;
    const update_ticket_groups = all_population_data.update_ticket_groups;

    const updateTicketData = ticket_data_utils.updateTicketData;
    const ticketData       = ticket_data_utils.ticketData;

    const aggregative_blocks = AF.get_aggregative_blocks(which_aggregative, ticketData);

    // Text Aliases
    const texts_for_aggregative_names = AF.generate_text_for_aggregative_names(ticketData, which_aggregative, texts);
    const which_aggregative_singular  = which_aggregative.substring(0, which_aggregative.length -1);

    // Unassign Aggregative Handler
    const unassign_aggregative = (event) => {
        let data = AF.generate_data_obj_for_unassign_aggregative(event, ticketData);

        if ( !AF.is_user_legit(userData, data, "strict") ) { 
            return AF.display_legitimacy_error();
        }
        
        axios.post(AF.gen_unassign_req_url(data.aggregative_type), data).then((res) => { console.log(res.data);
            AF.update_ticket_data_state_with_removed(data, ticketData, updateTicketData);

            update_all_tickets();

            if ( which_aggregative === "groups" ) {
                update_ticket_groups();
            }
        })
    }
    
    return (
    <div className='TV-INF-line-info-key-aggregative rectangle-span-selected_pieces' id={'TV-INF-'+ which_aggregative + '-rectangles-span-direct-container'}>
        <small id={'TV-INF-' + which_aggregative + '-text-key'}>{texts_for_aggregative_names[language]}:</small>
        <div>
            {aggregative_blocks.map((aggregative, index) => (
                <span
                    className={'TV-INF-' + which_aggregative + '-rectangle-span'}
                    aggregative-type={which_aggregative_singular} // Ex: Assumers -> Assumer
                    onClick={unassign_aggregative}
                    key={index}
                    >{aggregative}
                </span>
            ))}
        </div>
    </div>
    )
}

export default AggregativeBlocks;