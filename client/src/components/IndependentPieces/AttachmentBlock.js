import React, { useState } from 'react';
import AF                  from '../../components_aux_functions/independent_pieces/attachments';
import texts               from '../../languages/IndependentPieces/Attachment.json';

function AttachmentBlock ({ language }) {
    // Attachments State
    const [attachments, updateAttachments] = useState([AF.generate_attachment_obj(1)]);

    // Meant For Add New Attachment
	const update_path_and_add_new_att = (event) => {
		let current_elem_id   = event.target.id;
		let last_attachment   = attachments[attachments.length -1];
		let is_new_attachment = current_elem_id === last_attachment.id;

        AF.update_download_path_and_desc(attachments, event, current_elem_id);

        let newAttachment = AF.generate_attachment_obj((last_attachment.index + 1)); // ID & Index (Are Same)
		is_new_attachment ? updateAttachments([...attachments, newAttachment]) : updateAttachments([...attachments]);
	}

    // Meant For Deleting Attachment
	const delete_attachment = (id) => {
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
                onClick={(e) => {delete_attachment(attachment.id)}}
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