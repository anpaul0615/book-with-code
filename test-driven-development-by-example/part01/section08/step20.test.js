/**
 * Step 20
 * 
 * - 테스트 대상코드 수정 (상위클래스 Money 에 하위클래스 Dollar 객체 생성 함수 정의)
 * - 테스트 통과 확인
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
  static dollar(amount) {  // static 함수로 정의
    return new Dollar(amount);  // 하위클래스 Dollar 객체 생성해서 반환
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

describe.skip('Dollar & Franc Calculation (Step 18)', ()=>{
  test('Dollar Multifly + Equal Test', () => {
    const five_dollars = Money.dollar(5);  // 상위클래스 Money 를 통해서 하위클래스 Dollar 객체 생성
    expect( five_dollars.multifly(3) ).toEqual(Money.dollar(15));
    expect( five_dollars.multifly(5) ).toEqual(Money.dollar(25));
  });
  test('Franc Multifly + Equal Test', () => {
    const ten_francs = new Franc(10);
    expect( ten_francs.multifly(2) ).toEqual(new Franc(20));
    expect( ten_francs.multifly(8) ).toEqual(new Franc(80));
  });
  test('Dollar, Franc Equal Test', () => {
    expect( (Money.dollar(5)).equals(Money.dollar(5)) ).toBeTruthy();
    expect( (Money.dollar(5)).equals(Money.dollar(-5)) ).toBeFalsy();
    expect( (new Franc(10)).equals(new Franc(10)) ).toBeTruthy();
    expect( (new Franc(10)).equals(new Franc(-10)) ).toBeFalsy();
    expect( (Money.dollar(5)).equals(new Franc(5)) ).toBeFalsy();
  });
});
