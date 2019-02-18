###
# Step 31
#
# - 모델코드 수정 (TestCase.run, TestSuite.run 에서 호스트코드에서 건내받은 TestResult 객체를 사용하도록 변경)
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

	def run(self,result):		## 호스트코드에서 건내받은 TestResult 객체를 사용하도록 변경
		# result = TestResult()
		# print('222', result)
		result.testStarted()
		self.setUp()
		try:
			method = getattr(self, self.name)
			method()
		# except:
		# 	result.testFailed()
		except Exception as e:
			print(str(e))  ## 디버깅용 로그
			result.testFailed()
			# print('222-2', result)

		self.tearDown()
		# return result

	def assertEqual(self, actual, expected, isReversed=False):
		assertion = (actual != expected) if isReversed else (actual == expected)
		if assertion:
			pass
		else:
			print("Assert%sEqual \t : %s" % ("Not" if isReversed else "", assertion))
			print("- Actual \t : %s" % actual)
			print("- Expected \t : %s" % expected)
			raise Exception		## TestSuite 로 올려보내는 assert Exception 추가

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

	def run(self,result):		## 호스트코드에서 건내받은 TestResult 객체를 사용하도록 변경
		# result = TestResult()
		# print('111', result)
		for test in self.tests:
			test.run(result)
		# return result


class TestCaseTest(TestCase):
	def setUp(self):
		self.test = WasRun("testMethod")
	
	def testTemplateMethod(self):
		# self.test.run()
		result = TestResult()		## TestResult 를 호스트코드에서 건내주는 방식으로 변경
		self.test.run(result)
		self.assertEqual(actual=self.test.log, expected="setUp testMethod tearDown ")
	
	def testResult(self):
		test = WasRun("testMethod")
		# result = test.run()
		result = TestResult()		## TestResult 를 호스트코드에서 건내주는 방식으로 변경
		test.run(result)
		self.assertEqual(actual=result.summary(), expected="1 run, 0 failed")
		
	def testFailedResult(self):
		test = WasRun("testBrokenMethod")
		# result = test.run()
		result = TestResult()		## TestResult 를 호스트코드에서 건내주는 방식으로 변경
		test.run(result)
		self.assertEqual(actual=result.summary(), expected="1 run, 1 failed")
		self.assertNotEqual(actual=result.summary(), expected="1 run, 2 failed")

	def testSuite(self):
		suite = TestSuite()
		suite.add(WasRun("testMethod"))
		suite.add(WasRun("testBrokenMethod"))
		# result = suite.run()
		result = TestResult()		## TestResult 를 호스트코드에서 건내주는 방식으로 변경
		suite.run(result)
		self.assertEqual(actual=result.summary(), expected="2 run, 2 failed")



# TestCaseTest("testTemplateMethod").run()
# TestCaseTest("testResult").run()
# TestCaseTest("testFailedResult").run()
# TestCaseTest("testSuite").run()		## err..!
suite = TestSuite()
suite.add( TestCaseTest("testTemplateMethod") )
suite.add( TestCaseTest("testResult") )
suite.add( TestCaseTest("testFailedResult") )
suite.add( TestCaseTest("testSuite") )
result = TestResult()
# print('000', result)
suite.run(result)
print( result.summary() )  ## 4 run, 0 failed
