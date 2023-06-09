import { Subject } from "rxjs"

import { UserInfo, Message } from "../common/types"
import { ChatService } from "../services/chat"

interface Room {
  name: string
  chat: ChatService
  subject: Subject<UserInfo[]>
  messageSubject: Subject<Message[]>
}

interface State {
  rooms: Room[]
}

const initialState: State = {
  rooms: [],
}

let state = initialState

const getRoom = (roomName: string) => {
  const findRooms = state.rooms.filter((r) => r.name === roomName)
  return findRooms.length > 0 ? findRooms[0] : null
}

const store = {
  init: (roomName: string, nickName: string) => {
    if (roomName === "" || nickName === "") return
    const findRoom = getRoom(roomName)
    var room: Room
    if (findRoom === null) {
      const subject: Subject<UserInfo[]> = new Subject()
      const messageSubject: Subject<Message[]> = new Subject()
      const newRoom: Room = {
        name: roomName,
        chat: new ChatService(roomName, subject, messageSubject),
        subject: subject,
        messageSubject: messageSubject,
      }
      newRoom.chat.join(nickName)
      state.rooms.push(newRoom)
    } else {
      room = findRoom
    }
  },
  subscribeParticipants: (setParticipants, roomName: string) => {
    if (roomName === "") return
    const room = getRoom(roomName)
    if (room === null) {
      throw new Error("must init room firstly!")
    }
    room.subject.subscribe({ next: setParticipants })
  },
  subscribeMessages: (setMessages, roomName: string) => {
    if (roomName === "") return
    const room = getRoom(roomName)
    if (room === null) {
      throw new Error("must init room firstly!")
    }
    room.messageSubject.subscribe({ next: setMessages })
  },
  subscribeError: (setErrMsg, roomName: string) => {
    if (roomName === "") return
    const room = getRoom(roomName)
    if (room === null) {
      throw new Error("must init room firstly!")
    }
    room.subject.subscribe({ error: setErrMsg })
  },
  muteSelf: (roomName: string) => {
    const room = getRoom(roomName)
    if (room === null) {
      throw new Error("must init room firstly!")
    }
    room.chat.muteSelf()
  },
  sendTextMessage: (roomName: string, text: string) => {
    const room = getRoom(roomName)
    if (room === null) {
      throw new Error("must init room firstly!")
    }
    room.chat.sendTextMessage(text)
  },
  resetStore: () => {
    state = initialState
  },
}

export default store
