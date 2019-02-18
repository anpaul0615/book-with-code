###
# Step 7
#
# - 리팩토링 (WasRun.run 을 동적 함수호출로 구현)
# - 테스트 통과 확인
#
###


class WasRun:
	def __init__(self, name):
		self.wasRun = None
		self.name = name

	def testMethod(self):
		self.wasRun = 1
	
	def run(self):
		method = getattr(self, self.name)  ## 동적 함수호출 구현
		method()


test = WasRun("testMethod")
print(test.wasRun)  ## None (ok)
test.run()
print(test.wasRun)  ## 1 (ok)
