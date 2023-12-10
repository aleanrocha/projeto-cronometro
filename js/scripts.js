// Seleção de elementos

const minutesEl = document.getElementById('minutes')
const secondsEl = document.getElementById('seconds')
const millisecondsEl = document.getElementById('milliseconds')
const startBtn = document.getElementById('startBtn')
const pauseBtn = document.getElementById('pauseBtn')
const resumeBtn = document.getElementById('resumeBtn')
const resetBtn = document.getElementById('resetBtn')

// Variáveis

let minutes = 0
let seconds = 0
let milliseconds = 0
let isPaused = false
let interval = null

// Função de iniciar a cronômetro
const startTimer = () => {
  interval = setInterval(() => {
    if (!isPaused) {
      milliseconds += 10
      if (milliseconds === 1000) {
        seconds++
        milliseconds = 0
      }
      if (seconds === 60) {
        minutes++
        seconds = 0
      }
    }

    const objectTimer = {
      seconds: seconds,
      minutes: minutes,
      milliseconds: milliseconds,
    }
    // salva no armazenamento local
    localStorage.setItem('time', JSON.stringify(objectTimer))

    getTimer()
  }, 10)
  startBtn.style.display = 'none'
  pauseBtn.style.display = 'block'
}

// formata o tempo adicionando 0 no icicio 
const formatTime = (time) => {
  return time < 10 ? `0${time}` : time
}
const formatMilliseconds = (time) => {
  return time < 100 ? `${time}`.padStart(3, '0') : time
}

// função para pausar ou continuar a contagem
const pauseOrResumeTimer = () => {
  if (!isPaused) {
    isPaused = true
    pauseBtn.style.display = 'none'
    resumeBtn.style.display = 'block'
  } else {
    isPaused = false
    pauseBtn.style.display = 'block'
    resumeBtn.style.display = 'none'
  }
}

// reseta tudo 
const resetTimer = () => {
  clearInterval(interval)
  localStorage.clear()
  startBtn.textContent = 'Iniciar'
  isPaused = false
  minutes = 0
  seconds = 0
  milliseconds = 0
  millisecondsEl.textContent = '000'
  secondsEl.textContent = '00'
  minutesEl.textContent = '00'
  pauseBtn.style.display = 'none'
  resumeBtn.style.display = 'none'
  startBtn.style.display = 'block'
  document.title = `Cronômetro`
}

// obtém os dados do armazenamento local 
const getTimer = (reload) => {
  const getTime = localStorage.getItem('time')
  const localTimer = JSON.parse(getTime)

  // verifica se a página foi recarregada e modifica o nome
  // do botão de 'Iniciar' para 'continuar' já que possui dados
  //  armazenados no armazenamento local
  if (reload) {
    startBtn.textContent = 'Continuar'
  }

  milliseconds = localTimer.milliseconds
  seconds = localTimer.seconds
  minutes = localTimer.minutes

  millisecondsEl.textContent = formatMilliseconds(milliseconds)
  secondsEl.textContent = formatTime(seconds)
  minutesEl.textContent = formatTime(minutes)
  document.title = `${formatTime(minutes)}:${formatTime(
    seconds
  )} - Cronômetro `
}

// Eventos
startBtn.addEventListener('click', startTimer)
pauseBtn.addEventListener('click', pauseOrResumeTimer)
resumeBtn.addEventListener('click', pauseOrResumeTimer)
resetBtn.addEventListener('click', resetTimer)

// verifica se possui algo no armazenamento local se verdadeiro
// chama uma função e carrega os dados
if (JSON.parse(localStorage.getItem('time'))) {
  const reload = true
  getTimer(reload)
}
