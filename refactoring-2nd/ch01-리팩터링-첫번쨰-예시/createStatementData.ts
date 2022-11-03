import type { Invoice, Plays, Play, PlayPerformance, EnrichPlayPerformance, StatementData } from './types';

export class PerformanceCalculator {
  constructor(private performance: PlayPerformance, public play: Play) {}
  
  get amount() {
    let result = 0;
  
    switch (this.play.type) {
      case "tragedy":
        result = 40_000;
        if (this.performance.audience > 30) {
          result += 1000 * (this.performance.audience - 30);
        }
        break;
      case "comedy":
        result = 30_000;
        if (this.performance.audience > 20) {
          result += 10_000 + 500 * (this.performance.audience - 20);
        }
        result += 300 * this.performance.audience;
        break;
      default:
        throw new Error(`알수없는 장르: ${this.play.type}`)
    }
  
    return result;
  }
}

export function createStatementData(invoice: Invoice, plays: Plays) {
  const statementData: StatementData = {
    customer: invoice.customer,
    performances: invoice.performances.map(enrichPerformance),
  };
  statementData.totalVolumeCredits = totalVolumeCredits(statementData);
  statementData.totalAmount = totalAmount(statementData);
  
  return statementData;

  /* inline function */
  function enrichPerformance(aPerfomance: PlayPerformance) {
    const calculator = new PerformanceCalculator(aPerfomance, playFor(aPerfomance));

    const result: EnrichPlayPerformance = {
      ...aPerfomance,
      play: calculator.play,
      amount: calculator.amount,
    };
    result.volumeCredits = volumeCreditsFor(result)
  
    return result;
  }

  /* inline function */
  function playFor(aPerfomance: PlayPerformance) {
    return plays[aPerfomance.playID];
  }

  /* inline function */
  function volumeCreditsFor(aPerfomance: EnrichPlayPerformance) {
    let result = 0;
  
    // 포인트를 지불한다
    result += Math.max(aPerfomance.audience - 30, 0);
  
    // 희극관객 5명마다 추가포인트를 제공한다
    if ("comedy" === aPerfomance.play.type) {
      result += Math.floor(aPerfomance.audience / 5);
    }
  
    return result;
  }

  /* inline function */
  function totalVolumeCredits(data: StatementData) { 
    return data.performances.reduce((total, p) => total + p.volumeCredits!, 0);
  }

  /* inline function */
  function totalAmount(data: StatementData) {
    return data.performances.reduce((total, p) => total + p.amount, 0);
  }
}
