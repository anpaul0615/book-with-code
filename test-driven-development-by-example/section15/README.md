# 15장 서로 다른 통화끼리 더하기


## 메모

> ..두 갈래 길이 있다. 좁은 범위의 한정적인 테스트를 빠르게 작선한 후에 일반화하는 방법도 있고, **우리의 모든 실수를 컴파일러가 잡아줄 거라 믿고 진행하는 방법도 있다.**

> ..실제 상황에서 나는 아마도 퍼져나가는 변화를 한 번에 하나씩 제대로 고치기만 할 것이다.

> 원하는 테스트를 작성하고, 한 단계에 달성할 수 있다록 뒤로 물렀다.  
> 좀더 추상적인 선언을 통해 가지에서 뿌리(애초의 테스트케이스)로 일반화했다.  
> 변경 후(Expression five_dallors), 그 영향을 받은 다른 부분들을 변경하기 위해 컴파일러 지시를 따랐다(Expression에 plus()를 추가하기 등등)  


## 코드 실습

- [Step 47 : 새로운 테스트케이스 추가 (5USD + 10CHF = 10USD, 환율이 2:1인 경우)](./section15.step47.test.ts)
- [Step 48 : 테스트 실행코드 수정 (Money.dollar, Money.franc 값을 Money 로 취급)](./section15.step48.test.ts)
- [Step 49 : 테스트 대상코드 수정 (Sum.reduce 에서 amount 합산하기 전에 Bank.reduce 로 환율 통일)](./section15.step49.test.ts)
- [Step 50 : 테스트 대상코드 수정 (가산수,피가산수 를 Expression 으로 취급)](./section15.step50.test.ts)
- [Step 51 : 테스트 대상코드 수정 (Expression 에 plus() 시그니처 정의)](./section15.step51.test.ts)
- [Step 52 : 테스트 실행코드 수정 (가산수 피가산수를 Expression 으로 변경)](./section15.step52.test.ts)

