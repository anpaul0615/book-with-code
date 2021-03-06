# 26장 빨간 막대 패턴
 

## 메모

> 빨간 막대 패턴은 테스트를 언제 어디에 작성할 것인지, 테스트 작성을 언제 멈출지에 대한 것이다.



### 한 단계 테스트

> 목록에서 다음 테스트를 고를 떄 무엇을 기준으로 할 것인가?  
> 여러분에게 새로운 무언가를 가르쳐 줄 수 있으며, 구현할 수 있다는 확신이 드는 테스트를 고를 것.

> .. 내가 테스트 목록을 볼 떈 보통 이런식이다. "이건 뻔하지, 이것도 뻔하고, 이건 잘 모르겠군, 이건 뻔하고, 이건... 내가 무슨 생각으로 적은 거지? **아, 이건 할 수 있겠다!**" 마지막에 말한 그 테스트가 바로 내가 다음으로 구현할 테스트인 것이다.

> ..전체 계산 중 간단한 하나의 사례를 나타내는 테스트에서 시작했다면, 이 테스트를 통해 자라는 프로그램은 하향식(top-down)으로 작성된 것으로 보일 수 있다. 반면 전체의 작은 한 조각을 나타내는 테스트에서 시작하여 조금씩 붙여나가는 식이었다면, 이 프로그램은 상향식(bottom-up)으로 작성된 것으로 보일 수도 있다.

> .."성장" 은 일종의 자기유사성을 가진 피드백 고리를 암시하는데, 이 피드백 고리에서는 환경이 프로그램에 영향을 주고 프로그램이 다시 환경에 영향을 준다.

> ..만약 메타포가 어떤 방향성을 가진 필요가 있다면 **(상향 혹은 하향보다는) "아는 것에서 모르는 것으로" 라는 방향이 유용할 것이다.**



### 시작 테스트

> 어떤 테스트부터 시작하는 게 좋을까?  
> **오퍼레이션이 아무 일도 하지 않는 경우를 먼저 테스트할 것.**

> ..새 오퍼레이션에 대한 첫 질문은 다음과 같을 것이다. "이 오퍼레이션을 어디에 넣어야 하지?" 이 질문에 답하기 전까지는 테스트에 뭘 적어야 할지 알 수 없을 것이다. 한 번에 한 문제만 해결하자는 의미에서 다른 질문은 다 빼고 딱 이 질문만 생각할 방법은 무엇인가?

> ..나는 다음 시작테스트를 작성했다.  
> ```
> Reducer r = new Reducer(new Polygon());
> assertEquals(0, reducer.result().npoints);
> ```
> **짠! 시작 테스트가 돌아간다.** 이제 목록에 있는 나머지 테스트를 처리할 차례다.

> ..내가 자주 테스트 주도로 개발하는 예 중 하나는 간단한 소켓 기반 서버다. 첫 번째 테스트는 다음과 같다.
> ```
> StartServer
> Socket = new Socket
> Message = "hello"
> Socket.write(message)
> AssertEquals(message, socket.read)
> ```
> 이제 나머지 테스트는 서버만으로 이루어질 수 있다. "우리가 이런 문자열을 받았다고 치고..."



### 설명 테스트

> 자동화된 테스트가 더 널리 쓰이게 하려면 어떻게 해야 할까?  
> **테스트를 통해 설명을 요청하고 테스트를 통해 설명하라.**

> ..사람들에게 그렇게 하라고 다짜고짜 밀어붙이는 만큼 TDD 가 퍼지는 것을 빨리 막는 건 없다. **당신이 매니저건 리더건 간에, 사람들이 일하는 방식을 강제로 바꿀 수는 없다.**

> ..어떻게 해야 하나? 단순한 시작법은 테스트를 이용하여 묻고, 테스트를 이용하여 설명하는 것이다. "당신이 설명한 걸 제가 제대로 이해했는지 한 번 얘기해보겠습니다. 예를 들어서 Foo 를 이런 식으로 설정하고 Bar 를 이런식으로 설정하면 76 이 나와야 한다, 이거죠?"

> ..그리고 테스트를 이용하여 설명하는 방법은 다음과 같다. "그러니까 어떻게 해야 하는 건지 설명하겠습니다. Foo 를 이런 식으로 설정하고 Bar 를 이런 식으로 설정하면 76 이 나와야 된다는 겁니다. Foo 가 이렇고 Bar 가 이러면 답은 76 이 되겠죠."

> ..이걸 더 추상적인 차원에서도 시도할 수 있다. 만약 누군가 여러분에게 시퀀스 다이어그램을 설명하려고 하면, 이걸 좀더 친숙한 방법으로 바꿔도 될지 물어본다. 그런 다음 시퀀스 다이어그램에 나타난 모든 요소들을 포함하는 테스트케이스를 작성해 보이는 것이다.



### 학습 테스트

> 외부에서 만든 소프트웨어에 대한 테스트를 작성해야 할 때도 있을까?  
> 패키지의 새로운 기능을 처음으로 사용해보기 전에 테스트를 작성할 수 있다.

> ..**그냥 바로 사용하는 대신 API 가 우리 예상대로 실행된다는 것을 확인해줄 만한 작은 테스트를 만들어 보는 것이다.**

> ..제임스 뉴커크는 학습 테스트를 작성하는 것이 관례였던 프로젝트에 대해 알려주었다. 패키지의 새 버전이 도착하면 우선 테스트를 실행한다. (그리고 필요하다면 수정한다) **만약 테스트가 통과되지 않는다면 애플리케이션 역시 실행되지 않을 것이 뻔하기 때문에 애플리케이션을 실행해볼 필요도 없다. 일단 테스트가 통과한다면 애플리케이션은 항상 제대로 돌아갈 것이다.**



### 또 다른 테스트

> 어떻게 하면 주제에서 벗어나지 않고 기술적인 논의를 계속할 수 있을까?  
> 주제와 무관한 아이디어가 떠오르면 이에 대한 테스트를 할일 목록에 적어놓고 다시 주제로 돌아올 것.

> ..대화를 엄격하게 한 주제로 묶는 것은 훌륭한 아이디어를 억압하는 최고의 방법이다. 이리 저리 건너뛰어 다니다가 "도대체 어쩌다 이런 얘길 하고 있는 거지? 무슨 상관이람, 이거 참 좋은 아이디어인데!" 하고 생각하는 것이다.

> ..**때때로 프로그래밍은 뭔가 훌쩍 뛰어 넘는 기회에 의존한다. 하지만 대부분의 프로그래밍은 조금 더 일반 보행에 가깝다.**

> ..하루 온종일 비생산적인 날들을 보낸 경험에서, 내가 가야할 길을 놓치지 않는 것이 때로는 최선임을 배웠다. **새 아이디어가 떠오르면 존중하고 맞이하되 그것이 내 주의를 흩뜨리지 않게 한다. 그 아이디어를 리스트에 적어놓고는 하던 일로 다시 돌아간다.**



### 회귀 테스트

> 시스템 장애가 보고될 때 여러분은 무슨 일을 제일 먼저 하는가?  
> 그 장애로 인하여 **실패하는 테스트**, 그리고 통과할 경우엔 **장애가 수정되었다고 볼 수 있는 테스트**를 가장 간단하게 작성하라.

> ..회귀테스트(regression test)란, 사실 여러분에게 완벽한 선견지명이 있다면, 처음 코딩할 때 작성했어야 하는 테스트다. 회귀테스트를 작성할 때는 이 테스트를 작성해야 한다는 사실을 어떻게 하면 애초에 알 수 있었을지 항상 생각해보라.

> ..애플리케이션 차원의 회귀테스트는 시스템의 사용자들이 여러분에게 정확히 무엇을 기대했으며 무엇이 잘못되었는지 말할 기회를 준다.

> ..좀 더 작은 차원에서의 회귀테스트는 당신의 테스트를 개선하는 방법이 된다.

> ..**시스템 장애를 손쉽게 격리시킬 수 없다면 리팩토링해야 한다. 이러한 종류의 장애가 있다는 것은, 시스템이 여러분에게 다음과 같은 말을 한다는 뜻이다. "아직 내 설계를 마무리 못했구먼!"**



### 휴식

> 지치고 고난에 빠졌을 떈 뭘 해야 하나?  
> 그럴 떈 좀 쉬는게 좋다.

> ..종종 이 정도의 거리 두기를 통해 당신에게 부족했던 아이디어가 튀어 나올 수 있다. 다음과 같은 생각이 들면서 여러분은 벌떡 일어날 것이다. "매개 변수를 뒤집은 상태에서 시도한 적은 없었지!!"

> ..만약 바로 그 아이디어를 얻지 못한다면, 현재 세션의 목적을 다시 검토해보라. 여전히 현실적인가, 아니면 새로운 목적을 골라야 하는가? 당신이 이루려고 노력했던 것이 불가능한 건 아닌가? 만약 그렇다면 팀에는 어떤 의미가 있나?

> ..데이브 웅가 는 이걸 샤워방법론 이라고 부른다. 키보드로 뭘 쳐야 할지 알면, 그걸 치면 된다. 뭘 해야 할지 모르겠으면 샤워하러 가서 뭘 해야할지 생각날때까지 계속 샤워를 한다. 그의 방법론을 따르면 많은 팀들이 더 행복해질 것이고 생산성도 향상될 것이며 냄새도 훨씬 덜 날것이다. (ㅋㅋ)

> ..TDD 는 웅가의 샤워방법론을 정제한 것이다. **키보드로 뭘 쳐야 할지 알면, 명백한 구현을 한다. 잘 모르겠다면 가짜 구현을 한다. 올바른 설계가 명확하지 않다면 삼각측량 기법을 사용한다. 그래도 모르겠다면 샤워나 하러 가는거다.**

> ..그림 26.1은 휴식의 역학을 나타낸다. 피로해지면 (판단력이 떨어지므로) 여러분이 피로해졌다는 것을 올바로 인식하기가 힘들어진다. 그래서 계속 일하면 더 피곤해진다.

> ..이 고리에서 빠져나가는 방법은 추가로 외부 요소를 도입하는 것이다.  
> 1) 시간 단위로는, 물병을 키보드 옆에 두어서 **생리현상**으로 규칙적인 휴식을 하도록 유도하라.  
> 2) 하루 단위로는, ..정규 **근무시간 후의 약속**이 진행을 일단 멈추는 데에 도움이 될 수 있다.  
> 3) 주 단위로는, ..업무 관련 생각을 떨쳐버리는데에 **주말 활동**이 도움이 된다.  
> 4) 년 단위로는, **강제 휴가 정책**이 여러분의 재충전을 완벽히 도와줄 것이다.



### 다시 하기

> **길을 잃은 느낌이 들 떈** 어떻게 할까?  
> **코드를 다 지워버리고 처음부터 다시 해보자.**

> ..코드가 좀 꼬였었다. ..내 본능적인 반응은 꼬인 코드를 계속 진행할 수 있을만큼만 풀어 놓자는 것이다. 숙고해보기 위해 잠깐 멈추어 생각해보면, 처음부터 다시 하는게 항상 더 합리적이라고 결론 났다.

> ..어느 날은 개의치않고 그냥 밀고 나갔었는데 결국 원고 25쪽을 내다 버리게 됐다. 왜냐하면 원고의 내용이 확실히 바보같은 프로그래밍 실수에 기반을 두었기 때문이다.

> ..만약 짝 프로그래밍을 한다면, 파트너를 바꿔주는 것은 생산적인 "다시 하기" 를 돕는 좋은 방편이 될 것이다.



### 싸구려 책상, 좋은 의자

> TDD 를 할 떄 어떤 물리적 환경이 적절한가?  
> 나머지 시설은 싸구려를 쓸지라도 정말 좋은 의자를 구해라.

> ..내가 제안하는 해법은 컴퓨터를 놓을 책상은 싸구려에 못생기고 접을수 있는걸 쓰더라도, 의자는 최고로 좋은 걸 쓰라는 것이다.

> ..짝프로그래밍을 할 때도 편안해야 한다. **키보드를 이리저리 움직일 수 있도록 책상을 정리해야 한다.** 각 파트너는 자신이 주도할 때 키보드를 자기 앞에 편안히 놓을 수 있어야 한다.

> ..익스트림프로그래밍에서 권장하는 사무실 배치는 파티션이 없는 넓은 공간의 가운데에 큰 테이블을 놓고 그 테이블 주위로 짝프로그래밍을 하는 개발자들이 둘러 앉아 있으며 (이를 워름(warroom) 혹은 오픈룸 이라고 한다), 개인이 사적인 용도로 사용할 컴퓨터를 구석에 따로 배치하는 것이다. 이러한 개발 환경은 팀 내 의사소통을 원활하게 해주며 생산성을 크게 높여주는 것으로 알려져 있다.


