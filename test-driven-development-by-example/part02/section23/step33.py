###
# Step 33
#
# - 리팩토링 (TestCase.assertEqual, TestCase.assertNotEqual 출력포멧 수정)
# - 테스트 통과 확인
#
###


import inspect


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

	# def assertEqual(self, actual, expected, isReversed=False):
	def assertEqual(self, actual, expected):
		# assertion = (actual != expected) if isReversed else (actual == expected)
		assertion = actual == expected
		if assertion:
			pass
		else:
			print("-" * 36)		## 구분자
			print("Test Function \t : %s" % inspect.stack()[1].function)		## 테스트 함수명
			print("Test Result \t : AssertEqual is %s" % assertion)		## 테스트 결과
			print("- Actual \t : %s" % actual)
			print("- Expected \t : %s" % expected)
			print("-" * 36)		## 구분자
			raise Exception

	# def assertNotEqual(self, actual, expected):
	# 	self.assertEqual(actual, expected, True)
	def assertNotEqual(self, actual, expected):		## inspect 추적을 위해 오버로딩 삭제
		assertion = actual != expected
		if assertion:
			pass
		else:
			print("-" * 36)		## 구분자
			print("Test Function \t : %s" % inspect.stack()[1].function)		## 테스트 함수명
			print("Test Result \t : AssertNotEqual is %s" % assertion)		## 테스트 결과
			print("- Actual \t : %s" % actual)
			print("- Expected \t : %s" % expected)
			print("-" * 36)		## 구분자
			raise Exception


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
		self.result = TestResult()

	def testTemplateMethod(self):
		self.test.run(self.result)
		self.assertEqual(actual=self.test.log, expected="setUp testMethod tearDown ")
	
	def testResult(self):
		test = WasRun("testMethod")
		test.run(self.result)
		self.assertEqual(actual=self.result.summary(), expected="1 run, 0 failed")
		
	def testFailedResult(self):
		test = WasRun("testBrokenMethod")
		test.run(self.result)
		self.assertEqual(actual=self.result.summary(), expected="1 run, 1 failed")
		self.assertNotEqual(actual=self.result.summary(), expected="1 run, 2 failed")

	def testSuite(self):
		suite = TestSuite()
		suite.add(WasRun("testMethod"))
		suite.add(WasRun("testBrokenMethod"))
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
