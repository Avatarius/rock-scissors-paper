import "../pages/index.scss";
import { Gesture } from "./type";
import { getPlayerGesture, getBotGesture, compareGestures } from "./game";
import { delayIconAnimation, gestureArray } from "./constants";
import paper from "../images/paper.svg";
import rock from "../images/rock.svg";
import scissors from "../images/scissors.svg";

const startContainer = document.querySelector<HTMLDivElement>(".start-screen")!;
const board = document.querySelector<HTMLDivElement>(".board")!;
const boardContainer =
  document.querySelector<HTMLDivElement>(".board__container")!;
const boardText = document.querySelector<HTMLParagraphElement>(".board__text")!;
const botContainer = document.querySelector<HTMLDivElement>(".player_right")!;
const playerIcon = document.querySelector<HTMLDivElement>(".player__icon")!;
const playerUse = document.querySelector<SVGUseElement>(
  ".circle-icon__use_left"
)!;
const playerText =
  document.querySelector<HTMLParagraphElement>(".player__text_left")!;
const botCounter =
  document.querySelector<HTMLParagraphElement>(".player__counter")!;
const botSvg = document.querySelector<SVGElement>(".circle-icon__svg_bot")!;
const botUse = document.querySelector<SVGUseElement>(
  ".circle-icon__use_right"
)!;
const buttonRestart =
  document.querySelector<HTMLButtonElement>(".board__restart")!;
const scoreCounter = document.querySelector<HTMLParagraphElement>('.score__counter')!;

let playerGesture: Gesture;
let botGesture: Gesture;

let score = 0;

function moveIcon(movableElement: HTMLElement, destElement: HTMLElement): void {
  const offsetX = destElement.offsetLeft - movableElement.offsetLeft;
  const offsetY = destElement.offsetTop - movableElement.offsetTop;
  movableElement.style.translate = `${offsetX}px ${offsetY}px`;
}

function changeIcon(gesture: Gesture, useElement: SVGUseElement) {
  let url: string;
  switch (gesture) {
    case "paper":
      url = `${paper}#paper`;
      break;
    case "scissors":
      url = `${scissors}#scissors`;
      break;
    case "rock":
      url = `${rock}#rock`;
      break;
    default:
      url = "";
      break;
  }
  useElement.setAttribute("href", url);
}

function clearIcon(useElement: SVGUseElement) {
  useElement.setAttribute("href", "");
}

function movePlayerIconBack() {
  playerIcon.classList.add("player__icon_animated");
  playerIcon.style.translate = "0";
}

function showBoardElements() {
  botContainer.classList.remove("player_hidden");
  playerText.classList.remove("player__text_hidden");
}

function countdown(ms: number, callback: () => void) {
  let counter = 3;
  botCounter.textContent = counter.toString();
  let timerId = setTimeout(function tick() {
    counter--;
    if (counter === 0) {
      clearInterval(timerId);
      callback();
      return;
    }
    botCounter.textContent = counter.toString();
    timerId = setTimeout(tick, ms);
  }, ms);
}

function updateScore() {
  score++;
  scoreCounter.textContent = score.toString();
}

function showMessage(result: number, element: HTMLParagraphElement): void {
  switch (result) {
    case 0:
      element.textContent = "draw";
      break;
    case 1:
      element.textContent = "You win";
      updateScore();
      break;
    case -1:
      element.textContent = "You lose";
      break;
  }
}

function toggleScreens(firstElem: HTMLElement, secondElem: HTMLElement): void {
  const firstClassName = firstElem.classList[0];
  const firstHiddenClassName = `${firstClassName}_hidden`;
  const secondClassName = secondElem.classList[0];
  const secondHiddenClassName = `${secondClassName}_hidden`;

  if (firstElem.classList.contains(firstHiddenClassName)) {
    firstElem.classList.remove(firstHiddenClassName);
    secondElem.classList.add(secondHiddenClassName);
  } else {
    firstElem.classList.add(firstHiddenClassName);
    secondElem.classList.remove(secondHiddenClassName);
  }
}

function animateButtonOnRestart(button: HTMLButtonElement) {
  setTimeout(() => {
    button.classList.add("start-screen__button_animated");
    button.style.translate = "0";
  }, delayIconAnimation);
}

function restart() {
  clearIcon(playerUse);
  clearIcon(botUse);
  botContainer.classList.add("player_hidden");
  playerText.classList.add("player__text_hidden");
  botCounter.classList.remove("player__counter_hidden");
  botSvg.classList.add("circle-icon__svg_hidden");
  boardContainer.classList.remove("board__container_expanded");
  playerIcon.classList.remove("player__icon_animated");
  toggleScreens(startContainer, board);
  const gestureButton = document.querySelector<HTMLButtonElement>(
    `.start-screen__button_${playerGesture}`
  );
  if (!gestureButton) return;
  moveIcon(gestureButton, playerIcon);
  animateButtonOnRestart(gestureButton);
}

function handleBotChoice() {
  botGesture = getBotGesture(gestureArray);
  botCounter.classList.add("player__counter_hidden");
  botSvg.classList.remove("circle-icon__svg_hidden");
  changeIcon(botGesture, botUse);
  boardContainer.classList.add("board__container_expanded");
  const result = compareGestures(playerGesture, botGesture);
  showMessage(result, boardText);
}

startContainer.addEventListener("click", (evt: MouseEvent) => {
  const target = evt.target;
  if (
    !(target instanceof HTMLButtonElement) ||
    !target.classList.contains("circle-icon")
  ) {
    return;
  }

  // игрок выбирает жест
  playerGesture = getPlayerGesture(target);
  toggleScreens(startContainer, board);
  moveIcon(playerIcon, target);
  changeIcon(playerGesture, playerUse);

  setTimeout(() => {
    showBoardElements();
    movePlayerIconBack();
  }, delayIconAnimation);
});

playerIcon.addEventListener("transitionend", () => {
  countdown(850, handleBotChoice);
});

startContainer.addEventListener("transitionend", (evt) => {
  const target = evt.target;
  if (!target || !(target instanceof HTMLButtonElement)) return;
  target.classList.remove("start-screen__button_animated");
});

buttonRestart.addEventListener("click", restart);
