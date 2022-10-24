import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';


import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputRef = document.querySelector('#datetime-picker');
const startBtnRef = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

const timerRef = document.querySelector('.timer');


startBtnRef.disabled = true;
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) { 
        if (selectedDates[0] < new Date()) {
            startBtnRef.disabled = true;
            Notiflix.Notify.warning('Please choose a date in the future');
        }
        else {
           
            startBtnRef.disabled = false;
        }
     
    },
  };
const fp = flatpickr(inputRef, options);
  
   //--------
   startBtnRef.addEventListener('click', onTimerStart);
    function onTimerStart() {
        let intervalId = null;  
        
           intervalId = setInterval(() => {
              const timerData = new Date(inputRef.value) - new Date();
          
              startBtnRef.disabled = true;
          
              if (timerData >= 0) {
                const timeObject = convertMs(timerData);
          
                days.textContent = ` ${addLeadingZero(timeObject.days)} : `;
                hours.textContent = `${addLeadingZero(timeObject.hours)} :`;
                minutes.textContent = `${addLeadingZero(timeObject.minutes)} :`;
                seconds.textContent = `${addLeadingZero(timeObject.seconds)} :`;
              
                if (timerData <= 10000) {
                    timerRef.style.color = 'red';
                }
              } else {
                
                
                clearInterval(intervalId);
              }
            }, 1000);
          }

    
function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

    
    
    function convertMs(ms) {
        // Number of milliseconds per unit of time
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;
      
        // Remaining days
        const days = addLeadingZero(Math.floor(ms / day));
        // Remaining hours
        const hours = addLeadingZero(Math.floor((ms % day) / hour));
        // Remaining minutes
        const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
        // Remaining seconds
        const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
      
        return { days, hours, minutes, seconds };
      
    
    }
    

