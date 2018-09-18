'use strict';

const TODO = 'todo';
const DOING = 'doing';
const DONE = 'done';

const tasks = [];
const ids = [];
const generateId = () => {
    return ids.push(null);
};

function Task(id, status, contents) {
    this.id = id;
    this.status = status;
    this.contents = contents;

    this.time = {
        'todo': new Date(),
        'doing': null,
        'done': null,
    };

    this.getTookDateTime = () => {
        if(this.status !== DONE) {
            throw '아직 종료되지 않은 작업니다.';
        }

        const timeDiff = this.time.done - this.time.doing;

        return [
            { dateTime: Math.floor(timeDiff / 1000 / 60 / 60 / 24), divDesc: '일'},
            { dateTime: Math.floor(timeDiff / 1000 / 60 / 60 % 24), divDesc: '시간'},
            { dateTime: Math.floor(timeDiff / 1000 / 60 % 60), divDesc: '분'},
            { dateTime: Math.floor(timeDiff / 1000 % 60), divDesc: '초'}
        ].filter((diffTime) => {
            return diffTime.dateTime > 0;
        }).map((diffTime) => {
            return diffTime.dateTime + diffTime.divDesc;
        }).join(' ') || '순삭!!';
    };

    this.changeStatus = (status) => {
        if(!this.isValidTodoStatus(status)) {
            throw status + '는 유요한 Todo List 상태 정보가 아닙니다.!!';
        }

        // doing status없이 done상태로 벼경시 doing time은 todo time으로 변경
        if(status === DONE && !this.time.doing) {
            this.time.doing = this.time.todo;
        }

        this.status = status;
        this.time[status] = new Date();
    };

    this.isValidTodoStatus = (status) => {
        return [TODO, DOING, DONE].includes(status);
    };
};

const command = (commandStr) => {
    const printNowStatus = () => {
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

    const fns = {
        'add': (contents) => {
            const id = generateId();
            tasks.push(new Task(id, TODO, contents));

            console.log('id:', id, '"' + param1 + '" 항목이 새로 추가됐습니다.');
            printNowStatus();
        },

        'update': (id, status) => {
            const targetTask = tasks.filter((task) => {
                return task.id === Number(id);
            })[0];

            targetTask.changeStatus(status);
            printNowStatus();
        },

        'show': (status) => {
            const targetTasks = tasks.filter((task) => {
                return task.status === status;
            }).reduce((results, task) => {
                const ccc = [task.id, task.contents];
                if(status === DONE) {
                    ccc.push(task.getTookDateTime());
                }

                results.push(ccc.join(', '));
                return results;
            }, []).join(', ');

            console.log(targetTasks + '\n');
        }
    }

    const [method, param1, param2] = commandStr.replace(/\s/g, '').toLowerCase().split('$');

    fns[method](param1, param2);
};


command('Add $냐옹이는 냐옹냐옹');
command('A dD $ 헬로헬로!!');

command("show$todo");

command('update$1$doing');

command("show$doing");

command("update$1$done");
command("update$2$done");
    
// 걸린 시간 테스트를 위한 1일 1시간 30분 27초+
tasks[0].time.done = new Date(new Date().getTime() +(1000 * 27) + (1000 * 60 * 90) + (1000 * 60 * 60 * 24));
// 27분 10초
tasks[1].time.done = new Date(new Date().getTime() + (1000 * 10) + (1000 * 60 * 27));

command("show$done");