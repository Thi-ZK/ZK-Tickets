const MAX_NUMBER_OF_TICKETS_PER_PAGE = 15;

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
const is_page_number_reaching_limit = (all_tickets) => {
    let blocks_number = Math.floor(all_tickets.length / MAX_NUMBER_OF_TICKETS_PER_PAGE);

    if ( (all_tickets.length % MAX_NUMBER_OF_TICKETS_PER_PAGE) !== 0 ) {
        blocks_number = blocks_number + 1;
    }

    return blocks_number > 10;
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

module.exports = {
    gen_initial_page_blocks:         gen_initial_page_blocks,
    is_page_number_reaching_limit:   is_page_number_reaching_limit,
    gen_total_page_blocks:           gen_total_page_blocks,
    clean_page_blocks_attributes:    clean_page_blocks_attributes,
    set_selected_attribute_to_block: set_selected_attribute_to_block,
    is_update_block_existing:        is_update_block_existing
};