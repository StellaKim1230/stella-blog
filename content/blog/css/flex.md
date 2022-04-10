---
title: Flex(Flexible Box)
meta:
  - name: description
    content: Flexbox는 행과 열 형태로 배치하는 일차원 레이아웃이다.
  - property: og:title
    content: Flexbox, flex
  - property: og:description
    content: Flexbox는 행과 열 형태로 배치하는 일차원 레이아웃이다.
---

CSS의 flex는 엘리먼트들의 크기, 위치를 쉽게 잡아주고 많은 레이아웃 작업을 쉽게 만들어주는 도구이다.

## 소개 및 구성

flexbox로 레이아웃을 구성하기 위해서는, 먼저 어떤 요소들을 flexbox 레이아웃 요소들로 구성할지 선택해야 한다. flexbox 레이아웃의 영향을 주고 싶은 요소의 부모 요소에 `display: flex` 값을 지정해줘야 한다.

<center>
  <figure>
    <img src="https://user-images.githubusercontent.com/22426851/116805350-f32db080-ab60-11eb-8e24-7d6f8f13f85d.png" alt="flex">
  </figure>
</center>

기본적으로 flexbox 레이아웃을 구성하기 위해서는 아래와 같이 복수의 자식 요소인 flex item과 상위 부모 요소인 flex container로 구성된다.

<center>
  <figure>
    <img src="https://developer.mozilla.org/files/3739/flex_terms.png" alt="flex model">
  </figure>
</center>

[이미지참고-Flexbox Mdn](https://developer.mozilla.org/ko/docs/Learn/CSS/CSS_layout/Flexbox)

flexbox로 레이아웃 될 때 두 개의 축을 따라 배치된다.

- 기본 축(main axis)은 flex item이 배치되고 있는 방향으로 진행하는 축이다. 예를 들어, 페이지를 가로지르는 행 또는 페이지 밑으로 쌓이는 열이다. 이 기본 축의 시작과 끝을 main start, main end라고 한다.

- 교차 축(cross axis)은 flex item이 내부에 배치되는 방향에 직각을 이루는 축이다. 이 교차 축의 시작과 끝을 cross start, cross end라고 한다.

flexbox는 기본 축이 진행되는 방향을 지정할 수 있는데, 이는 flex-direction이라는 속성을 이용하여 행은 row, 열은 column이라는 값으로 지정한다. 이 외에도 여러 가지 속성들이 있다.

## 요소

flexbox를 사용하기 위해 필자는 다음과 같이 요소를 정의했다.

```javascript
<div class="flex-container">
  <div class="flex-item">flex item1</div>
  <div class="flex-item">flex item2</div>
  <div class="flex-item">flex item3</div>
  <div class="flex-item">flex item4</div>
<div>
```

```css
.flex-container {
  display: flex;
}
```

### flex

`display: flex`를 사용했을경우 레이아웃이 아래와 같이 정의된다.

<figure>
  <img src="https://user-images.githubusercontent.com/22426851/116805846-1574fd80-ab64-11eb-8515-5b90a48155e1.png" alt="flex layout">
</figure>

### 부모 요소

부모 요소에는 기본적으로 다음과 같은 속성이 있다.

- flex-direction  
   item들의 행, 열 방향을 나타낸다. 값으로는 row, column, row-reverse, column-reverse이 있다.
  - <strong>row(default)</strong>
    <figure>
      <img src="https://user-images.githubusercontent.com/22426851/116806212-7a315780-ab66-11eb-8589-2f3155cbab2b.png" alt="flex direction row">
    </figure>
  - <strong>column</strong>
    <figure>
      <img src="https://user-images.githubusercontent.com/22426851/116806298-fc218080-ab66-11eb-8283-3351feb47bad.png" alt="flex direction column">
    </figure>
  - <strong>row-reverse</strong>
    <figure>
      <img src="https://user-images.githubusercontent.com/22426851/116806677-adc1b100-ab69-11eb-954a-1039a33efeae.png" alt="flex direction row-reverse">
    </figure>
  - <strong>column-reverse</strong>
    <figure>
      <img src="https://user-images.githubusercontent.com/22426851/116806327-2a9f5b80-ab67-11eb-9317-02bfc30e1fe3.png" alt="flex direction column-reverse">
    </figure>
- flex-wrap  
  item들의 너비의 합이 flex container 너비를 초과할 때 어떻게 처리할지를 결정하는 속성이다. 값으로는 nowrap(줄바꿈 안함), wrap(줄바꿈), wrap-reverse(역 줄바꿈)이 있다.
  - <strong>nowrap(default)</strong>
    <figure>
      <img src="https://user-images.githubusercontent.com/22426851/116806848-b797e400-ab6a-11eb-8193-9bdc0e69ce31.png" alt="flex wrap nowrap">
    </figure>
  - <strong>wrap</strong>
    <figure>
      <img src="https://user-images.githubusercontent.com/22426851/116806745-ff6a3b80-ab69-11eb-8f98-578f532ff817.png" alt="flex wrap wrap">
    </figure>
  - <strong>wrap-reverse</strong>
    <figure>
      <img src="https://user-images.githubusercontent.com/22426851/116806867-cd0d0e00-ab6a-11eb-82fa-d3ec89dc1352.png" alt="flex wrap wrap-reverse">
    </figure>
- justify-content  
  item과 container간에 수평방향으로 여백을 주는 방식을 지정한다. 값으로는 flex-start, flex-end, center, space-between, space-around이 있다.

  - <strong>flex-start(default)</strong> - 요소들을 컨테이너의 왼쪽으로 정렬한다.

    <figure>
      <img src="https://user-images.githubusercontent.com/22426851/116807108-3b060500-ab6c-11eb-853a-b39f7d684961.png" alt="justify-content flex-start">
    </figure>

  - <strong>flex-end</strong> - 요소들을 컨테이너의 오른쪽으로 정렬한다.

    <figure>
      <img src="https://user-images.githubusercontent.com/22426851/116807168-97692480-ab6c-11eb-8b40-c8c4f6eb2b14.png" alt="justify-content flex-end">
    </figure>

  - <strong>center</strong> - 요소들을 컨테이너의 중앙으로 정렬한다.

    <figure>
      <img src="https://user-images.githubusercontent.com/22426851/116807293-59b8cb80-ab6d-11eb-83c4-25707b1d0182.png" alt="justify-content center">
    </figure>

  - <strong>space-between</strong> - 요소들을 사이에 동일한 간격을 둔다.

    <figure>
      <img src="https://user-images.githubusercontent.com/22426851/116807282-49085580-ab6d-11eb-84a8-e059388dff2d.png" alt="justify-content space-between">
    </figure>

  - <strong>space-around</strong> - 요소들을 감싼 둘레에 동일한 간격을 둔다.

    <figure>
      <img src="https://user-images.githubusercontent.com/22426851/116807274-3beb6680-ab6d-11eb-8c77-84394dec4e98.png" alt="justify-content space-around">
    </figure>

* align-items  
  item과 container간에 수직방향으로 여백을 주는 방식을 지정한다. 값으로는 flex-start, flex-end, center, stretch가 있다.
  - <strong>flex-start(default)</strong> - 교차축의 앞부터 요소를 배치한다.
    <figure>
      <img src="https://user-images.githubusercontent.com/22426851/116807401-06934880-ab6e-11eb-962a-28b2455d12f9.png" alt="align-items flex-start">
    </figure>
  - <strong>flex-end</strong> - 교차축의 끝부터 요소를 배치한다.
    <figure>
      <img src="https://user-images.githubusercontent.com/22426851/116807415-19a61880-ab6e-11eb-9db7-2fa3829fd3bf.png" alt="align-items flex-end">
    </figure>
  - <strong>center</strong> - 교차축의 중간에 요소를 배치한다.
    <figure>
      <img src="https://user-images.githubusercontent.com/22426851/116807436-2f1b4280-ab6e-11eb-8a47-73d316d545a8.png" alt="align-items center">
    </figure>
  - <strong>stretch</strong> - 교차축의 양끝 기준 상하로 쭉 늘어난다.
    <figure>
      <img src="https://user-images.githubusercontent.com/22426851/116807461-44906c80-ab6e-11eb-8e79-33c928e9c245.png" alt="align-items stretch">
    </figure>
* align-content  
  item들을 한 줄에 다 표시할 수 없어서 다음 줄로 넘김이 발생했을 때 줄 사이에 여백을 결정하는 속성이다. 이것은 flex-wrap: wrap 줄 바꿈 속성을 필수로 지정해줘야 한다. 값으로는 flex-start, flex-end, center, space-between, space-around, stretch가 있다.
  - <strong>flex-start(default)</strong>
    <figure>
      <img src="https://user-images.githubusercontent.com/22426851/116807548-bd8fc400-ab6e-11eb-95fe-ad95959d0e05.png" alt="align-content flex-start">
    </figure>
  - <strong>flex-end</strong>
    <figure>
      <img src="https://user-images.githubusercontent.com/22426851/116807560-cd0f0d00-ab6e-11eb-855a-7ddcce4a01ca.png" alt="align-content flex-end">
    </figure>
  - <strong>center</strong>
    <figure>
      <img src="https://user-images.githubusercontent.com/22426851/116807570-dac49280-ab6e-11eb-91e5-06c6b580b7f7.png" alt="align-content center">
    </figure>
  - <strong>space-between</strong>
    <figure>
      <img src="https://user-images.githubusercontent.com/22426851/116807580-e87a1800-ab6e-11eb-9abc-b878ffb54129.png" alt="align-content space-between">
    </figure>
  - <strong>space-around</strong>
    <figure>
      <img src="https://user-images.githubusercontent.com/22426851/116807591-f62f9d80-ab6e-11eb-92e4-1e65fbc66a68.png" alt="align-content space-around">
    </figure>
  - <strong>stretch</strong>
    <figure>
      <img src="https://user-images.githubusercontent.com/22426851/116807603-047db980-ab6f-11eb-927a-c53d5d0292c2.png" alt="align-content stretch">
    </figure>

### 자식 요소

자식 요소에는 기본적으로 다음과 같은 속성이 있다.

- order  
   item이 배치될 순서를 지정한다. 속성값은 숫자이며 작을수록 먼저 배치된다.

  ```css
  .flex_container :nth-child(1) {
    order: 100;
  }
  .flex_container :nth-child(2) {
    order: -5;
  }
  .flex_container :nth-child(3) {
    order: 2;
  }
  .flex_container :nth-child(4) {
    order: -10;
  }
  ```

  <figure >
    <img src="https://user-images.githubusercontent.com/22426851/116805941-d5fae100-ab64-11eb-9706-4506e1ceb85d.png" alt="order">
  </figure>

- flex-grow  
  container 여분의 여백이 있을때 동작한다. flex-grow의 설정된 비율만큼 분배되도록 동작한다.

  ```css
  .flex_container :nth-child(1) {
    flex-grow: 4;
  }
  .flex_container :nth-child(2) {
    flex-grow: 1;
  }
  .flex_container :nth-child(3) {
    flex-grow: 1;
  }
  .flex_container :nth-child(4) {
    flex-grow: 2;
  }
  ```

  <figure >
    <img src="https://user-images.githubusercontent.com/22426851/116805972-122e4180-ab65-11eb-8f1c-2af74b9e9a0a.png" alt="flex-grow">
  </figure>
  flex_item1: (4/8)의 비율, flex_item2: (1/8)의 비율, flex_item3: (1/8)의 비율, flex_item4: (2/8)의 비율만큼 분배되었다.

- flex-basis  
  item의 기본 너비를 설정한다.
  ```css
  .flex_item {
    flex-basis: 100px;
  }
  ```
  <figure >
    <img src="https://user-images.githubusercontent.com/22426851/116806035-689b8000-ab65-11eb-9530-0540494dd295.png" alt="flex-basis">
  </figure>
  item들이 100px의 고정 너비의 크기로 지정되었다.

이 외에도 flexbox를 사용하는 속성들이 많지만, 필자가 주로 사용하는 속성들을 기준으로 정리했다.

## 브라우저 호환성

flexbox 지원은 파이어폭스, 크롬, 오페라, 엣지, IE11, 안드로이드 및 iOS 최신 버전 등 대부분의 신형 브라우저에서 사용 할 수 있습니다. 하지만, 구형 브라우저에는 여전히 flexbox를 지원하지 않습니다. flexbox 기능을 지원하지 않을 경우 레이아웃이 완전히 깨져서 사용할 수 없게 됩니다. 그래서 Flexbox를 디자인의 기본 레이아웃 메서드를 사용할 것을 권고하고 있다.
