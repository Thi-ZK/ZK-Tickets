// Updates Download Path & Description Of Attachments 
const update_download_path_and_desc = (attachments, event, current_elem_id) => {
    for (let i = 0; i < attachments.length; i++) {
        if ( current_elem_id === attachments[i].id ) {
            attachments[i].downloadPath = event.target.value;
            attachments[i].desc = 'File Chosen';
        }
    }
}

// Generates Attachment Object
const generate_attachment_obj = (id) => {
    return {
        id:           'attachment' + id,
        downloadPath: '',
        desc:         'Select a File',
        index:        id
    };
}

module.exports = {
    update_download_path_and_desc: update_download_path_and_desc,
    generate_attachment_obj:       generate_attachment_obj
};