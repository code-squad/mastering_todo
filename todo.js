//할일을 추가할 수 있다. 
//할일이 추가되면 id값을 생성하고 결과를 알려준다. 
//* 상태를 3가지로 관리된다. todo, doing, done
//각 일(task)는 상태값을 가지고 있고, 그 상태값을 변경할 수 있다. 
//각 상태에 있는 task는 show 함수를 통해서 볼 수 있다. 
//명령어를 입력 시 command 함수를 사용해야 하고, '$'를 구분자로 사용해서 넣는다. 
//done의 경우 소요시간이 함께 표시된다. (소요시간은 doing 에서 done까지의 시간이다.)
//*구분자($)사이에 공백이 있다면 공백을 제거하고 실행되도록 한다. 
//*대/소문자 입력은 프로그램에서 소문자만 처리하도록 코드를 구현한다. 
//유효하지 않은 입력은 오류를 발생시킨다. 
//code 형태는 function으로 개발하고, 함수형의 특징을 많이 살리도록 노력한다.

// const readline = require('readline');

let workList = []

const strUtils = {
    str : "Add$ 테스트 ",
    strTrim : (str) => str.replace(/ /gi, ""), // 모든 공백을 제거, //1
    strToLower : (str) => str.toLowerCase(), //2
    strSplit : (str) => str.split("$"), //3
}
function getStatus(status){
    let result = 0
    if(status.indexOf("doing") != -1) result = 1
    else if(status.indexOf("done") != -1) result = 2
    return result
}
function genWorkObj(strComm){
    let workObj = {
        id: workList.length+1,
        status: getStatus(strComm[0]), //0> todo, 1>doing, 2>done
        workContents: strComm[1]
    }
    workList.push(workObj);
    return workObj;
}
function getSelectedStatusTaskList(strComm){
    const status = getStatus(strComm[1])
    return workList.reduce(function (accumulator, currentValue, currentIdx, array){
        if(currentValue.status !== status){
            array.pop(currentValue)
        }
        return array;
      },0);
}
function getCurrentWorkListStatus(){
    return workList.map(function(work){
        let workListStatus = [0, 0, 0]
        workListStatus[work.status]++
        return workListStatus
    })   
}

function updateTask(strComm){
    workList.forEach(work => {
        if(work.id == strComm[1]){
            work.status = getStatus(strComm[2]) 
        } 
    })  
    printCurrentStatus()
}

var addTask = (strComm) => printAddTask(genWorkObj(strComm))
var showTask = (strComm) => printShowTaskStatus(getSelectedStatusTaskList(strComm))

function command(str){
    let strComm = strUtils.strSplit(strUtils.strToLower(strUtils.strTrim(str)))
   
    if(strComm[0] === "add") addTask(strComm)
    else if(strComm[0] === "update") updateTask(strComm)
    else if(strComm[0] === "show") showTask(strComm)
   // else showErroMsg();

}


function printAddTask(workObj){
    console.log("id: " + workObj.id + ", " + workObj.workContents + " 항목이 새로 추가됐습니다.")  
    printCurrentStatus()
}

function printCurrentStatus(){
    var currentStatus = getCurrentWorkListStatus()
    return console.log("현재상태 : todo: " + currentStatus[0][0] + "개, doing: " + currentStatus[0][1] + "개, done: " + currentStatus[0][2] +"개");
}

function printShowTaskStatus(selectedTaskList){
    if(selectedTaskList.length === 0){
        console.log("없음")
    }else{
        for(let selectedTask of selectedTaskList)
            console.log("\'"+ selectedTask.id + ", " + selectedTask.workContents + "\'")
    } 
}

command("Add $ test")
command(" SHOW $ toDo")
command("update $1$ doing")