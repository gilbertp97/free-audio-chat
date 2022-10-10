import { useState } from "react"

import Avatar from "boring-avatars"

import { UserInfo } from "../common/types"

export default function UserCard(user: UserInfo) {
  const [muteState, setMuteState] = useState<boolean>(user.muteState)
  return (
    <div className={user.className}>
      <div className="m-2 rounded-xl border border-gray-700 bg-gray-800 p-4 pb-2 pt-2">
        <div className="items-center">
          <div className="flex flex-row">
            <Avatar size={40} variant="beam" name={user.name} />
            <button
              className="ml-auto"
              onClick={() => setMuteState(!muteState)}
            >
              {!muteState && (
                <svg
                  className="bi bi-mic"
                  fill="currentColor"
                  height="16"
                  viewBox="0 0 16 16"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z" />
                  <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0v5zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3z" />
                </svg>
              )}
              {muteState && (
                <svg
                  className="bi bi-mic-mute"
                  fill="currentColor"
                  height="16"
                  viewBox="0 0 16 16"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M13 8c0 .564-.094 1.107-.266 1.613l-.814-.814A4.02 4.02 0 0 0 12 8V7a.5.5 0 0 1 1 0v1zm-5 4c.818 0 1.578-.245 2.212-.667l.718.719a4.973 4.973 0 0 1-2.43.923V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 1 0v1a4 4 0 0 0 4 4zm3-9v4.879l-1-1V3a2 2 0 0 0-3.997-.118l-.845-.845A3.001 3.001 0 0 1 11 3z" />
                  <path d="m9.486 10.607-.748-.748A2 2 0 0 1 6 8v-.878l-1-1V8a3 3 0 0 0 4.486 2.607zm-7.84-9.253 12 12 .708-.708-12-12-.708.708z" />
                </svg>
              )}
            </button>
          </div>

          <div className="mt-2 text-center">
            <h5 className="text-sm font-normal text-white">{user.name}</h5>
          </div>
          {user.audioStream !== null && (
            <audio
              ref={(audio) => {
                // audio.srcObject = user.audioStream
              }}
              autoPlay
            ></audio>
          )}
        </div>
      </div>
    </div>
  )
}