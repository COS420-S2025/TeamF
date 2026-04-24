import React from 'react'
import userDisplay from "../components/settingsParts/settingsContent/userDisplay";
import tagEditor from "../components/settingsParts/tagDrawer/tagEditor";
import Logout from '../Logout';

function Settings() {
  return (
    <div className="settings-page h-[80vh] w-screen bg-[#f2f2f2] text-[#111111] flex flex-col items-center justify-start pt-10 gap-6">
        <h1 className="settings-title m-0 font-medium text-[clamp(2rem,4vw,2.5rem)]">
            User Settings
        </h1>
        {userDisplay({index: 0, username: "JohnDoe", avatarInitial: "J", tags: ["tag1", "tag2"], onEditTags: () => {}, onSignOut: () => {}})}
        <Logout />
        {/*tagEditor({index: 0, username: "JohnDoe", avatarInitial: "J", tags: ["tag1", "tag2"], onEditTags: () => {}, onSignOut: () => {}})*/}
    </div>
  )
}

export default Settings
