# 5.2. 게임 월드맵 생성하기 (코드골프 문제 5)

## 밸류노이즈

- 언뜻보기에는 랜덤 같지만 부분적으로 계층구조를 갖는 텍스쳐를 만드는 방법

- 알고리즘 :  
  1) 충분히 작은 크기의 이미지를 준비함  
  2) 준비한 이미지의 각 픽셀에 대해 흰색 혹은 검은색을 무작위로 칠함  
  3) 선형보간법이나 입방보간법으로 이미지를 출력크기까지 확대함  
  4) 앞의 이미지보다는 크며 최종 출력 크기보다는 작은 새로운 이미지를 준비함  
  5) 순서2~4를 일정 횟수 반복함  
  6) 생성된 이미지들을 모두 반투명 처리하여 겹침  
  7) 겹쳐진 이미지를 최종 출력으로 함  

- 각 서브이미지들은 '출력이미지:대상이미지' 의 비율로 값을 합성함

- 출력값은 순차적으로 여러번 합성되어 완성되기 때문에 먼저 반영된 앞쪽의 값이 점점 옅어지게됨

- 희석률은 처음에 합성된 이후로 얼마나 값이 남아있는지를 나타내는 속성이고,  
  반영률은 최종결과에 얼마나 반영되어 있는지를 나타내는 속성임  

- 밸류노이즈로 생성된 그레이스케일 이미지에서 고도 속성을 후처리하여 지형의 높낮이를 구현할수있음



## 구현

### 교재 실습코드

```javascript
function originalCode() {
  // 변수 초기화
  var res = '';
  // 출력 맵 데이터
  var destW = 256;
  var destH = 160;
  var resArr = [];
  var nMax = 16;
  var pile = (nMax * 0.4) | 0;
  var srcWU = (destW / 20 - 1) | 0;
  var srcHU = (destH / 20 - 1) | 0;
  // 밸류노이즈 반복
  for (var n=0; n<nMax; n++) {
    // 원본 이미지 데이터
    var srcW = srcWU * (n + 1);
    var srcH = srcHU * (n + 1);
    var srcArr = [];
    // 대체랜덤(0~255)
    for (var i=0; i<srcW * srcH; i++) {
      srcArr[i] = ((i * i * 4999 + 8999 & 0xFFFF) / 0x10000) % 2 * 255;
    }
    // 선형보간법 확대처리
    var destArr = [];
    var scaleX = destW / (srcW - 1);
    var scaleY = destH / (srcH - 1);
    for (var y=0; y<destH; y++) {
      for (var x=0; x<destW; x++) {
        var x0 = Math.floor(x / scaleX);
        var y0 = Math.floor(y / scaleY);
        var x1 = x / scaleX - x0;
        var y1 = y / scaleY - y0;
        var col0 = srcArr[x0 + (y0) * srcW];
        var col1 = srcArr[x0 + 1 + (y0) * srcW];
        var col2 = srcArr[x0 + (y0 + 1) * srcW];
        var col3 = srcArr[x0 + 1 + (y0 + 1) * srcW];
        destArr[x + y * destW] = Math.floor(
            (1 - x1) * (1 - y1) * col0
          +      x1  * (1 - y1) * col1
          + (1 - x1) *      y1  * col2
          +      x1  *      y1  * col3
        );
      }
    }
    // 겹치기 비율
    var plRes = (n + pile) / (n + pile + 1);
    var plDest = 1 / (n + pile + 1);
    // 맵 합성
    for (var i=0; i<destW * destH; i++) {
      if (n == 0) resArr[i] = destArr[i];
      else resArr[i] = Math.floor(resArr[i] * plRes + destArr[i] * plDest);
    }
  }
  // 최종 결과 처리
  res = destW + ',' + destH + ',' + resArr.join(',');
  return res;
}
```

