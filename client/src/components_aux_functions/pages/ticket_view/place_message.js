// Meant For Success Blue Gif That Shows When Message Successful Placed 
const show_and_fade_success_icon = () => {
    let success_message = document.querySelector("#place-message-button-container img");
    success_message.setAttribute("status", "on");
    setTimeout(() => {success_message.setAttribute("status", "off");}, 1000);
}

// Generate Random ID
const generate_random_id = () => {
    return String(Date.now()) + "." + String(Math.floor(Math.random() * 100000));
}

module.exports = {
    show_and_fade_success_icon: show_and_fade_success_icon,
    generate_random_id: generate_random_id
};