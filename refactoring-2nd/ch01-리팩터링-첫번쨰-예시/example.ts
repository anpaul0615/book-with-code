type Plays = {
  [k:string]: {
    name: string;
    type: string;
  };
};
const plays: Plays = {
  "hamlet": {"name": "Hamlet", "type": "tragedy"},
  "as-like": {"name": "As You Like It", "type": "comedy"},
  "othello": {"name": "Othello", "type": "tragedy"}
};

type Invoice = {
  customer: string;
  performances: {
    playID: string
    audience: number
  }[];
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

function statement(invoice: Invoice, plays: Plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구내역 (고객명: ${invoice.customer})\n`;

  for (let perf of invoice.performances) {
    volumeCredits += volumeCreditsFor(perf);

    // 청구내역을 출력한다
    result += `  ${playFor(perf).name}: ${format(amountFor(perf) / 100)} (${perf.audience}석)\n`
    totalAmount += amountFor(perf);
  }

  result += `총액: ${format(totalAmount / 100)}\n`
  result += `적립포인트: ${volumeCredits}점\n`

  return result;

  function amountFor(aPerfomance: Invoice['performances'][number]) {
    let result = 0;
  
    switch (playFor(aPerfomance).type) {
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
        throw new Error(`알수없는 장르: ${playFor(aPerfomance).type}`)
    }
  
    return result;
  }

  function playFor(aPerfomance: Invoice['performances'][number]) {
    return plays[aPerfomance.playID];
  }

  function volumeCreditsFor(aPerfomance: Invoice['performances'][number]) {
    let result = 0;
  
    // 포인트를 지불한다
    result += Math.max(aPerfomance.audience - 30, 0);
  
    // 희극관객 5명마다 추가포인트를 제공한다
    if ("comedy" === playFor(aPerfomance).type) {
      result += Math.floor(aPerfomance.audience / 5);
    }
  
    return result;
  }

  function format(aNumber: number) {
    return new Intl.NumberFormat(
      "en-US", 
      { style:"currency", currency:"USD", minimumFractionDigits:2 }
    ).format(aNumber);
  }
}

console.log(
  statement(invoices[0], plays)
);
