/**
 * Step 6
 * 
 * - 테스트를 추가한다 (다중 곱셈)
 * - 테스트 실패를 확인한다 (반환 객체가 undefined)
 */

class Dollar {
  constructor(amount) {
    this.amount = amount;
  }
  multifly(n) {
    this.amount *= n;
  }
}

test.skip('Dollar Multifly Test (Step 6)', () => {
  const five_dollars = new Dollar(5);
  const product_1 = five_dollars.multifly(3);
  expect(product_1.amount).toBe(15);
  const product_2 = five_dollars.multifly(5);
  expect(product_2.amount).toBe(25);
});
