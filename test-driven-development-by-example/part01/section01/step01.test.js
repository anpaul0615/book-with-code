/**
 * Step 1
 * 
 * - 작은 테스트를 추가한다
 * - 테스트 실패를 확인한다 (Dollar 클래스없음)
 */

test.skip('Dollar Multifly Test (Step 1)', () => {
  const five_dollars = new Dollar(5);
  five_dollars.multifly(3);
  expect(five_dollars.amount).toBe(15);
});
