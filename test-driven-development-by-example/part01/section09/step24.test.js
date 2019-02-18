/**
 * Step 24
 * 
 * - 테스트 실행코드 수정 (통화 멤버변수 정의 + 통화 조회함수를 상위클래스로 이동)
 * - 테스트 실패 확인 (multifly 함수에서 통화단위 누락 문제 발생)
 */

class Money {
  constructor(amount,currency) {
    this.amount = amount;
    this.currency = currency;  // 통화 멤버변수 정의
  }
  getClassName() {
    return this.__proto__.constructor.name;
  }
  equals(obj) {
    return this.amount == obj.amount
      && this.getClassName() === obj.getClassName();
  }
  getCurrency() {  // 통화 조회함수를 상위클래스로 이동
    return this.currency;
  }
  static dollar(amount) {
    return new Dollar(amount,'USD');
  }
  static franc(amount) {
    return new Franc(amount,'CHF');
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

describe.skip('Dollar & Franc Calculation (Step 24)', ()=>{
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
