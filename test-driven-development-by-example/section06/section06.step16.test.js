/**
 * Step 16
 * 
 * - 테스트 수정 (Dollar, Franc 의 공통 멤버변수를 상위 클래스로 이동)
 * - 테스트 통과 확인
 */

class Money {
  constructor(amount) {
    this.amount = amount;
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

describe.skip('Dollar & Franc Calculation (Step 16)', ()=>{
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
