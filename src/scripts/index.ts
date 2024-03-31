import '../pages/index.scss';


const startContainer = document.querySelector<HTMLDivElement>('.start')!;
const board = document.querySelector<HTMLDivElement>('.board')!;
const choiceIconMine = document.querySelector<HTMLDivElement>('.choice__icon_mine')!;

function getRelativePosition(element: HTMLElement) {
  return {x: element.offsetLeft, y: element.offsetTop};
}

startContainer.addEventListener('click', (evt: MouseEvent) => {
  const target = evt.target;
  if (!(target instanceof HTMLElement) || !(target.classList.contains('gesture'))) {
    return;
  }
  const relPosStart = getRelativePosition(target);
  startContainer.classList.add('hidden');
  board.classList.remove('hidden');
  const relPosChoice = getRelativePosition(choiceIconMine);
  const offsetX = relPosStart.x - relPosChoice.x;
  const offsetY = relPosStart.y - relPosChoice.y;
  choiceIconMine.style.translate=  `${offsetX}px ${offsetY}px`;
  setTimeout(() => {
    choiceIconMine.classList.add('choice__icon_animated');
    choiceIconMine.style.translate = '0';
  }, 100);


})
