###
# Step 4
#
# - 모델코드 수정 (생성자 정의)
# - 테스트 실패 확인 (WasRun.testMethod 이후에 wasRun 변화없음)
#
###


class WasRun:
	def __init__(self, name):  ## 생성자 정의
		self.wasRun = None
		self.name = name

	def testMethod(self):
		pass


test = WasRun("testMethod")
print(test.wasRun)  ## None (ok)
test.testMethod()
print(test.wasRun)  ## None (test fail..!)
