---
title: 타입 단언(Type Assertion)이 위험한 이유
date: "2023-11-30"
description: "타입 단언(Type Assertion)이 위험한 이유는 무엇일까?"
meta:
  - name: description
    content: 타입 단언(Type Assertion)이 위험한 이유는 무엇일까
  - property: og:title
    content: 타입 단언(Type Assertion)이 위험한 이유
  - property: og:description
    content: 타입 단언(Type Assertion)이 위험한 이유는 무엇일까
---

## 타입 단언 이란?

타입 단언이란 타입스크립트가 추론하지 못하는 타입을 강제하고 타입 체커에게 에러를 무시하라고 알려준다.
예를 들어, `name` 과 `age` 을 다루는 타입 `Person` 이 있다고 가정하자. `person1` 에는 빈 객체를 할당했고, `person2` 에는 타입 단언을 사용해서 빈 객체를 할당했다. `person1` 에서 속성 `name` 에 참조하려고 할 때는 `{} 형식에 'name' 속성이 없습니다.` 라고 에러가 난다. 하지만 타입 단언을 사용해서 빈 객체로 초기화 한 `person2` 에서 속성 `name` 에 참조해서 값을 할당하려고 할 때는 에러가 나지 않는다. 타입 단언은 개발자가 컴파일러에게 `이 변수는 이 타입이다` 라고 알려주지만 런타임 단계에서는 타입을 보장하지 않는다.

```typescript
type Person = {
  name: string
  age: number
}

const person1 = {}
console.log(person1.name) // '{}' 형식에 'name' 속성이 없습니다.

// 타입 단언은 as 키워드를 사용한다.
const person2 = {} as Person
person.name = "stella kim"

console.log(person1.name) // stella kim
```

아래 코드 블록의 경우, 타입스크립트는 컴파일 단계에서 에러를 발생시키지 않지만, 런타임 단계에서는 `person.name`을 참조할 때 `undefined`나 `null`로 인해서 에러가 발생할 것이다.

```typescript
type Person = {
  name: string
  age: number
}

const person = {} as Person
console.log(person.name)
```

## 타입 단언이 왜 위험한가?

앞 절에서는 타입 단언에 대해서 간략히 설명했고, 이번 절에서는 타입 단언을 사용했을 떄 왜 위험한지에 대해 알아보자. 위 예제 코드처럼 타입 단언으로 타입을 강제했지만 개발자의 실수로 인하여 런타임 단계에서 에러가 날 수도 있다. 특히, `as any` 처럼 `any` 타입 으로 강제하면 어떠한 타입이든 모두 허용하고 컴파일 단계에서 에러가 나지는 않지만, 런타임 단계에서 예기치 못한 에러가 날 것이다. `as any` 를 사용했을 때 어떤 일이 일어나는지 알아보자.

다음 코드를 살펴보자. 첫 번째 예제는 변수 `a`에 `string` 타입인 `"123.5"`를 할당했다. 자바스크립트 빌트인 객체인 `Math`의 소수점에서 반올림하는 `round` 메서드는 `number` 타입만 받게 되어 있기 때문에 타입스크립트는 `string` 인수의 형식은 `number` 형식의 매개변수에 할당할 수 없다고 에러를 낸다.

두 번째 예제를 살펴보자. 변수 `b`에 동일하게 `string` 타입인 `"123.5"`를 할당했고, `b as any` 로 타입을 강제했기 때문에 컴파일 단계에서는 에러가 나지 않는다. 자바스크립트 엔진에 의해 `"123.5"`가 암묵적으로 `number` 타입으로 변환되어 런타임 단계에서 에러를 내지 않고 `124` 로 출력된다.

마지막 예제를 살펴보자. 변수 `c`에 `string` 타입인 `"abcd"`를 할당했고, 마찬가지로 `c as any`로 타입을 강제했기 때문에 컴파일 단계에서는 에러가 나지 않는다. 하지만 런타임 단계에서는 에러가 발생한다. 그 이유는, 연산 과정에서 잘못된 입력을 받았다는 `NaN` 을 출력했기 때문에 런타임 단계에서 에러가 발생할 것이다.

이처럼 타입 단언을 사용하면 컴파일 단계에서는 에러가 나지 않지만, 개발자의 예상하지 못한 실수로 인해 런타임 단계에서 에러가 발생하고 코드의 실행은 중단될 것이다. 그렇기 때문에 개발자는 코드의 안정성을 보장하기 위해 타입 단언을 최소화하고, 타입스크립트가 타입을 제대로 추론할 수 있도록 코드를 작성해야 한다.

```typescript
const a = "123.5"
console.log(Math.round(a)) // Argument of type 'string' is not assignable to parameter of type 'number'

const b = "123.5"
console.log(Math.round(b as any)) // 124

const c = "abcd"
console.log(Math.round(c as any)) // NaN
```

## 어떻게 해결 해야할까?

개발자는 컴파일 단계에서 타입의 안정성을 보장할 수 있도록 코드를 작성해야 한다. 해결 방법으로는 여러가지 있겠지만 글쓴이는 3가지 방법을 다루려고 한다.

첫 번째는 타입 단언 보다는 타입 선언을 사용한다. 아래 코드를 보면 `Person` 타입을 선언한 후 `Kim` 이라는 변수에는 타입 선언, `Lee` 라는 변수에는 타입 단언을 사용했다. 변수 `Kim` 에는 `Person` 타입의 프로퍼티 외에 다른 프로퍼티를 추가했기 때문에 에러가 난다. 변수 `Lee` 는 타입 단언 방식으로 에러가 나지 않는다. 그러므로 객체를 타입에 맞춰서 직접 선언하는 것이 더 안전하다.

```typescript
type Person = {
  name: string
}

const kim: Person = { name: "dd", age: 1 } // Object literal may only specify known properties, and 'age' does not exist in type 'Person'.

const Lee = { name: "dd", age: 1 } as Person
```

두 번째는 `typeof` 연산자를 이용하여 타입을 체크하면서 타입을 좁혀나간다. 예를 들어 변수 `a`가 `string` 타입과 `undefined` 타입을 받는다고 가졍하자. 변수 `str` 는 `typeof` 연산자를 이용하여 타입이 `string` 타입으로 좁혔다. `str` 은 무조건 `string` 타입이기 때문에 `str.split("")` 코드는 에러 없이 정상 동작한다. 하지만 변수 `a` 는 `string` 타입이거나 `undefined` 타입이기 때문에 `a.split("")` 코드에서 `a`는 `undefined` 일 수 있다고 에러를 낸다.
이렇게 `typeof` 연산자를 사용하여 타입을 좁혀나가면서 컴파일 단계에서 타입의 안정성을 보장할 수 있다.

```typescript
const a: string | undefined = undefined
const str = typeof a === "string" ? a : ""

str.split("")
a.split("") // 'a' is possibly 'undefined'
```

마지막으로 사용자 정의 타입 가드(Type Guard)를 사용하는 방법이 있다. 아래 코드 처럼 `isPerson` 타입 가드는 `unknown` 타입인 인자를 받아 `Person` 타입이라는 값을 반환하는 함수이다. 타입 가드를 사용하면 컴파일러가 타입을 예측할 수 있도록 조건문 안에서 타입을 좁혀 나가면서 타입의 안정성을 보장한다.

아래 코드에 있는 `isPlainObject` 함수는 `lodash` 라이브러리의 함수로 값이 일반 객체, 즉 객체 생성자에 의해 생성된 객체인지 아닌지 확인하는 함수이다.

```typescript
type Person = {
  name: string
  age: number
}

const isRecordType = (value: unknown): value is Record<string, unknown> =>
  isPlainObject(value)

const isPerson = (person: unknown): person is Person =>
  isRecordType(person) && typeof person.name === "string"

const person: unknown = {
  name: "Kim",
  age: 30,
}

console.log(isPerson(person) ? person : undefined)
```

## 결론

1. 런타임 단계에서 에러를 피하기 위해 컴파일 단계에서 타입 안정성을 유지하는 것이 중요하다.
2. 타입 단언은 런타임에 예상치 못한 에러를 유발할 수 있으므로 신중하게 사용해야 한다.
3. 타입 단언보다는 타입 선언을 활용해 타입을 명시적으로 지정하는 것이 바람직하다.
   - 이는 컴파일러가 타입을 추론하도록 하는 것보다 안정적이다.
4. 조건문 내에서 타입 가드를 활용하여 타입을 좁혀주면 컴파일 타임에 코드의 안정성을 높일 수 있다.
5. 불가피하게 타입 단언을 사용해야 할 때는 주석을 추가해여 왜 그렇게 했는지 명시하자.
