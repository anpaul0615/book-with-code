import type { Invoice, Plays, Play, PlayPerformance, EnrichPlayPerformance, StatementData } from './types';

export abstract class PerformanceCalculator {
  constructor(protected performance: PlayPerformance, public play: Play) {}
  
  abstract get amount(): number

  get volumeCredits() {
    return Math.max(this.performance.audience - 30, 0);
  }
}

export class TragedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 40_000;
    if (this.performance.audience > 30) {
      result += 1000 * (this.performance.audience - 30);
    }
    return result;
  }
}

export class ComedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 30_000;
    if (this.performance.audience > 20) {
      result += 10_000 + 500 * (this.performance.audience - 20);
    }
    result += 300 * this.performance.audience;
    return result;
  }

  get volumeCredits() {
    // 희극관객 5명마다 추가포인트를 제공한다
    return super.volumeCredits + Math.floor(this.performance.audience / 5);
  }
}

export function createPerformanceCalculator(performance: PlayPerformance, play: Play) {
  switch(play.type) {
    case "tragedy": return new TragedyCalculator(performance, play);
    case "comedy": return new ComedyCalculator(performance, play);
    default:
      throw new Error(`알수없는 장르: ${play.type}`);
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
    const calculator = createPerformanceCalculator(aPerfomance, playFor(aPerfomance));

    const result: EnrichPlayPerformance = {
      ...aPerfomance,
      play: calculator.play,
      amount: calculator.amount,
      volumeCredits: calculator.volumeCredits,
    };
  
    return result;
  }

  /* inline function */
  function playFor(aPerfomance: PlayPerformance) {
    return plays[aPerfomance.playID];
  }

  /* inline function */
  function totalVolumeCredits(data: StatementData) { 
    return data.performances.reduce((total, p) => total + p.volumeCredits, 0);
  }

  /* inline function */
  function totalAmount(data: StatementData) {
    return data.performances.reduce((total, p) => total + p.amount, 0);
  }
}
