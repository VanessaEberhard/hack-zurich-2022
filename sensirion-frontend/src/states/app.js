import { ROOMS } from "const/app";
import { atom } from "recoil";
import { v4 as uuidv4 } from "uuid";

export const roomsState = atom({
  key: uuidv4(),
  default: ROOMS,
});

export const selectedRoomState = atom({
  key: uuidv4(),
  default: ROOMS[0],
});
