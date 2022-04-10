---
title: 재귀함수
meta:
  - name: description
    content: Description of Recursion and Tail Recursion
  - property: og:title
    content: Description of Recursion and Tail Recursion
  - property: og:description
    content: Description of Recursion and Tail Recursion
---

반복문(Iteration), recursion, tail recursion 정리.  
recursion: 하나의 함수가 자신을 다시 호출하여 반복되는 작업을 수행한다.

### 1.for문, recursion 함수 차이 및 장단점

### 반복문(Iteration)

```typescript
const iterator = (n: number) => {
  let result = 0
  for (const i = 1; i <= n; i++) {
    result += i
  }

  return result
}
```

### recursion

```typescript
const recursive = (n: number) => {
  if (n === 1) return 1

  return n + recursive(n  1)
}
```

### compiled recursion

```typescript
const compileRecursive = (n: number) => {
  if (n === 1) return 1

  const result = compileRecursive(n - 1)
  return n + result
}
```

### 재귀 함수의 장점 및 단점 (반복문과 비교했을 때)

1. 재귀 함수가 반복문보다 가독성이 더 좋다.
2. 재귀 함수는 내부적으로 스택 메모리를 통해 실행되는데 `stack oveflow`가 발생하면서 프로그램이 비정상적으로 종료될 수 있다.
3. 재귀 함수는 함수를 반복적으로 호출하므로 함수가 호출되고 종료될 때 스택 프레임을 구성하고(활성화 레코드) 해제하는 과정에서 오버헤드가 든다. (함수는 활성 레코드에 관련 정보를 저장하는데 이 활성 레코드들이 스택 메모리에 순서대로 저장된 뒤 차례로 POP 된다.)
4. 재귀 함수를 컴파일러가 해석한 코드를 보면 재귀 함수를 호출할 때마다 변수가 새로 선언되기 때문에 재귀 함수를 지나치게 사용하면 메모리 부족 현상이 발생할 수 있다.
5. 일반적인 반복문을 사용하면 지역 변수들이 호출될 때마다 한번만 할당하기 때문에 위와 같은 비효율은 발생하지 않는다.
6. 재귀 함수를 사용할 때 함수를 너무 많이 호출해야 한다면 사용하지 않는 것이 좋다.

### tail recursion

반복문보다 가독성도 좋고, 재귀 함수의 단점(스택 메모리 성능)을 보완함

```typescript
const tailRecursive = (n: number, acc: any) => {
  if (n === 1) return acc

  return tailRecursive(n - 1, n + acc)
}
```

### compiled tail recursion (반복문으로 컴파일된다.)

```typescript
const compileTailRecursive = (n: number, acc: any) => {
  while (n > 1) {
    acc = acc + n
    n = n - 1
  }

  return acc
}
```

### 꼬리 재귀 함수의 특징 및 장점

1. 꼬리 재귀는 함수가 리턴된 후에 아무 작업을 하지 않도록 한다. 꼬리 재귀는 연산이 return문 이전에 이루어지고 다음 함수 호출시 파라미터를 통해 필요한 연산의 결과를 전달한다.
2. 재귀 함수의 단점을 보완하였는데, 코드 상에서 해결하는 것이 아니라 컴파일러가 꼬리 재귀를 인식하고 코드를 최적화하면서 재귀 호출이 가진 문제점을 해결한다. 즉, 컴파일러가 반복문으로 바꿔준다.

### 더 알아보기

1. 컨텍스트 스위칭
2. 활성화 레코드 - 스택에 저장되는 것으로서 스택 프레임이라고도 한다. 활성화 레코드는 컨텍스트 스위칭을 하기 전에 함수 상태를 기록하고 복원하기 위한 것으로써, 해당 함수의 리턴값, 값 파라미터, 지역 변수, 귀환 주소 등의 정보가 기록된다. 위 과정에서 문맥 교환(conetxt switch) 현상이 발생하기 때문에 재귀호출이 다른 방법에 비해 시간 복잡도가 늘어난다.

<!-- <Disqus /> -->
