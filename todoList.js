const TASK = require('./task.js');

const pipeline = (...functions) => args => functions.reduce((arg, nextFn) => nextFn(arg), args);

const extractValue = (regExp) => (index) => (str) => str.split(regExp)[index];
const toLowerCase = (str) => str.toLowerCase();
const trim = (str) => str.trim();

const taskMap = new Map();
const addTask = (taskMap, input) => {
  const remark = input.split(TASK.SEPARATOR)[TASK.INDEX.REMARK];

  const sequence = taskMap.size + 1;
  const taskObj = {
    taskId: sequence, 
    remark: remark, 
    status: TASK.STATUS.TODO,
    rgstDate: new Date()
  };
  taskMap.set(sequence, taskObj);
  
  showCurrentTaskList(taskMap);
}

const matchStatus = (status) => {
  return (status === "todo" ? TASK.STATUS.TODO : status === "doing" 
                            ? TASK.STATUS.DOING : TASK.STATUS.DONE);
}

const getStatus = pipeline(
  extractValue(TASK.SEPARATOR)(TASK.INDEX.STATUS.SHOW),
  matchStatus,
  Number
)

const getTaskId = pipeline(
  extractValue(TASK.SEPARATOR)(1),
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
  
  let result = '상태 조회 결과가 없습니다.';
  for(let [key, value] of taskMap) {
    if(value.status === status) result += `${value.taskId}, ${value.remark}  `;
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

const extractCommand = pipeline(
  extractValue(TASK.SEPARATOR)(TASK.INDEX.COMMAND),
  trim,
  toLowerCase,
);

const executeCommand = (input) => (command) => {
  if(command === 'add') addTask(taskMap, input);
  else if(command === 'update') updateStatus(taskMap, input);
  else if(command === 'show') showTaskByStatus(taskMap, input);
}
const input = "add  $don234234e";
const executeTodoList = pipeline(
  extractValue(TASK.SEPARATOR)(TASK.INDEX.COMMAND),
  trim,
  toLowerCase,
  executeCommand(input)
)(input);
  
executeTodoList();



