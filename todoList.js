const TASK = require('./task.js');

const pipeline = (...functions) => args => functions.reduce((arg, nextFn) => nextFn(arg), args);

const getCommand = (index) => (arr) => arr[index];
const split = (regExp) => (str) => str.split(regExp);
const toLowerCase = (str) => str.toLowerCase();
const trim = (str) => str.trim();

const taskMap = new Map();
const executeCommand = (commandList) => {
  const command = extractCommand(commandList);
  
  if(command === 'add') addTask(taskMap, commandList);
  else if(command === 'update') updateStatus(taskMap, commandList);
  else if(command === 'show') showSelectTask(taskMap, commandList);
  else console.log('명령어를 잘못 입력하셨습니다.');
}

const extractCommand = pipeline(
  getCommand(TASK.INDEX.COMMAND),
  trim,
  toLowerCase
)

const addTask = (taskMap, commandList) => {
  const sequence = taskMap.size + 1;
  const taskObj = {
    taskId: sequence, 
    remark: commandList[TASK.INDEX.REMARK], 
    status: TASK.STATUS.TODO,
    rgstDate: new Date()
  };
  taskMap.set(sequence, taskObj);
  
  showCurrentTaskList(taskMap);
}

const updateStatus = (taskMap, commandList) => {
  try {
    const taskId = extractTaskId(commandList);
    if(!taskMap.has(taskId)) return;

    const status = getTaskStatus(commandList[TASK.INDEX.UPDATE]);
    const taskObj = taskMap.get(taskId);
    const newTaskObj = Object.assign({}, taskObj, {
      status: status, 
      updtDate: new Date()
    });
    taskMap.set(taskId, newTaskObj);
  
    showCurrentTaskList(taskMap);
  } catch (error) {
  }
}

const getTaskId = (arr) => arr[TASK.INDEX.TASKID];
const validateTaskId = (taskId) => {
  if(!/^[0-9]+$/.test(taskId)) {
    console.log("잘못된 일정 ID 값을 입력하였습니다.");
    throw new Error();
  }
  return taskId;
}
const extractTaskId = pipeline(
  getTaskId,
  validateTaskId,
  Number
);

const matchStatus = (status) => {
  if(status === "todo") return TASK.STATUS.TODO;
  else if(status === "doing") return TASK.STATUS.DOING;
  else if(status === "done") return TASK.STATUS.DONE;
  else return -1;
}

const validateStatus = (status) => {
  if(!/^((todo)|(doing)|(done))$/i.test(status)) {
    console.log("입력한 상태값이 올바르지 않습니다.");
    throw new Error();
  }
  return status;
}

const getTaskStatus = pipeline(
  trim,
  validateStatus,
  matchStatus,
  Number,
);

const showSelectTask = (taskMap, commandList) => {
  if(taskMap.size === 0) {
    console.log("상태 조회 결과가 없습니다.");
    return;
  }
  try {
    const status = getTaskStatus(commandList[TASK.INDEX.SHOW]);
    let resultList = [];
    for(let [key, value] of taskMap) {
      if(value.status === status)
        resultList = [` ${value.taskId}, ${value.remark}`, ...resultList];
    }
    console.log(resultList.toString());
  } catch (error) {
  }
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

const command = pipeline(
  split(TASK.SEPARATOR),
  executeCommand
);

console.log(command);
command('aDD   $codesquad javascript!!');
command('aDD   $codesquad javascript!!');
command('aDD   $codesquad javascript!!');
command('update   $1$aasdfdoing');
command('update   $3$done');
command('update   $4$doing');
command('show   $doing');




