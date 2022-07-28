import React from 'react'

function Preferences() {
    return (
    <div>
        <div className="PFL-">
            <div>
                <input type="radio" name="rb" id="rb1" />
                <label htmlFor="rb1">Español</label>
            </div>
            <div>
                <input type="radio" name="rb" id="rb2" />
                <label htmlFor="rb2">Deutsch</label>
            </div>
            <div>
                <input type="radio" name="rb" id="rb3" />
                <label htmlFor="rb3">English</label>
            </div>
            <div>
                <input type="radio" name="rb" id="rb4" />
                <label htmlFor="rb4">Português</label>
            </div>
        </div>
    </div>
    )
}

export default Preferences;