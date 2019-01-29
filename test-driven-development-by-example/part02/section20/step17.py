###
# Step 17
#
# - 테스트코드 수정 (testRunning 테스트케이스 제거)
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
		self.log = self.log + "testMethod "

	def setUp(self):
		self.wasRun = None
		self.log = "setUp "
	

class TestCaseTest(TestCase):
	# def testRunning(self):  ## 테스트케이스 제거
	# 	self.test.run()
	# 	assert(self.test.log == "setUp testMethod ")

	def setUp(self):
		self.test = WasRun("testMethod")
	
	def testTemplateMethod(self):  ## 테스트케이스 이름변경
		self.test.run()
		assert(self.test.log == "setUp testMethod ")
	

# TestCaseTest("testRunning").run()  ## 테스트케이스 제거
TestCaseTest("testTemplateMethod").run()  ## 테스트케이스 이름변경
