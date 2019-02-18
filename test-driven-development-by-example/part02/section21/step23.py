###
# Step 23
#
# - 리팩토링 (TestResult.testStarted 구현)
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
		result = TestResult()
		result.testStarted()  ## 테스트 실행 시작
		self.setUp()
		method = getattr(self, self.name)
		method()
		self.tearDown()
		return result


class TestResult:
	def __init__(self):
		self.runCount = 0
	
	def testStarted(self):  ## 테스트 실행 횟수 측정
		self.runCount += 1

	def summary(self):
		return "%d run, 0 failed" % self.runCount


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
