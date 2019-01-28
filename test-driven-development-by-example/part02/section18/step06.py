###
# Step 6
#
# - 리팩토링 (WasRun.testMethod 직접호출에서 WasRun.run 을 통한 간접호출로 변경)
# - 테스트 통과 확인
#
###


class WasRun:
	def __init__(self, name):
		self.wasRun = None
		self.name = name

	def testMethod(self):
		self.wasRun = 1
	
	def run(self):  ## WasRun.run 정의
		self.testMethod()  ## WasRun.testMethod 간접호출 구현


test = WasRun("testMethod")
print(test.wasRun)  ## None (ok)
test.run()
print(test.wasRun)  ## 1 (ok)
