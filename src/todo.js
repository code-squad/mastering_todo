const getHHMM = () => {
  const date = new Date();
  const hours = (date.getHours() + 24) % 12 || 12;
  const minutes = date.getMinutes();

  return `${hours}시간${minutes}분`;
};

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

  const add = (() => {
    let id = 0;

    return (task) => {
      const [content] = [...task];

      tasks.push({
        id: id++,
        content: content.trim(),
        state: 'todo',
      });
      consoleTodo();
    };
  })();

  // TODO: 상태가 done일때 시간을 노출
  const show = function(state) {
    const [selectedState] = [...state];
    const stateType = ({ state }) => state === selectedState;
    const showLog = (totalLog, { id, content }, index, array) => {
      const commaAndSpace = array.length !== index + 1 ? ', ' : '';

      return totalLog + `"${id}, ${content}"` + commaAndSpace;
    };

    // TODO: log 방식 개선
    console.log(tasks.filter(stateType).reduce(showLog, ''));
  };

  const changeState = (task, newState) => {
    const isDoing = task.state !== 'doing' && newState === 'doing';
    const isDone = task.state === 'doing' && newState === 'done';

    // 상태변경
    return {
      ...task,
      state: newState,
      startHours: isDoing ? new Date() : 0,
      endHours: isDone ? new Date() : 0,
    };
  };

  const update = (() => {
    return (args) => {
      const [selectedId, newState] = args;
      const isFindTaskById = ({ id }) => id === Number(selectedId);

      tasks.find((task) => {
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
  const isReadyString = instruction.toLowerCase().trim();
  const [action, ...args] = isReadyString.split('$');
  const actionType = action.trim();

  todo[actionType](args);
}

command('add$자바스크립트 공부하기');
command('add$자바 공부하기');
command('add$C 공부하기');
command('shOW     $todo');
command('update$3$done');
