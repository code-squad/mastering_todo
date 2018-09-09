const getHHMM = () => {
  const date = new Date();
  const hours = (date.getHours() + 24) % 12 || 12;
  const minutes = date.getMinutes();

  return `${hours}시간${minutes}분`;
};

const todo = (function() {
  const tasks = [];

  const printTodo = function() {
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
        id: ++id,
        content: content.trim(),
        state: 'todo',
      });
      printTodo();
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

    return tasks.filter(stateType).reduce(showLog, '');
  };

  // TODO: 상태가 doing으로 변경될때 시간 기억
  const update = (() => {
    return (args) => {
      const [index, state] = args;

      tasks.find((task) => {
        if (task.id === Number(index)) {
          task.state = state;
        }
      });
      printTodo();
    };
  })();

  return {
    add,
    tasks,
    show,
    update,
  };
})();

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
