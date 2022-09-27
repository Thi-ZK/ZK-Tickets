import React from 'react';
import texts from '../../../languages/Header/FilterCheckbox.json';

function FilterCheckbox ({ which_filter, language, listing_filters_utils, type }) {
    // Input Filter ID Formatter
    const which_filter_formatted = which_filter.toLowerCase().replaceAll(" ", "-");
    const input_filter_id        = "LH-FC-ticket-filter-" + which_filter_formatted;

    // Listing Filter States
    const listingFilters       = listing_filters_utils.listingFilters;
    const updateListingFilters = listing_filters_utils.updateListingFilters;

    // Update Filters State (Filter Checkbox Handler)
    const update_listing_filters = (event) => {
        let filter = {
            name: which_filter,
            type: type
        };

        if ( event.target.checked ) {
            updateListingFilters([...listingFilters, filter]); // Add Filter
        } else {                      
            updateListingFilters(listingFilters.filter(elem => elem.name !== which_filter)); // Remove Filter
        }
    }
    
    return (
    <li type={type} className="LH-filter-checkbox-list-item" css-marker="FC">
        <input onChange={update_listing_filters} id={input_filter_id} type='checkbox' name='ticket-filter'></input>
        <label htmlFor={input_filter_id}>{type === "group" ? which_filter : texts[which_filter_formatted][language]}</label>
    </li>
    )
}

export default FilterCheckbox;