/**
 * Step 8
 * 
 * - 테스트 추가 (동치 계산)
 * - 테스트 실패 확인 (정의되지 않은 함수)
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
}

test.skip('Dollar Equal Test (Step 8)', () => {
  expect( (new Dollar(5)).equeals(new Dollar(5)) ).toBeTruthy();
  expect( (new Dollar(5)).equeals(new Dollar(6)) ).toBeFalsy();
});
