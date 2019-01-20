/**
 * Step 26
 * 
 * - 코드베이스를 typescript 로 변경
 * - 테스트 통과 확인
 */
namespace step26 {

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
        && this.getClassName() === obj.getClassName();
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
      return new Dollar(this.amount * n, 'USD');
    }
  }
  
  class Franc extends Money {
    multifly(n: number) {
      return new Franc(this.amount * n, 'CHF');
    }
  }


  /**
   * Test Suites
   */
  describe('Dollar & Franc Calculation (Step 26)', ()=>{
    test('Dollar Multifly + Equal Test', () => {
      const five_dollars = Money.dollar(5);
      expect( five_dollars.multifly(3) ).toEqual(Money.dollar(15));
      expect( five_dollars.multifly(5) ).toEqual(Money.dollar(25));
      expect( five_dollars.multifly(3).equals(Money.dollar(15)) ).toBeTruthy();
      expect( five_dollars.multifly(5).equals(Money.dollar(25)) ).toBeTruthy();
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
