import React, { useState, useEffect } from "react";

import AF    from '../../../components_aux_functions/pages/ticket_listing/pagination.js'; // Aux Functions
import texts from '../../../languages/Pages/TicketListing/Pagination.json';
 
function Pagination ({ tickets_to_be_shown, selectedPage, updateSelectedPage, listingFilters, language }) { // The Pagination Has A Max Of 10 Blocks.
    // Alias - All Page Blocks
    const total_page_blocks = AF.gen_total_page_blocks(tickets_to_be_shown); // Array

    // States Aliases
    const [currentBlocks, updateCurrentBlocks]               = useState(AF.gen_initial_page_blocks(tickets_to_be_shown)); // Array
    const [forwardBlocksStatus, updateForwardBlocksStatus]   = useState(AF.are_there_more_forward_blocks(currentBlocks, total_page_blocks) ? "on" : "off");
    const [backwardBlocksStatus, updateBackwardBlocksStatus] = useState(AF.are_there_more_backward_blocks(currentBlocks) ? "on" : "off");

    // Update Selected Page Block (For When New Block Is Selected)
    const update_selected_page = (which_block_index) => {
        AF.clean_page_blocks_attributes();
        AF.set_selected_attribute_to_block(which_block_index);

        updateSelectedPage(which_block_index);
    }

    // Proceed & Go Back Buttons Handler
    const proceed_or_go_back = (event) => {
        let index = AF.get_proceed_or_go_back_index(event, selectedPage);

        if ( AF.is_update_block_existing(index) ) {
            update_selected_page(index);
        } else
        if ( AF.are_there_more_blocks_to_be_displayed(event) ) {
            AF.switch_to_correspondent_blocks(event);
        }
    }
    
    // Update Current Page Blocks Array (This Is Only Used, When The Number Of Blocks Surpasses 10 And User Clicks On "...")
    const update_current_blocks = (event) => {
        AF.clean_page_blocks_attributes();

        let action_taken = event.target.id.includes("proceed") ? "proceed" : "go_back";

        AF.update_current_blocks_state(action_taken, updateCurrentBlocks, currentBlocks, total_page_blocks, updateSelectedPage);

        window.__was_paginator_clicked   = true;
        window.__which_paginator_clicked = action_taken;
    }

    // Updates The Pagination When Listing Is Re-rendered (When Filter Is Applied)
    useEffect(() => {
        update_selected_page(1);

        updateCurrentBlocks(AF.gen_initial_page_blocks(tickets_to_be_shown)); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listingFilters]);

    // Updates The Forward & Backward Appearence States (The Appreance Of The "...") 
    useEffect(() => {
        updateForwardBlocksStatus(AF.are_there_more_forward_blocks(currentBlocks, total_page_blocks) ? "on" : "off");
        updateBackwardBlocksStatus(AF.are_there_more_backward_blocks(currentBlocks) ? "on" : "off");

        if ( window.__was_paginator_clicked ) {
            AF.update_selected_page_after_paginator_update(update_selected_page, currentBlocks[0]);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentBlocks]);

    // Meant For Smooth Appearence Effect Of Component Rendering
    const [paginationContainer, updatePaginationContainer] = useState("off");

    useEffect(() => {
        updatePaginationContainer("on");
    }, []);

    return (
    <div status={paginationContainer} id="ticket-listing-pagination-container" css-marker="PN">
        <div id="PN-go-back-button-direct-container">
            <button onClick={proceed_or_go_back} id="PN-go-back-button">{texts.previous[language]}</button>
        </div>
        <div id="PN-page-indexes-container">
            <div status={backwardBlocksStatus} onClick={update_current_blocks} id="PN-display-more-page-blocks-go-back" className="PN-page-index-block">...</div>

            { currentBlocks.map((elem, index) => {
                if ( index === 0 ) {
                    return <div onClick={() => update_selected_page(currentBlocks[index] + 1)} index={currentBlocks[index] + 1} className="PN-page-index-block" key={index} current-selected="">{currentBlocks[index] + 1}</div>
                } else {
                    return <div onClick={() => update_selected_page(currentBlocks[index] + 1)} index={currentBlocks[index] + 1} className="PN-page-index-block" key={index}>{currentBlocks[index] + 1}</div>
                }
            }) }

            <div status={forwardBlocksStatus} onClick={update_current_blocks} id="PN-display-more-page-blocks-proceed" className="PN-page-index-block">...</div>
        </div>
        <div id="PN-proceed-button-direct-container">
            <button onClick={proceed_or_go_back} id="PN-proceed-button">{texts.next[language]}</button>
        </div>
    </div>
    )
}

export default Pagination;