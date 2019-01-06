/**
 * Step 3
 * 
 * - 테스트 통과만을 위해 테스트코드를 수정한다 (multifly 메서드 정의)
 * - 테스트 실패를 확인한다 (amount 프로퍼티 없음)
 */

class Dollar {
  multifly() {}  // define "multifly()"
}

test.skip('Dollar Multifly Test (Step 3)', () => {
  const five_dollars = new Dollar(5);
  five_dollars.multifly(3);
  expect(five_dollars.amount).toBe(15);
});
