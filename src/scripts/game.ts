import { Gesture } from "./type";

function getPlayerGesture(button: HTMLButtonElement): Gesture {
  return button.dataset.gesture as Gesture;
}

function getBotGesture(gestureArray: Gesture[]) {
  const item = gestureArray[Math.floor(Math.random() * gestureArray.length)];
  return item;

}

function compareGestures(playerGesture: Gesture, botGesture: Gesture): number {
  const gestureObj = {
    'rock': {weakTo: 'paper', strongTo: 'scissors'},
    'paper': {weakTo: 'scissors', strongTo: 'rock'},
    'scissors': {weakTo: 'rock', strongTo: 'paper'}
  };


  if (playerGesture === gestureObj[botGesture].weakTo) {
    return 1;
  }

  if (playerGesture === gestureObj[botGesture].strongTo) {
    return -1;
  }

  return 0;

}


export {getPlayerGesture, getBotGesture, compareGestures};
