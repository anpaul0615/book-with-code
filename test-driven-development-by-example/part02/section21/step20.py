###
# Step 20
#
# - 새로운 테스트케이스 추가 (테스트 실행결과 검증)
# - 테스트 실패 확인 (TestCase.run 에서의 반환값 없음)
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
	
	def testResult(self):  ## "테스트 실행결과 검증" 에 대한 테스트케이스 추가
		test = WasRun("testMethod")
		result = test.run()
		assert("1 run, 0 failed" == result.summary())  ## err..!


TestCaseTest("testTemplateMethod").run()
TestCaseTest("testResult").run()  ## "테스트 실행결과 검증" 에 대한 테스트케이스 테스트 실행
