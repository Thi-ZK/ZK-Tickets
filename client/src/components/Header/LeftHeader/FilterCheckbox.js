import React    from 'react';

function FilterCheckbox ({ which_filter, li_class, listing_filters_utils }) {
    // Input Filter ID Formatter
    const which_filter_formatted = which_filter.toLowerCase().replaceAll(" ", "-");
    const input_filter_id        = "LH-FC-ticket-filter-" + which_filter_formatted;

    // Listing Filter States
    const listingFilters       = listing_filters_utils.listingFilters;
    const updateListingFilters = listing_filters_utils.updateListingFilters;

    // Update Filters State (Filter Checkbox Handler)
    const update_listing_filters = (event) => {
        if ( event.target.checked ) {
            updateListingFilters([...listingFilters, which_filter_formatted]); 
        } else {
            updateListingFilters(listingFilters.filter(elem => elem !== which_filter_formatted));
        }
        console.log(listingFilters);
    }

    return (
    <li className={li_class} css-marker="FC">
        <input onChange={update_listing_filters} id={input_filter_id} type='checkbox' name='ticket-filter'></input>
        <label htmlFor={input_filter_id}>{which_filter} Tickets</label>
    </li>
    )
}

export default FilterCheckbox;