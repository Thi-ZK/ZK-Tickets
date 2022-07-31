// Meant For Disabling Or Enabling All Language Inputs (action Can Be "disable" or "enable")
const disable_or_enable_all_language_inputs = (action) => {
    let all_language_inputs = document.querySelectorAll(".PFL-PRE-language-input");
    let is_action_to_disable = action === "disable";

    for (let i = 0; i < all_language_inputs.length; i++) {
        all_language_inputs[i].disabled = is_action_to_disable;
    }
};

// Meant For Displaying Success Blue Gif Icon On For A Short Time. "chosen_section" Can Be "languages" or "brightness_themes".
const display_blue_success_icon = (chosen_section) => {
    chosen_section = chosen_section.replace("_", "-"); // Meant For The Query Selection, In Case brightness_themes Were Chosen
    let success_icon = document.querySelector("#PFL-PRE-" + chosen_section + "-direct-container .PFL-PRE-success-gif");

    success_icon.setAttribute("status", "on");
    setTimeout(() => {
        success_icon.setAttribute("status", "off");
    }, 950);
};

module.exports = {
    disable_or_enable_all_language_inputs: disable_or_enable_all_language_inputs,
    display_blue_success_icon: display_blue_success_icon
};