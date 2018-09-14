let toDoIndex = 1;

const toDoList = {
  todo: [],
  doing: [],
  done: []
}

const methods = {
  /**
   * 
   * @param {String} state : 추가하고 싶은 할 일 이름
   */
  add(state) {
    toDoList.todo.push({toDoIndex, state});
    console.log(`id: ${toDoIndex++}, ${state} 항목이 새로 추가되었습니다.`);
    return 'add'
  },
  /**
   * 
   * @param {String} state : 출력하고 싶은 상태 
   */
  show(state) {
    toDoList[state].forEach((value) => {
      console.log(`${state}: ${value.toDoIndex}. ${value.state}`)
      return 'show'
    })
  },
  /**
   * 
   * @param {String} id : 할 일의 ID 값
   * @param {String} state : ID를 옮길 상태 장소
   */
  update(id, state) {
    let job;

    Object.keys(toDoList).forEach(unit => {
        toDoList[unit].some((item, index) => {
          if (item.toDoIndex === parseInt(id)) {
            job = item;
            delete toDoList[unit][index];
          }
        })
        // delete 해서 undefined가 된 값을 제외하고 반환 
        toDoList[unit] = toDoList[unit].filter(x => x);
    })

    toDoList[state].push(job);
  
    console.log(`현재상태 : todo:${toDoList['todo'].length}개, doing:${toDoList['doing'].length}개, done:${toDoList['done'].length}개`);
    return 'update';
  }
};

/**
 * 
 * @param {String} parseCommand : 커맨드 
 */
const executeCommand = (parseCommand) => {
  const method = parseCommand[0];
  const state = parseCommand.length === 2 ? parseCommand[1] : parseCommand[2];
  const id = parseCommand.length === 3 ? parseCommand[1] : '';

  switch(method) {
    case 'add': methods[method](state); break;
    case 'show': methods[method](state); break;
    case 'update': methods[method](id, state); break;
  }
}

const getParsedCommand = (commandText) => commandText.split('$').map((value) => value.toString().toLowerCase().trim());

/**
 * 
 * @param {*} methods : 실행시키고 싶은 함수들
 */
const commandPipe = (...methods) => (args) => methods.reduce((arg, nextFn) => nextFn(arg), args);
const command = (commandText) => {
  commandPipe(
    getParsedCommand,
    executeCommand
  )(commandText);
}

command('add$ 게임 만들기');
command('add$ 투두리스트 만들기');
command('show$ todo');
command('Update$1$done');
command('show$ done');
command('Update$2$done');
command('show$2$done');