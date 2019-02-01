###
# Step 27
#
# - 모델코드 수정 (TestResult.testFailed 구현)
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
		result.testStarted()
		self.setUp()
		try:
			method = getattr(self, self.name)
			method()
		except:
			# print("%s :: comein except..!" % (self.name))
			# pass
			result.testFailed()		## 예외처리 구현
		self.tearDown()
		return result


class TestResult:
	def __init__(self):
		self.runCount = 0
		self.failureCount = 0		## 실패횟수 초기화
	
	def testStarted(self):
		self.runCount += 1

	def testFailed(self):
		self.failureCount += 1		## 실패횟수 카운팅

	def summary(self):
		# return "%d run, 0 failed" % self.runCount
		return "%d run, %d failed" % (self.runCount, self.failureCount)  ## 실패횟수 반환 적용


class WasRun(TestCase):
	def __init__(self, name):
		super().__init__(name)

	def setUp(self):
		self.wasRun = None
		self.log = "setUp "

	def testMethod(self):
		self.log = self.log + "testMethod "

	def testBrokenMethod(self):
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
		assert("1 run, 1 failed" == result.summary())  ## pass


TestCaseTest("testTemplateMethod").run()
TestCaseTest("testResult").run()
TestCaseTest("testFailedResult").run()
