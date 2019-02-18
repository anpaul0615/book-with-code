###
# Step 1
#
# - 새로운 테스트케이스 추가 (테스트함수를 테스트하는 테스트코드)
# - 테스트 실패 확인 (WasRun 클래스 정의되지 않음)
#
###


test = WasRun("testMethod")  ## 'WasRun' is not defined
print(test.wasRun)
test.testMethod()
print(test.wasRun)
