'use strict';

const TODO = 'todo';
const DOING = 'doing';
const DONE = 'done';

const tasks = [];
const ids = [];
const generateId = () => {
    return ids.push(null);
};

function Task(status, contents) {
    this.status = status;
    this.contents = contents;
    const time = {
        todo: new Date(),
        doing: null,
        done: null
    };
};

const command = (commandStr) => {
    const printNowStatus = () => {
        const status = tasks.reduce((sum, cur) => {
            sum[cur.task.status]++;
            return sum;
        }, {
            todo: 0,
            doing: 0,
            done: 0
        });

        console.log('현재 상태: todo: ', status.todo, ', doing: ', status.doing, ', done: ', status.done, '\n');
    };

    const [method, param1, param2] = commandStr.replace(/\s/g,'').toLowerCase().split('$');
    switch(method) {
        case 'add':
            const id = generateId();
            tasks.push({
                id: id,
                task: new Task(TODO, param1)
            });
            
            console.log('id:', id, '"' + param1 + '" 항목이 새로 추가됐습니다.');
            printNowStatus();
        break;
    }
};


command('Add $냐옹이는 냐옹냐옹');
command('A dD $ 헬로헬로!!');

