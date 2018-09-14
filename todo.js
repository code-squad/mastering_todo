const STATUS = {
  TODO: 'todo',
  DOING: 'doing',
  DONE: 'done'
}

const TODO = {
  totalStatus: {
    todo: 0,
    doing: 0,
    done: 0
  },
  tasks: []
}
function command(orderSentence) {
  const [firstWord, secondWord, thirdWord] = refineSentence(orderSentence)
  switch (firstWord) {
    case 'add':
      add((taskTitle = secondWord))
      break
    case 'show':
      show((status = secondWord))
      break
    case 'update':
      update((taskId = Number(secondWord)), (status = thirdWord))
      break
  }
}

const refineSentence = sentence =>
  sentence
    .toLowerCase()
    .split('$')
    .map(word => word.trim())

function add(taskTitle) {
  const newTask = { id: TODO.tasks.length + 1, taskTitle, status: 'todo' }
  setTask(newTask)
  increaseStatus(newTask.status)
  logAddResult(newTask)
  logPresentStatus(TODO.totalStatus)
}

const setTask = newTask => {
  const prevTasks = TODO.tasks
  TODO.tasks = [...prevTasks, newTask]
}

const logAddResult = ({ id, taskTitle }) => {
  console.log(`> id: ${id}, "${taskTitle}" 항목이 새로 추가됐습니다.`)
}

function show(statusType) {
  getTypeTask(statusType).forEach(task => logTask(task))
}

const getTypeTask = statusType =>
  TODO.tasks.filter(task => task.status === statusType)

const logTask = ({ id, taskTitle }) => console.log(`> "${id}, ${taskTitle}"`)

function update(taskId, statusType) {
  updateTotalStatus(taskId, statusType)
  updateTask(taskId, statusType)
  logPresentStatus(TODO.totalStatus)
}

const updateTask = (taskId, statusType) => {
  const updatedTasks = TODO.tasks.map(task => {
    if (task.id === taskId) return updateStatus(task, statusType)
    return task
  })
  setUpdateTask(updatedTasks)
}

const updateStatus = (task, statusType) => ({ ...task, status: statusType })

const setUpdateTask = updatedTasks => (TODO.tasks = updatedTasks)

const updateTotalStatus = (taskId, afterStatus) => {
  const beforeStatus = findTask(taskId).status
  decreaseStatus(beforeStatus)
  increaseStatus(afterStatus)
}

const findTask = taskId => TODO.tasks.filter(task => task.id === taskId)[0]

const increaseStatus = statusType => {
  const prevStatus = TODO.totalStatus
  TODO.totalStatus = { ...prevStatus, [statusType]: prevStatus[statusType] + 1 }
}

const decreaseStatus = statusType => {
  const prevStatus = TODO.totalStatus
  TODO.totalStatus = { ...prevStatus, [statusType]: prevStatus[statusType] - 1 }
}

const logPresentStatus = ({ todo, doing, done }) => {
  console.log(`> 현재상태 :  todo:${todo}개, doing:${doing}개, done:${done}개`)
}

command('add$자바스크립트 공부하기')
command('add$html 공부하기')
command('add$react 공부하기')

command('update$2$doing')
command('update$3$done')

command('shOW     $doing')
// command('show$done')
