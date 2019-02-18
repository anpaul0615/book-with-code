/**
 * Step 10
 * 
 * - 테스트 추가 (동치연산을 고려한 곱셈연산)
 * - 테스트 실패 확인 (정의되지 않은 함수; 반환값이 단순 VO 객체임)
 */

class Dollar {
  constructor(amount) {
    this.amount = amount;
  }
  multifly(n) {
    return Object.assign(
      JSON.parse(JSON.stringify(this)),
      {amount: this.amount * n}
    );
  }
  equals(obj) {
    return this.amount == obj.amount;
  }
}

test.skip('Dollar Multifly + Equal Test (Step 10)', () => {
  const five_dollars = new Dollar(5);
  expect( five_dollars.multifly(3).equals(new Dollar(15)) ).toBeTruthy();
  expect( five_dollars.multifly(5).equals(new Dollar(25)) ).toBeTruthy();
});
