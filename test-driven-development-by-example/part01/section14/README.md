# 14장 바꾸기


## 메모

> ..우리는 여전히 수치상의 모든 귀찮은 문제를 애써 외면한다. 다음 한 줌의 지저분한 코드면 초록 막대를 볼 수 있다.

> ..이 코드로 인해서 갑자기 Money 가 환율에 대해 알게 돼버렸다. 우웩. 환율에 대한 일은 모두 Bank 가 처리해야 한다.

> ..지금은 리팩토링하는 중에 코드를 작성하는 것이기 때문에 테스트를 작성하지는 않을 것이다. 우리가 이 리팩토링을 마치고 모든 테스트가 통과한다면, 그떄 우리는 그 코드가 실제로 사용되었다고 생각할 수 있다.

> ..만약 지금 뭘하는 건지 잘 이해하지 못하는 다른 사람과 프로그래밍하는 상황이거나(짝코딩) 로직이 조금 복잡했다면, 아마도 별도의 테스트를 만들고자 했을 것이다.

> 필요할 거라고 생각한 인자를 빠르게 추가했다.  
> 코드와 테스트 사이에 있는 데이터 중복을 끄집어냈다.  
> 자바의 오퍼레이션에 대한 가정을 검사해보기 위한 테스트(testArrayEquals)를 작성했다.  
> 별도의 테스트 없이 전용(private) 도우미(helper) 클래스를 만들었다.  
> 리팩토링하다가 실수를 했고, 그 문제를 분리하기 위해 또 하나의 테스트를 작성하면서 계속 전진해 가기로 선택했다.  


## 코드 실습

- [Step 41 : 새로운 테스트케이스 추가 (2CHF 을 1USD 로 바꾸기)](./step41.test.ts)
- [Step 42 : 테스트 대상코드 수정 (Bank.addRate 구현 + Money.reduce 수정)](./step42.test.ts)
- [Step 43 : 테스트 대상코드 수정 (Expression 인터페이스의 reduce 시그니처 변경)](./step43.test.ts)
- [Step 44 : 테스트 대상코드 수정 (Bank.getRate 구현)](./step44.test.ts)
- [Step 45 : 테스트 대상코드 수정 (Bank 내부에 환율 테이블 객체 구현)](./step45.test.ts)
- [Step 46 : 테스트 대상코드 수정 (Bank.getRate 에 같은 통화단위에 대한 환율처리 추가)](./step46.test.ts)

