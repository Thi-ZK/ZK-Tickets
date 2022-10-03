import React, { useState, useEffect } from "react";

import AF from '../../../components_aux_functions/pages/ticket_listing/pagination.js'; // Aux Functions

function Pagination ({ final_tickets_to_be_displayed }) {
    // Meant For The Page Indexes Generation (Each Page Can Have Max Of 20 Tickets)
    const total_blocks = AF.gen_total_page_blocks(final_tickets_to_be_displayed); // Array, In Order To Easily Loop

    // Meant For Smooth Appearence Effect Of Component Rendering
    const [paginationContainer, updatePaginationContainer] = useState("off");

    useEffect(() => {
        updatePaginationContainer("on");
    }, []);

    return (
    <div status={paginationContainer} id="ticket-listing-pagination-container" css-marker="PN">
        <div id="PN-go-back-button-direct-container">
            <button>Previous</button>
        </div>
        <div id="PN-page-indexes-container">
            { total_blocks.map((elem, index) => {
                return <div className="PN-page-index-block" key={index}>{index + 1}</div>
            }) }
        </div>
        <div id="PN-proceed-button-direct-container">
            <button>Next</button>
        </div>
    </div>
    )
}

export default Pagination;