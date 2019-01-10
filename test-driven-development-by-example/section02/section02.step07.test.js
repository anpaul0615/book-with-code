/**
 * Step 7
 * 
 * - 테스트 통과만을 위해 테스트코드를 수정한다 (연산후 자기 클래스 객체 반환)
 * - 테스트 통과를 확인한다
 */

class Dollar {
  constructor(amount) {
    this.amount = amount;
  }
  multifly(n) {  // change "return value" to "return object (based 'this' object)"
    return Object.assign(
      JSON.parse(JSON.stringify(this)),
      {amount: this.amount * n}
    );
  }
}

test.skip('Dollar Multifly Test (Step 7)', () => {
  const five_dollars = new Dollar(5);
  const product_1 = five_dollars.multifly(3);
  expect(product_1.amount).toBe(15);
  const product_2 = five_dollars.multifly(5);
  expect(product_2.amount).toBe(25);
});
