const STATUS = {
  TODO: 'todo',
  DOING: 'doing',
  DONE: 'done'
}

const TODO = {
  tasks: []
}
function command(orderSentence) {
  const [command, arg1, arg2] = refineSentence(orderSentence)
  switch (command) {
    case 'add':
      add((taskTitle = arg1))
      break
    case 'show':
      show((status = arg1))
      break
    case 'update':
      update((taskId = Number(arg1)), (status = arg2))
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
  forEachPipe(
    setTask,
    logAddResult,
  )(newTask)
  
  showPresentStatus()
}

const forEachPipe = (...functions) => obj => functions.forEach(func => func(obj))

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
  const todos = TODO.tasks
  compose( 
    setTodo, 
    findTodo, 
    copyTodos
  )({todos, taskId, statusType})

  showPresentStatus()
}

const compose = (...funcs) => param => funcs.reduceRight((acc,func) => func(acc), param)

const copyTodos = ({todos, taskId, statusType}) => {
  const copiedTodos = JSON.parse(JSON.stringify(todos))
  return {copiedTodos, taskId, statusType}
}
const findTodo = ({copiedTodos, taskId, statusType}) => {
  copiedTodos.find(task => task.id === taskId).status = statusType
  return copiedTodos
}
const setTodo = (copiedTodos) => {
  TODO.tasks = copiedTodos
}

function showPresentStatus () {
  const presentStatus = TODO.tasks.reduce(countStatus, { todo: 0,doing: 0,done: 0 })
  logPresentStatus(presentStatus)
}

const countStatus = (statusObj, task) => {
  statusObj[task.status] += 1
  return statusObj
}

const logPresentStatus = ({ todo, doing, done }) => {
  console.log(`> 현재상태 :  todo:${todo}개, doing:${doing}개, done:${done}개`)
}

command('add$자바스크립트 공부하기')
command('add$html 공부하기')
command('add$react 공부하기')

command('update$2$doing')
// command('update$3$done')

// command('shOW     $done')
// command('show$done')
