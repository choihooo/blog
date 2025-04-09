---
title: "SOLID-설계원칙"
date: 2025월 04월 09일 13:44
categories: [Dev]
tags: [SOLID, 디자인 패턴]
series: "Design Pattern"
excerpt: "개발을 하다 보면 코드가 점점 복잡해지고, 유지보수가 어려워지는 순간을 맞이하게 되는 경우가 많다. 특히 규모가 있는 프로젝트이거나 협업을 진행할수록 이런 문제는 자주 발생하게 된다. 이런 상황에서 코드의 품질을 유지하고 확장성과 유지보수성을 높이기 위한 설계 기준이 필요하며, 대표적인 예로 SOLID 원칙이 있다."
thumbnail: "https://www.howu.run/image/designPattern/2.svg"
---

# SOLID 원칙

## 💎 1. SOLID 원칙이란

개발을 하다 보면 코드가 점점 복잡해지고, 유지보수가 어려워지는 순간을 맞이하게 되는 경우가 많다. 특히 규모가 있는 프로젝트이거나 협업을 진행할수록 이런 문제는 자주 발생하게 된다. 이런 상황에서 코드의 품질을 유지하고 확장성과 유지보수성을 높이기 위한 설계 기준이 필요하며, 대표적인 예로 **SOLID 원칙**이 있다.

> SOLID는 다섯 가지 객체지향 설계 원칙의 앞 글자를 따서 만든 약어이다.

S - SRP (Single Responsibility Principle): 하나의 클래스는 하나의 책임만 가져야 한다.

O - OCP (Open/Closed Principle): 확장에는 열려 있고, 변경에는 닫혀 있어야 한다.

L - LSP (Liskov Substitution Principle): 자식 클래스는 부모 클래스를 대체할 수 있어야 한다.

I - ISP (Interface Segregation Principle): 필요한 기능만 가지는 작은 인터페이스를 사용해야 한다.

D - DIP (Dependency Inversion Principle): 구체화가 아닌 추상화에 의존해야 한다.

이 원칙들은 객체지향 프로그래밍에서 소프트웨어의 유연성과 확장성을 높이기 위해 널리 사용되는 설계 지침이다.

## 💎 SOLID를 왜 알아야 할까?

다음과 같은 상황을 한 번쯤 겪어본 적이 있을 것이다.

- 작은 기능 하나를 수정하려고 수십 줄의 코드를 수정해야 하는 상황이다.
- 새로운 기능을 추가하려는데 기존 코드 구조가 너무 복잡하여 어디를 수정해야 할지 모르는 상황이다.
- 한 사람이 짠 코드 구조가 너무 폐쇄적이어서, 다른 사람이 쉽게 건드릴 수 없는 상황이다.

이러한 문제들은 대부분 **모듈 간 책임이 명확하지 않거나**, **확장성을 고려하지 않은 구조**, 또는 **타입 간 의존성의 결합도가 높은 설계**로 인해 발생하게 된다. SOLID 원칙은 이런 상황을 방지하고 더 나은 코드 구조를 만드는 데에 도움을 준다.

## 💎 JavaScript / TypeScript에도 적용할 수 있을까?

SOLID 원칙은 전통적으로 Java, C# 등 클래스 기반 객체지향 언어에서 강조되었지만, **JavaScript와 TypeScript**에서도 충분히 적용 가능한 설계 원칙이다. 특히 `클래스`, `interface`, `DI 패턴`, `고차 함수`, `모듈화` 등의 개념이 점점 강화되면서 프론트엔드 개발에서도 SOLID 원칙의 중요성은 더욱 커지고 있다.

예를 들어 다음과 같은 코드는 의존 역전 원칙(DIP)을 지킨 예시이다.

```tsx
interface Doable {
  do(): void;
}

function execute(task: Doable) {
  task.do();
}
```

`execute` 함수는 직접 구현체에 의존하지 않고, 추상화된 `Doable` 인터페이스에 의존한다. 이처럼 추상화에 의존하는 구조를 통해 코드의 유연성과 테스트 용이성을 높일 수 있다.

---

## 💎 2. SRP - 단일 책임 원칙: 하나의 함수에는 하나의 책임만 있어야 한다.

SRP(Single Responsibility Principle)는 **하나의 모듈, 클래스, 함수는 하나의 책임만 가져야 한다는 원칙**이다. 다시 말해, **`변경의 이유는 하나뿐이어야 한다`**는 것을 의미한다. 이는 코드의 유지보수를 쉽게 만들고, 기능 추가나 수정 시 다른 로직에 영향을 주지 않도록 도와준다.

```tsx
function a() {} // 변경의 이유: a 로직이 변할때
function b() {} // 변경의 이유: b 로직이 변할때
function c() {} // 변경의 이유: c 로직이 변할때

function main() {
  a();
  b();
  c();
} // 변경의 이유: a, b, c 함수의 호출 순서가 바뀌어야할때
```

### 💡 왜 SRP가 중요한가?

현업에서 가장 자주 마주치는 문제 중 하나는 **한 함수나 컴포넌트가 너무 많은 일을 하고 있다는 점**이다. 이렇게 되면 그 함수가 변경되어야 하는 이유가 다양해지고, 하나의 수정이 여러 부작용을 유발할 수 있다. 반대로 책임을 분리하면 코드는 더 단순하고, 명확하며, 변경에 유연하게 대응할 수 있다.

### 🧩 예시로 보는 SRP 위반

```tsx
function uploadAndSaveImage(file: File) {
  // 1. 이미지 생성
  const image = createImage(file);

  // 2. 서버에 저장
  uploadToServer(image);
}
```

이 함수는 **이미지 생성**과 **서버 저장**이라는 두 가지 책임을 가지고 있다. 만약 저장 방식이 바뀌거나, 이미지 처리 로직이 바뀌면 이 함수는 두 가지 이유로 변경되어야 한다. 이는 SRP 위반이다.

### ✅ SRP를 지킨 구조

```tsx
function createImage(file: File) {
  // 이미지 생성 로직
}

function uploadImage(image: Blob) {
  // 서버 저장 로직
}

function processImage(file: File) {
  const image = createImage(file);
  uploadImage(image);
}
```

이제 각 함수는 하나의 역할만을 수행하며, 개별 책임이 명확하게 분리되어 있다. `createImage`는 이미지 처리 책임만, `uploadImage`는 저장 책임만을 가진다. 변경의 이유가 서로 독립적이므로 SRP를 만족하는 구조이다.

### 🧠 실무에서의 SRP 적용

실제로 프로젝트를 진행하다 보면 **SRP를 완벽하게 지키는 것이 항상 쉽지는 않다.** 예를 들어 초기에는 "이미지를 생성하고 저장하는" 기능 하나만 필요했기 때문에 하나의 함수로 구현했을 수 있다. 하지만 시간이 지나고 "동영상 생성 및 저장" 기능이 추가되면서 **기존 구조가 확장에 적합하지 않다는 것을 깨닫게 된다.** 이럴 때 **기능을 분리해서 SRP를 만족하도록 리팩터링하는 것**이 유지보수성과 확장성을 높이는 방법이다.

---

## 💎 3. OCP - 개방/폐쇄 원칙: 코드는 확장에는 열려 있고, 변경에는 닫혀 있어야 한다.

OCP(Open/Closed Principle)는 **소프트웨어 요소는 확장에는 열려 있어야 하고, 변경에는 닫혀 있어야 한다**는 원칙이다. 즉, 새로운 기능을 추가하거나 확장할 수는 있어야 하지만, 기존 코드를 수정해서는 안 된다는 의미이다.

### 💡 왜 OCP가 중요한가?

실제 프로젝트를 하다 보면 기능 추가 요구는 빈번하게 발생한다. 이때마다 기존 코드를 수정하게 되면 **버그 유입 가능성이 높아지고, 테스트가 복잡해지며, 예기치 않은 영향이 발생할 수 있다.** OCP를 따르면 기존 코드를 수정하지 않고도 새로운 요구사항을 반영할 수 있어 유지보수성이 크게 향상된다.

### 🧩 OCP를 위반한 예시

```tsx
function main(type: string) {
  if (type === "a") {
    doA();
  } else if (type === "b") {
    doB();
  } else if (type === "c") {
    doC();
  } else if (type === "d") {
    doD();
  }
}
```

이 구조는 새로운 타입이 추가될 때마다 `main` 함수를 계속 수정해야 한다. 이처럼 **확장할 때 기존 코드(main)를 직접 수정해야 하는 구조는 OCP를 위반하는 사례이다.**

### ✅ OCP를 만족하는 구조

```tsx
interface Doable {
  do(): void;
}

function main(task: Doable) {
  task.do();
}

const a: Doable = {
  do() {
    console.log("A 작업");
  },
};
const b: Doable = {
  do() {
    console.log("B 작업");
  },
};
const c: Doable = {
  do() {
    console.log("C 작업");
  },
};
const d: Doable = {
  do() {
    console.log("D 작업");
  },
};

main(a);
main(b);
```

이제 `main` 함수는 `Doable` 인터페이스에만 의존하며, 새로운 작업을 추가해도 `main`은 **변경하지 않고** 그대로 사용할 수 있다. 확장에는 열려 있고, 변경에는 닫혀 있는 구조로 **OCP를 완벽히 만족한다.**

### 🧠 실무에서의 OCP 적용

초기에는 간단한 if-else나 switch 문으로 처리했던 로직이 나중에 복잡해지면서 확장의 필요성이 생기는 경우가 많다. 이럴 때 **전략 패턴, 의존성 주입, 인터페이스 활용** 등의 방법으로 코드를 리팩터링하면 OCP를 지킬 수 있다. 특히 다양한 타입에 따라 동작이 달라지는 UI 렌더링, 백엔드 핸들러, 상태 처리 등에서 OCP의 가치를 크게 체감할 수 있다.

---

## 💎 4. LSP - 리스코프 치환 원칙: 부모 타입은 자식 타입으로 자유롭게 대체 가능해야 한다.

LSP(Liskov Substitution Principle)는 객체지향 설계의 핵심 원칙 중 하나로, `"서브 타입은 언제나 자신의 기반 타입으로 교체할 수 있어야 한다"`는 개념이다. 즉, 부모 클래스의 인스턴스를 사용하는 곳에 자식 클래스의 인스턴스를 넣어도 **기대한 대로 동작해야 한다**는 것을 의미한다.

### 💡 왜 LSP가 중요한가?

LSP를 위반하면 상속을 사용하는 의미가 퇴색된다. 상속은 재사용을 위해 도입하는 것인데, 자식 클래스가 부모 클래스의 규칙을 따르지 않으면 **오히려 코드에 혼란을 초래하고, 예외 처리를 늘려야 하며, 디버깅이 어려워지는 문제**가 발생한다.

### 🧩 LSP를 위반한 예시

```tsx
class Bird {
  fly() {
    return "파닥파닥";
  }
}

class Penguin extends Bird {
  override fly() {
    return new Error("펭귄은 못 날아");
  }
}

function move(bird: Bird) {
  console.log(bird.fly());
}

move(new Bird()); // "파닥파닥"
move(new Penguin()); // ❌ Error 발생
```

`Penguin`은 `Bird`를 상속받았지만, `fly` 메서드가 오류를 던진다. `Bird` 타입을 사용하는 곳에서 `Penguin`을 대체하자 오류가 발생했으므로 이는 **LSP를 위반한 예시이다.**

### ✅ LSP를 만족하도록 리팩터링

```tsx
class Animal {
  isAnimal() {
    return true;
  }
}

interface Flyable {
  fly(): string;
}

class Bird extends Animal implements Flyable {
  fly() {
    return "파닥파닥";
  }
}

class Penguin extends Animal {
  swim() {
    return "수영중";

```

이제 `Bird`는 `Flyable` 인터페이스를 구현하고, `Penguin`은 더 이상 `Bird`를 상속받지 않는다. 대신 `Penguin`은 자신만의 행동을 갖는다. 이렇게 하면 **각 타입이 자신의 책임에 맞게 동작하며, 부모 타입으로의 대체도 문제가 없다.**

### 🧠 실무에서의 LSP 고려사항

- **상속을 남발하지 말고 인터페이스 기반 설계**를 활용하는 것이 LSP 위반을 줄이는 데 도움이 된다.
- 자식 클래스가 부모 클래스의 행동을 **무시하거나 오버라이드로 예외를 던지는 경우**는 의심해봐야 한다.
- 테스트 코드에서 부모 타입 대신 자식 타입을 넣어보고 **문제없이 동작하는지 확인하는 방식으로 LSP 준수 여부를 검증**할 수 있다.

---

## 💎 5. ISP - 인터페이스 분리 원칙: 클라이언트는 자신이 사용하지 않는 인터페이스에 의존하지 않아야 한다.

ISP(Interface Segregation Principle)는 객체지향 설계의 다섯 가지 SOLID 원칙 중 하나로, **하나의 범용 인터페이스보다 여러 개의 구체적인 인터페이스로 나누는 것이 좋다**는 원칙이다. 즉, 클라이언트(사용자)는 **자신이 사용하지 않는 기능에 의존하지 않아야 한다**는 것이다.

### 💡 왜 ISP가 중요한가?

인터페이스가 너무 커지면 사용하지 않는 기능에까지 의존하게 된다. 이는 구현체에게 **불필요한 책임을 강요하고**, **코드 변경에 민감한 구조**를 만든다. 특히 자바스크립트/타입스크립트 같은 단일 상속 언어에서 인터페이스를 효율적으로 나누지 않으면, 불필요한 메서드 구현으로 인해 코드가 복잡해진다.

### 🧩 ISP를 위반한 예시

```tsx
interface IBird {
  fly(): string;
  quack(): string;
}

class Sparrow implements IBird {
  fly() {
    return "파닥파닥";
  }
  quack() {
    return "짹짹";
  }
}

class Penguin implements IBird {
  fly() {
    throw new Error("펭귄은 못 날아");
  }
  quack() {
    return "꿱꿱";
  }
}
```

이 구조에서 `Penguin`은 `IBird`의 `fly()`를 구현해야 하므로, 실제로는 필요하지 않은 기능을 억지로 구현하게 되어 **에러를 던지거나 빈 값을 반환하게 되는 문제**가 생긴다. 이는 **ISP를 위반한 상황이다.**

### ✅ ISP를 만족하도록 리팩터링

```tsx
interface Quackable {
  quack(): string;
}

interface Flyable {
  fly(): string;
}

class Sparrow implements Flyable, Quackable {
  fly() {
    return "파닥파닥";
  }
  quack() {
    return "짹짹";
  }
}

class Penguin implements Quackable {
  quack() {
    return "꿱꿱";
  }
}
```

이제 `Flyable`, `Quackable` 인터페이스를 분리했기 때문에 `Penguin`은 **필요한 기능만 선택적으로 구현**하면 된다. 이로써 **불필요한 의존성을 제거하고, 구현체가 명확한 책임만 갖도록 할 수 있다.**

### 🧠 실무에서의 ISP 고려사항

- 단일한 큰 인터페이스보다 목적이 분명한 **작고 잘게 나뉜 인터페이스**가 더 유지보수가 쉽다.
- 공통 기능을 인터페이스로 나눌 때는 **역할 중심**으로 분리하는 것이 좋다. (`Drawable`, `Sortable`, `Savable` 등)
- 타입스크립트에서는 `interface` 또는 `type`을 통해 조합형 타입을 만드는 것이 ISP를 실현하기에 적합하다.

---

## 💎 6. DIP - 의존 역전 원칙: 추상화에 의존하고, 구체화에 의존하지 말아야 한다.

DIP(Dependency Inversion Principle)는 **상위 모듈이 하위 모듈에 의존하지 않고, 모두가 추상화에 의존해야 한다**는 원칙이다. 즉, 구체적인 구현보다는 **인터페이스나 추상 클래스와 같은 추상화된 구조에 의존해야 한다**는 의미이다.

### 💡 왜 DIP가 중요한가?

하위 모듈의 변경이 상위 모듈까지 영향을 미치게 되면, 시스템의 유연성이 떨어지고 유지보수가 어렵다. DIP는 이런 의존성을 **역전시켜서**, 하위 구현을 바꾸더라도 상위 모듈은 영향을 받지 않도록 돕는다.

### 🧩 DIP를 위반한 예시

```tsx
class A {
  doSomething() {}
}

class Main {
  private a = new A();

  run() {
    this.a.doSomething();
  }
}
```

이 구조는 `Main`이 `A`에 직접 의존하고 있기 때문에, `A`가 바뀌면 `Main`도 영향을 받는다. DIP 위반이다.

### ✅ DIP를 만족하는 구조

```tsx
interface Doable {
  doSomething(): void;
}

class A implements Doable {
  doSomething() {}
}

class Main {
  constructor(private doable: Doable) {}

  run() {
    this.doable.doSomething();
  }
}

const main = new Main(new A());
main.run();
```

이제 `Main`은 `A`가 아닌 `Doable`이라는 추상화에 의존한다. `A`가 변경되거나 다른 구현체(`B`)로 바뀌어도 `Main`은 영향을 받지 않는다. 이것이 DIP를 만족하는 구조이다.

### 🧠 실무에서의 DIP 고려사항

- 매개변수로 interface나 abstract class를 받는 습관을 들이자.
- 종속성 주입(DI)을 통해 유연한 구조를 만들 수 있다.
- DIP는 테스트 가능성과 코드 재사용성을 높여준다.

---

## 💎 7. 마무리 & 실무 적용 팁

SOLID는 단순한 이론이 아니라, 실무에서 코드의 유지보수성과 확장성을 높이기 위한 구조 설계의 기준이다.

JavaScript나 TypeScript처럼 클래스 기반 객체지향 언어 특성을 갖는 언어에서도 SOLID 원칙을 충분히 적용할 수 있다.

또한 SOLID는 규모가 크지 않은 프로젝트에서도 충분히 효율적인 코드 구조를 위해 적용해 볼 수 있는 좋은 기준이다.

예를 들어, React 컴포넌트 설계 시에도 단일 책임 원칙을 적용하여 컴포넌트 하나가 하나의 UI 역할만 하도록 설계할 수 있다.

또한 상태 관리 라이브러리를 도입할 때도 인터페이스 분리 원칙을 적용해 불필요한 상태 의존을 줄일 수 있다.

CRA, Vite, Next.js 등 다양한 프레임워크와 빌드 툴에서도 SOLID 원칙은 유용하게 작용한다.

또한 인터페이스나 추상화를 통해 서비스 레이어나 유틸리티 레이어를 구성하면 OCP나 DIP와 같은 원칙도 적용 가능하다.

---
