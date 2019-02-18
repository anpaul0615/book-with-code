###
# Step 12
#
# - 모델코드 수정 (TestCase.setUp, WasRun.setUp 구현)
# - 테스트 통과 확인
#
###


class TestCase:
	def __init__(self, name):
		self.name = name

	def run(self):
		self.setUp()  ## TestCase.setUp 호출
		method = getattr(self, self.name)
		method()

	def setUp(self):  ## 인터페이스 선언
		pass


class WasRun(TestCase):
	def __init__(self, name):
		super().__init__(name)
		self.wasRun = None

	def testMethod(self):
		self.wasRun = 1
	
	def setUp(self):  ## WasRun.setUp 구현
		self.wasSetUp = 1
	

class TestCaseTest(TestCase):
	def testRunning(self):
		test = WasRun("testMethod")
		assert(not test.wasRun)
		test.run()
		assert(test.wasRun)

	def testSetUp(self):
		test = WasRun("testMethod")
		test.run()
		assert(test.wasSetUp)  ## pass

TestCaseTest("testRunning").run()
TestCaseTest("testSetUp").run()
