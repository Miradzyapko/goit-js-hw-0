import Notiflix from 'notiflix';


import { Notify } from 'notiflix/build/notiflix-notify-aio';


//

const delay = document.querySelector('input[name="delay"]');
 const step = document.querySelector('input[name="step"]');
 const  amount = document.querySelector('input[name="amount"]');
 const btnPromise = document.querySelector('.form');
console.log(btnPromise);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => { 
    setTimeout(() => {
      
      if (shouldResolve) {
      resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
    
  }



btnPromise.addEventListener('submit', startCreatePromise);


function startCreatePromise(event) {
 event.preventDefault();
 
  let firstDelay = Number(delay.value);
  let delayStep = Number(step.value);
  let amountInputUser = Number(amount.value);
  for(let i = 1; i <= amountInputUser; i += 1) {
     createPromise(i, firstDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`Rejcted promise ${position} in ${delay}ms`);
      });
      btnPromise.reset();
      firstDelay += delayStep;
  }
}

 




