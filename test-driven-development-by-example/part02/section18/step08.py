###
# Step 8
#
# - 리팩토링 (상위클래스 TestCase 정의)
# - 테스트 통과 확인
#
###


class TestCase:  ## 상위클래스 정의
	pass


class WasRun(TestCase):  ## 상위클래스 상속
	def __init__(self, name):
		self.wasRun = None
		self.name = name

	def testMethod(self):
		self.wasRun = 1
	
	def run(self):
		method = getattr(self, self.name)
		method()


test = WasRun("testMethod")
print(test.wasRun)  ## None (ok)
test.run()
print(test.wasRun)  ## 1 (ok)
