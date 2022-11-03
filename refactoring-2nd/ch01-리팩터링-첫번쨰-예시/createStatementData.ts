import type { Invoice, Plays, Play, PlayPerformance, EnrichPlayPerformance, StatementData } from './types';

export class PerformanceCalculator {
  constructor(private performance: PlayPerformance, public play: Play) {}
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
    };
    result.amount = amountFor(result)
    result.volumeCredits = volumeCreditsFor(result)
  
    return result;
  }

  /* inline function */
  function playFor(aPerfomance: PlayPerformance) {
    return plays[aPerfomance.playID];
  }

  /* inline function */
  function amountFor(aPerfomance: PlayPerformance & { play: Play }) {
    let result = 0;
  
    switch (aPerfomance.play.type) {
      case "tragedy":
        result = 40_000;
        if (aPerfomance.audience > 30) {
          result += 1000 * (aPerfomance.audience - 30);
        }
        break;
      case "comedy":
        result = 30_000;
        if (aPerfomance.audience > 20) {
          result += 10_000 + 500 * (aPerfomance.audience - 20);
        }
        result += 300 * aPerfomance.audience;
        break;
      default:
        throw new Error(`알수없는 장르: ${aPerfomance.play.type}`)
    }
  
    return result;
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
    return data.performances.reduce((total, p) => total + p.amount!, 0);
  }
}
