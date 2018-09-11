const TASK = require('./task.js');

const pipeline = (...functions) => args => functions.reduce((arg, nextFn) => nextFn(arg), args);

const extractValue = (regExp) => (index) => (str) => str.split(regExp)[index];
const toLowerCase = (str) => str.toLowerCase();
const trim = (str) => str.trim();
const extractCommand = pipeline(
  extractValue(TASK.SEPARATOR)(0),
  trim,
  toLowerCase,
);

const taskMap = new Map();
const executeCommand = (command, input) => {
  if(command === 'add') addTask(taskMap, input);
  else if(command === 'update') updateStatus(taskMap, input);
  else if(command === 'show') showTaskByStatus(taskMap, input);
}

const addTask = (taskMap, input) => {
  const remark = input.split(TASK.SEPARATOR)[1];

  const sequence = taskMap.size + 1;
  const taskObj = {
    taskId: sequence, 
    remark: remark, 
    status : TASK.STATUS.TODO,
    rgstDate: new Date()
  };
  taskMap.set(sequence, taskObj);
  
  showCurrentTaskList(taskMap);
}

const getTaskId = pipeline(
  extractValue(TASK.SEPARATOR)(1),
  Number
)

const matchStatus = (status) => {
  if(status === "" && status.length === 0) return;

  return status === "todo" ? 0 : status === "doing" ? 1 : 2
}
const getStatus = pipeline(
  extractValue(TASK.SEPARATOR)(1),
  matchStatus,
  Number
)

const updateStatus = (taskMap, input) => {
  const taskId = getTaskId(input);
  const status = getStatus(input);
  
  if(!taskMap.has(taskId)) return;

  const taskObj = taskMap.get(taskId);
  const newTaskObj = Object.assign({}, taskObj, {status: status});
  taskMap.set(taskId, newTaskObj);

  showCurrentTaskList(taskMap);
}

const showTaskByStatus = (taskMap, input) => {
  const status = getStatus(input);
  
  let result = '';
  for(let [key, value] of taskMap) {
    if(value.status === status) {
      result += `${value.taskId}, ${value.remark}  `;
    }
  }
  console.log(result);
}

const showCurrentTaskList = (taskMap) => {
  const taskCountList = [0, 0, 0];
  for(let [, value] of taskMap) {
    taskCountList[value.status]++;
  }

  console.log(`현재상태 : todo:${taskCountList[TASK.STATUS.TODO]}개,`
                      + ` doing:${taskCountList[TASK.STATUS.DOING]}개,` 
                      + ` done:${taskCountList[TASK.STATUS.DONE]}개`);
}

const inputCommand = () => {
  const input = "show  $done"
  if(input === '' && input.length === 0) return;
  
  const command = extractCommand(input);
  executeCommand(command, input);
}
inputCommand();



