###
# Step 5
#
# - 모델코드 수정 (WasRun.testMethod 구현)
# - 테스트 통과 확인
#
###


class WasRun:
	def __init__(self, name):
		self.wasRun = None
		self.name = name

	def testMethod(self):
		self.wasRun = 1  ## testMethod 구현


test = WasRun("testMethod")
print(test.wasRun)  ## None (ok)
test.testMethod()
print(test.wasRun)  ## 1 (ok)
