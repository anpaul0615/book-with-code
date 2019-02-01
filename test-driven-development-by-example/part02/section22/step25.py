###
# Step 25
#
# - 모델코드 수정 (WasRun.testBrokenMethod 정의)
# - 테스트 실패 확인 (TestCase.run 에서 WasRun.testBrokenMethod 동적실행시 raise Exception 처리못하는 문제 발생)
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
		method()  ## WasRun.testBrokenMethod 동적실행시 raise Exception 처리못하는 문제 발생
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

	def testBrokenMethod(self):  ## 에러 발생 메서드 정의
		raise Exception
	
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
		
	def testFailedResult(self):
		test = WasRun("testBrokenMethod")
		result = test.run()
		assert("1 run, 1 failed" == result.summary())  ## err..!


TestCaseTest("testTemplateMethod").run()
TestCaseTest("testResult").run()
TestCaseTest("testFailedResult").run()
