# 21장 셈하기


## 메모

> ..일반적으로 테스트를 구현하는 순서는 중요하다. 난 다음에 구현할 테스트를 선택할 때, 나에게 뭔가 가르침을 줄 수 있고 내가 만들 수 있다는 확신이 드는 것을 선택한다.

> ..모든 테스트가 성공하던 매 시점을 일종의 체크포인트로 하여 임의로 되돌릴 수 있도록 프로그래밍 환경이 지원한다면 아주 좋을 것이다.
  (git 같은 버전관리시스템..?)

> 가짜구현을 한 뒤에 단계적으로 상수를 변수로 바꾸어 실제 구현으로 만들었다.  
> 또 다른 테스트를 작성했다.  
> 테스트가 실패했을때 좀 더 작은 스케일로 또 다른 테스트를 만들어서 실패한 테스트가 성공하게 만드는 것을 보조할 수 있었다.  


## 코드실습

- [Step20 : 새로운 테스트케이스 추가 (테스트 실행결과 검증)](./step20.py)  
- [Step21 : 모델코드 수정 (TestCase.run 에서 TestResult 반환)](./step21.py)  
- [Step22 : 리팩토링 (TestResult.runCount 정의)](./step22.py)  
- [Step23 : 리팩토링 (TestResult.testStarted 구현)](./step23.py)  
- [Step24 : 새로운 테스트케이스 추가 (테스트 실패결과 검증)](./step24.py)  

