/**
 * Step 18
 * 
 * - 테스트 수정 (equals 함수에서 객체의 클래스타입도 함께 검사함)
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
    // ※ 실습예제에서는 각 객체의 클래스타입을 String.equals 함수로 비교하는 방식을 사용했음
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
    expect( (new Dollar(5)).equals(new Franc(5)) ).toBeFalsy();  // 총액은 같지만 단위가 다르므로 false
  });
});
