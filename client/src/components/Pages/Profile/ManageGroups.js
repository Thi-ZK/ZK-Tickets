import React, { useState, useEffect } from 'react';

import axios from '../../../api/axios';
import AF    from '../../../components_aux_functions/pages/profile/manage_groups'; // Aux Functions

function ManageGroups ({ allPopulationData }) {
    // Aliases
    const ticketGroups          = allPopulationData.ticketGroups;
    const update_ticket_groups  = allPopulationData.update_ticket_groups;
    const update_all_tickets    = allPopulationData.update_all_tickets;
    const all_ticket_groups_ids = Object.keys(ticketGroups);

    // Chosen Groups To Be Deleted (Rectangle Blocks)
    const [groupsToBeDeleted, updateGroupsToBeDeleted] = useState([]);

    // Add Group To Be Deleted Function (Selection Handler)
    const add_group_to_be_deleted = (event) => {
        let group_to_be_deleted = {
            name: AF.get_group_name(event),
            id:   AF.get_group_id(event)
        };

        if ( !AF.is_group_already_present(groupsToBeDeleted, group_to_be_deleted) ) {
            updateGroupsToBeDeleted([...groupsToBeDeleted, group_to_be_deleted]);
            
            AF.set_aux_option_disabled_status(true);
        }
    }

    // Remove Group To Be Deleted
    const remove_group_to_be_deleted = (event) => {
        let group_id_to_be_deleted = AF.get_group_id(event);

        updateGroupsToBeDeleted(groupsToBeDeleted.filter((group_obj) => { 
            return group_id_to_be_deleted !== group_obj.id;
        }));
    }

    // Delete Selected Groups (Delete Button Handler)
    const delete_selected_groups = () => {
        if ( !groupsToBeDeleted.length ) {
            return;
        }

        AF.set_delete_new_group_button_disabled_status("disable");

        let data = {
            groups_to_be_deleted: groupsToBeDeleted
        };

        AF.set_loading_icon_status("right", "on");

        axios.post('/ticket_groups/delete/multiple', data).then(( res ) => { console.log(res.data);
            AF.set_loading_icon_status("right", "off");
            AF.set_delete_new_group_button_disabled_status("enable");

            if ( res.data.success ) {
                update_all_tickets();
                update_ticket_groups();
                updateGroupsToBeDeleted([]);
                AF.set_aux_option_disabled_status(false);
                AF.display_success_feedback_icon("right");
            }
        });
    }

    // Create New Group (Add New Handler)
    const create_new_group = () => {
        let new_group = AF.get_new_typed_group();

        if ( !new_group ) {
            return;
        }

        if ( !AF.is_new_group_valid(new_group) ) {
            AF.display_new_group_error_msg();
            return;
        }

        AF.set_create_new_group_button_disabled_status("disable");
        AF.set_loading_icon_status("left", "on");

        axios.post('/ticket_groups/create/single', { new_group: new_group }).then(( res ) => { console.log(res.data);
            AF.set_loading_icon_status("left", "off");
            AF.set_create_new_group_button_disabled_status("enable");

            if ( res.data.success ) {
                update_ticket_groups();
                AF.display_success_feedback_icon("left");
                AF.clean_new_group_input();
            }
        });
    }

    // Meant For Smooth Appearence Effect Of Component Rendering
    const [manageGroupsContainerStatus, updateManageGroupsContainerStatus] = useState("off");

    useEffect(() => {
        updateManageGroupsContainerStatus("on");
    }, []);

    return (
    <div status={manageGroupsContainerStatus} id='PFL-manage-groups-container' css-marker="MG">
        {/* Create New Group Block */}
        <div id="PFL-MG-create-group-direct-container">
            <div id='PFL-MG-create-group-title-direct-container'>
                <h3>Add New Groups</h3>
                <img status="off" className='PFL-MG-loading-gif' which="left" src="/imgs/general/loading_blue_icon.gif" alt="loading circle"/>
                <img status="off" className='PFL-MG-success-gif' which="left" src="./imgs/general/success.gif"          alt="blue success balloon"/>
            </div>
            <input placeholder='Type the new group name'></input>
            <div>
                <button onClick={create_new_group}>Add Group</button>
            </div>
            <p status="off" id='PFL-MG-create-group-error-message'>Group name too long or too poor</p>
        </div>
        {/* Delete Groups Block */}
        <div id="PFL-MG-delete-group-direct-container">
            <div id='PFL-MG-delete-group-title-direct-container'>
                <h3>Groups To Be Deleted</h3>
                <img status="off" className='PFL-MG-loading-gif' which="right" src="/imgs/general/loading_blue_icon.gif" alt="loading circle"/>
                <img status="off" className='PFL-MG-success-gif' which="right" src="./imgs/general/success.gif"          alt="blue success balloon"/>
            </div>
            <select onChange={add_group_to_be_deleted}>
                <option group-name="aux">--</option>
                {/* Selection Options */}
                { all_ticket_groups_ids.map((id, index) => (
                    <option group-name={ticketGroups[id]} group-id={id} key={index}>{ticketGroups[id]}</option>
                )) }
            </select>
            <div>
                <button onClick={delete_selected_groups}>Delete Groups</button>
            </div>
            <div id='PFL-MG-group-to-be-deleted-container' className='rectangle-span-selected_pieces'>
                {/* Groups Rectangle Blocks */}
                { groupsToBeDeleted.map((option, index) => (
                    <div key={index}>
                        <span onClick={remove_group_to_be_deleted} group-id={option.id} group-name={option.name}>{option.name}</span>
                    </div>
                )) }
            </div>
        </div>
    </div>
    )
}

export default ManageGroups;