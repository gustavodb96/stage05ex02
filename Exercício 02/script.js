const buttonPlay = document.querySelector('.pathPlay')
const buttonStop = document.querySelector('.stop')
const buttonIncrease = document.querySelector('.increase')
const buttonDecrease = document.querySelector('.decrease')
const buttonForest = document.querySelectorAll('.forest')
const buttonRain = document.querySelectorAll('.rain')
const buttonCoffeshop = document.querySelectorAll('.coffe-shop')
const buttonFireplace = document.querySelectorAll('.fireplace')

const minutesDisplay = document.querySelector('.minutes')
const secondsDisplay = document.querySelector('.seconds')

const soundForest = new Audio("https://drive.google.com/file/d/1CRHkV72WUMdcqec5GT_KdsqFz0z3VAOA/view") 
const soundRain = new Audio("https://drive.google.com/file/d/1Ip8xBqAUJ-bty51Wz8JBtX_bWXCgA0P2/view") 
const soundCoffeshop = new Audio("https://drive.google.com/file/d/1OxLKpCwg2wrxXFNUHgZxJ51QEt0ac5RA/view") 
const soundFireplace = new Audio("https://drive.google.com/file/d/1MakaBPxJvTa_whaSM3kEbRcxiVd1GRCB/view")

let timerTimeOut
let minutes = Number(minutesDisplay.textContent)
let clickCount = 0

soundForest.loop = true
soundRain.loop = true
soundCoffeshop.loop = true
soundFireplace.loop = true

// Funções do botão

function play() {  
  buttonPlay.classList.add('active')
}

function stop() {
  buttonPlay.classList.remove('active')
  cleanActiveSounds()
}

function increase() {
  clickCount++
  let minutesIncreased = minutes + (5 * clickCount)
  minutesDisplay.textContent = minutesIncreased
}

function decrease() {
  if (minutesDisplay.textContent > 0) {
    clickCount--
    let minutesDecreased = minutes + (5 * clickCount)
    minutesDisplay.textContent = String(minutesDecreased).padStart(2, "0")
  }
}

function cleanActiveSounds() {

  buttonForest.forEach(function(element) {
    element.classList.remove('active')
  })

  buttonRain.forEach(function(element) {
    element.classList.remove('active')
  })

  buttonCoffeshop.forEach(function(element) {
    element.classList.remove('active')
  })

  buttonFireplace.forEach(function(element) {
    element.classList.remove('active')
  })

  soundForest.pause()
  soundRain.pause()
  soundCoffeshop.pause()
  soundFireplace.pause()

}

function soundOnForest() {
  cleanActiveSounds()

  buttonForest.forEach(function(element) {
    element.classList.toggle('active')
  })

  soundForest.play()

}

function soundOnRain() {

  cleanActiveSounds()

  buttonRain.forEach(function(element) {
    element.classList.toggle('active')
  })

  soundRain.play()

}

function soundOnCoffeshop() {

  cleanActiveSounds()

  buttonCoffeshop.forEach(function(element) {
    element.classList.toggle('active')
  })

  soundCoffeshop.play()
}

function soundOnFireplace() {

  cleanActiveSounds()

  buttonFireplace.forEach(function(element) {
    element.classList.toggle('active')
  })

  soundFireplace.play()

}


// Lógica das funções dos botões

function updateDisplay(newMinutes, seconds) {
  newMinutes = newMinutes === undefined ? minutes : newMinutes
  seconds = seconds === undefined ? 0 : seconds
  minutesDisplay.textContent = String(newMinutes).padStart(2, "0")
  secondsDisplay.textContent = String(seconds).padStart(2, "0")
}

function Reset() {
  updateDisplay(minutes, 0)
  clearTimeout(timerTimeOut)
}

function countdown() {
  timerTimeOut = setTimeout(function() {

    let seconds =  Number(secondsDisplay.textContent)
    let minutes = Number(minutesDisplay.textContent)
    let isFinished = minutes <= 0 && seconds <= 0
    
    updateDisplay(minutes, 0)
    
    if (isFinished) {
      
      resetControls()
      updateDisplay()
      
      return
      
    }
    
    if(seconds <= 0 ) {
      seconds = 60
      --minutes
    }
    
    updateDisplay(minutes, String(seconds - 1))
    
    countdown()
    
  }, 1000)
}

// Eventos

buttonPlay.addEventListener('click', function() { play(), countdown() })

buttonStop.addEventListener('click', function() { stop(), Reset() })

buttonIncrease.addEventListener('click', function() { increase() }) 

buttonDecrease.addEventListener('click', function() { decrease() }) 

buttonForest.forEach(function(button) {
  button.addEventListener('click', soundOnForest)
})

buttonRain.forEach(function(button) {
  button.addEventListener('click', soundOnRain)
})

buttonCoffeshop.forEach(function(button) {
  button.addEventListener('click', soundOnCoffeshop)
})

buttonFireplace.forEach(function(button) {
  button.addEventListener('click', soundOnFireplace)
})

