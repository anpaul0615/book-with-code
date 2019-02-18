###
# Step 13
#
# - 리팩토링 (WasRun.wasRun 초기화 책임을 생성자에서 WasRun.setUp 으로 이동)
# - 테스트 통과 확인
#
###


class TestCase:
	def __init__(self, name):
		self.name = name

	def run(self):
		self.setUp()
		method = getattr(self, self.name)
		method()

	def setUp(self):
		pass


class WasRun(TestCase):
	def __init__(self, name):
		super().__init__(name)

	def testMethod(self):
		self.wasRun = 1
	
	def setUp(self):
		self.wasRun = None  ## WasRun.wasRun 초기화 책임을 생성자에서 WasRun.setUp 으로 이동
		self.wasSetUp = 1
	

class TestCaseTest(TestCase):
	def testRunning(self):
		test = WasRun("testMethod")
		# assert(not test.wasRun)  ## WasRun.run 호출전에 WasRun.wasRun 를 검사하지 않음
		test.run()
		assert(test.wasRun)

	def testSetUp(self):
		test = WasRun("testMethod")
		test.run()
		assert(test.wasSetUp)

TestCaseTest("testRunning").run()
TestCaseTest("testSetUp").run()
