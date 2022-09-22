import React, { useState, useEffect } from 'react';

function NotAuthorized() {
    // Meant For Smooth Appearence Effect Of Component Rendering
    const [unauthorizedContainerStatus, updateUnauthorizedContainerStatus] = useState("off");

    useEffect(() => {
        updateUnauthorizedContainerStatus("on");
    }, []);

    return (
    <div status={unauthorizedContainerStatus} id='unauthorized-container'>
        <img alt='404' src='/imgs/general/unauthorized.png'/>
    </div>
    )
}

export default NotAuthorized;