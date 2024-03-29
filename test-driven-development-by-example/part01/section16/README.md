# 16장 드디어, 추상화


## 메모

> ..위의 코드에서는 명시적으로 Sum 을 생성하는데, **이게 더 직접적으로 우리 의도를 드러낸다.**

> ..TDD 로 구현할 땐 테스트 코드의 줄 수와 모델 코드의 줄 수가 거의 비슷한 상태로 끝난다. TDD 가 경제적이기 위해서는 매일 만들어 내는 코드의 줄 수가 두 배가 되거나 동일한 기능을 구현하되 절반의 줄 수로 해내야 할 것이다.

> ..TDD 가 자신의 방법에 비해 어떻게 다른지 직접 측정해 보아야 할 것이다. 이때 디버깅, 통합 작업, 다른 사람에게 설명하는데 걸리는 시간 등의 요소를 반드시 포함해야 한다는 것을 기억하기 바란다.

> **미래에 코드를 읽을 다른 사람들을 염두에 둔 테스트를 작성했다.**  
> TDD 와 여러분의 현재 개발 스타일을 비교해 볼 수 있는 실험 방법을 제시했다.  
> 또 한 번 선언부에 대한 수정이 시스템 나머지 부분으로 번져갔고, 문제를 고치기 위해 역시 컴파일러의 조언을 따랐다.  
> 잠시 실험을 시도했는데, 제대로 되지 않아서 버렸다.  


## 코드 실습

- [Step 53 : 테스트 실행코드 수정 (Sum 객체를 통한 계산과정 명시화)](./step53.test.ts)
- [Step 54 : 새로운 테스트케이스 추가 + 구현 ({5USD + 10CHF} +5USD = 15USD)](./step54.test.ts)
- [Step 55 : 새로운 테스트케이스 추가 + 구현 ({5USD + 10CHF} * 2 = 20USD)](./step55.test.ts)

