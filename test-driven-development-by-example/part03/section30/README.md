# 30장 디자인 패턴
 

## 메모

> ..패턴의 주요한 통찰이 하나 있으니, 우리가 언제나 완전히 다른 문제들을 해결하는 것 같지만 우리가 푸는 문제 대다수는 사용하는 도구에 의해 생기는 것이지 직면한 외부의 문제 때문에 생기는 것이 아니라는 점이다. 

> ..이런 이유로, 심지어 **외부적 문제 해결 컨텍스트가 엄청나게 다양하더라도 공통의 해결책을 가진 공통의 문제를 발견할 것을 기대할 수 있다.** (실제로 그렇기도 하다)

> ..디자인 패턴의 엄청난 성공은 객체 프로그래머들이 보는 공통성에 대한 증거다. 하지만 "Design Pattern" 이라는 책의 성공은 이런 패턴들을 표현하는 어떠한 다양성도 모두 억압하고 말았다. 이 책은 설계를 독립된 단계로 바라보는 성향을 어렴풋이 띤다. 이 책은 확실히 리팩토링을 설계의 일종으로 보는 것에 동의하지 않는다. TDD 에서는 설계를 디자인 패턴과는 조금 다른 관점으로 본다.

> ..다음은 이 책에서 다룰 패턴에 대한 요약이다.  
> 1) 커맨드 : 계산 작업에 대한 호출(invocation of a computation) 을 메시지가 아닌 객체로 표현한다.  
> 2) 값 객체 : 객체가 생성된 이후 그 값이 절대로 변하지 않게 하여 별칭 문제가 발생하지 않게 한다.  
> 3) 널 객체 : 계산 작업의 기본 사례를 객체로 표현한다.  
> 4) 템플릿 메서드 : 계산 작업의 변하지 않는 순서를 여러 추상 메서드로 표현한다. 이 추상 메서드들은 상속을 통해 특별한 작업을 수행하게끔 구체화된다.  
> 5) 플러거블 객체 : 둘 이상의 구현을 객체를 호출함으로써 다양성을 표현한다.  
> 6) 플러거블 셀렉터 : 객체별로 서로 다른 메서드가 동적으로 호출되게 함으로써 필요없는 하위클래스의 생성을 피한다.  
> 7) 팩토리 메서드 : 생성자 대신 메서드를 호출함으로써 객체를 생성한다.  
> 8) 임포스터 : 현존하는 프로토콜을 갖는 다른 구현을 추가하여 시스템에 변이를 도입한다.  
> 9) 컴포지트 : 하나의 객체로 여러 객체의 행위 조합을 표현한다.  
> 10) 수집 매개 변수 : 여러 다른 객체에서 계산한 결과를 모으기 위해 매개 변수를 여러 곳으로 전달한다.  

> (테스트 주도 개발에서 디자인 패턴의 쓰임새)  
> ```
> +-----------------+-------------+----------+
> |       패턴      | 테스트 작성 | 리팩토링 |
> +-----------------+-------------+----------+
> |      커맨드     |      O      |          |
> +-----------------+-------------+----------+
> |     값 객체     |      O      |          |
> +-----------------+-------------+----------+
> |     널 객체     |             |    O     |
> +-----------------+-------------+----------+
> |  템플릿 메서드  |             |     O    |
> +-----------------+-------------+----------+
> |  플러거블 객체  |             |     O    |
> +-----------------+-------------+----------+
> | 플러거블 셀렉터 |             |     O    |
> +-----------------+-------------+----------+
> |  팩토리 메서드  |      O      |     O    |
> +-----------------+-------------+----------+
> |     임포스터    |      O      |     O    |
> +-----------------+-------------+----------+
> |     컴포지트    |      O      |     O    |
> +-----------------+-------------+----------+
> |   수집매개변수  |      O      |     O    |
> +-----------------+-------------+----------+
> ```




### 커맨드

> 간단한 메서드 호출보다 복잡한 형태의 계산 작업에 대한 호출이 필요하다면 어떻게 해야 할까?  
> **계산 작업에 대한 객체를 생성하여 이를 호출하면 된다.**

> ..복잡한 계산 작업 호출은 값비싼 메커니즘을 필요로 한다. 하지만 거의 대부분의 경우 이런 모든 복잡함이 요구되지는 않으며 그런 비싼 값을 치르지 않는 게 좋을 것이다. **메시지 하나를 보내는 것보다 호출이 조금 더 구체적이고 또 조작하기 쉬워지려면 객체가 해답이 된다.**

> ..자바의 Runnable 인터페이스가 훌륭한 예다.  
> ```
> Interface Runnable
>   public abstract void run();
> ```
> run() 의 구현으로는 어러분이 원하는 어떤것을 넣어도 된다. 불행히도 자바는 Runnable 을 생성하고 호출하기 위한, 문법적으로 간결한 방법을 제공하지 않기 때문에 이 인터페이스가 스몰토크/루비 혹은 리스프의 블럭 혹은 람다처럼 자주 쓰이지는 않는다.



### 값 객체

> 널리 공유해야 하지만 동일성(indentity) 은 중요하지 않을 떄 객체를 어떤식으로 설계할 수 있을까?  
> **객체가 생성될 때 객체의 상태를 설정한 후 이 상태가 절대 변할 수 없도록 한다. 그리고 이 객체에 대해 수행되는 연산은 언제나 새로운 객체를 반환하게 한다.**

> ..이게 바로 고질적인 별칭 문제다. 두 객체가 제 3 의 다른 객체에 대한 참조를 공유하고 있는데, 한 객체가 공유되는 객체의 상태를 변화시키면 나머지 다른 객체는 공유 객체의 상태에 의존하지 않는 편이 차라리 나을 것이다.

> ..별칭 문제를 해결하기 위한 몇 가지 방법이 있다. 한 가지는 현재 의존하는 객체에 대한 참조를 결코 외부로 알리지 않는 방법이다. 그 대신 객체에 대한 복사본을 제공하는 것이다. 이 방법은 시간(수행시간) 이나 공간(메모리공간) 측면에서 비싼 해결책일 수도 있고, 공유 객체의 상태 변화를 공유하고 싶은 경우에는 사용할 수 없다는 단점이 있다.

> ..또 다른 방법은 옵저버 패턴을 사용하는 것이다. 의존하는 객체에 자기를 등록해 놓고, 객체의 상태가 변하면 통지를 받는 방법이다. 옵저버 패턴은 제어 흐름을 이해하기 어렵게 만들 수 있고, 의존성을 설정하고 제거하기 위한 로직이 지저분해질 수 있다.

> ..또 다른 해법은 객체를 덜 객체답게 취급하는 법이다. 객체는 시간의 흐름에 따라 변할 수 있는 상태를 갖고 있다. 하지만 만약 우리가 원한다면 "시간의 흐름에 따라 변하는 상태" 를 제거해버릴 수 있다. **내가 어떤 객체를 가지고 있는데 이 객체가 변하지 않을 것임을 안다면 이 객체에 대한 참조를 원하는 곳 어디로든 넘겨줄 수 있다.** 별칭 문제가 발생하지 않을 것임을 알기 때문이다. 변화 자체가 불가능 하다면 내가 모르는 곳에서 변화가 일어날 가능성 자체가 없게 되는 것이다.

> ..**값 객체를 구현할 때 모든 오퍼레이션은 기존 객체는 변하지 않은 채로 놔두고, 새로운 객체를 반환해야 한다. 사용자는 값 객체를 사용한다는 사실을 주지하고 결과를 저장해야 한다.**

> ..**이런 객체 할당(allocation) 은 퍼포먼스 문제를 야기할 수 있는데,** 이런 문제는 모든 퍼포먼스 문제와 동일하게 실질적인 자료 집합이 있고, 실질적 사용 패턴, 프로파일링 데이터, **퍼포먼스에 대한 불만 등이 실재로 존재하는 상황 하에서만 고민해야 한다.**

> ..모든 값 객체는 동등성을 구현해야한다. (그리고 **많은 언어에서 값 객체는 암묵적으로 해싱을 구현해야 한다**)

> ..동일성(identity) 과 동등성(equality) 은 서로 다르다. **5백원 동전 두개가 서로 동등할지라도 동일하지는 않다.**

> ..만약 내가 계약 객체를 두 개 가지고 있는데, 둘이 서로 같은 객체가 아니라면 이 둘은 동등한 것이 아니라 다른 것이다. 하지만 내개 5프랑짜리 동전이 두 개 있다면 이것들이 동일한 동전인지는 중요하지 않다. 5프랑은 5프랑인 것이다. 이것들은 서로 동등해야한다.



### 널 객체

> 객체의 특별한 상황을 표현하고자 할 때 어떻게 해야 할까?  
> **그 특별한 상황을 표현하는 새로운 객체를 만들면 된다. 그리고 이 객체에 다른 정상적인 상황을 나타내는 객체와 동일한 프로토콜을 제공한다.**

> ..java.io.File 에는 guard != null 이 18 번이나 나온다.
> ```
> public boolean setReadOnly() {
>    SecurityManager guard = System.getSecurifyManager();
>    if (guard != null) {
>      guard.canWrite(path);
>    }
>    return fileSystem.setReadOnly(this);
> }
> ```
> 비록 이러한 근면함 덕택에 세상의 파일들이 안전하게 지켜진다는 점을 인정하긴 하지만 한편으로 조금 신경질도 난다. getSyecurityManager() 가 null 을 반환하는지 항상 조심스럽게 검사해야만 하는 걸까?

> ..다른 방법은 절대로 예외를 던지지 않는 새로운 클래스를 만드는 것이다.  
> ```
> Class LaxSecurity
>   public void canWrite(String path) { /* do nothing */ }
> ```

> ..누군가가 getSecurityManager() 를 호출했는데, 반환할 SecurityManager 가 없다면 그 대신 LaxSecurity 를 반환하면 된다.  
> ```
> public static SecurityManager getSecurityManager() {
>   return security == null ? new LaxSecurity() : security;
> }
> ```

> ..이제 더는 누군가 널 검사를 하지 않았을까 하는 걱정은 하지 않아도 된다. 원래의 코드는 다음과 같이 무척 깔끔해진다.  
> ```
> public boolean setReadOnly() {
>   SecurityManager security = System.getSecurifyManager();
>   security.canWrite(path);
>   return fileSystem.setReadOnly(this);
> }
> ```

> ..에리히 감마와 OOPSLA 의 튜토리얼 하나를 진행하다가 JHotDraw 어딘가에 널 객체가 적절한지 아닌지에 대한 논쟁을 한 적이 있다. 결국 조건문 하나를 제거하기 위해서 널 객체를 도입하는 데 드는 비용이 코드 열 줄이라고 에리히가 계산할 때까지 나는 논쟁에서 점수를 앞서고 있었다. 나눈 후반부 라운드에 나오는 TKO(Technical knock-out) 가 싫다. (ㅋㅋ)



### 템플릿 메서드

> 작업 순서는 변하지 않지만 각 작업 단위에 대한 미래의 개선 가능성을 열어두고 싶은 경우 이를 어떻게 표현할 것인가?  
> 다른 메서드들을 호출하는 내용으로만 이루어진 메서드를 만든다.

> ..프로그래밍이란 고전적인 순서들로 가득하다.  
> - 입력 / 처리 / 출력  
> - 메시지 보내기 / 응답 받기  
> - 명령 읽기 / 결과 내보내기  
> 
> 이러한 순서들의 범용성에 대해서 명백하게 나타내는 동시에 각 단계의 구현에 대해서는 변화를 주고 싶은 경우가 있다.

> ..**(제한된 경우에 한해서) 객체지향 언어는 상속을 통해 범용적인 순서를 표현하기 위한 간단한 방법을 제공한다. 상위클래스에는 다른 메서드를 호출하는 내용으로만 이루어진 메서드를 만들고, 하위클래스에서는 이 각각의 메서드를 서로 다른 방식으로 구현한다.**

> ..예를 들어 JUnit 에서는 테스트를 실행하기 위한 기본 순서를 다음과 같이 구현한다.  
> ```
> public void runBare() throws Throwable {
>   setUp();
>   try {
>     runTest();
>   }
>   finally {
>     tearDown();
>   }
> }
> ```

> ..템플릿 메서드를 만들 때 한 가지 문제는 하위클래스를 위한 기본 구현을 제공할 것인가 말 것인가 하는 것이다. TestCase.runBare() 에서는 세 개의 메서드가 모두 기본 구현을 가지고 있다.  
> - setUp() 과 tearDown() 은 아무 일도 하지 않는다.  
> - runTest() 는 테스트 메서드를 이름에 기반하여 동적으로 찾아서 호출한다.  

> ..하위 단계가 정의되지 않은 상태에서 연산을 구현하는 것이 의미가 없는 경우라면, 여러분이 사용하는 언어가 제공하는 어떠한 방법을 이용하건 간에 이를 나타내주어야 한다.  
> - 자바에서는 하위 메서드(submethod) 를 추상 메서드로 선언한다.  
> - 스몰토크에서는 메서드가 SubclassResponsibility 에러를 던지게 만든다.  

> ..**템플릿 메서드는 초기의 설계에 의해서 얻어지는 것보다는 경험에 의해 발견되는 것이 좋다.** "아, 이 부분은 순서에 관한 내용이고, 이 부분이 상세한 구현에 대한 내용이로군!" 하는 생각이 들 때면 늘 그 상세한 구현을 나중에 인라인시키고 진짜로 변하는 부분만 다시 추출한다.

> ..나머지 메서드들과는 다른 부분을 추출해 내면 남는 것은 템플릿 메서드다. 그 다음 템플릿 메서드를 상위클래스로 보내고 중복을 제거할 수 있다.



### 플러거블 객체

> 변이를 어떻게 표현할 것인가?  
> 가장 간단한 방법은 명시적인 조건문을 사용하는 것이다.

> ```
> if (circle) then{
>   /* circley stuff */
> } else {
>   /* non circley stuff */
> }
> ```
> 이런 명시적인 의사 결정 코드는 코드의 여러 곳으로 펴저나간다는 사실을 순식안에 알게 될 것이다. 원과 원이 아닌 것을 구분하기 위해 한 곳에서 명시적인 조건문을 사용하게 되면, 조건문은 조만간 퍼져나갈 것이다.

> ..TDD 의 두 번쨰 수칙이 중복을 제거하는 것이기 때문에, 명시적인 조건문이 전염되는 싹을 애초에 잘라버려야 한다. **같은 조건문을 두 번째로 볼 때가 바로, 객체 설계시의 가장 기초인 플러거블 객체를 끄집어낼 때다.**

> (마우스 버튼으로 도형집합을 선택하거나 이동하는 예제 코드)
> ```
> Class SelectionTool
>   Figure slected;
>   public void mouseDown() {
>     selected = findFigured();
>     if (selected != null)
>       select(selected);
>   }
>   public void mouseMove() {
>     if (selected != null)
>       move(selected);
>     else
>       moveSelectionRectangle();
>   }
>   public void mouseUp() {
>     if (selected != null)
>       selectAll();
>   }
> ```
> 
> **이게 바로 지저분한 조건문들의 중복이다. (이것들은 질병처럼 번져나간다)** 이 경우에 대한 해법은 플러거블 객체인 SelectionMode 를 만드는 것이다. SelectionMode 는 SingleSelection 과 MultipleSelection 이라는 두 가지 구현을 갖는다.  
> ```
> Class SelectionTool
>   SelectionMode mode;
>   public void mouseDown() {
>     selected = findFigured();
>     if (selected != null)
>       mode = SingleSelection(seleted);
>     else
>       mode = MultipleSelection();
>   }
>   public void mouseMove() {
>     mode.mouseMove();
>   }
>   public void mouseUp() {
>     mode.mouseUp();
>   }
> ```
>
> 명시적인 인터페이스를 사용하는 언어에서는 두 개의 (혹은 그 이상의) 플러거블 객체가 동일한 인터페이스를 구현하게 해야 한다.



### 플러거블 셀렉터

> 인스턴스별로 서로 다른 메서드가 동적으로 호출되게 하려면 어떻게 해야 할까?  
> 메서드의 이름을 저장하고 있다가 그 이름에 해당하는 메서드를 동적으로 호출한다.

> ..각각 단지 메서드 하나만 구현하는 하위클래스가 열 개 있다면 어떻게 해야 할까? **상속은 이런 작은 변이를 다루기에는 너무 무거운 기법이다.**  
> ```
> abstract class Report {
>   abstract void print();
> }
> class HTMLReport extends Report {
>   void print() {}
> }
> class XMLReport extends Report {
>   void print() {}
> }
> ```

> ..한 가지 대안은 switch 문을 갖는 하나의 클래스를 만드는 것이다. 필드의 값에 따라 서로 다른 메서드를 호출하면 된다.  
> ```
> abstract class Report {
>   String printMessage;
>   Report(String printMessage) {
>     this.printMEssage = printMessage;
>   }
>   void print() {
>     switch (printMessage) {
>       case "printHTML" :
>         printHTML();
>         break;
>       case "printXML" :
>         printXML();
>         break;
>     }
>   }
>   void printHTML() {}
>   void printXML() {}
> }
> ```
> 
> 하지만 메서드의 이름이 세 곳에 나뉘어 존재하게 된다.  
> - 인스턴스를 생성하는 곳  
> - switch 문  
> - 메서드 자체  

> ..**새로운 종류의 출력을 추가할 때마다 출력 메서드를 추가하고 switch 문을 바꿔야 한다는 점을 기억해야 한다. 플러거블 셀렉터 해법은 리플랙션을 이용하여 동적으로 메서드를 호출하는 것이다.**  
> ```
> void print() {
>   Method runMethod = getClass().getMethod(printMessage, null);
>   runMethod.invoke(this, new Class[0]);
> }
> ```
> 
> 여전히 리포트를 생성하는 곳과 출력 메서드의 이름 사이에 지저분한 의존관계가 남아있긴 하지만 최소한 switch 문은 없다.

> ..플러거블 셀렉터는 분명 과용될 수 있다. 가장 큰 문제는 메서드가 호출되었는지 보기 위해 코드를 추적하는 것이다. 메서드를 달랑 한 개만 가지는 하위클래스들이 한 뭉치나 존재하는, 확실히 직관적인 상황에서 **코드를 정리하기 위한 용도로만 플러거블 셀렉터를 사용해야 한다.**



### 팩토리 메서드

> 새 객체를 만들 떄 유연성을 원하는 경우 객체를 어떻게 생성하는가?  
> 생성자를 쓰는 대신 일반 메서드에게 객체를 생성한다.

> ..**생성자는 자신을 잘 표현한다. 생성자를 사용하는 경우 분명히 객체 하나를 생성하고 있다는 것을 알 수 있다.** 그러나 생성자는, 특히 자바에서 표현력과 유연함이 떨어진다.

> ..팩토리 메서드의 단점은 인디렉션에 있다. 메서드가 생성자처럼 생기지는 않았지만 그 안에서 객체를 만든다는 사실을 기억해야만 한다.

> ..**유연함이 필요할 때에만 팩토리 메서드를 사용해야 한다.** 그렇지 않다면 객체를 생서하는 데에는 생성자를 쓰는 것으로 충분하다.



### 사칭 사기꾼(imposter)

> 기존의 코드에 새로운 변이를 도입하려면 어떻게 해야 할까?  
> **기존의 객체와 같은 프로토콜을 갖지만 구현은 다른 새로운 객체를 추가한다.**

> ..절차적 프로그램에서는 변이를 도입하려면 조건문을 추가해야 했다. 플러거블 객체에서 살펴본 바와 같이 그런 로직은 증식하려는 경향이 있고, 이 중복을 치료하려면 다형성 메시지 처방을 1회분 복용해야 한다. (ㅋㅋ)

> ..구조가 이미 존재한다고 가정해보자. 객체도 이미 존재한다. 이제 시스템이 뭔가 다른 일을 처리하도록 만들고 싶어졌다. if 문을 삽입할 명백한 장소가 있고, 다른 곳에 중복된 로직을 넣지 않을 수 있다면 그렇게 하면 된다. 그러나 이러한 변이를 도입할 때 여러 메서드를 수정해야 하는 경우가 종종 있다.

> ..이런 결정의 순간은 TDD 에서 두 군데 나타난다. 때때로 테스트케이스 하나를 작성하는 데 새로운 시나리오를 표현해야 한다. 기존의 객체 중 어느것도 당신이 표현하고 싶어하는 것을 표현하지 못한다. 우리가 그래픽 에디터를 테스트하고 있고, 이미 사각형을 제대로 그린다고 가정하자.  
> ```
> testRectangle() {
>   Drawing d = new Drawing();
>   d.addFigure(new RectangleFigure( 0, 10, 50, 100));
>   RecordingMedium brush = new RecordingMedium();
>   d.display(brush);
>   assertEquals("rectangle 0 10 50 10\n", brush.log());
> }
> ```

> ..이제 타원을 표시하고 싶다. 이 경우, 사칭 사기꾼(imposter) 을 발견하기는 쉽다. RectangleFigure 를 OvalFigure 로 바꾸면 된다.  
> ```
> testOval() {
>   Drawing d = new Drawing();
>   d.addFigure(new OvalFigure( 0, 10, 50, 100));
>   RecordingMedium brush = new RecordingMedium();
>   d.display(brush);
>   assertEquals("oval 0 10 50 10\n", brush.log());
> }
> ```

> ..다음은 리팩토링 중에 나타나는 임포스터의 두 가지 예다.  
> 1) 널 객체 : 데이터가 없는 상태를 데이터가 있는 상태와 동일하게 취급할 수 있다.
> 2) 컴포지트 : 객체의 집합을 단일 객체처럼 취급할 수 있다.

> ..**리팩토링 중에 임포스터를 찾아내는 것은 중복을 제거하는 작업을 통해 유도된다.** 다른 모든 리팩토링 역시 중복을 제거하는 작업에 의해 유도된다.



### 컴포지트

> 하나의 객체가 다른 객체 목록의 행위를 조합한 것처럼 행동하게 만들려면 어떻게 해야 할까?  
> 객체 집합을 나타내는 객체를 단일 객체에 대한 임포스터로 구현한다.

> ..내가 제일 좋아하는 예는 Account 와 Transaction 의 예로 컴포지트의 반대에 대한 예가 되기도 한다.  
> ```
> /* 값의 증분을 저장 */
> Class Transaction
>   Transaction(Money value) {
>     this.value = value;
>   }
> /* Transaction 들의 합을 계산해서 잔액을 얻어냄 */
> Class Account
>   Transaction transactions[];
>   Money balance() {
>     Money sum = Money.zero();
>     for (int i = 0; i < transactions.length; i++)
>       sum = sum.plus(transactions[i].value);
>     return sum;
>   }
> ```

> ..이는 충분히 단순해 보인다.  
> - Transaction 은 값을 갖는다.
> - Account 는 잔액을 갖는다.

> ..이제부터 흥미로운 부분이다. 고객이 여러 계좌를 가지고 있고 전체 계좌의 잔액을 알고 싶어한다. 이를 구현하는 명백한 방법 한 가지는 새로운 클래스인 OverallAccount 를 만드는 것이다. OverallAccount 는 모든 Account 의 잔액을 합친다. 중복! 중복!

> ..Account 와 Transaction 이 동일한 인터페이스를 갖게 만들면 어떨까?  
> ```
> Interface Holding
>   Money balance();
> ```

> ..Transaction 에서는 balance 가 value 를 반환하게 만들면 된다.  
> ```
> Class Transaction
>   Transaction(Money value) {
>     this.value = value;
>   }
>   Money balance() {
>     return value;
>   }
> ```

> ..이제 Account 는 Transaction 이 아닌 Holding 의 조합(composite) 으로 만들 수 있다.  
> ```
> Class Account
>   Holding holdings[];
>   Money balance() {
>     Money sum = Money.zero();
>     for (int i = 0; i < holdings.length; i++)
>       sum = sum.plus(holdings[i].balance());
>     return sum;
>   }
> ```
> 
> (※ Account 가 Holding 들을 멤버변수로 가지고있는 것과 동시에 Holding 을 구현하고 있기때문에, 전체 Account 에 대한 인스턴스에서 개별 Account 에 대한 인스턴스들을 포함할 수 있게 된다.)  
> (※ 따라서 전체 Account 든 개별 Account 든 간에 그 Account 가 가지고 있는 Holding 인스턴스들의 balance() 결과값을 모으기만 하면, 해당 Account 가 가지고 있는 모든 하위 Account 와 Transaction 에 대한 최종 잔액을 집계할수 있게 된다.)

> ..위를 보면 컴포지트의 냄새가 드러나 있다. 실세계에서는 거래(transaction) 에 잔액(balance) 이 존재하지 않는다. **컴포지트 패턴을 적용하는 것은 프로그래머의 트릭이지 세상 사람들에게 일반적으로 받아들여지는 것은 아니다. 그렇지만 프로그램 설계에서 얻는 이득은 엄청난 것이어서, 이러한 개념적 단절은 종종 그만한 가치가 있다.** Folder 는 Folder 를 포함하고, TestSuite 는 TestSuite 를 포함하며, Drawing 은 Drawing 을 포함한다고 할 때, 이런 것들이 모두 실세계와 잘 들어맞지는 않지만 전부 코드를 훨씬 더 단순하게 만든다.



### 수집 매개 변수

> 여러 객체에 걸쳐 존재하는 오퍼레이션의 결과를 수집하려면 어떻게 해야 할까?  
> 결과가 수집될 객체를 각 오퍼레이션의 매개 변수로 추가한다.



### 싱글톤

> 전역 변수를 제공하지 않는 언어에서 전역 변수를 사용하려면 어떻게 해야 할까?  
> 사용하지 마라.

