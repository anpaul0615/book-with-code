/**
 * Step 2
 * 
 * - 테스트 통과만을 위해 테스트코드를 수정한다 (Dollar 클래스 정의)
 * - 테스트 실패를 확인한다 (multifly 메서드 없음)
 */

class Dollar {}  // define "class Dollar"

test.skip('Dollar Multifly Test (Step 2)', () => {
  const five_dollars = new Dollar(5);
  five_dollars.multifly(3);
  expect(five_dollars.amount).toBe(15);
});
