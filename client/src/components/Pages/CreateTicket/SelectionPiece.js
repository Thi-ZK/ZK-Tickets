import React, { useState } from 'react';
import texts               from '../../../languages/Pages/CreateTicket/SelectionPiece.json';
import AF                  from '../../../components_aux_functions/pages/create_ticket/selection_piece.js'; // Aux Functions

function SelectionPiece({ data, usersNamesWithIds, ticketGroups, language }) {
    // Aliases
    const current_piece  = data.type_of_piece; // Example: "assigneds" or "priority"
    const options_map    = AF.generate_options_map_obj(usersNamesWithIds, ticketGroups);
    const options_id_map = AF.generate_options_id_map_obj(usersNamesWithIds, ticketGroups);

    // Meant For Aggregative Options Selections (Groups & Assigneds)
    const [currentAggregatives, updateAggregatives] = useState({ids: [], names: []});

    // Meant For Add Aggregative Option (User Or Group)
    const add_aggregative = (event) => {
        if (!AF.is_selection_piece_an_aggregative(current_piece)) { return; }
        AF.disable_select_aux_value_filler(event);

        let option_chosen = AF.get_selected_option(event);
        
        if (!currentAggregatives.names.includes(option_chosen.value)) {
            updateAggregatives({
                ids:   [...currentAggregatives.ids, option_chosen.id],
                names: [...currentAggregatives.names, option_chosen.value]
            })
        }
    }

    // Meant For Deleting Aggregative Option (User Or Group)
    const delete_aggregative = (event) => {
        let elem_name = event.target.innerText;
        let elem_id   = event.target.getAttribute("aggregative-id");

        updateAggregatives({
            ids:   currentAggregatives.ids.filter((elem) => { return elem !== elem_id }),
            names: currentAggregatives.names.filter((elem) => { return elem !== elem_name })
        });
    }

    // Reset All Aggregatives (Users & Groups)
    const reset_aggregatives = () => {
        updateAggregatives({ ids: [], names: [] });
    }

    return (
        <div className="TC-selection-input-direct-container" css-marker="SP">
            <div className='TC-SP-selection-title-direct-container'>
                {data.allow_custom ? <input id={"TC-SP-" + current_piece + "-std-option-radio"} onChange={AF.update_custom_text_input_appearence} type="radio" name={current_piece + "-std-or-new-option"} defaultChecked/> : <></>}
                <label htmlFor={"TC-SP-" + current_piece + "-std-option-radio"} className="TC-SP-selection-title">{texts["select_the_" + current_piece][language]} <span>{texts[current_piece][language]}</span></label>
            </div>
            
            <select id={"TC-SP-" + current_piece} onChange={add_aggregative}>
                { data.is_aggregative ? <option className="TC-SP-aux-filling-option" assigned-name="none">--</option> : <></> }

                { options_map[current_piece].map((option, index) => ( // Selection Options
                    <option id={options_id_map[current_piece][index] || option} key={index}>{data.is_aggregative ? option : texts[option.toLowerCase()][language]}</option>
                ))}
            </select>

            { data.allow_custom ? ( // The Custom Input Option (Currently Only For Groups)
                <div>
                    <div className="TC-SP-new-option-radio-input-direct-container">
                        <input id={"TC-SP-" + current_piece + "-new-option-radio"} type="radio" name={current_piece + "-std-or-new-option"} className='TC-SP-new-option-radio-input' onChange={AF.update_custom_text_input_appearence}/>
                        <label htmlFor={"TC-SP-" + current_piece + "-new-option-radio"}>{texts["write_a_custom_" + current_piece][language]}</label>
                    </div>
                    <input name={data.type_of_piece} className='TC-SP-new-option-text-input' type="text" placeholder={texts["type_new_" + current_piece + "_name"][language]}></input>
                </div>
                ) : (
                <></> 
            )}
            
            { data.is_aggregative ? ( // Those Are The Aggregative Options Selected Rectangle Blocks (Assigned Users or Groups Blocks)
                <div className='rectangle-span-selected_pieces TC-SP-aggregative-selected-blocks-direct-container'>
                    {currentAggregatives.names.map((option, index) => (
                        <span aggregative-id={currentAggregatives.ids[index]} onClick={delete_aggregative} key={index}>{option}</span>
                    ))}
                    <input className={"TC-SP-" + current_piece} type="hidden" aggregative_names={currentAggregatives.names} aggregative_ids={currentAggregatives.ids}></input>
                    <input onClick={reset_aggregatives} className="TC-SP-reseter" type="hidden"></input>
                </div>
                ) : (
                <></> 
            )} 
        </div>
    )
}

export default SelectionPiece;