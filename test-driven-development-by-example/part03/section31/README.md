# 31장 리팩토링
 

## 메모

> ..이 패턴들은 **시스템의 설계를 작은 단계를 통해 변화시키는 방법**에 대해 설명한다.

> ..TDD 에서는 리팩토링을 특이한 방법으로 사용한다. 일반적으로 리팩토링은 어떤 상황에서도 프로그램의 이미론을 변경해서는 안된다. 하지만 TDD 에서 우리가 신경쓰는 부분은 현재 이미 통과한 테스트들 뿐이다.

> ..예를들어 **TDD 에서는 상수를 변수로 바꾸고 양심에 거리낌 없이 이를 리팩토링이라고 부른다. 왜냐하면 이미 통과한 테스트들의 집합에 아무 변화도 주지 않기 때문이다.**

> .."문제가 있다는 건 알지만 테스트는 모두 통과하니까 일단 CVS에 체크인 해야지" 하고 말할 수는 없다. 만약 그런 생각이 든다면 테스트를 더 만들어야 한다.



### 차이점 일치시키기

> 비슷해 보이는 두 코드 조각을 합치려면 어떻게 해야 할까?  
> **두 코드가 단계적으로 닮아가게끔 수정한다. 이 둘이 완전히 동일해지면 둘을 합친다.**

> ..어떤 리팩토링의 경우에는 제어 흐름과 데이터 값을 세밀하게 검사해야 할 필요가 있기도 하다. 추론 과정이 길어지면 지금 고치려고 하는 부분이 결과에 영향을 주지 않을 거라고 믿어버리는 경향이 생긴다.

> ..우리가 작은 단계와 명확한 피드백을 이용해서 피해가고자 하는 일이 바로, 불확실한 믿음에 의지하여 단계를 크게 건너뛰는 리팩토링이다.

> ..간혹 "차이점 일치시키기" 를 거꾸로 수행해야 하는 경우도 있다. 이 말은, 변경 마지막 단계에 사소한 것만 처리하게 하려면 어떤 모양새가 되어야 할까 생각한 다음 거꾸로 거슬러 온다는 것이다.

> ..하위클래스의 내용이 비어 있으려면 메서드의 내용이 상위클래스의 메서드 내용과 동일하면 된다. 하나씩 하나씩 하위클래스의 내용을 비우고, 모두 비게 되면 하위클래스에 대한 참조를 상위클래스로 바꾸면 된다.



### 변화 격리하기

> 객체나 메서드의 일부만 바꾸려면 어떻게 해야 할까?  
> 일단, 바꿔야 할 부분을 격리한다.

> ..머릿속에 수술 장면이 떠오른다. 수술 부위만 빼고 환자의 온몸은 천으로 덮여있다. 그렇게 천으로 가리는 것은 어떤 고정된 변수 몇 가지만을 외과의사에게 노출시키는 것과 같다.

> ..**일단 바꿀 부분을 격리하고 나서 바꾸는 작업을 수행하면 작업을 되돌리기도 매우 수월하다는 사실을 알게 될 것이다.**

> ..코드에 메서드가 하나 더 명시되는 비용과 또 하나의 개념이 명시되는 가치, 이 양자간의 균형을 잡도록 하라.



### 데이터 이주시키기

> 표현 양식을 변경하려면 어떻게 해야 할까?  
> 일시적으로 데이터를 중복시킨다.

> (단일 테스트 실행 예제 코드)  
> ```python
> class TestSuite:
>   def add(self, test):
>     self.test = test
>   def run(self, result):
>     self.test.run(result)
> 
> class TestCaseTest(TestCase):
>   def testSuite(self):
>     suite = TestSuite()
>     suite.add(WasRun("testMethod"))
>     suite.run(self.result)
>     assert("1 run, 0 failed" == self.result.summary())
> ```

> (단일 테스트 실행에서 다중 테스트 실행으로 확장하는 경우)
> 1) 다중 테스트에 대한 컬렉션을 초기화한다.  
> ```python
> class TestSuite:
>   def __init__(self):
>     self.tests = []
> ```

> 2) 실행할 테스트를 등록하는 모든 부분에서 다중 테스트 컬렉션도 설정하게 만든다.  
> ```python
> class TestSuite:
>   def add(self, test):
>     self.test = test
>     self.tests.append(test)  ## new
> ```

> 3) 단일 테스트를 실행하는 부분을 다중 테스트 실행으로 변경한다.  
> ```python
> class TestSuite:
>   def run(self, result):
>     #self.test.run(result)  ## old
>     for test in self.tests:  ## new
>       test.run(result)
> ```
>
> 이제 단일 테스트 실행과 다중 테스트 실행이 함께 동작하게 됐다. 현재 테스트케이스 입장에서 볼 때 이것은 리팩토링이다. 왜냐하면 현재 컬렉션 안에는 하나의 요소만 들어갈 수 있기 때문이다.


> 4) 이제 단일 테스트를 등록하는 부분을 제거한다.
> ```python
> class TestSuite:
>   def add(self, test):
>     #self.test = test  ## old
>     self.tests.append(test)
> ```
>
> 호스트코드(=테스트 실행코드) 를 변경하지 않으면서, 모델코드를 수정하는 것만으로 단일 테스트 실행과 다중 테스트 실행에 모두 대응할 수 있게 됐다.



### 메서드 추출하기

> 길고 복잡한 메서드를 읽기 쉽게 만들려면 어떻게 해야 할까?  
> **긴 메서드의 일부분을 별도의 메서드로 분리해내고 이를 호출하게 한다.**

> ..나는 **복잡한 코드를 이해하고자 할 때** "메서드 추출하기" 를 사용한다. "여기 이 부분이 어떤 일을 수항하는데.. 이걸 뭐라고 부르면 좋을까?"

> ..또한 나는 일부 서로 비슷한 내용이 있는 **두 메서드에서 중복을 제거하기 위해** "메서드 추출하기" 를 사용하기도 한다. 두 메서드의 비슷한 부분을 하나의 메서드로 추출해낸다.

> ..메서드를 작은 조각으로 나누는 것은 때때로 그 정도가 지나칠 수도 있다. 더 나아갈 방법이 보이지 않을 때엔, 새로운 방식으로 "메서드 추출하기" 를 하기 위해 일단 모든 코드를 한 자리에 모아놓고 "메서드 인라인" 리팩토링을 자주 사용한다.



### 메서드 인라인

> 너무 꼬여있거나 산재한 제어 흐름을 단순화하려면 어떻게 할까?  
> **메서드를 호출하는 부분을 호출될 메서드의 본문으로 교체한다.**

> ..여기서 중요한건 제어 흐름을 이리저리 바꿔가며 실험해보기 위해서 메서드를 인라인할 수 있다는 점이다.

> ..때로는 이런 열기 속에서 자신의 꾀에 빠져버리는 수가 있다. .."이놈은 저놈에게 메시지를 보내고, 그럼 그놈은 다시.. 우와 모르겠다. 도대체 무슨일이 벌어지는 거지?" 이렇게 되면 나는 여러 추상화 계층을 인라인시켜 놓고 뭐가 어떻게 돌아가는지 제대로 이해한 다음, **예상이 아닌 실제적인 필요성에 기반하여 다시 추상화를 수행한다.**



### 인터페이스 추출하기

> 자바 오퍼레이션에 대한 두 번째 구현을 추가하려면 어떻게 해야 할까?  
> 공통되는 오퍼레이션을 담고 있는 인터페이스를 만들면 된다.

> ..인터페이스를 추출할 필요가 있을 경우, 사실 첫 번째 구현에서 두 번째 구현으로 이동하고 있는 것이다.

> ..인터페이스 이름을 찾는 것은 어느정도 쉬운 편이지만, 어떤 경우 딱 맞는 메타포를 찾기 위해 고생하기도 한다.

> ..때때로 크래시 테스트 더미(Crash Test Dummy) 나 기타 모의객체(Mock Object) 를 도입하기도 한다. 이런 경우에는 이름 짓기가 더 힘들 수 있는데, 그 이유는 여전히 진짜 구현 사례는 단 한가지 밖에 존재하지 않기 때문이다. 이럴때면 신경을 끄고 인터페이스 이름을 IFile 이라고 하고 클래스 이름을 그냥 File 로 남겨두고 싶어진다. ..아마도 인터페이스 이름을 File 로 하고 클래스 이름을 DiskFile 로 하는 것이 맞을지도 모르겠다. 왜냐하면 클래스는 비트가 디스크 상에 있다는걸 가정하고 있기 때문이다.



### 메서드 옮기기

> 메서드를 원래 있어야 할 장소로 옮기려면 어떻게 해야 할까?  
> 어울리는 클래스에 메서드를 추가해주고, 그것을 호출하게 하라.

> ..이것은 내가 가장 좋아하는 컨설팅 리팩토링 중 하나인데, 보증 안 되는 예상을 발견하는 데에 탁월한 방법이기 때문이다. 

> (도형의 면적을 계산하는 예제 코드)  
> ```
> Class Shape
>   int width = bounds.right() - bounds.left();
>   int height = bounds.bottom() - bounds.top();
>   int area = width * height;
> ```

> ..**한 메서드에서 다른 객체에 하나 이상의 메시지를 보내는 것을 보면 나는 언제나 의심하게 된다.** 이 경우 bounds(Rectangle 인스턴스) 로 네 개의 메시지가 보내지고 있다. 이 부분을 옮겨야 한다.  
> ```
> Class Rectangel
>   public int area() {
>     int width = bounds.right() - bounds.left();
>     int height = bounds.bottom() - bounds.top();
>     return width * height
>   }
>
> Class Shape
>   int area = bounds.area();
> ```

> ..때론 메서드의 일부분만 옮기고 싶을 때가 있다. 그럴 때는 일단 메서드 추출하기를 한 후에, 메서드를 옮기고, 원래 클래스에 있던 추출된 부분을 다시 합치면 된다. (옮겨진 메서드를 호출하는 코드만 들어갈 것이므로 합칠 때엔 한 줄이 될 것이다)



### 메서드 객체

> 여러 개의 매개 변수와 지역 변수를 갖는 복잡한 메서드를 어떻게 표현할까?  
> 메서드를 꺼내서 객체로 만든다.

> (방법)  
> 1) 메서드와 같은 매개 변수를 갖는 객체를 만든다.  
> 2) 메서드의 지역 변수를 객체의 인스턴스 변수로 만든다.  
> 3) 원래 메서드와 동일한 내용을 갖는 run() 메서드를 만든다.  
> 4) 원래 메서드에서는 새로 만들어진 클래스의 인스턴스를 생성하고 run() 을 호출한다.  

> .."메서드 객체" 는 **시스템에 완전히 새로운 로직을 추가하고자 할 때** 유용하다.

> .."메서드 객체" 는 **"메서드 추출하기" 를 적용할 수 없는 코드를 간결하게 만들기 위한 용도로도** 적합하다.

> ..종종 한 단위의 코드가 여러 임시 변수들과 매개 변수들로 얽혀있어서, 이 부분을 추출하려고 할 때마다 대여섯 개의 임시 변수와 매개 변수를 끌고 다녀야 할 때가 있다. 이런 경우는, 메서드 서명부가 너무 길기 때문에 추출된 메서드도 원래의 코드보다 별로 좋아 보이지 않는다. 이때 "메서드 객체" 를 생성하면 아무것도 전달할 필요가 없는 새로운 이름공간을 얻게 된다.



###  매개 변수 추가

> 메서드에 매개 변수를 추가하려면?

> (방법)  
> 1) 메서드가 인터페이스에 선언되어 있다면 일단 인터페이스에 매개 변수를 추가한다.  
> 2) 대상 메서드에 매개 변수를 추가한다.  
> 3) 컴파일 에러를 통해 모델 코드를 수정한다. (???)  

> ..매개 변수를 추가하는 것은 종종 확장 단계다. 매개 변수 없이 첫 번째 테스트를 통과할 수 있었으나, **다음 테스트가 제시하는 새로운 상황을 제대로 완수하려면** 더 많은 정보를 제공해야 하는 경우가 있다.

> .."매개 변수 추가하기" 는 또한 하나의 데이터 표현을 다른 표현으로 변경하는 작업의 일부로 쓰이기도 한다. 일단 매개 변수를 추가하고, 그 다음에 기존 매개 변수를 사용하는 모든 부분을 삭제한 후에 기존 매개 변수를 제거하는 식이다.



### 메서드 매개 변수를 생성자 매개 변수로 바꾸기

> 하나 이상의 메서드의 매개 변수를 생성자로 옮기려면 어떻게 할까?

> (방법)  
> 1) 생성자에 매개 변수를 추가한다.  
> 2) 매개 변수와 같은 이름을 갖는 멤버 변수를 추가한다.  
> 3) 생성자에서 멤버 변수의 값을 설정한다.  
> 4) `parameter` 를 `this.parameter` 로 하나씩 찾아서 바꾼다.  
> 5) 매개 변수에 대한 참조가 더 이상 존재하지 않으면 해당 매개 변수를 메서드와 모든 호출자에서 제거한다.  
> 6) 이제 필요없어진 `this` 를 제거한다.  
> 7) 변수명을 적절히 변경한다.  

> ..**동일한 매개 변수를 같은 객체의 서로 다른 몇몇 메서드로 전달하는 경우라면**, 매개 변수를 한 번만 전달하게끔 API 를 단순화할 수 있다.

> ..만약 **인스턴스 변수가 오직 하나의 메서드에서만 쓰이는 경우라면** 이 리팩토링을 반대로 수행할 수도 있다.


