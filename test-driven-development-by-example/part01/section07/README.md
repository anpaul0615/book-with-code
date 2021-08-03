# 7장 사과와 오렌지


## 메모

> ..영어속담에 "You can't compare apples and oranges" 라는 말이 있다. 서로 다른 걸 비교할 수 없다는 뜻이다.

> ..동치비교 코드에는 Dollar 와 Franc 를 비교하는 검사를 넣어야 한다. 두 객체의 클래스를 비교함으로써 이러한 검사를 쉽게 수행할 수 있다. 오직 금액과 클래스가 서로 동일할 때만 두 Money 가 서로 같은 것이다.

> ..모델코드에서 클래스를 이런 식으로 사용하는 것은 좀 지저분해 보인다. 자바 객체의 용어를 사용하는 것보다 재정 분야에 맞는 용어를 사용하고 싶다. 하지만 현재는 통화(currency) 개념 같은 게 없고, 통화 개념을 도입할 충분한 이유가 없어 보이므로 잠시 동안은 이대로 두자.

> 우릴 괴롭히던 결함을 끄집어내서 테스트에 담아냈다.  
> 완벽하진 않지만 그럭저럭 봐줄 만한 방법(getClass()) 으로 테스트를 통과하게 만들었다.  
> 더 많은 동기가 있기 전에는 더 많은 설계를 도입하지 않기로 했다.  


## 코드 실습

- [Step 17 : 새로운 테스트 추가 (Dollar 와 Franc 의 동치비교)](./step17.test.js)
- [Step 18 : 테스트 수정 (equals 함수에서 객체의 클래스타입도 함께 검사함)](./step18.test.js)
