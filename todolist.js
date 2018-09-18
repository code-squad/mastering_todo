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
const data = {
  separator: '$',
  todos: [],
  currentId: 0,
  status: ['todo', 'doing', 'done']
}

const pipe = (...functions) => args => functions.reduce((arg, nextFn) => nextFn(arg), args);

const split = text => text.split(data.separator);
const trim = text => text.trim();
const toLowerCase = text => text.toLowerCase();

// 명령어 text의 공백, 소문자 등을 정라히는 함수
const arrangeCommand = array => {
  return array.map((item) => {
    return arrangeText(item);
  });
}

// 입력된 command의 싱태를 실행하는 함수
const runCommand = array => {
  if (array.includes('add')) {
    add(array);
  } else if (array.includes('show')) {
    show(array);
  } else if (array.includes('update')) {
    update(array);
  } else {
    console.log('유효한 명령을 입력하세요.');
  }
}

// todolist의 todo를 추가하는 함수
// 추가된 항목을 출력하고, 현재 상태를 출력
const add = (array) => {
  const [type, task] = array;
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

// 출력을 원하는 상태의 id와 task를 출력하는 함수
const show = (array) => {
  const [type, status] = array;
  const todos = data.todos.reduce((accumulator, value) => {
    if (value.status === status) {
      accumulator.push(`'${value.id}, ${value.task}'`);
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
const update = (array) => {
  const [type, id, status] = array;
  const index = data.todos.findIndex(item => item.id === Number(id));
  if (index >= 0) {
    data.todos[index].status = status;
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

const command = pipe(
  split,
  arrangeCommand,
  runCommand,
)

const arrangeText = pipe(
  trim,
  toLowerCase
)

command("add$자바스크립트 공부하기");
command("shOW     $todo");
command("shOW     $doing");
command("update$0$done");
command("show$done");
