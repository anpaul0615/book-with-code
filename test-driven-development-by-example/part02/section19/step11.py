###
# Step 11
#
# - 새로운 테스트케이스 추가 (WasRun.wasSetUp 검사 추가)
# - 테스트 실패 확인 (WasRun.wasSetup 가 정의되지 않음)
#
###


class TestCase:
	def __init__(self, name):
		self.name = name

	def run(self):
		method = getattr(self, self.name)
		method()


class WasRun(TestCase):
	def __init__(self, name):
		super().__init__(name)
		self.wasRun = None

	def testMethod(self):
		self.wasRun = 1
	

class TestCaseTest(TestCase):
	def testRunning(self):
		test = WasRun("testMethod")
		assert(not test.wasRun)
		test.run()
		assert(test.wasRun)

	def testSetUp(self):  ## WasRun.wasSetUp 을 검사하는 테스트함수 추가
		test = WasRun("testMethod")
		test.run()
		assert(test.wasSetUp)  ## 'WasRun' object has no attribute 'wasSetUp'

TestCaseTest("testRunning").run()
TestCaseTest("testSetUp").run()  ## 추가한 테스트함수 실행
