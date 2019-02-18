###
# Step 32
#
# - 리팩토링 (TestResult 객체 생성시점을 TestCaseTest.setUp 으로 이동)
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

	def run(self,result):
		result.testStarted()
		self.setUp()
		try:
			method = getattr(self, self.name)
			method()
		except:
			result.testFailed()
		self.tearDown()

	def assertEqual(self, actual, expected, isReversed=False):
		assertion = (actual != expected) if isReversed else (actual == expected)
		if assertion:
			pass
		else:
			print("Assert%sEqual \t : %s" % ("Not" if isReversed else "", assertion))
			print("- Actual \t : %s" % actual)
			print("- Expected \t : %s" % expected)
			raise Exception

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


class TestSuite:
	def __init__(self):
		self.tests = []
	
	def add(self,test):
		self.tests.append(test)

	def run(self,result):
		for test in self.tests:
			test.run(result)


class TestCaseTest(TestCase):
	def setUp(self):
		self.test = WasRun("testMethod")
		self.result = TestResult()		## TestResult 객체를 공통 멤버변수로 이동

	def testTemplateMethod(self):
		# result = TestResult()
		self.test.run(self.result)
		self.assertEqual(actual=self.test.log, expected="setUp testMethod tearDown ")
	
	def testResult(self):
		test = WasRun("testMethod")
		# result = TestResult()
		# self.assertEqual(actual=result.summary(), expected="1 run, 0 failed")
		test.run(self.result)
		self.assertEqual(actual=self.result.summary(), expected="1 run, 0 failed")
		
	def testFailedResult(self):
		test = WasRun("testBrokenMethod")
		# result = TestResult()
		# self.assertEqual(actual=result.summary(), expected="1 run, 1 failed")
		# self.assertNotEqual(actual=result.summary(), expected="1 run, 2 failed")
		test.run(self.result)
		self.assertEqual(actual=self.result.summary(), expected="1 run, 1 failed")
		self.assertNotEqual(actual=self.result.summary(), expected="1 run, 2 failed")

	def testSuite(self):
		suite = TestSuite()
		suite.add(WasRun("testMethod"))
		suite.add(WasRun("testBrokenMethod"))
		# result = TestResult()
		# self.assertEqual(actual=result.summary(), expected="2 run, 1 failed")
		suite.run(self.result)
		self.assertEqual(actual=self.result.summary(), expected="2 run, 1 failed")


suite = TestSuite()
suite.add( TestCaseTest("testTemplateMethod") )
suite.add( TestCaseTest("testResult") )
suite.add( TestCaseTest("testFailedResult") )
suite.add( TestCaseTest("testSuite") )
result = TestResult()
suite.run(result)
print( result.summary() )  ## 4 run, 0 failed
