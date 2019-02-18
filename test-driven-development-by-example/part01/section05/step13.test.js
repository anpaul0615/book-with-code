/**
 * Step 13
 * 
 * - 새로운 테스트 추가 (Franc 화폐 연산)
 * - 테스트 실패 확인 (Franc 클래스 없음)
 */

class Dollar {
  constructor(amount) {
    this.amount = amount;
  }
  multifly(n) {
    return new Dollar(this.amount * n);
  }
}

describe.skip('Dollar & Franc Calculation (Step 13)', ()=>{
  test('Dollar Multifly + Equal Test', () => {
    const five_dollars = new Dollar(5);
    expect( five_dollars.multifly(3) ).toEqual(new Dollar(15));
    expect( five_dollars.multifly(5) ).toEqual(new Dollar(25));
  });
  test('Franc Multifly + Equal Test', () => {
    const five_francs = new Franc(5);
    expect( five_francs.multifly(3) ).toEqual(new Franc(15));
    expect( five_francs.multifly(5) ).toEqual(new Franc(25));
  });
});
