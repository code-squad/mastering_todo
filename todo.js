'use strict';

const TODO = 'todo';
const DOING = 'doing';
const DONE = 'done';

let tasks = [];

let id = 1;
const generateId = () => {
    return id++;
};

// 시간이 얼마나 지났는지 구하기
const getTookDateTime = (startDateTime, endDateTime) => {
    const dateTimeDiff = endDateTime - startDateTime;
    
    const tookDateTime = [
        { dateTime: Math.floor(dateTimeDiff / 1000 / 60 / 60 / 24), divDesc: '일'},
        { dateTime: Math.floor(dateTimeDiff / 1000 / 60 / 60 % 24), divDesc: '시간'},
        { dateTime: Math.floor(dateTimeDiff / 1000 / 60 % 60), divDesc: '분'},
        { dateTime: Math.floor(dateTimeDiff / 1000 % 60), divDesc: '초'}
    ].filter((diffDateTime) => {
        return diffDateTime.dateTime > 0;
    }).map((diffDateTime) => {
        return diffDateTime.dateTime + diffDateTime.divDesc;
    }).join(' ') || '순삭!!';

    return tookDateTime;
};

// 현재 상태 정보 확인
const printNowStatus = (tasks) => {
    const status = tasks.reduce((sum, cur) => {
        sum[cur.status]++;
        return sum;
    }, {
            todo: 0,
            doing: 0,
            done: 0
        });

    console.log('현재 상태: todo: ', status.todo, ', doing: ', status.doing, ', done: ', status.done, '\n');
};

const command = (commandStr) => {
    const fns = {
        'add': (tasks, contents) => {
            tasks.push({
                id: generateId(),
                status: TODO,
                contents: contents,
                time: {
                    todo: new Date(),
                    doing: null,
                    done: null
                }
            });

            console.log('id:', id, '"' + param1 + '" 항목이 새로 추가됐습니다.');
            printNowStatus(tasks);

            return tasks;
        },

        'update': (tasks, id, status) => {
            const targetTask = tasks.filter((task) => {
                return task.id === Number(id);
            })[0];

            targetTask.status = status;
            targetTask.time[status] = new Date();

            if(status === DONE 
                && targetTask.time.doing === null) {
                    targetTask.time.doing = targetTask.time.todo;
                }

            printNowStatus(tasks);

            return tasks;
        },

        'show': (tasks, status) => {
            const targetTasks = tasks.filter((task) => {
                return task.status === status;
            }).reduce((results, task) => {
                const ccc = [task.id, task.contents];
                if(status === DONE) {
                    ccc.push(getTookDateTime(task.time.doing, task.time.done));
                }

                results.push(ccc.join(', '));
                return results;
            }, []).join(', ');

            console.log(targetTasks + '\n');

            return tasks;
        }
    }

    const [method, param1, param2] = commandStr.replace(/\s/g, '').toLowerCase().split('$');

    tasks = fns[method](tasks, param1, param2);
};


command('Add $냐옹이는 냐옹냐옹');
command('A dD $ 헬로헬로!!');

command("show$todo");

command('update$1$doing');

command("show$doing");

command("update$1$done");
command("update$2$done");
    
// 걸린 시간 테스트를 위한 1일 1시간 30분 27초+
tasks[0].time.done = new Date(new Date().getTime() + (1000 * 27) + (1000 * 60 * 90) + (1000 * 60 * 60 * 24));

// 27분 10초
tasks[1].time.done = new Date(new Date().getTime() + (1000 * 10) + (1000 * 60 * 27));

command("show$done");