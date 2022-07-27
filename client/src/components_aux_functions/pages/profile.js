// Meant For Setting Status Of The <p> (Click For Choosing Content To Be Displayed)
const set_content_display_p_elems_status = (clicked_p) => {
    let all_p_elems = document.querySelectorAll("#PFL-section-choices-direct-container > p");

    for (let i = 0; i < all_p_elems.length; i++) {
        all_p_elems[i].setAttribute("status", "off");
    }

    clicked_p.setAttribute("status", "on");
};

module.exports = {
    set_content_display_p_elems_status: set_content_display_p_elems_status
};