/**
 * Step 36
 * 
 * - 테스트 대상코드 수정 (Bank.reduce 구현)
 * - 테스트 통과 확인
 */
namespace step36 {

  /**
   * Test Targets
   */
  class Money {
    amount: number;  // Sum 클래스에서 접근할수가 없어서 protected 해제
    protected currency: string;
  
    constructor(amount: number, currency: string) {
      this.amount = amount;
      this.currency = currency;
    }
    equals(obj: Money) {
      return this.amount == obj.amount
        && this.getCurrency() === obj.getCurrency();
    }
    multifly(n: number) {
      return new Money(this.amount * n, this.currency);
    }
    plus(target: Money) {
      return new Sum(this, target);
    }
    getCurrency() {
      return this.currency;
    }
    static dollar(amount: number) {
      return new Money(amount, 'USD');
    }
    static franc(amount: number) {
      return new Money(amount, 'CHF');
    }
  }
  
  interface Expression {}
  
  class Sum implements Expression {
    augend: Money;
    addend: Money;

    constructor(augend: Money, addend: Money) {
      this.augend = augend;
      this.addend = addend;
    }
  }

  class Bank {
    reduce(exp: Expression, currency: string): Money {
      const sum: Sum = <Sum> exp;
      const amount: number = sum.augend.amount + sum.addend.amount;
      return new Money(amount, currency);
    }
  }


  /**
   * Test Suites
   */
  describe.skip('Currency Calculation (Step 36)', ()=>{
    test('Simple Add Test', ()=>{
      const five_dollars: Money = Money.dollar(5);
      const sum: Expression = five_dollars.plus(five_dollars);
      const bank: Bank = new Bank();
      const reduced: Money = bank.reduce(sum, 'USD');
      expect( Money.dollar(10) ).toEqual( reduced );
    });
    test('Sum Expression Test', ()=>{
      const five_dollars: Money = Money.dollar(5);
      const result: Expression = five_dollars.plus(five_dollars);
      const sum: Sum = <Sum> result;
      expect( sum.augend ).toEqual( five_dollars );
      expect( sum.addend ).toEqual( five_dollars );
    });
    test('Sum Expression Test 2', ()=>{
      const sum: Expression = new Sum(Money.dollar(3), Money.dollar(5));
      const bank: Bank = new Bank();
      const result: Money = bank.reduce(sum, 'USD');
      expect( Money.dollar(8) ).toEqual( result );
    });
  });
  describe.skip('Dollar & Franc Calculation', ()=>{
    test('Dollar Multifly + Equal Test', () => {
      const five_dollars = Money.dollar(5);
      expect( five_dollars.multifly(3) ).toEqual(Money.dollar(15));
      expect( five_dollars.multifly(5) ).toEqual(Money.dollar(25));
      expect( five_dollars.multifly(3).equals(Money.dollar(15)) ).toBeTruthy();
      expect( five_dollars.multifly(5).equals(Money.dollar(25)) ).toBeTruthy();
      expect( five_dollars.multifly(100).equals(Money.dollar(999)) ).toBeFalsy();
      expect( five_dollars.multifly(100).equals(Money.franc(100)) ).toBeFalsy();
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
