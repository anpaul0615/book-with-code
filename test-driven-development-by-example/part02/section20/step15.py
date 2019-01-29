###
# Step 15
#
# - 모델코드 수정 (WasRun.wasSetUp 플래그를 로그 기록으로 변경)
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
		self.wasRun = None
		# self.wasSetUp = 1
		self.log = "setUp "  ## 로그 기록
	

class TestCaseTest(TestCase):
	def testRunning(self):
		self.test.run()
		assert(self.test.wasRun)

	def testSetUp(self):
		self.test.run()
		# assert(self.test.wasSetUp)
		assert(self.test.log == "setUp ")  ## 플래그 대신 로그 기록 확인
	
	def setUp(self):
		self.test = WasRun("testMethod")

TestCaseTest("testRunning").run()
TestCaseTest("testSetUp").run()
