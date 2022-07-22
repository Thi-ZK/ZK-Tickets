// Meant For Filtering Which Ticket Status User Wants To See
const status_filters_list_obj = {
    all_tickets: "",
    all_tickets_iaa: "",
    my_created_tickets: "",
    open_tickets_iaa: "Open",
    all_deleted_tickets_iaa: "Deleted",
    concluded_tickets_iaa: "Concluded",
    blocked_tickets_iaa: "Blocked",
    homologated_tickets_iaa: "Homologation"
};

module.exports = {
    status_filters_list_obj: status_filters_list_obj
};