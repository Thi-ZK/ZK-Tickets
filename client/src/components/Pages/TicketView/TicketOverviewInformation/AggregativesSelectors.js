import React from 'react';
import axios from '../../../../api/axios';
import texts from '../../../../languages/Pages/TicketView/TicketOverViewInformation.json';
import AF    from '../../../../components_aux_functions/pages/ticket_view/ticket_overview_information.js'; // Aux Functions

function AggregativeBlocks ({ which_aggregative, data_for_aggregatives }) {
    // Aliases
    const aggregatives_utils    = data_for_aggregatives.aggregatives_utils;
    const userData              = data_for_aggregatives.userData;
    const language              = data_for_aggregatives.language;
    const all_aggregative_names = AF.get_all_aggregative_names(which_aggregative, aggregatives_utils);
    const all_aggregative_ids   = AF.get_all_aggregative_ids(which_aggregative, aggregatives_utils);

    // Text Alias
    const which_aggregative_singular = which_aggregative.substring(0, which_aggregative.length -1);

    // Assign Aggregative Handler
    const assign_aggregative = (event) => {
        let data = AF.generate_data_obj_for_assign_aggregative(event, data_for_aggregatives);

        AF.set_aux_aggregative_option_disabled_status(true, event); // Disables Double Dash Option "--"

        if ( AF.is_aggregative_already_set(data, aggregatives_utils) ) {
            return; 
        }

        if ( !AF.is_user_legit(userData, data, "max_strict") ) {
            return AF.display_legitimacy_error();
        }
        
        axios.post(AF.gen_assign_req_url(data.aggregative_type), data).then((res) => { console.log(res.data);
            AF.update_aggregative_state_with_added(data, aggregatives_utils);
        })
    }

    return (
    <p className='TV-INF-line-info-value-aggregative'>{texts["add_" + which_aggregative][language]}:
        <select onChange={assign_aggregative} id={'TV-INF-' + which_aggregative + '-selector'} aggregative-type={which_aggregative_singular}>
            <option id={"TV-INF-no-" + which_aggregative_singular + "-aux-option"} name="none">--</option>
            {all_aggregative_names.map((option, index) => (
                <option
                    id={all_aggregative_ids[index]}
                    name={option} key={index}>
                    {option.length <= 15 ? option : option.substring(0, 10) + "."}
                </option>
            ))}
        </select>
    </p>
    )
}

export default AggregativeBlocks;