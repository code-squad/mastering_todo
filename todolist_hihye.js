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
    console.log("현재상태 : " + "todo:" + todoCount.length + "개, doing:" + doingCount.length + "개, done:" + doneCount.length + "개");
}

function add(inputTask){
    todoList.push({id: (todoList.length)+1, task: inputTask, status: "todo"});
    console.log("id: " + todoList[todoList.length-1].id + ", " + todoList[todoList.length-1].task + " 항목이 새로 추가됐습니다.");
    getStatus(todoList);
}

function show(inputTask){
    switch(inputTask){
        case "todo":
            todoCount.forEach((v) => console.log("show: todo 상태인 id: " + v.id + ", " + v.task));
            break;
        case "doing":
            doingCount.forEach((v) => console.log("show: doing 상태인 id: " + v.id + ", " + v.task));
            break;
        case "done":
            doneCount.forEach((v) => console.log("show: done 상태인 id: " + v.id + ", " + v.task));
            break;
        default:
            doneCount.forEach((v) => console.log("상태를 잘못 입력하셨습니다."));
            break;
    }
}

function update(updateId, newStatus){
    todoList.forEach(function(v){ 
        if(v.id == updateId) v.status = newStatus });
    getStatus(todoList);
}

function command(inputChr){
    let inputTask = inputChr.toLowerCase().replace(/[\t\s]/g,'').split("$");
    let fn = inputTask[0];

    if(fn == "add") return fn = add(inputTask[1]);
    else if(fn == "show") return fn = show(inputTask[1]);
    else if(fn == "update") return fn = update(inputTask[1], inputTask[2]);
}

command("ADD$첫번째 todo");
command("add$ 두번째 Todo");
command("add $세번째 todo");

command("show $ todo");

command("update $ 3 $ done");
command("update $ 2 $ doing");

command("show $ done");