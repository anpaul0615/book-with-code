###
# Step 21
#
# - 모델코드 수정 (TestCase.run 에서 TestResult 반환)
# - 테스트 통과 확인
#
###


class TestCase:
	def __init__(self, name):
		self.name = name

	def setUp(self):
		pass
	
	def tearDown(self):
		pass

	def run(self):
		self.setUp()
		method = getattr(self, self.name)
		method()
		self.tearDown()
		return TestResult()  ## TestResult 반환


class TestResult:  ## TestResult 클래스 정의
	def summary(self):  ## TestResult.summary 정의
		return "1 run, 0 failed"


class WasRun(TestCase):
	def __init__(self, name):
		super().__init__(name)

	def setUp(self):
		self.wasRun = None
		self.log = "setUp "

	def testMethod(self):
		self.log = self.log + "testMethod "
	
	def tearDown(self):
		self.log = self.log + "tearDown "


class TestCaseTest(TestCase):
	def setUp(self):
		self.test = WasRun("testMethod")
	
	def testTemplateMethod(self):
		self.test.run()
		assert(self.test.log == "setUp testMethod tearDown ")
	
	def testResult(self):
		test = WasRun("testMethod")
		result = test.run()
		assert("1 run, 0 failed" == result.summary())  ## pass


TestCaseTest("testTemplateMethod").run()
TestCaseTest("testResult").run()
