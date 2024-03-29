/**
 * Step 29
 * 
 * - 테스트 대상코드 수정 (equals 함수 구현을 클래스 비교에서 통화단위 비교로 변경)
 * - 테스트 통과 확인
 */
namespace step29 {

  /**
   * Test Targets
   */
  class Money {
    protected amount: number;
    protected currency: string;
  
    constructor(amount: number, currency: string) {
      this.amount = amount;
      this.currency = currency;
    }
    getClassName() {
      return this.constructor.name;
    }
    equals(obj: Money) {
      return this.amount == obj.amount
        && this.getCurrency() === obj.getCurrency();  // 동치연산을 클래스 비교에서 통화단위 비교로 변경
    }
    getCurrency() {
      return this.currency;
    }
    static dollar(amount: number) {
      return new Dollar(amount, 'USD');
    }
    static franc(amount: number) {
      return new Franc(amount, 'CHF');
    }
  }
  
  class Dollar extends Money {
    multifly(n: number) {
      return new Money(this.amount * n, this.currency);
    }
  }
  
  class Franc extends Money {
    multifly(n: number) {
      return new Money(this.amount * n, this.currency);
    }
  }


  /**
   * Test Suites
   */
  describe.skip('Dollar & Franc Calculation (Step 29)', ()=>{
    test('Dollar Multifly + Equal Test', () => {
      const five_dollars = Money.dollar(5);
      expect( five_dollars.multifly(3) ).toEqual(Money.dollar(15));
      expect( five_dollars.multifly(5) ).toEqual(Money.dollar(25));
      expect( five_dollars.multifly(3).equals(Money.dollar(15)) ).toBeTruthy();  // amount and currency is equal!!
      expect( five_dollars.multifly(5).equals(Money.dollar(25)) ).toBeTruthy();
      expect( five_dollars.multifly(100).equals(Money.dollar(999)) ).toBeFalsy();  // currency is equal, but amount is not equal..!
      expect( five_dollars.multifly(100).equals(Money.franc(100)) ).toBeFalsy();  // amount is equal, but currency is not equal..!
    });
    test('Franc Multifly + Equal Test', () => {
      const ten_francs = Money.franc(10);
      expect( ten_francs.multifly(2) ).toEqual(Money.franc(20));
      expect( ten_francs.multifly(8) ).toEqual(Money.franc(80));
      expect( ten_francs.multifly(2).equals(Money.franc(20)) ).toBeTruthy();
      expect( ten_francs.multifly(8).equals(Money.franc(80)) ).toBeTruthy();
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
}
