# 부록B : 피보나치 예시


## 메모

> 이 책의 검토자 중 한 명의 질문에 대한 답으로 나는 피보나치 수열을 테스트 주도로 개발해 올렸다. 몇 명의 검토자들이 이 예를 보고 TDD 가 어떻게 작동하는지 이해하는 데 큰 도움이 되었다고 했다. ..이 책의 주 예제를 읽은 후에도 여전히 번쩍이는 깨달음을 얻지 못했다면 여기를 잠깐 들여다보고 머릿속 전등이 켜지는지 살펴보자.


> 첫번째 테스트는 `fib(0) = 0` 이라는 걸 보여준다. 구현은 상수를 반환한다.  
> ```java
> int fib(int n) {
> 	return 0;
> }
> 
> public void testFibonacci() {
> 	assertEquals(0, fib(0));  //pass
> }
> ```


> 두번째 테스트는 `fib(1) = 1` 이라는 걸 보여준다.  
> ```java
> int fib(int n) {
> 	return 0;
> }
> 
> public void testFibonacci() {
> 	assertEquals(0, fib(0));  //pass
> 	assertEquals(1, fib(1));  //err..!
> }
> ```


> 이게 돌아가도록 하는 덴 몇가지 방법이 있다. 나는 0 을 특별한 경우로 다루는 방법을 쓰겠다.  
> ```java
> int fib(int n) {
> 	if (n == 0) return 0;
> 	return 1;
> }
> 
> public void testFibonacci() {
> 	assertEquals(0, fib(0));  //pass
> 	assertEquals(1, fib(1));  //pass
> }
> ```


> 테스트케이스에 있는 중복이 점점 성가시게 느껴지기 시작하는데, 새 케이스를 추가하면 더 악화되기만 할 것 같다. 입력과 예상값으로 구성된 테이블을 통해 테스트가 돌아가게 하면 단언의 공통 구조를 추출할 수 있을 것이다.  
> ```java
> int fib(int n) {
> 	if (n == 0) return 0;
> 	return 1;
> }
> 
> public void testFibonacci() {
> 	int cases[][] = { {0,0}, {1,1} };
> 	for (int i=0; i<cases.length; i++)
> 		assertEquals(0, fib(0));  //all pass
> }
> ```


> 이제 다음 케이스를 추가하려면 키보드를 여섯번만 치면 된다.  
> ```java
> int fib(int n) {
> 	if (n == 0) return 0;
> 	return 1;
> }
> 
> public void testFibonacci() {
> 	int cases[][] = { {0,0}, {1,1}, {2,1} };  //add new testcase {2,1}
> 	for (int i=0; i<cases.length; i++)
> 		assertEquals(0, fib(0));  //all pass
> }
> ```


> 당황스럽게도 테스트가 제대로 돌아간다. 우리가 고른 상수 1 이 이 케이스에도 들어맞는 값이기 때문에 그런 일이 벌어졌다. 다음 테스트로 넘어가보자.  
> ```java
> int fib(int n) {
> 	if (n == 0) return 0;
> 	return 1;
> }
> 
> public void testFibonacci() {
> 	int cases[][] = { {0,0}, {1,1}, {2,1}, {3,2} };  //add new testcase {3,2}
> 	for (int i=0; i<cases.length; i++)
> 		assertEquals(0, fib(0));  //err..!
> }
> ```


> 야호, 이제 실패한다. 이전의 전략을 똑같이 적용해서 다음과 같이 작성한다.  
> ```java
> int fib(int n) {
> 	if (n == 0) return 0;
> 	if (n <= 2) return 1;  //add new exit condition
> 	return 2;  //change return const value
> }
> 
> public void testFibonacci() {
> 	int cases[][] = { {0,0}, {1,1}, {2,1}, {3,2} };
> 	for (int i=0; i<cases.length; i++)
> 		assertEquals(0, fib(0));  //all pass
> }
> ```


> 이제 일반화할 준비가 되었다. 우리가 반환값을 2 라고 쓰긴 했지만 정말 2 를 뜻하는 것은 아니고, 1+1 을 의마한다.  
> ```java
> int fib(int n) {
> 	if (n == 0) return 0;
> 	if (n <= 2) return 1;
> 	return 1 + 1;  //change return value (to generalized value from const value)
> }
> 
> public void testFibonacci() {
> 	int cases[][] = { {0,0}, {1,1}, {2,1}, {3,2} };
> 	for (int i=0; i<cases.length; i++)
> 		assertEquals(0, fib(0));  //all pass
> }
> ```


> 일반화한 반환값의 첫번째 1 은 `fib(n-1)` 로 볼 수 있다.  
> ```java
> int fib(int n) {
> 	if (n == 0) return 0;
> 	if (n <= 2) return 1;
> 	return fib(n-1) + 1;  //change return value (to generalized expression from generalized value)
> }
> 
> public void testFibonacci() {
> 	int cases[][] = { {0,0}, {1,1}, {2,1}, {3,2} };
> 	for (int i=0; i<cases.length; i++)
> 		assertEquals(0, fib(0));  //all pass
> }
> ```


> 마찬가지로 반환값의 두번째 1 은 `fib(n-2)` 로 볼 수 있다.  
> ```java
> int fib(int n) {
> 	if (n == 0) return 0;
> 	if (n <= 2) return 1;
> 	return fib(n-1) + fib(n-2);  // (to generalized expression from generalized value)
> }
> 
> public void testFibonacci() {
> 	int cases[][] = { {0,0}, {1,1}, {2,1}, {3,2} };
> 	for (int i=0; i<cases.length; i++)
> 		assertEquals(0, fib(0));  //all pass
> }
> ```


> 동일한 구조가 `fib(2)` 에서도 작동하기 때문에 결국 두번째 조건을 강화할 수 있다.  
> ```java
> int fib(int n) {
> 	if (n == 0) return 0;
> 	if (n == 1) return 1;  //change exit condition
> 	return fib(n-1) + fib(n-2);
> }
> 
> public void testFibonacci() {
> 	int cases[][] = { {0,0}, {1,1}, {2,1}, {3,2} };
> 	for (int i=0; i<cases.length; i++)
> 		assertEquals(0, fib(0));  //all pass
> }
> ```


> 이렇게 해서 우리는 완전히 테스트로부터 유도된 피보나치를 완성하게 되었다.


