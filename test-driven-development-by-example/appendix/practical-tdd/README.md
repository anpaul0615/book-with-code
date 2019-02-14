# 역자부록 : 실전 TDD


## GUI 프로그래밍에서의 TDD

> GUI 프로그래밍을 TDD 로 진행할 때는 다음 항목을 숙지하자.  
> 1) GUI 개발에서도 TDD 의 리듬을 유지하며 점진적으로 개발하자  
> 2) 모델과 뷰를 분리하자  
> 3) 뷰는 가능한 한 얇게 만든다  

> 뷰가 너무 자주 바뀌는 경우에 대해서는 생각해 볼 필요가 있다.

> 처음부터 UI 디자이너를 이용하고 GUI 코드를 작성하고 프로그램을 만들면, 모델과 뷰가 뒤섞인 코드를 작성할 수 있기 때문에, 모델 부분을 먼저 작성하는 것이 좋다.


### 언제나 늘 모델부터

> (마틴 파울러의 Separating User Interface Code 중에서)  
> "WIMP (Windows, Icon, Mouse, Pointer) 로 GUI 응용프로그램을 작성한다면, ..WIMP 인터페이스를 통해 할 수 있는 모든 일에 대해서 명령줄 인터페이스로 응용프로그램을 작성할 수 있어야 한다."

> 모델과 뷰가 완전히 분리되면 이 말은 바로 성립한다. 이는 테스트 가능성에서도 중요한데, TDD 를 하면서 주기를 짧게 하기 위해 "할 수 있는 가장 단순한 일은 무엇인가?" 라고 질문하며 작성하다 보면 적절하게 유도된다. TDD 에서의 리듬을 잘 유지하자.

> ```java
> class VendingMachine {
>		private Counter counter;
>		private DrinkContainer drinkContainer;
> 	public VendingMachine() {
> 		counter = new Counter();
> 		drinkContainer = new DrinkContainer();
> 	}
>		public void insertMoney(int money) {
> 		counter.insertMoney(money);
>		}
>		public int takeBackMoney() {
> 		return counter.takeBackMoney();
>		}
>		public int getCurrentMoney() {
> 		return counter.getCurrentMoney();
>		}
> 	//...
> }
> ```


### 뷰를 위한 컨트롤들을 진열하기

> 반환 부분과 관련된 계산 부분은 이미 VendingMachine 객체(모델 객체) 에서 구현해 놓았다. 이제 작성할 부분은 뷰에 해당하는 부분으로, 도메인 코드가 뷰와 연결만 되면 기능을 구현할 수 있다.

> (자동판매기 예제 step1 : 뷰 컨트롤 존재 확인부터 시작)
> ```java
> class VendingMachineGuiTest extends TestCase {
>		public void testPresentation() {
>			VendingMachinePanel vmp;
> 		vmp = new VendingMachinePanel();
> 		assertNotNull(vmp.moneyPanel);  // 뷰 컨트롤 존재 여부 테스트
> 		assertNotNull(vmp.takebackPanel);
> 		assertNotNull(vmp.buttonTakeBack);
> 		assertNotNull(vmp.bottonInsertMoney);
> 	}
> }
> ```

> (자동판매기 예제 step2 : 뷰 컨트롤의 속성값 확인)
> ```java
> class VendingMachineGuiTest extends TestCase {
> 	//...
>		public void testPresentationText() {
> 		assertEquals("0", vmp.moneyPanel.getTest());  // 뷰 컨트롤의 이름속성 초기값 테스트
> 		assertEquals("0", vmp.takebackPanel.getTest());
> 		assertEquals("takeback", vmp.buttonTakeBack.getTest());
> 		assertEquals("insertmoney", vmp.bottonInsertMoney.getTest());
>		}
> }
> ```

> GUI 의 컨트롤 배열이나 크기 등에 대해서는 자주 바뀌는 부분이므로 임의로 잡아주거나 테스트코드를 추가하는 방법으로 진행할 수 있다.


### 도메인 객체와 연결

> 뷰 객체와 도메인 객체(모델 객체) 는 서로 연결되어야 한다. 이는 간단한 getter/setter 다. 뷰가 도메인 객체와 대화할 때는 인터페이스를 정의한 후 대화해도 좋겠지만 일단은 간단하게 해보자.

> ```java
> class VendingMachineGuiTest extends TestCase {
> 	//...
> 	public void setUp() {
> 		super.setUp();
> 		VendingMachinePanel vmp;
> 		vmp = new VendingMachinePanel();
> 		vm = new VendingMachine();
> 	}
> 	public void testSetVendingMachine() {
> 		vmp.setVendingMachine(vm);  // 뷰 객체에 모델 객체를 등록
> 		assertNotNull(vmp.getVendingMachine());  // 뷰 객체에서 모델객체 확인
> 	}
> }
> ```

> ```java
> class VendingMachinePanel {
> 	public void setVendingMachine(VendingMachine vendingMachine) {
> 		this.vendingMachine = vendingMachine;
> 	}
> 	public VendingMachine getVendingMachine() {
> 		return this.vendingMachine;
> 	}
> 	// ...
> }
> ```


### 뷰-모델 간의 상호작용

> (동전 삽입 테스트)
> ```java
> class VendingMachineGuiTest extends TestCase {
> 	//...
> 	public void testInsertMoney() {
> 		vmp.setVendingMachin(vm);
> 		int money = 500;
> 		vmp.moneyPanel.setText(new Integer(money).toString());  // 수동으로 뷰 객체 동전 삽입 반영
> 		vmp.buttonInsertMoney.doClick();  // 수동으로 뷰 객체 동전 삽입 클릭이벤트 발생
> 		assertEquals(money, vm.getCurrentMoney());  // 동전 삽입 결과 확인 (모델 객체)
> 	}
> }
> 
> class VendingMachinePanel {
> 	// ...
> 	public VendingMachinePanel() {
> 		buttonInsertMoney.addActionListener(new ActionListener() {  // 동전 삽입 클릭이벤트
> 			public void actionPerformed(ActionEvent e) {
> 				vendingMachine.insertMoney(  // 모델 객체에 동전 삽입 반영
> 					Integer.parseInt(money.Panel.getText())
> 				);
> 			};
> 		});	
> 	}
> }
> 
> class VendingMachine {
> 	// ...
>		private void insertMoney(int money) {
> 		vmp.moneyPanel.setText(
> 			new Integer(money).toString());
> 		vmp.buttonInsertMoney.doClick();
>		}
> }
> ```

> (동전 반환 테스트)
> ```java
> class VendingMachineGuiTest extends TestCase {
> 	//...
> 	public void testTakeBackMoney() {
> 		vmp.setVendingMachine(vm);
> 		vmp.insertMoney(500);  // 수동으로 동전 삽입
> 		vmp.buttonTakeBack.doClick();  // 수동으로 동전 반환 클릭이벤트 발생
> 		assertEquals(0, vm.getCurrentMoney());  // 동전 반환 결과 확인 (모델 객체)
> 		assertEquals("500", vmp.takebackPanel.getText());  // 동전 반환 결과 확인 (뷰 객체)
> 	}
> }
> 
> class VendingMachinePanel {
> 	//...
> 	public VendingMachinePanel() {
> 		buttonTakeBack.addActionListener(new ActionListener() {  // 동전 반환 클릭이벤트
> 			public void actionPerformed(ActionEvent e) {
> 				int takebackMoney = vendingMachine.takeBackMoney();  // 모델 객체에 동전 반환 반영
> 				takebackPanel.setText(new Integer(takaback.Money).toString());  // 뷰 객체에 동전 반환 반영
> 			};
> 		});	
> 	}
> }
> ```

> 이러한 리듬으로 계속 진행할 수 있다. 하나하나 테스트를 작성하며 컨트롤을 붙여나가면, 컨트롤 간의 상호 작용에 대해서도 역시 테스트를 작성하고 구현하며 리팩토링하는 리듬을 유지할 수 있다. 



## 네트워크 프로그래밍에서의 TDD

(todo)



## 데이터베이스 프로그래밍에서의 TDD

(todo)



## 꾸준한 수련이 중요

(todo)


