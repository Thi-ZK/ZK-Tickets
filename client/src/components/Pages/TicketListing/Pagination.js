import React, { useState, useEffect } from "react";

import AF from '../../../components_aux_functions/pages/ticket_listing/pagination.js'; // Aux Functions
 
function Pagination ({ tickets_to_be_shown, selectedPage, updateSelectedPage, listingFilters }) { // The Pagination Has A Max Of 10 Blocks.
    // Aliases (Each Page Can Have Max Of 15 Tickets)
    const total_page_blocks             = AF.gen_total_page_blocks(tickets_to_be_shown); // Array
    const is_page_number_reaching_limit = AF.is_page_number_reaching_limit(tickets_to_be_shown);

    // Current Being Shown Blocks State
    const [currentBlocks, updateCurrentBlocks] = useState(AF.gen_initial_page_blocks(tickets_to_be_shown)); // Array

    // Update Selected Page Block
    const update_selected_page = (which_block_index) => {
        AF.clean_page_blocks_attributes();
        AF.set_selected_attribute_to_block(which_block_index);

        updateSelectedPage(which_block_index);
    }

    // Proceed & Go Back Handler
    const proceed_or_go_back = (event) => {
        let index = AF.get_proceed_or_go_back_index(event, selectedPage);

        if ( AF.is_update_block_existing(index) ) {
            update_selected_page(index);
        } else if ( AF.are_there_more_blocks_to_be_displayed() ) {
            AF.switch_to_correspondent_blocks(event);
        }
    }
    
    // Update Current Page Blocks Array (This Is Only Used, When The Number Of Blocks Surpasses 10 And User Clicks On "...")
    const update_current_blocks = (event) => {
        AF.clean_page_blocks_attributes();

        let last_current_index  = currentBlocks[currentBlocks.length - 1];
        let first_current_index = currentBlocks[0];

        if ( event.target.id.includes("proceed") ) {
            if ( total_page_blocks[last_current_index + 1] ) {
                updateCurrentBlocks(total_page_blocks.slice(last_current_index + 1, last_current_index + 10));
            }
        } else {
            if ( first_current_index !== 0 ) {
                updateCurrentBlocks(total_page_blocks.slice(first_current_index - 10, first_current_index));
            }
        }
    }

    // Updates The Pagination When Listing Is Re-rendered (When Filter Is Applied)
    useEffect(() => {
        update_selected_page(1);

        updateCurrentBlocks(AF.gen_initial_page_blocks(tickets_to_be_shown));// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listingFilters]);

    // Meant For Smooth Appearence Effect Of Component Rendering
    const [paginationContainer, updatePaginationContainer] = useState("off");

    useEffect(() => {
        updatePaginationContainer("on");
    }, []);

    return (
    <div status={paginationContainer} id="ticket-listing-pagination-container" css-marker="PN">
        <div id="PN-go-back-button-direct-container">
            <button onClick={proceed_or_go_back} id="PN-go-back-button">Previous</button>
        </div>
        <div id="PN-page-indexes-container">
            { is_page_number_reaching_limit ? <div onClick={update_current_blocks} id="PN-display-more-page-blocks-go-back" className="PN-page-index-block">...</div> : null }

            { currentBlocks.map((elem, index) => {
                if ( index === 0 ) {
                    return <div onClick={() => update_selected_page(currentBlocks[index] + 1)} index={currentBlocks[index] + 1} className="PN-page-index-block" key={index} current-selected="">{currentBlocks[index] + 1}</div>
                } else {
                    return <div onClick={() => update_selected_page(currentBlocks[index] + 1)} index={currentBlocks[index] + 1} className="PN-page-index-block" key={index}>{currentBlocks[index] + 1}</div>
                }
            }) }

            { is_page_number_reaching_limit ? <div onClick={update_current_blocks} id="PN-display-more-page-blocks-proceed" className="PN-page-index-block">...</div> : null }
        </div>
        <div id="PN-proceed-button-direct-container">
            <button onClick={proceed_or_go_back} id="PN-proceed-button">Next</button>
        </div>
    </div>
    )
}

export default Pagination;