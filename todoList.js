

/**
  * 1. 할일
  * 1-1) 상태 : todo, doing, done
  * 
  * 
  * 
  * 2. command("명령어")
  * - 공백 제거되고, 대문자가 섞여 있어도 소문자로 변경하여 처리되도록 구현.
  * 
  * 2-1) add
  * - command("add$할일");
  * - 할일 추가시 id값을 생성하고 결과를 알려준다. ( default status todo )
  * 
  * 
  * 2-2) update
  * - command("update$번호$상태")
  * - doing 상태로 변경시 상태 변경시간을 저장하자. ( done 상태까지의 시간 계산 )
  * 
  * 
  * 2-3) show
  * - command("show$상태");
  * - 상태별로 할일을 출력해준다.
  * 
  * 
  * 
  */