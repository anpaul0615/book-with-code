###
# Step 2
#
# - 모델코드 수정 (테스트 수행 클래스 정의)
# - 테스트 실패 확인 (WasRun.testMethod 가 정의되지 않음)
#
###


class WasRun:  ## 테스트를 수행하는 클래스 정의
	pass


test = WasRun("testMethod")
print(test.wasRun)
test.testMethod()  ## Instance of 'WasRun' has no 'testMethod' member
print(test.wasRun)
