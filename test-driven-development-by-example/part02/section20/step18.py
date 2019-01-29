###
# Step 18
#
# - 새로운 테스트케이스 추가 (WasRun.tearDown 메소드 추가)
# - 테스트 실패 확인 (WasRun.tearDown 정의되지 않음)
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
	def setUp(self):
		self.test = WasRun("testMethod")
	
	def testTemplateMethod(self):
		self.test.run()
		assert(self.test.log == "setUp testMethod tearDown ")  ## tearDown 테스트케이스 추가
	

TestCaseTest("testTemplateMethod").run()
