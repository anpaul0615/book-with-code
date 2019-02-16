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

> XP 에서 주문처럼 불리는 "Do The Simplest Thing That Cloud Possibly Work"(제대로 돌아가는 가장 간단한 것을 하라) 를 생각해볼 때, 만들어야 하는 프로그램도 여러가지 간단한 작업 묶음으로 나눌 수 있다.


### 제대로 돌아가는 가장 간단한 것은 무엇일까?

> (대문자 변환 서버 테스트코드 : 대문자 변환 기능 확인)
> ```java
> class UpperServerTest extends TestCase {
> 	public void testUpper() {
> 		UpperServer us = new UpperServer();
> 		assertEquals("TESTING", us.toUpper("testing"));  // 대문자 변환 기능부터 테스트
> 	}
> }
> ```

> (대문자 변환 서버 모델코드 : 대문자 변환 기능 가짜 구현)
> ```java
> class UpperServer {
> 	public String toUpper(String str) {
> 		return "TESTING";  // 상수 대문자 반환
> 	}
> }
> ```

> (대문자 변환 서버 모델코드 : 대문자 변환 기능 리팩토링)
> ```java
> class UpperServer {
> 	public String toUpper(String str) {
> 		return str.toUpperCase();  // 변환된 대문자 반환
> 	}
> }
> ```

> 서버 프로그래밍을 하고 있지만, 처음 작성한 코드에 우선적으로 서버를 리슨하거나 사용자 접속 처리 등의 기능을 작성하지 않고, 실제 그 서버가 하는 일, 즉 로직 부분을 먼저 작성했다.

> 보통 개발할 때 네트워크 프레임워크부터 작성한 후 로직을 작성하는데, TDD 로 접근할 때는 로직에 해당하는 부분에 먼저 접근하는 것이 좋다. 네트워크나 GUI 부분을 먼저 작성하면 다른 라이브러리에 대해 의존성이 발생하고, 테스트-구현-리팩토링의 리듬이 길어지기 때문이다. DTSTTCPW 를 상기해보자.


### 모의 객체 이용

> 테스트를 진행할 때, 꼭 클라이언트 소켓이 서버에 접속할 필요는 없다. 일종의 가짜 접속을 만드는 방법을 생각해보자.

> (커넥션 모의객체를 통한 문자열 수신 기능 테스트)
> ```java
> class UpperServerTest extends TestCase {
> 	//...
> 	public void testReceive() {
> 		MockConnection conn = new MockConnection();
> 		String str = "testing";
> 		conn.setReceivedString(str);  // 수동으로 문자열 수신 버퍼 등록 (서버커넥션)
> 		UpperServer us = new UpperServer();
> 		us.receive(conn);  // 수동으로 문자열 수신 실행 (서버)
> 		assertEquals("str", us.getReceivedString());  // 수동으로 문자열 수신 확인
> 	}
> }
> ```

> (커넥션 모의객체)
> ```java
> class MockConnection extends UserConnection {
> 	private String receivedString;
> 	
> 	public String receive() {  // 모의 수신 확인
>			return this.recevedString;
> 	}
> 	public void setReceivedString(String str) {  // 모의 수신 등록 (수신 예정 문자열 저장)
>			return this.recevedString = str;
> 	}
> }
> ```

> (모의객체와 실제 구현할 객체에서 사용할 커넥션 인터페이스)
> ```java
> class UserConnection {
> 	public String receive() {
>			return null;
> 	}
> }
> ```

> (대문자 변환 서버에 커넥션 인터페이스 객체 적용)
> ```java
> class UpperServer {
> 	private String receivedString;
> 	
> 	public String toUpper(String str) {  // 대문자 변환
> 		return str.toUpperCase();
> 	}
> 	public void recevie(UserConnection conn) {  // 커넥션 인터페이스에서 문자열 수신
> 		this.receivedString = conn.receive();
> 	}
> 	public String getReceivedString() {  // 수신한 문자열 확인
> 		return receivedString;
> 	}
> }
> ```

> 이렇게 모의 객체를 만든 후 TDD 를 진행하면, 매번 서버에 접속해서 제대로 작동하는지 확인하는 것보다 더 빠르게 작업할 수 있고, 디자인도 원하는 대로 자유롭게 할 수 있다.

> 하지만 단점이 있다. 모의 객체를 사용할때는 테스트가 잘 돌아가는데, 실제 객체를 사용하면 제대로 되지 않을 수도 있다. 그러므로 TDD 를 처음에 진행할 때는 모의 객체를 사용하되, 이느 정도 코드 구현이 진행되면 실제 객체를 사용한 테스트도 함께 실행해야 한다.

> (실제 소켓을 이용한 클리이언트 접속 테스트)
> ```java
> class UpperServerTest extends TestCase {
> 	//...
> 	public void testConnect() {
> 		UpperServer us = new UpperServer();
> 		int port = 5000;
> 		us.serve(port);  // 서버 연결대기 시작
> 		Socket sock = new Socket("localhost", port);  // 클라이언트 연결 시작
> 		Thread.sleep(100);
> 		assertEquals(1, us.getConnectionCount());  // 서버 커넥션 개수 확인
> 	}
> }
> 
> class UpperServer {
> 	//...
> 	private int connectionCount;
> 	private SocketListen socketListen;
> 	
> 	public void serve(int port) {
> 		connectionCount = 0;
> 		socketListen = new SocketListen(port);  // 커넥션 연결요청 수신대기 시작
> 		listenConnection();
> 	}
> 	private void listenConnection() {
> 		new Thread( new Runnable() {
> 			public void run() {
> 				try {
> 					Socket user = socketListen.accept();  // 클라이언트 커넥션 연결요청 받자마자
> 					connectionCount++;  // 커넥션 카운팅 하고
> 					user.close();  // 커넥션 종료
> 				} catch (IOException e) {
> 					e.printStackTrace();
> 				}
> 			}
> 		}).start();
> 	}
> 	public int getConnectionCount() {  // 현재 커넥션 카운터 확인
> 		return this.connectionCount;
> 	}
> 	public void close() {  // 커넥션 연결요청 수신대기 종료
> 		socketListen.close();
> 	}
> }
> ```

> (대문자 반환 서버가 처리 결과를 클라이언트로 보내는 과정 확인)
> ```java
> class UpperServerTest extends TestCase {
> 	//...
> 	public void testUpperRespond() {
> 		MockConnection conn = new MockCOnnection();
> 		String str = "testing";
> 		conn.setReceivedString(str);
> 		UpperServer us = new UpperServer();
> 		us.upperRespond(conn);
> 		assertEquals("TESTING", conn.getSentString());
> 	}
> }
> 
> class MockConnection extends UserConnection {
> 	//...
> 	private String receivedString;
> 	private String sentString;
> 	
> 	public String receive() {
>			return this.receivedString;
> 	}
> 	public void setReceivedString(String str) {
>			return this.receivedString = str;
> 	}
> 	public void send(String str) {  // 모의 송신 (송신 예정 문자열 저장)
>			this.sentString = str;
> 	}
> 	public String getSentString() {  // 모의 송신 확인
>			return this.sentString;
> 	}
> }
> 
> class UpperServer {
> 	//...
> 	public void upperRespond(UserConnection conn) {
> 		String str = conn.receive();  // 모의커넥션객체에서 문자열 수신
> 		String upperdStr = toUpper(str);  // 수신문자열 대문자 변환
> 		conn.send(upperdStr);  // 모의커넥션객체로 변환 문자열 송신
> 	}
> }
> ```

> (실제 소켓객체 기반 서버 동작 확인)
> ```java
> class UpperServerTest extends TestCase {
> 	//...
> 	public void testServe() {
> 		int port 5000;
> 		UpperServer us = new UpperServer();
> 		us.serve(port);  // 실제 소켓객체로 서버 연결대기 시작
> 		
> 		Socket sock = new Socket("localhost", port);  // 실제 소켓객체로 서버 연결
> 		BufferedReader br = new BufferedReader(new InputStreamReader(sock.getInputStream()));  // 실제 소켓객체와 입력스트림 연결
> 		BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(sock.getOutputStream()));  // 실제 소켓객체와 출력스트림 연결
> 		bw.write("iwanttoupper");  // 입력스트림으로 실제 소켓객체로 메시지 송신
> 		bw.newLine();
> 		bw.flush();
> 		
> 		String actual = br.readLine();  // 출력스트림으로 실제 소켓객체에서 수신한 메시지 확인
> 		String expected = "IWANTTOUPPER";  // 응답문자열 기대값
> 		Thread.sleep(100);
> 		us.close();  // 실제 소켓객체 서버 연결대기 종료
> 		
> 		assertEquals(actual, expected);  // 응답문자열 비교 확인
> 	}
> }
> 
> class UserConnection {
> 	//...
> 	private Socket socket;
> 	private BufferedReader reader;
> 	private BufferedWriter writer;
> 	
> 	public String receive() {  // 입력스트림객체로 실제 수신
> 		String received = reader.readLine();
> 		return received;
> 	}
> 	public void send(String str) {  // 출력스트림객체로 실제 송신 
> 		writer.write(str);
> 		writer.newLine();
> 		writer.flush();
> 	}
> 	public void setSocket(Socket sock) {  // 실제 소켓객체 등록
> 		this.socket = socket;
> 		reader = new BufferedReader(new InputStreamReader(sock.getInputStream()));
> 		writer = new BufferedWriter(new OutputStreamWriter(sock.getOutputStream()));
> 	}
> 	public void close() {  // 실제 소켓객체 연결해제
>			this.socket.close();
> 	}
> }
> 
> class UpperServer {
> 	//...
> 	public void serve(int port) {
> 		connectionCount = 0;
> 		socketListen = new SocketListen(port);
> 		listenConnection();
> 	}
> 	private void listenConnection() {
> 		new Thread( new Runnable() {
> 			public void run() {
> 				try {
> 					UserConnection userConn = new UserConnection();
> 					Socket userSock = socketListen.accept();  // 클라이언트 소켓연결 받자마자
> 					connectionCount++;  // 커넥션 카운팅 하고
> 					userConn.setSocket(userSock);  // 클라이언트소켓을 클라이언트커넥션에 등록하고
> 					upperRespond(userConn);  // 클라이언트커넥션으로 서버응답처리 실행하고
> 					userConn.close();  // 클라이언트커넥션 종료
> 				} catch (IOException e) {
> 					e.printStackTrace();
> 				}
> 			}
> 		}).start();
> 	}
> }
> ```


### 정보 은닉 : 셀프 션트(Self-Shunt) 패턴의 이용

> (사이트 게시판 크롤링 프로그램에 대한 요구사항)  
> - 해당 사이트에 접속할 수 있다. 이때 http 로 해당 웹서버에 접속해서 데이터를 GET 또는 POST 로 보낸 후 그 결과물을 받는다.  
> - 결과물에는 HTML 문서 파일이 있거나 이미지 파일이 있을 수 있다.  
> - 로그인을 할 수 있어야 한다. 이에 대해서는 일종의 쿠키 관련 처리가 필요하다.  
> - 얻어온 HTML 파일에 대해 실제 이용하려는 데이터로 문서를 분석해야 한다.  
> - 분석해 만들어진 데이터를 파일에 저장한다.  

> 일단은 http 로 웹 서버에 접속하는 부분부터 만들어야 할 것 같지만 실제로는 어떠한 부분이 먼저 작성되건 싱관없다. 중간 중간 의존성을 가지는 부분에 대해 임의의 데이터를 이용하면 된다. 각각의 일은 독립적으로 구현할 수 있다.  
> - 분석해야 할 HTML 파일을 일단 웹브라우저를 이용해서 파일로 저장한 다음 이를 분석하는 모듈을 TDD 로 작성할 수 있다.  
> - 데이터가 이미 분석됐다고 가정하고 이를 파일에 저장하도록 할 수 있다.  
> - http 접근을 통해 문서나 이미지를 얻어온 후 제대로 얻어왔는지에 대해 TDD 로 접근할 수 있다.  
> - 전체를 통합할 떄 제대로 돌아가는지에 대해서 TDD 로 작성하며 통합할 수 있다.  

> (사이트 게시판 크롤링 프로그램에 대한 TDD 결과물)  
> ```python
> class HtmlFileTest(unittest.TestCase) :
> 	def getTextFromFile(self, filename) :
> 		return getTextFromFile("testdatas/" + filename)
> 
> 
> class AlbumPageExtractLocalTest(HtmlFileTest) :
> 	def setUp(self) :
> 		page = self.getTextFromFile("album-page-2.html")  ## 미리 준비한 파일로부터 HTML 문서데이터 가져오기
> 		self.albumpage = AlbumPageExtractor(page).AlbumPage()
> 	
> 	def testExtractTotalPage(self) :
> 		self.assertEquals(1, self.albumpage.getTotalPage())
> 	
> 	def testExtractCellNum(self) :
> 		expected = ['9','8','7','6','5','4','3','2','1']
> 		self.assertEquals(expected, self.albumpage.cellNums())
> 	
> 	# ...
> ```

> 여기에서 기본적인 간단한 아이디어는 각 단계 사이사이에 대해서 "이 부분을 작성하기 위해 필요한 부분을 누군가가 잘 만들어 놓았다" 라고 가정하는 것이다. 그리고 그 부분에 대해서는 모의 객체를 이용하면 된다. 모의 객체는 테스트를 작성할 때 어려운 상황에 대해 다양한 아이디어를 제공한다.

> ```python
> class AlbumPageExtractLocalTest(HtmlFileTest) :
> 	# ...
> 	def testExtract(self) :
> 		
> 		class MockPage:  ## 앨범페이지 HTML 을 반환하는 모의객체
> 			def toString(self) :
> 				return getTextFromFile("testdatas/album-page-2.html")
> 		
> 		page = MockPage()  ## 모의객체에서 가져온 HTML
> 		albumpage = AlbumPageExtractor(page).AlbumPage()  ## HTML 에서 데이터 추출
> 		self.assertEquals(1, albumpage.getTotalPage())
> ```

> 모의 객체를 작성하면서 자연스럽게 Page 라는 클래스가 디자인된다. 이것의 장점은, 추후 Page 내의 HTML 문서 데이터가 필요할 때, 이를 어디서 어떻게 얻어오는지에 대해서 클래스 사용자가 신경쓰지 않아도 된다는 것이다. 즉 일종의 정보 은닉이 된다.

> 어느 시점에서 어떤 URL 로부터 문서 데이터를 긁어오는지는 중요하지 않고, 필요할 때 데이터가 들어오기만 하면 된다. 즉 AlbumPageExtractor 는 필요할 때 Page 클래스에서 HTML 문서 데이터를 제대로 보내준다는 것만 알면 되고, 그 외의 데이터가 어디에서 어떠한 방법으로 오는지에 대해서는 신경 쓸 필요가 없게 된다.

> 다음과 같이 구현할 수도 있다. Mock 위치에 아예 테스트 자신의 레퍼런스를 넣는 것이다. 이를 이용해 TDD 를 할 때 다른 모듈에 구애 받지 않고 독립적으로 테스트를 진행할 수 있다.  
> ```python
> class AlbumPageExtractLocalTest(HtmlFileTest) :
> 	# ...
> 	def testExtract(self) :
> 		albumpage = AlbumPageExtractor(page).AlbumPage()  ## 자기자신의 toString 을 호출해서 HTML 가져오기
> 		self.assertEquals(1, albumpage.getTotalPage())
> 	
> 	def toString(self) :
> 		return getTextFromFile("testdatas/album-page-2.html")
> ```

> 이를 Self-Shunt 패턴이라고 한다. TDD 하는 중 입력-결과 테스트(블랙박스 테스트) 가 어려울 때 모의 객체나 Self-Shunt 패턴을 이용하면 객체 내부의 상태 변화 과정에 대한 테스트(화이트박스 테스트) 가 가능해진다.



## 데이터베이스 프로그래밍에서의 TDD

(todo)



## 꾸준한 수련이 중요

(todo)


