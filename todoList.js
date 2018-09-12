const TASK = require('./task.js');

const pipeline = (...functions) => args => functions.reduce((arg, nextFn) => nextFn(arg), args);

const extractIndex = (index) => (arr) => arr[index];
const split = (regExp) => (str) => str.split(regExp);
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



const taskMap = new Map();
const executeCommand = (commandList) => {
  const command = extractCommand(commandList);
  
  if(command === 'add') addTask(taskMap, commandList);
  else if(command === 'update') updateStatus(taskMap, commandList);
  else if(command === 'show') showSelectTask(taskMap, commandList);
  else console.log('명령어를 잘못 입력하셨습니다.');
}

const extractCommand = pipeline(
  extractIndex(TASK.INDEX.COMMAND),
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
  const taskId = getTaskId(commandList);
  if(!taskMap.has(taskId)) return;

  try {
    const temp = commandList[TASK.INDEX.UPDATE];
    const status = getTaskStatus(temp);
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

const getTaskId = pipeline(
  (args) => args[TASK.INDEX.TASKID],
  Number
);

const getTaskStatus = pipeline(
  trim,
  toLowerCase,
  matchStatus,
  validateStatus,
  Number,
);

const showSelectTask = (taskMap, commandList) => {
  if(taskMap.size === 0) {
    console.log("상태 조회 결과가 없습니다.");
    return;
  }
  try {
    const temp = commandList[TASK.INDEX.SHOW];
    const status = getTaskStatus(temp);
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
command('aDD   $test1!!');
command('aDD   $할일...');
command('aDD   $놀기!!');
command('aDD   $ㅁㄴㅇㄻㄴㅇㄻㄴㅇㄹ javascript!!');
command('aDD   $codesquad jaㅁㄴㅇㄻㄴㅇㄹ!!');
command('show   $todo');

command('update   $3$doing');
command('update   $4$doing');
command('update   $5$doing');



