import Notiflix from 'notiflix';


import { Notify } from 'notiflix/build/notiflix-notify-aio';


//

const delay = document.querySelector('input[name="delay"]');
 const step = document.querySelector('input[name="step"]');
 const  amount = document.querySelector('input[name="amount"]');
 const btnPromise = document.querySelector('button[type="submit"]');






btnPromise.addEventListener('click', startCreatePromise);


function startCreatePromise (event) {
  event.preventDefault();
  const firstDelay = Number(delay.value);
  const delayStep = Number(step.value);
  const amountInputUser = amount.value;
  for (let i = 0; i < amountInputUser; i += 1) {
    createPromise(1 + i, firstDelay + i * delayStep)
      .then(({ position, delay }) => onSuccess({ position, delay }))
      .catch(({ position, delay }) => onError({ position, delay }));
  }
}

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    getPromiseFromBackend(position, delay, resolve, reject);
  });
  return promise;
}

function getPromiseFromBackend(position, delay, resolve, reject) {
  setTimeout(() => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  }, delay);
}
function onSuccess({ position, delay }) {
  Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
}

function onError({ position, delay }) {
  Notify.failure(`Rejcted promise ${position} in ${delay}ms`);
}