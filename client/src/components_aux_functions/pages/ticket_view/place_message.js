// Meant For Success Blue Gif That Shows When Message Successful Placed 
const show_and_fade_success_icon = () => {
    let success_message = document.querySelector("#TV-PM-submit-button-direct-container img");
    success_message.setAttribute("status", "on");
    setTimeout(() => {success_message.setAttribute("status", "off");}, 1000);
}

// Generate Random ID
const generate_random_id = () => {
    return String(Date.now()) + "." + String(Math.floor(Math.random() * 100000));
}

// Clean Message Text Area
const clean_message_text_area = () => {
    document.querySelector("#TV-PM-message-textarea").innerText = "";
}

module.exports = {
    show_and_fade_success_icon: show_and_fade_success_icon,
    generate_random_id:         generate_random_id,
    clean_message_text_area:    clean_message_text_area
};