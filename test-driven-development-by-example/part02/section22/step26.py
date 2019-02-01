###
# Step 26
#
# - 모델코드 수정 (TestCase.run 에 try-catch 적용)
# - 테스트 실패 확인 (TestCase.Test.testFailedResult 결과값 불일치)
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
		try:		## try-except 문 적용
			method = getattr(self, self.name)
			method()
		except:		## 예외처리는 나중에 구현
			print('%s :: comein except..!'%(self.name))
			pass
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
		assert("1 run, 1 failed" == result.summary())  ## err..!


TestCaseTest("testTemplateMethod").run()
TestCaseTest("testResult").run()
TestCaseTest("testFailedResult").run()
