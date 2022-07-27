import React, { useState } from 'react';
import texts from '../../languages/IndependentPieces/Attachment.json';

function AttachmentBlock ({ language }) {

    // State Declaration & Managing Functions
    const [attachments, updateAttachments] = useState([{ id: 'attachment1', downloadPath: '', desc: 'Select a File', index: 1 }]);
	const update_path_and_add_new_att = (event) => {
		let current_elem_id = event.target.id;
		let last_attachment = attachments[attachments.length -1];
		let is_new_attachment = current_elem_id === last_attachment.id;

		for (let i = 0; i < attachments.length; i++) {
			if (current_elem_id === attachments[i].id) {
				attachments[i].downloadPath = event.target.value;
				attachments[i].desc = 'File Chosen';
			}
		}

        let newAttachment = {id: 'attachment' + (last_attachment.index + 1), downloadPath: '', desc: 'Select a File', index: last_attachment.index + 1};
		is_new_attachment ? updateAttachments([...attachments, newAttachment]) : updateAttachments([...attachments]);
	}

	const deleteAttachment = (id) => {
		updateAttachments(attachments.filter((elem) => {
			return !(elem.id === id);
		}));
	}

    return (
    <>
    {attachments.map((attachment, index) => (
    <div key={index} className='attachment-container' css-marker="ATT">
        <div className="ATT-input-direct-container">  
            <input
                className="ATT-input"
                id={attachment.id}
                type="file"
                accept='.pdf, .jpeg, .jpg, .png, .xlsx, .docx'
                onChange={(e) => update_path_and_add_new_att(e)}
            />
            <label tabIndex="0" htmlFor="my-file" className="ATT-input-status-text">{texts[attachment.desc.toLowerCase()][language]}</label>
        </div>
        <div id="ATT-file-name-and-delete-button-direct-container">
            <p className="ATT-file-path-text">{attachment.downloadPath}</p>
            <img 
                onClick={(e) => {deleteAttachment(attachment.id)}}
                className={attachment.downloadPath ? "open" : "closed"}
                alt="delete-icon"
                src='/imgs/general/red_x_delete_icon.png'
            />
        </div>
    </div> 
    ))}
    </>
    )
}

export default AttachmentBlock