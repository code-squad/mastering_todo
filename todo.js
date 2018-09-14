// 할일을 추가할 수 있다.  =>  add()
// 할일이 추가되면 id 값을 생성하고 결과를 알려준다.
// 상태는 3가지로 관리된다. todo, doing, done.
// 각 일(task)는 상태값을 가지고 있고, 그 상태값을 변경할 수 있다.
// 각 상태에 있는 task는 show함수를 통해서 볼 수 있다. -> show()
// 명령어를 입력시 command함수를 사용해야하고, '$'를 구분자로 사용해서 넣는다. -> command()
// done의 경우 소요시간이 함께 표시된다 (소요시간은 doing에서 done까지의 시간이다) -> .....????? done - doing
// 구분자($) 사이에 공백이 있다면 공백을 제거하고 실행되도록 한다. // test case...?
// 대/소문자입력은 프로그램에서는 소문자만 처리하도록 코드를 구현한다. (대문자는 소문자로 변경) -> lowerCase
// 유효하지 않은 입력은 오류를 발생시킨다. -> 예외 처리
// code 형태는 function으로 개발하고, 함수형의 특징을 많이 살리도록 노력한다.

// command("add$자바스크립트 공부하기");
// > id: 5,  "자바스크립트 공부하기" 항목이 새로 추가됐습니다.  //추가된 결과 메시지를 출력
// > 현재상태 :  todo:1개, doing:2개, done:2개

// command("shOW     $doing");   //공백도 제거되고, 대문자가 섞여있어도 잘 동작되게 한다.
// > "1, 그래픽스공부", "4, 블로그쓰기"  //id값과 함께 task제목이 출력된다.

// command("update$3$done"); -> id가 3인 task를 done으로 한다. (그럼, 모든 task를 보여주는 것도 만들자.)
// > 현재상태 :  todo:1개, doing:1개, done:3개  //변경된 모든 상태가 노출.

// command("show$done"); ->
// > '1, iOS공부하기, 3시간10분',  '5, 자바스크립트공부하기, 9시간31분',  '7, 주간회의 1시간40분'  // task가 doing이 될 때가 시작시간이고, task가 done이 되면 끝나는 시간이다.
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
  tasks: [
    { id: 1, taskTitle: '자바스크립트 공부', status: 'doing', time: 0 },
    { id: 2, taskTitle: '자바 공부', status: 'todo', time: 0 },
    { id: 3, taskTitle: 'C 공부', status: 'todo', time: 0 },
    { id: 4, taskTitle: 'python 공부', status: 'todo', time: 0 },
    { id: 5, taskTitle: '리액트 공부', status: 'doing', time: 0 },
    { id: 6, taskTitle: 'Vue 공부', status: 'done', time: 0 },
    { id: 7, taskTitle: 'mongoDB 공부', status: 'todo', time: 0 } //startTime, endTime해줄까...?
  ]
}
const command = orderSentence => {
  const [order, firstSentence] = orderSentence.split('$')
  if (order === 'add') add((taskTitle = firstSentence))
  if (order === 'show') show((status = firstSentence))
}

const add = taskTitle => {
  console.log('taskTitle', taskTitle)
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

const increaseStatus = statusType => {
  const prevStatus = TODO.totalStatus
  switch (statusType) {
    case STATUS.TODO:
      TODO.totalStatus = { ...prevStatus, todo: prevStatus.todo + 1 }
  }
}

const logAddResult = ({ id, taskTitle }) => {
  console.log(`> id: ${id}, "${taskTitle}" 항목이 새로 추가됐습니다.`)
}

const logPresentStatus = ({ todo, doing, done }) => {
  console.log(`> 현재상태 :  todo:${todo}개, doing:${doing}개, done:${done}개`)
}

const show = statusType => getTypeTask(statusType).forEach(task => logTask(task))

const getTypeTask = statusType => TODO.tasks.filter(task => task.status === statusType)

const logTask = ({ id, taskTitle }) => console.log(`> "${id}, ${taskTitle}"`)





// command('add$자바스크립트 공부하기')
// > id: 5,  "자바스크립트 공부하기" 항목이 새로 추가됐습니다.  //추가된 결과 메시지를 출력
// > 현재상태 :  todo:1개, doing:2개, done:2개

command('show$doing')
// command("shOW     $doing");   //공백도 제거되고, 대문자가 섞여있어도 잘 동작되게 한다.
// > "1, 그래픽스공부", "4, 블로그쓰기"  //id값과 함께 task제목이 출력된다.
