###
# Step 10
#
# - 리팩토링 (테스트 실행코드를 TestCase 를 상속받도록 변경)
# - 테스트 통과 확인
#
###


class TestCase:
	def __init__(self, name):
		self.name = name

	def run(self):
		method = getattr(self, self.name)
		method()


class WasRun(TestCase):
	def __init__(self, name):
		super().__init__(name)
		self.wasRun = None


	def testMethod(self):
		self.wasRun = 1
	

class TestCaseTest(TestCase):  ## 테스트 실행코드 수정
	def testRunning(self):
		test = WasRun("testMethod")
		assert(not test.wasRun)  ## pass
		test.run()
		assert(test.wasRun)  ## pass

TestCaseTest("testRunning").run()  ## 테스트 실행코드를 실행하는 함수 실행
