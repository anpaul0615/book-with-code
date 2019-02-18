/**
 * Step 9
 * 
 * - 테스트코드 수정 (동치 함수 정의 + 구현)
 * - 테스트 통과 확인
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

test.skip('Dollar Equal Test (Step 9)', () => {
  expect( (new Dollar(5)).equals(new Dollar(5)) ).toBeTruthy();
  expect( (new Dollar(5)).equals(new Dollar(6)) ).toBeFalsy();
});
