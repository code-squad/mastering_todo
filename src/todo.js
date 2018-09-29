const time = (function() {
  const convertMsKoFormat = (duration) => {
    const milliseconds = parseInt((duration % 1000) / 100),
      minutes = parseInt((duration / (1000 * 60)) % 60),
      hours = parseInt((duration / (1000 * 60 * 60)) % 24);

    return `${hours}시간${minutes}분`;
  };

  const getTotalHHMM = (time) => {
    const date = new Date(time);

    return convertMsKoFormat(date);
  };

  return {
    getTotalHHMM,
  };
})();

const todo = (function() {
  const tasks = [];

  const consoleTodo = function() {
    const { todo = 0, doing = 0, done = 0 } = tasks.reduce((obj, { state }) => {
      obj[state] = obj[state] || 0;
      obj[state]++;

      return obj;
    }, {});

    console.log(`현재상태 :  todo:${todo}개, doing:${doing}개, done:${done}개`);
  };

  // TODO: DELETE IIFE
  const add = (() => {
    let id = 0;

    return (task) => {
      const [content] = [...task];

      // TODO: convert immutable
      tasks.push({
        id: id++,
        content: content.trim(),
        state: 'todo',
      });
      consoleTodo();
    };
  })();

  const show = function(state) {
    const [selectedState] = [...state],
      stateType = ({ state }) => state === selectedState,
      bDone = 'done' === selectedState;

    const showLog = (totalLog, { id, content, startHours, endHours }, index, array) => {
      const commaAndSpace = array.length !== index + 1 ? ', ' : '',
        totalElapsedTime = bDone ? `, ${time.getTotalHHMM(endHours - startHours)}` : '';

      return totalLog + `"${id}, ${content}${totalElapsedTime}"` + commaAndSpace;
    };

    // TODO: log 방식 개선
    console.log(tasks.filter(stateType).reduce(showLog, ''));
  };

  const changeState = (task, newState) => {
    const bDoing = task.state !== 'doing' && newState === 'doing',
      bDone = task.state === 'doing' && newState === 'done';

    return {
      ...task,
      state: newState,
      startHours: bDoing ? new Date().getTime() : 0,
      endHours: bDone ? new Date().getTime() : 0,
    };
  };

  // TODO: DELETE IIFE
  const update = (() => {
    return (args) => {
      const [selectedId, newState] = args,
        isFindTaskById = ({ id }) => id === Number(selectedId);

      // TODO: get 메서드로 접근, set 메서드 활용
      tasks.forEach((task) => {
        if (isFindTaskById(task)) {
          const newTask = changeState(task, newState);
          tasks[task.id] = newTask;
        }
      });
      consoleTodo();
    };
  })();

  return {
    add,
    tasks,
    show,
    update,
  };
})();

// tasks에 접근할 수 있는 get & set method 필요
// 상수처리 필요
function command(instruction) {
  const isReadyString = instruction.toLowerCase().trim(),
    [action, ...args] = isReadyString.split('$'),
    actionType = action.trim();

  todo[actionType](args);
}

command('add$자바스크립트 공부하기');
command('add$자바 공부하기');
command('add$C 공부하기');
command('shOW     $todo');
command('update$3$done');
