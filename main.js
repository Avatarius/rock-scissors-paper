(()=>{"use strict";var e={p:""};const t=["paper","rock","scissors"],s=e.p+"67f5036a04f1517f8e55.svg",n=e.p+"8425f3c82879d69ee55c.svg",o=e.p+"7f743b9403699bc18d82.svg",r=document.querySelector(".start-screen"),c=document.querySelector(".board"),a=document.querySelector(".board__container"),i=document.querySelector(".board__text"),d=document.querySelector(".player_right"),l=document.querySelector(".player__icon"),_=document.querySelector(".circle-icon__use_left"),u=document.querySelector(".player__text_left"),f=document.querySelector(".player__counter"),m=document.querySelector(".circle-icon__svg_bot"),p=document.querySelector(".circle-icon__use_right"),L=document.querySelector(".board__restart"),y=document.querySelector(".score__counter");let v,b,g=0;function h(e,t){const s=t.offsetLeft-e.offsetLeft,n=t.offsetTop-e.offsetTop;e.style.translate=`${s}px ${n}px`}function k(e,t){let r;switch(e){case"paper":r=`${s}#paper`;break;case"scissors":r=`${o}#scissors`;break;case"rock":r=`${n}#rock`;break;default:r=""}t.setAttribute("href",r)}function S(e){e.setAttribute("href","")}function T(e,t){const s=`${e.classList[0]}_hidden`,n=`${t.classList[0]}_hidden`;e.classList.contains(s)?(e.classList.remove(s),t.classList.add(n)):(e.classList.add(s),t.classList.remove(n))}function x(){b=function(e){return e[Math.floor(Math.random()*e.length)]}(t),f.classList.add("player__counter_hidden"),m.classList.remove("circle-icon__svg_hidden"),k(b,p),a.classList.add("board__container_expanded");const e=function(e,t){const s={rock:{weakTo:"paper",strongTo:"scissors"},paper:{weakTo:"scissors",strongTo:"rock"},scissors:{weakTo:"rock",strongTo:"paper"}};return e===s[t].weakTo?1:e===s[t].strongTo?-1:0}(v,b);!function(e,t){switch(e){case 0:t.textContent="draw";break;case 1:t.textContent="You win",g++,y.textContent=g.toString();break;case-1:t.textContent="You lose"}}(e,i)}r.addEventListener("click",(e=>{const t=e.target;t instanceof HTMLButtonElement&&t.classList.contains("circle-icon")&&(v=t.dataset.gesture,T(r,c),h(l,t),k(v,_),setTimeout((()=>{d.classList.remove("player_hidden"),u.classList.remove("player__text_hidden"),l.classList.add("player__icon_animated"),l.style.translate="0"}),150))})),l.addEventListener("transitionend",(()=>{!function(e,t){let s=3;f.textContent=s.toString();let n=setTimeout((function e(){if(s--,0===s)return clearInterval(n),void t();f.textContent=s.toString(),n=setTimeout(e,500)}),500)}(0,x)})),r.addEventListener("transitionend",(e=>{const t=e.target;t&&t instanceof HTMLButtonElement&&t.classList.remove("start-screen__button_animated")})),L.addEventListener("click",(function(){S(_),S(p),d.classList.add("player_hidden"),u.classList.add("player__text_hidden"),f.classList.remove("player__counter_hidden"),m.classList.add("circle-icon__svg_hidden"),a.classList.remove("board__container_expanded"),l.classList.remove("player__icon_animated"),f.textContent="",T(r,c);const e=document.querySelector(`.start-screen__button_${v}`);var t;e&&(h(e,l),t=e,setTimeout((()=>{t.classList.add("start-screen__button_animated"),t.style.translate="0"}),150))}))})();
//# sourceMappingURL=main.js.map