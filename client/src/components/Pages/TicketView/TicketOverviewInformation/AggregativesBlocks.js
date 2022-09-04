import React from 'react';
import axios from '../../../../api/axios';
import texts from '../../../../languages/Pages/TicketView/TicketOverViewInformation.json';
import AF    from '../../../../components_aux_functions/pages/ticket_view/ticket_overview_information.js'; // Aux Functions

function AggregativeBlocks ({ which_aggregative, agg_data }) {
    // Population Data Aliases
    const aggregative_blocks = AF.get_aggregative_blocks(which_aggregative, agg_data);
    const userData           = agg_data.userData;
    const language           = agg_data.language;
    const aggregatives_utils = agg_data.aggregatives_utils;

    // Text Aliases
    const texts_for_aggregative_names = AF.generate_text_for_aggregative_names(agg_data, which_aggregative, texts);
    const which_aggregative_singular  = which_aggregative.substring(0, which_aggregative.length -1);

    // Unassign Aggregative Handler
    const unassign_aggregative = (event) => {
        let data = AF.generate_data_obj_for_unassign_aggregative(event, agg_data);

        if ( !AF.is_user_legit(userData, data, "strict") ) { 
            return AF.display_legitimacy_error();
        }
        
        axios.post(AF.gen_unassign_req_url(data.aggregative_type), data).then((res) => { console.log(res.data);
            AF.update_aggregative_state_with_removed(data, aggregatives_utils);
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