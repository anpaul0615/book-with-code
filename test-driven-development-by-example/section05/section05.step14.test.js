/**
 * Step 14
 * 
 * - 테스트 수정 (Franc 클래스 정의)
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

class Franc {
  constructor(amount) {
    this.amount = amount;
  }
  multifly(n) {
    return new Franc(this.amount * n);
  }
}

describe('Dollar & Franc Calculation (Step 14)', ()=>{
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
