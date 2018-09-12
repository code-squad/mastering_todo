const TASK = require('./task.js');

const pipeline = (...functions) => args => functions.reduce((arg, nextFn) => nextFn(arg), args);

const extractValue = (regExp) => (index) => (str) => str.split(regExp)[index];
const toLowerCase = (str) => str.toLowerCase();
const trim = (str) => str.trim();
const matchStatus = (status) => {
  if(status === "todo") return TASK.STATUS.TODO;
  else if(status === "doing") return TASK.STATUS.DOING;
  else if(status === "done") return TASK.STATUS.DONE;
  else return -1;
}
const validateStatus = (status) => {
  if(status == -1) {
    console.log("입력한 상태값이 올바르지 않습니다.");
    throw new Error();
  }
  return status;
}

const getTaskId = pipeline(
  extractValue(TASK.SEPARATOR)(TASK.INDEX.TASKID),
  Number
);

const getTaskStatus = pipeline(
  trim,
  toLowerCase,
  matchStatus,
  validateStatus,
  Number,
);

const taskMap = new Map();
const addTask = (taskMap, input) => {
  const remark = extractValue(TASK.SEPARATOR)(TASK.INDEX.REMARK)(input);

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

const updateStatus = (taskMap, input) => {
  const taskId = getTaskId(input);
  if(!taskMap.has(taskId)) return;

  try {
    const tempStatus = extractValue(TASK.SEPARATOR)(TASK.INDEX.UPDATE)(input);
    const status = getTaskStatus(tempStatus);
    const taskObj = taskMap.get(taskId);
    const newTaskObj = Object.assign({}, taskObj, {status: status, updtDate: new Date()});
    taskMap.set(taskId, newTaskObj);
  
    showCurrentTaskList(taskMap);
  } catch (error) {
  }
}

const showSelectTask = (taskMap, input) => {
  if(taskMap.size === 0) {
    console.log("상태 조회 결과가 없습니다.");
    return;
  }
  try {
    const tempStatus = extractValue(TASK.SEPARATOR)(TASK.INDEX.SHOW)(input);
    const status = getTaskStatus(tempStatus);
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

const executeCommand = (command) => {
  if(command === 'add') addTask(taskMap, input);
  else if(command === 'update') updateStatus(taskMap, input);
  else if(command === 'show') showSelectTask(taskMap, input);
  else console.log('명령어를 잘못 입력하셨습니다.');
}

const input = 'ADD  $codesquad javascript!!';
const startTodoList = pipeline(
  extractValue(TASK.SEPARATOR)(TASK.INDEX.COMMAND),
  trim,
  toLowerCase,
  executeCommand
);

startTodoList(input);



