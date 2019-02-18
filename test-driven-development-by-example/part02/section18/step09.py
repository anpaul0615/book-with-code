###
# Step 9
#
# - 리팩토링 (하위클래스 기능을 상위클래스로 이동)
# - 테스트 통과 확인
#
###


class TestCase:
	def __init__(self, name):  ## name 속성 초기화 책임을 상위클래스로 이동
		self.name = name

	def run(self):  ## run 함수를 상위클래스로 이동
		method = getattr(self, self.name)
		method()


class WasRun(TestCase):
	def __init__(self, name):
		super().__init__(name)  ## 상위클래스 생성자호출
		self.wasRun = None


	def testMethod(self):
		self.wasRun = 1
	

test = WasRun("testMethod")
print(test.wasRun)  ## None (ok)
test.run()
print(test.wasRun)  ## 1 (ok)
