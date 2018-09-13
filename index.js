// const pipe = function( ...functions) {
//     return function ( args) {
//         return fctions.reduce( 
//             function(arg , nextFn) { 
//                 return nextFn(arg)
//             }
//             , args);
//     };
// }
const pipe =(...functions) => args => functions.reduce((arg, nextFn) => nextFn(arg), args);
const trim = function(arg){ return arg.trim();};//공백제거
const strtoupper = function( string) { return string.toString().toLowerCase();}//소문자변환
const explode = function( string , separator="$") { return string.split( separator);}//문자열자르기

const todo = {
    list : [],//todo 입력 배열
    statusTotal : {//todo 상태별 통계
        todo : 0,
        doing : 0,
        done : 0
    }
};

//출력
function logs( arr) {
    arr.forEach((str)=>console.log( str));
}
//소요시간계산
function getDiffTime( start_date,end_date){
    let diffseconds = 0;
    let tostring = Object.prototype.toString;
    if( tostring.call( start_date) === "[object Date]" && tostring.call( start_date) === "[object Date]" )
        diffseconds = ( end_date - start_date) / 1000;

    return function ( convert){
        switch ( convert) {
        case '시분' :
            let hours = Math.floor((diffseconds % 86400) / 3600); // hours
            let minute = Math.round(((diffseconds % 86400) % 3600) / 60); // minutes
            return hours + '시간 ' + minute + '분';
        default :
        break;
        }
        return diffseconds;
    }
}

//todo시간설정
function setTimeTodo( target , date = new Date()){
    if( !target.hasOwnProperty( target.status+'Date')) return;    
    target[ target.status+'Date'] = date;
}

//전체 상태
function nowStatus( statuses , beforeText="현재상태 : "){
    let result = '';
    for( let k in statuses) {
        result += (result!==''?', ':'')+ `${k}:${statuses[k]}개`;
    }
    return beforeText + result;
}

function runCommand ( cmd){
    const log=[];
    switch ( cmd[0]) {
    case 'update':
        let target = todo['list'][ cmd[1] -1 ];
        if( !target) return;

        let beforeStatus = target.status;
        target.status = cmd[2];
        setTimeTodo( target );
        if( target.status !== beforeStatus) {
            todo.statusTotal[ beforeStatus]--;
            todo.statusTotal[ target.status]++;
            if( target.status==='done')
                target.time= getDiffTime( target.doingDate , target.doneDate)('시분');
        }

        log.push( nowStatus( todo.statusTotal));

        break;
    case 'add' :
        let added = { status : 'todo',id : todo['list'].length+1 , todo: cmd[1] , doingDate : null , doneDate : null , time : 0};
        todo['list'].push( added);
        todo.statusTotal.todo++;
        log.push(`id: ${added.id},  "${added.todo}" 항목이 새로 추가됐습니다.`);
        log.push( nowStatus( todo.statusTotal));
        break;
    case 'show' :
        log.push( todo.list.filter( ( item)=>cmd[1]==item.status).map( item=> item.id +', '+ item.todo + ( item.status==='done'?', '+item.time:'')) );
        break;
    default :
        log.push('존재하지 않는 명령입니다.');
        break;
    }
    logs( log);
}

function command( cmd){
    let args = explode( cmd);

    for( let k in args) {
        args[ k] = pipe( trim,strtoupper)( args[ k]);
    }
    runCommand( args);
}

/*테스트 코드
command("add$자바스크립트 공부하기");
command("add$Todo test");
command("add$Todo 실행");
command("update$3$doing");
command("shOW     $doing");
command("update$3$done");
command("show$done");
*/