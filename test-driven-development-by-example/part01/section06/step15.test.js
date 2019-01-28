/**
 * Step 15
 * 
 * - 테스트 수정 (Dollar, Franc 의 상위 클래스 Money 정의)
 * - 테스트 통과 확인
 */

class Money {}

class Dollar extends Money {
  constructor(amount) {
    super();
    this.amount = amount;
  }
  multifly(n) {
    return new Dollar(this.amount * n);
  }
}

class Franc extends Money {
  constructor(amount) {
    super();
    this.amount = amount;
  }
  multifly(n) {
    return new Franc(this.amount * n);
  }
}

describe.skip('Dollar & Franc Calculation (Step 15)', ()=>{
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
});
