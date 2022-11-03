import type { Invoice, Plays, StatementData } from './types';
import { createStatementData } from './createStatementData';

/* main function */
export function statement(invoice: Invoice, plays: Plays) {
  return renderPlainText(createStatementData(invoice, plays));
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
}

/* sub function */
function usd(aNumber: number) {
  return new Intl.NumberFormat(
    "en-US", 
    { style:"currency", currency:"USD", minimumFractionDigits:2 }
  ).format(aNumber / 100);
}
