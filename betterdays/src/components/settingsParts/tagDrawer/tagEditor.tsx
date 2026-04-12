import React from 'react'
import { UserSettingsProps } from '../../../utils/props/users';

function tagEditor(props: UserSettingsProps) {
  return (
    <div className="tag-editor h-full flex flex-col items-center justify-center gap-4">
        <h2>Edit Tags for {props.username}</h2>
        <div className="current-tags flex gap-2">
            {props.tags.map((tag: string, index: number) => (
                <span key={index} className="current-tag">{tag}</span>
            ))}
        </div>
        <input type="text" placeholder="Add a new tag" className="new-tag-input" />
        <button className="add-tag-button">Add Tag</button>
      
    </div>
  )
}

export default tagEditor

