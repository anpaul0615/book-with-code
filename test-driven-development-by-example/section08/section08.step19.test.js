/**
 * Step 19
 * 
 * - 테스트 실행코드 수정 (테스트실행코드에서 하위클래스 Dollar 직접참조 부분 제거)
 * - 테스트 실패 확인 (상위클래스 Money 에서 하위클래스 Dollar 객체를 생성하는 함수가 정의되지 않음)
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
    expect( (new Dollar(5)).equals(new Franc(5)) ).toBeFalsy();
  });
});
