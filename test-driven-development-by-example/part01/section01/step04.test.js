/**
 * Step 4
 * 
 * - 테스트 통과만을 위해 테스트코드를 수정한다 (amount 프로퍼티 정의 + 초기화)
 * - 테스트 통과를 확인한다
 */

class Dollar {
  constructor() {
    this.amount = 15;  // define "amount"
  }
  multifly() {}
}

test.skip('Dollar Multifly Test (Step 4)', () => {
  const five_dollars = new Dollar(5);
  five_dollars.multifly(3);
  expect(five_dollars.amount).toBe(15);
});
