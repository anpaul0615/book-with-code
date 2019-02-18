###
# Step 14
#
# - 리팩토링 (테스트코드에서의 모델코드 객체 생성 행위 추상화)
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
		self.wasSetUp = 1
	

class TestCaseTest(TestCase):
	def testRunning(self):
		# test = WasRun("testMethod")
		self.test.run()
		assert(self.test.wasRun)

	def testSetUp(self):
		# test = WasRun("testMethod")
		self.test.run()
		assert(self.test.wasSetUp)
	
	def setUp(self):  ## WasRun 객체 생성 행위를 공통함수로 추출
		self.test = WasRun("testMethod")

TestCaseTest("testRunning").run()  ## TestCase, WasRun 를 테스트하는 테스트클래스도 TestCase 를 상속받았기 때문에
TestCaseTest("testSetUp").run()    ## 따라서 테스트클래스의 run 을 호출하면, 상위클래스인 TestCase 의 run 에 의해서 그 테스트클래스에 정의되어있는 setUp 이 호출됨
