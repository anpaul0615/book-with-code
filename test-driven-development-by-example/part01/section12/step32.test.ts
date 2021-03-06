/**
 * Step 32
 * 
 * - 새로운 테스트 추가 ($5 + $5)
 * - 테스트 실패 확인 (Expression, Bank 클래스 정의되지 않음 + Money.plus 정의되지 않음)
 */
namespace step32 {

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
    equals(obj: Money) {
      return this.amount == obj.amount
        && this.getCurrency() === obj.getCurrency();
    }
    multifly(n: number) {
      return new Money(this.amount * n, this.currency);
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


  /**
   * Test Suites
   */
  describe.skip('Currency Calculation (Step 32)', ()=>{
    test('Simple Add Test', ()=>{
      
      // ※ typescript 컴파일러 에러로 주석처리

      // const five_dollars: Money = Money.dollar(5);
      // const sum: Expression = five_dollars.plus(five_dollars);  // $5 + $5 계산식 정의
      // const bank: Bank = new Bank();
      // const reduced: Money = bank.reduce(sum, 'USD');  // 계산식 처리 + 환율환산
      // expect( Money.dollar(10) ).toEqual( reduced );  // 확인
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
