function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const startBtnRef = document.querySelector('button[data-start]');

const stopBtnRef = document.querySelector('button[data-stop]');

let timerId = null;

startBtnRef.addEventListener('click', changeBodyColor)
stopBtnRef.addEventListener('click', stopRandomHexColor)
function changeBodyColor() {
  startBtnRef.disabled = true;
  stopBtnRef.disabled = false;
  timerId = setInterval(() => {
 
  document.body.style.backgroundColor = getRandomHexColor();

  }, 1000)
  

    
 }

 function stopRandomHexColor() {

    
 stopBtnRef.disabled = true;  
startBtnRef.disabled = false;
clearInterval(timerId);
 };
    

 



