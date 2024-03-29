/**
 * Step 17
 * 
 * - 새로운 테스트 추가 (Dollar 와 Franc 의 동치비교)
 * - 테스트 실패 확인 (equals 함수에서 총액만 비교하는 문제발생)
 */

class Money {
  constructor(amount) {
    this.amount = amount;
  }
  equals(obj) {
    return this.amount == obj.amount;
  }
}

class Dollar extends Money {
  multifly(n) {
    return new Dollar(this.amount * n);
  }
}

class Franc extends Money {
  multifly(n) {
    return new Franc(this.amount * n);
  }
}

describe.skip('Dollar & Franc Calculation (Step 17)', ()=>{
  test('Dollar Multifly + Equal Test', () => {
    const five_dollars = new Dollar(5);
    expect( five_dollars.multifly(3) ).toEqual(new Dollar(15));
    expect( five_dollars.multifly(5) ).toEqual(new Dollar(25));
  });
  test('Franc Multifly + Equal Test', () => {
    const ten_francs = new Franc(10);
    expect( ten_francs.multifly(2) ).toEqual(new Franc(20));
    expect( ten_francs.multifly(8) ).toEqual(new Franc(80));
  });
  test('Dollar, Franc Equal Test', () => {
    expect( (new Dollar(5)).equals(new Dollar(5)) ).toBeTruthy();
    expect( (new Dollar(5)).equals(new Dollar(-5)) ).toBeFalsy();
    expect( (new Franc(10)).equals(new Franc(10)) ).toBeTruthy();
    expect( (new Franc(10)).equals(new Franc(-10)) ).toBeFalsy();
    expect( (new Dollar(5)).equals(new Franc(5)) ).toBeFalsy();  // 단위가 다른데도 true 로 판단함
  });
});
