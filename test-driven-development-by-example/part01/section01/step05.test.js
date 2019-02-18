/**
 * Step 5
 * 
 * - 테스트코드를 리펙토링한다
 * - 테스트 통과를 확인한다
 */

class Dollar {
  constructor(amount) {  // implements "contrutor()"
    this.amount = amount;
  }
  multifly(n) {  // implements "multifly()"
    this.amount *= n;
  }
}

test.skip('Dollar Multifly Test (Step 5)', () => {
  const five_dollars = new Dollar(5);
  five_dollars.multifly(3);
  expect(five_dollars.amount).toBe(15);
});
