import { Gesture } from "./type";
declare function getPlayerGesture(button: HTMLButtonElement): Gesture;
declare function getBotGesture(gestureArray: Gesture[]): Gesture;
declare function compareGestures(playerGesture: Gesture, botGesture: Gesture): number;
export { getPlayerGesture, getBotGesture, compareGestures };
