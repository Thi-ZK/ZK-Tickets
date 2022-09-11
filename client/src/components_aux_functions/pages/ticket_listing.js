// Meant For Filtering Which Ticket Status User Wants To See
const status_filters_list_obj = {
    open:         "Open",
    deleted:      "Deleted",
    concluded:    "Concluded",
    blocked:      "Blocked",
    homologation: "Homologation"
};

// Meant For Auxiliary In Checking If Filter Is Status Filter Type
const status_filters = ["open", "deleted", "concluded", "blocked", "homologation"];

module.exports = {
    status_filters_list_obj: status_filters_list_obj,
    status_filters:          status_filters
};