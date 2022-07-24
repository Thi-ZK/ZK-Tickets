import React, { useState } from 'react';
import texts from '../../../languages/Pages/CreateTicket/SelectionPiece.json';
import AF from '../../../components_aux_functions/pages/create_ticket/selection_piece.js'; // Aux Functions

function SelectionPiece({ data, usersNamesWithIds, language }) {
    // Aliases
    const curr_piece = data.type_of_piece.toLowerCase();
    const users_ids   = Object.keys(usersNamesWithIds || {});
    const options_map = AF.generate_options_map_obj(usersNamesWithIds);

    // Meant For Aggregative Options Selections (Groups & Assigneds)
    const [currentAggregatives, updateAggregatives] = useState({ids: [], names: []});

    // Meant For Add Aggregative Option (User Or Group)
    const add_aggregative = (event) => {
        if ((data.type_of_piece !== "Assigneds") && (data.type_of_piece !== "Group")) {return;}
        event.target.querySelector(".TC-SP-aux-filling-option").disabled = true; // Prevent Several Commands Before Finishing Last

        let option_chosen = event.target.options[event.target.selectedIndex];
        
        if (!currentAggregatives.names.includes(option_chosen.value)) {
            updateAggregatives({
                ids: [...currentAggregatives.ids, option_chosen.id],
                names: [...currentAggregatives.names, option_chosen.value]
            })
        }
    }

    // Meant For Deleting Aggregative Option (User Or Group)
    const delete_aggregative = (event) => {
        let elem_name = event.target.innerText;
        let elem_id   = event.target.getAttribute("aggregative-id");

        updateAggregatives({
            ids: currentAggregatives.ids.filter((elem) => {return elem !== elem_id}),
            names: currentAggregatives.names.filter((elem) => {return elem !== elem_name})
        });
    }

    const reset_aggregatives = () => {
        updateAggregatives({ids: [], names: []});
    }

    return (
        // Options Itself
        <div className="TC-selection-input-direct-container" css-marker="SP">
            <p className="TC-SP-selection-title">{texts["select_the_" + curr_piece][language]} <span>{texts[curr_piece][language]}</span></p>
            <select id={"TC-SP-" + data.type_of_piece.toLowerCase()} onChange={add_aggregative}>
                { data.is_aggregative ? ( // The -- Option
                    <option className="TC-SP-aux-filling-option" assigned-name="none">--</option>
                    ) : (
                    <></> 
                )}

                {options_map[data.type_of_piece].map((option, index) => ( // Options
                    <option id={users_ids[index] || option} key={index}>{data.is_aggregative ? option : texts[option.toLowerCase()][language]}</option>
                ))}
            </select>
            
            { data.is_aggregative ? ( // Those Are The Aggregative Options Selected Blocks (Assigned Users or Groups Blocks)
                <div className='rectangle-span-selected_pieces TC-SP-aggregative-selected-blocks-direct-container'>
                    {currentAggregatives.names.map((option, index) => (
                        <span aggregative-id={currentAggregatives.ids[index]} onClick={delete_aggregative} key={index}>{option}</span>
                    ))}
                    <input className={"TC-SP-" + data.type_of_piece.toLowerCase()} type="hidden" aggregative_names={currentAggregatives.names}></input>
                    <input className={"TC-SP-" + data.type_of_piece.toLowerCase()} type="hidden" aggregative_ids={currentAggregatives.ids}></input>
                    <input onClick={reset_aggregatives} className="TC-SP-reseter" type="hidden"></input>
                </div>
                ) : (
                <></> 
            )} 
        </div>
    )
}

export default SelectionPiece;