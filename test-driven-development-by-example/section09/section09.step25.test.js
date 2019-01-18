/**
 * Step 25
 * 
 * - 테스트 실행코드 수정 (multifly 함수에서 Dollar,Franc 생성자 호출시 통화 멤버변수 함께 전달)
 * - 테스트 통과 확인
 */

class Money {
  constructor(amount,currency) {
    this.amount = amount;
    this.currency = currency;
  }
  getClassName() {
    return this.__proto__.constructor.name;
  }
  equals(obj) {
    return this.amount == obj.amount
      && this.getClassName() === obj.getClassName();
  }
  getCurrency() {
    return this.currency;
  }
  static dollar(amount) {
    return new Dollar(amount, 'USD');
  }
  static franc(amount) {
    return new Franc(amount, 'CHF');
  }
}

class Dollar extends Money {
  multifly(n) {
    return new Dollar(this.amount * n, 'USD');  // 통화단위 함께 전달
  }
}

class Franc extends Money {
  multifly(n) {
    return new Franc(this.amount * n, 'CHF');  // 통화단위 함께 전달
  }
}

describe('Dollar & Franc Calculation (Step 25)', ()=>{
  test('Dollar Multifly + Equal Test', () => {
    const five_dollars = Money.dollar(5);
    expect( five_dollars.multifly(3) ).toEqual(Money.dollar(15));
    expect( five_dollars.multifly(5) ).toEqual(Money.dollar(25));
  });
  test('Franc Multifly + Equal Test', () => {
    const ten_francs = Money.franc(10);
    expect( ten_francs.multifly(2) ).toEqual(Money.franc(20));
    expect( ten_francs.multifly(8) ).toEqual(Money.franc(80));
  });
  test('Dollar, Franc Equal Test', () => {
    expect( (Money.dollar(5)).equals(Money.dollar(5)) ).toBeTruthy();
    expect( (Money.dollar(5)).equals(Money.dollar(-5)) ).toBeFalsy();
    expect( (Money.franc(10)).equals(Money.franc(10)) ).toBeTruthy();
    expect( (Money.franc(10)).equals(Money.franc(-10)) ).toBeFalsy();
    expect( (Money.dollar(5)).equals(Money.franc(5)) ).toBeFalsy();
  });
  test('Currency Compare Test', ()=>{
    expect( Money.dollar(1).getCurrency() ).toEqual('USD');
    expect( Money.franc(1).getCurrency() ).toEqual('CHF');
  });
});
