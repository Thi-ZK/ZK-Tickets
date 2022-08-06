// Meant For Setting Status Of The <p> (Click For Choosing Content To Be Displayed)
const set_content_display_p_elems_status = (clicked_p) => {
    let all_p_elems = document.querySelectorAll("#PFL-section-choices-direct-container > p");

    for (let i = 0; i < all_p_elems.length; i++) {
        all_p_elems[i].setAttribute("status", "off");
    }

    clicked_p.setAttribute("status", "on");
};

// Generate Ticket Creator Image SRC URL
const generate_ticket_creator_img_src = (user_data) => {
    return user_data.name.toLowerCase().replaceAll(" ", "_") + "_" + user_data.id;
}

// Img SRC On Error Function (Set Anonymous Picture)
const set_anonymous_picture = (event) => {
    let img = event.target;
    img.onerror = null;
    img.src = "/imgs/general/users_photos/anonymous.jpg";
}

module.exports = {
    set_content_display_p_elems_status: set_content_display_p_elems_status,
    generate_ticket_creator_img_src: generate_ticket_creator_img_src,
    set_anonymous_picture: set_anonymous_picture
};