import { Gesture } from "./types";

function chooseBotGesture(gestureArray: Gesture[]) {
  const item = gestureArray[Math.floor(Math.random() * gestureArray.length)];
  return item;

}

function compareGestures() {

}


export {chooseBotGesture, compareGestures};
