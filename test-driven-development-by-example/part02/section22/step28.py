###
# Step 28
#
# - 리팩토링 (TestCase.assertEqual, TestCase.assertNotEqual 구현)
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
			result.testFailed()
		self.tearDown()
		return result

	def assertEqual(self, actual, expected, isReversed=False):
		assertion = (actual != expected) if isReversed else (actual == expected)
		if assertion:
			pass
		else:
			print("Assert%sEqual \t : %s" % ("Not" if isReversed else "", assertion))
			print("- Actual \t : %s" % actual)
			print("- Expected \t : %s" % expected)

	def assertNotEqual(self, actual, expected):
		self.assertEqual(actual, expected, True)


class TestResult:
	def __init__(self):
		self.runCount = 0
		self.failureCount = 0
	
	def testStarted(self):
		self.runCount += 1

	def testFailed(self):
		self.failureCount += 1

	def summary(self):
		return "%d run, %d failed" % (self.runCount, self.failureCount)


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
		# assert(self.test.log == "setUp testMethod tearDown ")
		self.assertEqual(actual=self.test.log, expected="setUp testMethod tearDown ")
	
	def testResult(self):
		test = WasRun("testMethod")
		result = test.run()
		# assert("1 run, 0 failed" == result.summary())
		self.assertEqual(actual=result.summary(), expected="1 run, 0 failed")
		
	def testFailedResult(self):
		test = WasRun("testBrokenMethod")
		result = test.run()
		# assert("1 run, 1 failed" == result.summary())
		self.assertEqual(actual=result.summary(), expected="1 run, 1 failed")
		self.assertNotEqual(actual=result.summary(), expected="1 run, 2 failed")


TestCaseTest("testTemplateMethod").run()
TestCaseTest("testResult").run()
TestCaseTest("testFailedResult").run()
