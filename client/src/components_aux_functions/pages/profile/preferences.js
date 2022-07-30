// Meant For Disabling Or Enabling All Language Inputs (action Can Be "disable" or "enable")
const disable_or_enable_all_language_inputs = (action) => {
    let all_language_inputs = document.querySelectorAll(".PFL-PRE-language-input");
    let is_action_to_disable = action === "disable";

    for (let i = 0; i < all_language_inputs.length; i++) {
        all_language_inputs[i].disabled = is_action_to_disable;
    }
};

module.exports = {
    disable_or_enable_all_language_inputs: disable_or_enable_all_language_inputs
};