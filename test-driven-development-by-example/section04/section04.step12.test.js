/**
 * Step 12
 * 
 * - 테스트 수정 (동치연산에 대한 위임을 테스트 객체로 이동)
 * - 테스트 통과 확인
 */

class Dollar {
  constructor(amount) {
    this.amount = amount;
  }
  multifly(n) {
    return new Dollar(this.amount * n);
  }
}

test.skip('Dollar Multifly + Equal Test (Step 12)', () => {
  const five_dollars = new Dollar(5);
  expect( five_dollars.multifly(3) ).toEqual(new Dollar(15));
  expect( five_dollars.multifly(5) ).toEqual(new Dollar(25));
});
