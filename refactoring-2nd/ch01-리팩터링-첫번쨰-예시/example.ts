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

  const format = new Intl.NumberFormat(
    "en-US", 
    { style:"currency", currency:"USD", minimumFractionDigits:2 }
  ).format;

  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    let thisAmount = amountFor(perf, play);

    // 포인트를 지불한다
    volumeCredits += Math.max(perf.audience - 30, 0);

    // 희극관객 5명마다 추가포인트를 제공한다
    if ("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);

    // 청구내역을 출력한다
    result += `  ${play.name}: ${format(thisAmount / 100)} (${perf.audience}석)\n`
    totalAmount += thisAmount;
  }

  result += `총액: ${format(totalAmount / 100)}\n`
  result += `적립포인트: ${volumeCredits}점\n`

  return result;

  function amountFor(aPerfomance: Invoice['performances'][number], play: Plays[keyof Plays]) {
    let result = 0;
  
    switch (play.type) {
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
        throw new Error(`알수없는 장르: ${play.type}`)
    }
  
    return result;
  }
}

console.log(
  statement(invoices[0], plays)
);
