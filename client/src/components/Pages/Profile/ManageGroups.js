import React, { useState, useEffect } from 'react';

function ManageGroups ({ allPopulationData }) {
    // Aliases
    const ticketGroups          = allPopulationData.ticketGroups;
    const update_ticket_groups  = allPopulationData.update_ticket_groups;
    const all_ticket_groups_ids = Object.keys(ticketGroups);

    // Chosen Groups To Be Deleted (Rectangle Blocks)
    const [groupsToBeDeleted, updateGroupsToBeDeleted] = useState([]);
    const add_group_to_be_deleted = (event) => {
        console.log(event.target);
        // updateGroupsToBeDeleted();
    }

    // Meant For Smooth Appearence Effect Of Component Rendering
    const [manageGroupsContainerStatus, updateManageGroupsContainerStatus] = useState("off");

    useEffect(() => {
        updateManageGroupsContainerStatus("on");
    }, []);

    return (
    <div status={manageGroupsContainerStatus} id='PFL-manage-groups-container' css-marker="MG">
        <div id="PFL-MG-add-group-direct-container">
            <h3>Add New Groups</h3>
            <input placeholder='Type the new group name'></input>
            <div>
                <button>Add Group</button>
            </div>
        </div>
        <div id="PFL-MG-delete-group-direct-container">
            <h3>Groups To Be Deleted</h3>
            <select onChange={add_group_to_be_deleted}>
                <option>--</option>
                { all_ticket_groups_ids.map((id, index) => ( // Selection Options
                    <option group-id={id} key={index}>{ticketGroups[id]}</option>
                )) }
            </select>
            <div>
                <button>Delete Groups</button>
            </div>
        </div>
    </div>
    )
}

export default ManageGroups;