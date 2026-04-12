import React from 'react'
import PropTypes from 'prop-types'
import {UserSettingsProps} from '../../../utils/props/users';


function userDisplay(props: UserSettingsProps) {
  return (
    <div className="p-16 flex-col items-center justify-start gap-12 bg-white rounded-lg shadow-md w-full">

        <div className="avatar flex items-center justify-center rounded-full bg-[#ccc] w-16 h-16">
            <h2>{props.avatarInitial}</h2>
        </div>

        <h3>{props.username}</h3>

            <div className="user-tags p-6 rounded-sm bg-[#eee] w-[100%] flex items-center justify-start gap-4 overflow-x-auto">
                {props.tags.map((tag: string, index: number) => (
                    <span key={index} className="user-tag bg-[#ddd] p-2">{tag}</span>
                ))}
            </div>

        <div className="flex-col items-center justify-start gap-4">
            <button onClick={props.onEditTags}>Edit Tags</button><br></br>
            <button onClick={props.onSignOut}>Sign Out</button>
        </div>
    </div>
    
  )
}

export default userDisplay


