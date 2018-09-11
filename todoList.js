/**
  * 1. 할일
  * 1-1) 상태 : todo, doing, done
  * 
  * 2. command("명령어")
  * - 공백 제거되고, 대문자가 섞여 있어도 소문자로 변경하여 처리되도록 구현.
  * - 인자에 명령어가 넘어오면 $로 자른다.
  * 
  * 2-1) add
  * - command("add$할일");
  * - add일 경우 할일을 추가한다. 1번째 인덱스 값은 할일이다.
  * - $로 나뉜 0번째 인덱스 값은 소문자로 치환하고 공백을 제거한다.
  * - 할일 추가시 id값을 생성하고 결과를 알려준다. ( default status todo )
  * 
  * 2-2) update
  * - command("update$번호$상태")
  * - update일 경우 상태를 변경한다. 1번째 인덱스는 번호값 2번째 인덱스는 상태값
  * - doing 상태로 변경시 상태 변경시간을 저장하자. ( done 상태까지의 시간 계산 )
  * 
  * 2-3) show
  * - command("show$상태");
  * - show일 경우 상태별 출력을 한다. 1번째 인덱스는 상태값
  */
 
const pipe = (...functions) => args => functions.reduce((arg, nextFn) => nextFn(arg), args);
const extractCommand = pipe(
  (command) => command.split("$")[0],
  (command) => command.toLowerCase(),
  (command) => command.trim()
)(command);

const addTask = function() {

}

const updateStatus = function() {

}

const showTaskByStatus = function() {

}

const executeCommand = (command) => {
}

const inputCommand = () => {
  const input = "add  $codesquad FP 과제"
  const command = extractCommand(input);
  
}
