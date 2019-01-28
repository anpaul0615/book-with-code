###
# Step 3
#
# - 모델코드 수정 (WasRun.testMethod 정의)
# - 테스트 실패 확인 (생성자에서 파라미터 받지않음)
#
###


class WasRun:
	def testMethod(self):  ## 멤버함수 testMethod 정의
		pass


test = WasRun("testMethod")  ## object() takes no parameters
print(test.wasRun)
test.testMethod()
print(test.wasRun)
