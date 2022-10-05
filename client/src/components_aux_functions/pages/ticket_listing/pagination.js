const MAX_NUMBER_OF_TICKETS_PER_PAGE = 1;
const MAX_NUMBER_OF_BLOCKS_PER_PAGE  = 10;

// Generate All Page Blocks (Array) (Array For Easier Loop)
const gen_total_page_blocks = (all_tickets) => {
    let blocks_number = Math.floor(all_tickets.length / MAX_NUMBER_OF_TICKETS_PER_PAGE);

    if ( (all_tickets.length % MAX_NUMBER_OF_TICKETS_PER_PAGE) !== 0 ) {
        blocks_number = blocks_number + 1;
    }

    return Array.from(Array(blocks_number).keys());
}

// Generate Initial Indexes Blocks (Array) (Array For Easier Loop)
const gen_initial_page_blocks = (all_tickets) => {
    let blocks_number = Math.floor(all_tickets.length / MAX_NUMBER_OF_TICKETS_PER_PAGE);

    if ( (all_tickets.length % MAX_NUMBER_OF_TICKETS_PER_PAGE) !== 0 ) {
        blocks_number = blocks_number + 1;
    }

    if ( blocks_number > 10 ) {
        blocks_number = 10;
    }

    return Array.from(Array(blocks_number).keys());
}

// Checks If The Number Of Page Blocks Surpasses Limit (10)
const are_there_more_forward_blocks = (currentBlocks, total_page_blocks) => {
    if ( (currentBlocks.length === MAX_NUMBER_OF_BLOCKS_PER_PAGE) && ((total_page_blocks.length % MAX_NUMBER_OF_BLOCKS_PER_PAGE) !== 0) ) {
        return true;
    } else { console.log("VOLTEI FALSE");
        return false;
    }
}

// Checks If The Number Of Page Blocks Surpasses Limit (10)
const are_there_more_backward_blocks = (currentBlocks) => {
    if ( currentBlocks[0] !== 0 ) {
        return true;
    } else {
        return false;
    }
}

// Clean Attributes (Attribute Regarding Being Selected) Of All Page Blocks
const clean_page_blocks_attributes = () => {
    document.querySelectorAll(".PN-page-index-block").forEach((elem) => {
        elem.removeAttribute("current-selected");
    });
}

// Set Selected Attribute To Block
const set_selected_attribute_to_block = (which_page_index) => {
    let elem = document.querySelector("div.PN-page-index-block[index='" + which_page_index + "']");

    if ( elem ) {
        elem.setAttribute("current-selected", "");
    }
}

// Checks If The Block To Be Updated Exists
const is_update_block_existing = (index) => {
    return document.querySelector("div.PN-page-index-block[index='" + index + "']") ? true : false;
}

// Get New Block Index To Be Selected For Proceed And Go Back Handler
const get_proceed_or_go_back_index = (event, selectedPage) => {
    return event.target.id.includes("proceed") ? (selectedPage + 1) : (selectedPage - 1);
}

// Checks If There Are More Blocks To Be Displayed (Checks If "..." Is Present)
const are_there_more_blocks_to_be_displayed = () => {
    return document.querySelector("#PN-display-more-page-blocks-proceed") ? true : false;
}

// Advance Or Go Back To Blocks When User Tries To Go Back Or Proceed A Last / First Block Using The Buttons
const switch_to_correspondent_blocks = (event) => {
    if ( event.target.id.includes("proceed") ) {
        document.querySelector("#PN-display-more-page-blocks-proceed").click();
    } else {
        document.querySelector("#PN-display-more-page-blocks-go-back").click();
    }
}

// Update Current Blocks ("...")
const update_current_blocks_state = (action_taken, updateCurrentBlocks, currentBlocks, total_page_blocks) => {
    let last_current_index  = currentBlocks[currentBlocks.length - 1];
    let first_current_index = currentBlocks[0];

    if ( action_taken === "proceed" ) {
        if ( total_page_blocks[last_current_index + 1] ) {
            updateCurrentBlocks(total_page_blocks.slice(last_current_index + 1, last_current_index + 10));
        }
    } else {
        if ( first_current_index !== 0 ) {
            updateCurrentBlocks(total_page_blocks.slice(first_current_index - 10, first_current_index));
        }
    }
}

module.exports = {
    gen_initial_page_blocks:               gen_initial_page_blocks,
    are_there_more_forward_blocks:         are_there_more_forward_blocks,
    are_there_more_backward_blocks:        are_there_more_backward_blocks,
    gen_total_page_blocks:                 gen_total_page_blocks,
    clean_page_blocks_attributes:          clean_page_blocks_attributes,
    set_selected_attribute_to_block:       set_selected_attribute_to_block,
    is_update_block_existing:              is_update_block_existing,
    get_proceed_or_go_back_index:          get_proceed_or_go_back_index,
    are_there_more_blocks_to_be_displayed: are_there_more_blocks_to_be_displayed,
    switch_to_correspondent_blocks:        switch_to_correspondent_blocks,
    update_current_blocks_state:           update_current_blocks_state
};