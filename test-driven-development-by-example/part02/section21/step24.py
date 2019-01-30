###
# Step 24
#
# - 새로운 테스트케이스 추가 (테스트 실패결과 검증)
# - 테스트 실패 확인 (WasRun.testBrokenMethod 정의되지 않음)
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
		result.testStarted()
		self.setUp()
		method = getattr(self, self.name)
		method()
		self.tearDown()
		return result


class TestResult:
	def __init__(self):
		self.runCount = 0
	
	def testStarted(self):
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
		assert("1 run, 0 failed" == result.summary())
		
	def testFailedResult(self):  ## "테스트 실패결과 검증" 테스트케이스 추가
		test = WasRun("testBrokenMethod")
		result = test.run()
		assert("1 run, 1 failed" == result.summary())  ## err..!


TestCaseTest("testTemplateMethod").run()
TestCaseTest("testResult").run()
TestCaseTest("testFailedResult").run()  ##  "테스트 실패결과 검증" 테스트케이스 실행
