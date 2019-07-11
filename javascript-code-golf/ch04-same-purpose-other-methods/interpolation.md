# 4.2. 그림을 쭈~욱 확대하자 (알고리즘 문제 4)


## 이미지 확대/축소에서의 보간법이란

- 보간 (Interpolation) :  
  수학적인 함수를 통해서 사이사이 비어있는 공간을 채우는 기법

- 이미지 확대/축소에서의 보간법 :  
  일종의 Corecursion 기법으로 대상 데이터(이미지)를 확대/축소하면서 새로 만들어지거나 없어지는 픽셀을 부드럽게 처리하는 방법

- 최근접이웃법 (nearestNeighbor-Interpolation) :  
  가장 가까운 픽셀을 기준으로 빈공간을 채움

- 쌍선형보간법 (bilinear-Interpolation) :  
  두개의 리니어.. 선형.. 차원이 1차원인.. 선형적으로 보간하는 .. 정확하게 비율이 똑같은..

- 쌍입방보간법 (bicubic-Interpolation) :  
  3차원으로 보간하는..

- 보간법이 이미지에서만 사용된다..?  
  ex) A 와 F 를 보간하고싶을때, 각 아스키코드 값의 차이를 기울기로 사용해서 선형보간법을 적용할수있음  
  ex) 음악파일의 wave 를 보간할수있음  
  
- 문제에 맞는 보간함수를 만든다면, 어떤 케이스에서도 보간을 적용할수있음..!

- 보간법에 알고리즘(ex. 수학함수) 만 교체하면, 전혀 다른 문제해결이 동작함..!

- 일반적으로는 두가지정도의 보간법이 함께 사용됨  
  ex) 줌인아웃 핸들링에는 nearestNeighbor 가 사용되고, 핸들링이 직접 적용되서 실제로 확대될때는 bicubic-Interpolation 가 사용됨
  
- 어떤 목적을 달성하기위해서는 비용과 시간의 교환이 일어남  
  품질과 시간 : 품질이 좋으면 시간이 오래걸림  
  데이터와 연산 : 데이터가 많으면 연산이 오래걸림  
  메모리가 충분하다..? : bicubic-map-Interpolation..! (미리 계산된 쌍입방보간법)  
  메모리도 부족하다..? : memoization-Interpolation..! (메모리 재활용)



## 실습코드

### 교재 실습코드 1 (최근접 이웃 보간법, NearestNeighbor-Interpolation)

- 생성이미지와 원본이미지를 비교하여 대응되는 화소를 결정함
- 비율(생성이미지 사이즈 / 원본이미지 사이즈) 에 맞추어서 화소가 복사되는 방식
- 사실상 원본 이미지에 대한 보간처리를 하지않음 (도트그림을 그대로 확대한 느낌)


```javascript
function nearestNeighbor(imgSrc, imgDst) {
  // 변수 초기화
  var res = '';
  // 원래 이미지
  var col = imgSrc.col;
  var srcW = imgSrc.w;
  var srcH = imgSrc.h;
  var srcArr = imgSrc.arr;
  // 보간이후 생성 이미지
  var dstW = imgDst.w;
  var dstH = imgDst.h;
  var dstArr = imgDst.arr;
  // 최근접 이웃 보간법 처리
  for (var y=0; y<dstH; y++) {
    for (var x=0; x<dstW; x++) {
      var x0 = Math.floor(x / (dstW / srcW));
      var y0 = Math.floor(y / (dstH / srcH));
      var col0 = srcArr[x0 + (y0 * srcW)];
      for (var c=0; c<col; c++) {
        dstArr[x + (y * dstW)][c] = col0[c];
      }
    }
  }
}
function main() {
  // 원본 이미지
  var imgSrc = {};
  imgSrc.col = 3;
  imgSrc.w   = 12;
  imgSrc.h   = 12;
  var R = [255, 0, 0];
  var G = [0, 255, 0];
  var B = [0, 0, 255];
  imgSrc.arr = [
    R, G, B, R, G, B, R, G, B, R, G, B,
    G, B, R, G, B, R, G, B, R, G, B, R,
    B, R, G, B, R, G, B, R, G, B, R, G,
    R, G, B, R, G, B, R, G, B, R, G, B,
    G, B, R, G, B, R, G, B, R, G, B, R,
    B, R, G, B, R, G, B, R, G, B, R, G,
    R, G, B, R, G, B, R, G, B, R, G, B,
    G, B, R, G, B, R, G, B, R, G, B, R,
    B, R, G, B, R, G, B, R, G, B, R, G,
    R, G, B, R, G, B, R, G, B, R, G, B,
    G, B, R, G, B, R, G, B, R, G, B, R,
    B, R, G, B, R, G, B, R, G, B, R, G
  ];
  // 생성 이미지
  var imgDst = {};
  imgDst.col = 3;
  imgDst.w   = 600;
  imgDst.h   = 100;
  imgDst.arr = [];
  for (var i = 0; i < imgDst.w * imgDst.h; i ++) {
    imgDst.arr[i] = new Array(imgDst.col);
  }
  // 코드실행
  nearestNeighbor(imgSrc, imgDst);
  // 결과확인 (자체 렌더링함수..?)
  rndr(imgDst);
}
```


### 교재 실습코드 2 (쌍 선형 보간법, Bilinear-Interpolation)

- 이미지 확대/축소 비율에 따라서 생성이미지의 화소를 결정함
- 원본이미지의 가로와 세로 각각 2화소씩 총 4화소를 이용하여 생성이미지의 화소색을 계산함
- 참조할 좌표를 정수가 아니라 실수로 계산함
- 원본이미지의 화소에서 얼마나 떨어져 있는지를 보고 색을 결정함
- 쌍 선형 보간법에서 화소의 색을 계산하는 방법
  ```
  새로운화소 = 거리X1 * 거리Y1 * 원본화소(X0,Y0)
            + 거리X0 * 거리Y1 * 원본화소(X1,Y0)
            + 거리X1 * 거리Y0 * 원본화소(X0,Y1)
            + 거리X0 * 거리Y0 * 원본화소(X1,Y1)
  
  (※ X1 = X0 + 1, Y1 = Y0 + 1)
  ```
- 거리의 총합을 1로 보고, 각 원본화소와 가까운 거리의 반대 방향 거리만큼 생성화소의 색 영향도를 결정함
  ```
  ex) 원본화소(0,0)  <--a-->  생성화소(x,y)  <--b-->  원본화소(1,0)
  - 거리a 와 거리b 의 합을 1 로 보면, 전체거리 1 에서 원본화소와의 거리만큼 차이를 영향도로 볼수있음
  - 예를들어 거리 0.7 만큼 떨어진 화소는, 거리 0.7 이 아니라 (1 - 거리) 0.3 을 영향도로 가짐
  - 거리가 멀면 영향을 적게받고, 가까우면 많이 받는 원리
  - 따라서 생성화소(x,y) 는 원본화소(0,0) 에서는 b 만큼 원본화소(1,0) 에서는 a 만큼 영향을 받음 (1 - a = b 이므로)
  ```
- 최근접 이웃 보간법과 달리 원본이미지를 어느정도 부드럽게 보정해줌

```javascript
function bilinear(imgSrc, imgDst){
  // 변수 초기화
  var res = '';
  // 원본 이미지
  var col = imgSrc.col;
  var srcW = imgSrc.w;
  var srcH = imgSrc.h;
  var srcArr = imgSrc.arr;
  // 보간이후 생성 이미지
  var dstW = imgDst.w;
  var dstH = imgDst.h;
  var datArr = imgDst.arr;
  // 스케일
  var scaleX = (dstW - 1) / (srcW - 1);
  var scaleY = (dstH - 1) / (srcH - 1);
  // 쌍 선형 보간법 처리
  for (var y=0; y<dstH; y++) {
    for (var x=0; x<dstW; x++) {
      var x0 = Math.floor(x / scaleX);
      var y0 = Math.floor(y / scaleY);
      var x1 = Math.min(srcW - 1, x0 + 1);
      var y1 = Math.min(srcH - 1, y0 + 1);
      var col0 = srcArr[x0 + y0 * srcW];
      var col1 = srcArr[x1 + y0 * srcW];
      var col2 = srcArr[x0 + y1 * srcW];
      var col3 = srcArr[x1 + y1 * srcw];
      var rtX = x / scaleX - x0;
      var rty = y / scaleY - y0;
      for (var c=0; c<col; c++) {
        dstArr[x + y * dstW][c] = Math.round(
          (1 - rtX) * (1 - rtY) * col0[c]
          + rtx * (1 - rtY) * col1[c]
          + (1 - rtx) * rtY * col2[c]
          + rtX * rtY * col3[c]
        );
      }
    }
  }

}
```


### 교재 실습코드 3 (쌍 입방 보간법, Bicubic-Interpolation)

- 원본이미지의 각 가로 4화소와 세로 4화소씩 총 16화소를 이용하여 생성이미지의 화소색을 계산함
- 합산거리가 1인 4각형의 꼭지점 4개와, 그 꼭지점방향으로 거리1 만큼의 점들을 참조 좌표로 활용함
  ```
  ex) 원본화소(-1,0) <--aa--> 원본화소(0,0) <--a--> 생성화소(x,y) <--b--> 원본화소(1,0) <--bb--> 원본화소(2,0)
  ```
- 거리가 0\~1 인 원본이미지 화소와 거리가 1\~2 인 원본이미지 화소의 영향도를 적용해서 생성이미지의 화소를 결정함
- 원본이미지 화소 영향도 계산에 무게계산식을 사용함
  ```
  거리를 d (d >= 0) 으로 두었을때,
  0 <= d < 1.0 인 경우 : 1 - 2*d^2 + d^3
  1.0 <= d < 2.0 인 경우 : 4 - 8*d + 5*d^2 - d^3
  2.0 <= d 인 경우 : 0
  ```
- 쉽게말해서 원본화소(a,b) 와 생성화소(x,y) 사이에서,  
  두 점간 거리가 0\~1 인 경우는 +영향을 받고, 1\~2 인 경우는 -영향을 받고, 2 이상인 경우는 영향을 받지 않는다는 의미

```javascript
function bicubic(imgSrc, imgDst) {
  // 변수 초기화
  var res = '';
  // 원본 이미지
  var col = imgSrc.col;
  var srcW = imgSrc.w;
  var srcH = imgSrc.h;
  var srcArr = imgSrc.arr;
  // 보간이후 생성 이미지
  var dstW = imgDst.w;
  var dstH = imgDst.h;
  var dstArr = imgDst.arr;
  // 스케일
  var scaleX = (dstW-1) / (srcW-1);
  var scaleY = (dstH-1) / (srcH-1);
  // 계산 방법
  var isSinc = false;
  // 무게계산식
  function wght(d) {
    if (isSinc) return sinc(d);
    if (d<1) {  // d <= 1.0 일때 : 1 - 2*d^2 + d^3
      return 1 - 2*d*d + d*d*d;
    }
    else if (d<2) {  // 1.0 <= d <= 2.0 일때 : 4 - 8*d + 5*d^2 + d^3
      return 4 - 8*d + 5*d*d* - d*d*d;
    }
    else {  // d > 2.0 일때 : 0
      return 0;
    }
  }
  function sinc(d) {
    if (d == 0) return 1;
    return Math.sidn(d * Math.PI) / (d * Math.PI);
  }
  // 쌍 입방 보간법 처리
  for (var y=0; y<dstH; y++) {
    for (var x=0; x<dstW; x++) {
      // X화소 4점, Y화소 4점을 취득
      var xArr = [];
      var yArr = [];
      xArr[1] = Math.floor(x / scaleX);
      yArr[1] = Math.floor(y / scaleY);
      xArr[0] = Math.max(0, xArr[1]-1);
      yArr[0] = Math.max(0, yArr[1]-1);
      xArr[2] = Math.min(srcW-1, xArr[1]+1);
      yArr[2] = Math.min(srcH-1, yArr[1]+1);
      xArr[3] = Math.min(srcW-1, xArr[1]+2);
      yArr[3] = Math.min(srcH-1, yArr[1]+2);
      // 비율점
      var rtX = x / scaleX - xArr[1];
      var rtY = y / scaleY - yArr[1];
      // 4*4=16 칸의 색 취득
      var colSum = [0,0,0];
      for (var yC=0; yC<4; yC++) {
        for (var xC=0; xC<4; xC++) {
          var rgb = srcArr[xArr[xC] + (yArr[yC] * srcW)];
          var dX = Math.abs(rtX - (xC-1));
          var dY = Math.abs(rtY - (xY-1));
          colSum[0] += rgb[0] * wght(dX) * wght(dY);
          colSum[1] += rgb[1] * wght(dX) * wght(dY);
          colSum[2] += rgb[2] * wght(dX) * wght(dY);
        }
      }
      // 색 합계
      for (var c=0; c<col; c++) {
        dstArr[x + y * dstW][c] = Math.min(255, colSUm[c]);
      }
    }
  }
}
```
