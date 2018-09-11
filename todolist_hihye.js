let todoList = [];
let todoCount = [];
let doingCount = [];
let doneCount = [];

function getStatus(todoList){
    todoList.forEach(function(v){
        todoCount = todoList.filter(v => v.status === "todo");
        doingCount = todoList.filter(v => v.status === "doing");
        doneCount = todoList.filter(v =>  v.status === "done");
    });
}

function add(inputTask){
    todoList.push({id: (todoList.length)+1, task: inputTask, status: "todo"});
    getStatus(todoList);
    console.log("id: " + todoList[todoList.length-1].id + ", " + todoList[todoList.length-1].task + " 항목이 새로 추가됐습니다.");
    console.log("현재상태 : " + "todo:" + todoCount.length + "개, doing:" + doingCount.length + "개, done:" + doneCount.length + "개");
}

function show(){
    todoCount.forEach((v) => console.log("show: todo 상태인 id: " + v.id + ", " + v.task));
    doingCount.forEach((v) => console.log("show: doing 상태인 id: " + v.id + ", " + v.task));
    doneCount.forEach((v) => console.log("show: done 상태인 id: " + v.id + ", " + v.task));
}

function update(updateId, newStatus){
    todoList.forEach(function(v){ 
        if(v.id == updateId) v.status = newStatus });
    getStatus(todoList);
    console.log("update: 현재상태 : " + "todo:" + todoCount.length + "개, doing:" + doingCount.length + "개, done:" + doneCount.length + "개");
}

function command(inputChr){
    let inputTask = inputChr.replace(/[\t\s]/g,'').split("$");
    let fn = inputTask[0];
    if(fn == "add") fn = add(inputTask[1]);
    else if(fn == "show") fn = show(inputTask[1]);
    else if(fn == "update") fn = update(inputTask[1], inputTask[2]);

    return function () {
        return fn;
    }
}

command("add$첫번째 todo");
command("add$ 두번째 todo");
command("add $세번째 todo");

command("show$todo");

command("update$3$done");
command("update$2$doing");