import "../pages/index.scss";
import { Gesture } from "./types";
import { chooseBotGesture } from "./game";
import { gestureArray } from "./constants";
import paper from "../images/paper.svg";
import rock from "../images/rock.svg";
import scissors from "../images/scissors.svg";

const startContainer = document.querySelector<HTMLDivElement>(".start-screen")!;
const board = document.querySelector<HTMLDivElement>(".board")!;
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

function movePlayerIcon(
  movableElement: HTMLElement,
  destElement: HTMLElement
): void {
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

function showBoardElements() {
  return new Promise((resolve) => {
    setTimeout(() => {
      playerIcon.classList.add("player__icon_animated");
      playerIcon.style.translate = "0";
      botContainer.classList.add("player_visible");
      playerText.classList.add("player__text_visible");
      resolve("");
    }, 250);
  });
}

function countdown(ms: number) {
  return new Promise((resolve) => {
    let counter = 3;
    botCounter.textContent = counter.toString();
    let timerId = setTimeout(function tick() {
      counter--;
      if (counter === 0) {
        clearInterval(timerId);
        resolve("");
        return;
      }
      botCounter.textContent = counter.toString();
      timerId = setTimeout(tick, ms);
    }, ms);
  });
}

function toggleScreens(firstElem: HTMLElement, secondElem: HTMLElement): void {
  if (firstElem.classList.contains("hidden")) {
    firstElem.classList.remove("hidden");
    secondElem.classList.add("hidden");
  } else {
    firstElem.classList.add("hidden");
    secondElem.classList.remove("hidden");
  }
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
  toggleScreens(startContainer, board);
  movePlayerIcon(playerIcon, target);

  const gesture = target.dataset.gesture as Gesture;
  changeIcon(gesture, playerUse);
  // отобразить элементы board через 0.1 секунды
  showBoardElements()
    .then(() => {
      return countdown(850);
    })
    .then(() => {
      // бот выбирает жест
      const choice: Gesture = chooseBotGesture(gestureArray);
      botCounter.classList.add("player__counter_hidden");
      botSvg.classList.remove("circle-icon__svg_hidden");
      changeIcon(choice, botUse);

    });
});
