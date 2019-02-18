/**
 * Step 11
 * 
 * - 테스트 수정 (multifly 반환값을 VO 가 아닌 실제 객체로 수정)
 * - 테스트 통과 확인
 */

class Dollar {
  constructor(amount) {
    this.amount = amount;
  }
  multifly(n) {
    return new Dollar(this.amount * n);
  }
  equals(obj) {
    return this.amount == obj.amount;
  }
}

test.skip('Dollar Multifly + Equal Test (Step 11)', () => {
  const five_dollars = new Dollar(5);
  expect( five_dollars.multifly(3).equals(new Dollar(15)) ).toBeTruthy();
  expect( five_dollars.multifly(5).equals(new Dollar(25)) ).toBeTruthy();
});
