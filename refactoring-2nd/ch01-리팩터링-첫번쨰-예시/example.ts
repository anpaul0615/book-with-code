type Plays = {
  [k:string]: Play;
};
const plays: Plays = {
  "hamlet": {"name": "Hamlet", "type": "tragedy"},
  "as-like": {"name": "As You Like It", "type": "comedy"},
  "othello": {"name": "Othello", "type": "tragedy"}
};

type Invoice = {
  customer: string;
  performances: PlayPerformance[];
};
const invoices: Invoice[] = [
  {
    "customer": "BigCo",
    "performances": [
      {
        "playID": "hamlet",
        "audience": 55
      },
      {
        "playID": "as-like",
        "audience": 35
      },
      {
        "playID": "othello",
        "audience": 40
      }
    ]
  }
];

type StatementData = {
  customer: Invoice['customer'];
  performances: EnrichPlayPerformance[];
  totalVolumeCredits?: number;
  totalAmount?: number;
};

type Play = {
  name: string;
  type: string;
};

type PlayPerformance = {
  playID: string;
  audience: number;
};

type EnrichPlayPerformance = PlayPerformance & {
  play: Play;
  amount?: number;
  volumeCredits?: number;
};

/* main function */
function statement(invoice: Invoice, plays: Plays) {
  return renderPlainText(createStatementData(invoice, plays));
}

/* sub function */
function createStatementData(invoice: Invoice, plays: Plays) {
  const statementData: StatementData = {
    customer: invoice.customer,
    performances: invoice.performances.map(enrichPerformance),
  };
  statementData.totalVolumeCredits = totalVolumeCredits(statementData);
  statementData.totalAmount = totalAmount(statementData);
  
  return statementData;

  /* inline function */
  function enrichPerformance(aPerfomance: PlayPerformance) {
    const result: EnrichPlayPerformance = {
      ...aPerfomance,
      play: playFor(aPerfomance),
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

/* sub function */
function renderPlainText(data: StatementData) {
  let result = `청구내역 (고객명: ${data.customer})\n`;
  for (let perf of data.performances) {
    // 청구내역을 출력한다
    result += `  ${perf.play.name}: ${usd(perf.amount!)} (${perf.audience}석)\n`
  }

  result += `총액: ${usd(data.totalAmount!)}\n`
  result += `적립포인트: ${data.totalVolumeCredits!}점\n`

  return result;

  /* inline function */
  function usd(aNumber: number) {
    return new Intl.NumberFormat(
      "en-US", 
      { style:"currency", currency:"USD", minimumFractionDigits:2 }
    ).format(aNumber / 100);
  }
}

console.log(
  statement(invoices[0], plays)
);
