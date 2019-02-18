/**
 * Step 44
 * 
 * - 테스트 대상코드 수정 (Bank.getRate 구현)
 * - 테스트 통과 확인
 */
namespace step44 {

  /**
   * Test Targets
   */
  class Money implements Expression {
    amount: number;
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
    reduce(bank: Bank, targetCurrency: string): Money {
      // const rate = 
      //   (this.currency === 'CHF' && targetCurrency === 'USD')
      //   ? 2 : 1;
      const rate = bank.getRate(this.currency, targetCurrency);  // 환율 조회 책임을 Bank.getRate 로 이동
      return new Money(this.amount / rate, targetCurrency);
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
  
  interface Expression {
    reduce(bank: Bank, currency: string): Money;
  }
  
  class Sum implements Expression {
    augend: Money;
    addend: Money;

    constructor(augend: Money, addend: Money) {
      this.augend = augend;
      this.addend = addend;
    }
    
    reduce(bank: Bank, currency: string): Money {
      const amount: number = this.augend.amount + this.addend.amount;
      return new Money(amount, currency);
    }
  }

  class Bank {
    reduce(exp: Expression, currency: string): Money {
      return exp.reduce(this, currency);
    }

    addRate(sourceCurrency: string, targetCurrency: string, rate: number): void {
    }

    getRate(sourceCurrency: string, targetCurrency: string) {  // 환율 조회 구현
      const rate = 
        (sourceCurrency === 'CHF' && targetCurrency === 'USD')
        ? 2 : 1;
      return rate;
    }
  }


  /**
   * Test Suites
   */
  describe.skip('Currency Calculation (Step 44)', ()=>{
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
    test('Reduce Money Test', ()=>{
      const bank: Bank = new Bank();
      const result: Money = bank.reduce(Money.dollar(1), 'USD');
      expect( Money.dollar(1) ).toEqual( result );
    });
    test('Reduce Different Currency Money Test', ()=>{
      const bank: Bank = new Bank();
      bank.addRate('CHF', 'USD', 2);
      const result: Money = bank.reduce(Money.franc(2), 'USD');
      expect( Money.dollar(1) ).toEqual( result );
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
