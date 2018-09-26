/********************
 * TODOLIST 만들기
 ********************
 *  [requirements]
 *  - 할일을 추가할 수 있다.
 *  - 할일이 추가되면 id 값을 생성하고 결과를 알려준다.
 *  - 상태는 3가지로 관리된다. todo, doing, done.
 *  - 각 일(task)는 상태값을 가지고 있고, 그 상태값을 변경할 수 있다.
 *  - 각 상태에 있는 task는 show함수를 통해서 볼 수 있다.
 *  - 명령어를 입력시 command함수를 사용해야하고, '$'를 구분자로 사용해서 넣는다.
 *  - done의 경우 소요시간이 함께 표시된다 (소요시간은 doing에서 done까지의 시간이다)
 *  - 구분자($) 사이에 공백이 있다면 공백을 제거하고 실행되도록 한다.
 *  - 대/소문자입력은 프로그램에서는 소문자만 처리하도록 코드를 구현한다. (대문자는 소문자로 변경)
 *  - 유효하지 않은 입력은 오류를 발생시킨다.
 *  - code 형태는 function으로 개발하고, 함수형의 특징을 많이 살리도록 노력한다.
 */
import * as util from './utils.js';

const data = {
  todos: [],
  currentId: 0,
  status: ['todo', 'doing', 'done']
}

// 명령어 text의 공백, 소문자 등을 정라히는 함수
const arrangeCommand = userCommand => {
  return userCommand.map((item) => {
    return arrangeText(item);
  });
}

// 입력된 command의 싱태를 실행하는 함수
const runCommand = userCommand => {
  if (userCommand.includes('add')) {
    add(userCommand);
  } else if (userCommand.includes('show')) {
    show(userCommand);
  } else if (userCommand.includes('update')) {
    update(userCommand);
  } else {
    console.log('유효한 명령을 입력하세요.');
  }
}

// todolist의 todo를 추가하는 함수
// 추가된 항목을 출력하고, 현재 상태를 출력
const add = (userCommand) => {
  const [type, task] = userCommand;
  const newTodos = [
    ...data.todos,
    {
      id: data.currentId,
      status: 'todo',
      task: task,
      startAt: null,
      endAt: null,
    }
  ];
  data.todos = newTodos;
  console.log(`id: ${data.currentId}, "${task}" 항목이 추가되었습니다.`);
  printCurrentStatus();
  data.currentId++;
}

const calcTime = (todo) => {
  const differenceHour = todo.endAt.getHours() - todo.startAt.getHours();
  const differenceMinutes = todo.endAt.getMinutes() - todo.startAt.getMinutes();
  return `${differenceHour}시간 ${differenceMinutes}분`
}

// 출력을 원하는 상태의 id와 task를 출력하는 함수
const show = (userCommand) => {
  const [type, status] = userCommand;
  const todos = data.todos.reduce((accumulator, value) => {
    if (status !== 'done' && value.status === status) {
      accumulator.push(`'${value.id}, ${value.task}'`);
    } else if (status === 'done' && value.status === status) {
      accumulator.push(`'${value.id}, ${value.task}', ${calcTime(value)}`);
    }
    return accumulator;
  }, []);
  if (todos.length) {
    console.log(todos.join(", "));
  } else {
    console.log(`${status} 상태의 작업이 없습니다.`);
  }
}

// task의 상태를 업데이트하는 함수
// doing의 경우 시작 시간 추가
// done의 경우 끝난 시간 추가
const update = (userCommand) => {
  const [type, id, status] = userCommand;
  const index = data.todos.findIndex(item => item.id === Number(id));
  if (index >= 0) {
    data.todos[index].status = status;
    if (status === 'doing') {
      data.todos[index].startAt = new Date();
    } else if (status === 'done') {
      data.todos[index].endAt = new Date();
    }
  } else {
    console.log('유효한 명령을 입력해주세요.');
  }
  printCurrentStatus();
}

// todolist의 현재상태를 출력하는 함수
const printCurrentStatus = () => {
  const currentStatus = [];
  data.status.forEach((status) => {
    const task = data.todos.filter(item => item.status === status);
    currentStatus.push(`${status}: ${task.length}개`);
  })
  console.log('현재상태 :', currentStatus.join(", "));
}

const command = util.pipe(
  util.split,
  arrangeCommand,
  runCommand,
)

const arrangeText = util.pipe(
  util.trim,
  util.toLowerCase
)

command("add$자바스크립트 공부하기");
command("shOW     $todo");
command("update$0$doing");
command("shOW     $doing");
command("update$0$done");
command("show$done");
