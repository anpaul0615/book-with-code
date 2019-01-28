/**
 * Step 22
 * 
 * - 새로운 테스트 추가 (통화단위 비교)
 * - 테스트 실패 확인 (currency 함수 정의되지 않음)
 */

class Money {
  constructor(amount) {
    this.amount = amount;
  }
  getClassName() {
    return this.__proto__.constructor.name;
  }
  equals(obj) {
    return this.amount == obj.amount
      && this.getClassName() === obj.getClassName();
  }
  static dollar(amount) {
    return new Dollar(amount);
  }
  static franc(amount) {
    return new Franc(amount);
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

describe.skip('Dollar & Franc Calculation (Step 22)', ()=>{
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
