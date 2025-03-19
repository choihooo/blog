---
title: "포스트-제목-3"
date: 2025년 3월 18일
categories: [Blogging, Tutorial]
tags: [series, example]
series: "시리즈 이름"
excerpt: "이 포스트는 '시리즈 이름' 시리즈의 일부입니다."
thumbnail: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT-nkpZ6mzVDnmyfZkwRMRnrl2sUNxpX23a73sX6ZjEF82YVog7XZfu-k4TqGl3fQLMZRCe_AoWs5HPo__ktt4Ei_I8K-_wwftNhwNxbw"
---

# 서론: 왜 리팩토링이 필요한가?

리팩토링은 단순히 코드를 다시 작성하는 것 이상의 의미를 갖는다. 복잡한 코드를 단순화하고, 가독성과 유지 보수성을 높이며, 성능을 최적화하는 과정이다.

현재 프로젝트에서는 <mark>다음과</mark> 같은 문제점이 있다.

- 이해하기 어려운 코드 구조로 인해 가독성이 떨어짐
- 예측하지 못하는 기능 오류 발생
- 하나의 컴포넌트가 하는 일이 너무 많음
- Next의 장점 사용 불가

# 현 상황 분석

## 현재 코드의 문제점

### 코드 컨벤션의 문제

```jsx
const [isRecommend, setIsRecommend] = useState < boolean > false;
const [isRecommended, setIsRecommended] = useState < boolean > false;
const [neighborhood, setNeighborhood] = useState < string > "";
const [nonRecommend, setNonRecommend] = useState < boolean > false;
```

다음 코드와 같이 변수명이나 함수명이 정확히 무슨 일은 담당하는지 모르겠는 코드가 많았던 거 같다.

### 타입 분리를 하지 않아 중복 코드가 많이 발생

```jsx
interface Ping {
  iconLevel: number;
  placeName: string;
  px: number;
  py: number;
  url: string;
  type: string;
  nonMembers: NonMember[];
  sid: string;
}
```

해당 타입을 불러와서 여러 파일에서 사용하는 것이 아닌 여러 파일에서 재선언해서 사용하고 있었기 때문에 유지보수성이 떨어진다.

### Url params에 민감한 정보가 존재

```jsx
fe/src/app/event-maps
└── [id]
├── [nonMemberId]
```

폴더 구조가 다음과 같이 되어있는데 nonMemberId는 특정한 유저에 해당되는 Id이기 때문에 url에 노출되면 보안상에 문제가 생긴다고 판단했다.

## 리팩토링 전 성능 상태 점검

### **Cyclomatic Complexity**

복잡도가 5이하인 코드는 단순하고 이해하기 쉬운 수준으로 알려져있다.

복잡도가 증가할수록 가독성이 떨어지고, 유지보수와 디버깅이 어려워진다.

해당 프로젝트에는 복잡도 5이하인 코드가 많은 것을 알 수 있다.

```bash
 35:26  error  Arrow function has a complexity of 14. Maximum allowed is 5  complexity
  22:38  error  Async arrow function has a complexity of 6. Maximum allowed is 5  complexity
  197:25  error    Arrow function has a complexity of 6. Maximum allowed is 5  complexity
  247:26  error    Arrow function has a complexity of 8. Maximum allowed is 5  complexity
   12:16  error    Function 'LinkEditPage' has a complexity of 6. Maximum allowed is 5  complexity
   31:13  error    Arrow function has a complexity of 11. Maximum allowed is 5          complexity
   80:27  error    Async arrow function has a complexity of 12. Maximum allowed is 5  complexity
  223:25  error    Async arrow function has a complexity of 12. Maximum allowed is 5  complexity
  19:16  error  Function 'LoginModal' has a complexity of 11. Maximum allowed is 5  complexity
  69:30  error  Arrow function has a complexity of 6. Maximum allowed is 5  complexity
   56:23  error    Async arrow function has a complexity of 6. Maximum allowed is 5  complexity
   97:25  error    Async arrow function has a complexity of 6. Maximum allowed is 5  complexity
  250:26  error    Arrow function has a complexity of 8. Maximum allowed is 5  complexity
  35:24  error    Async arrow function has a complexity of 10. Maximum allowed is 5  complexity
  14:16  error  Function 'NameField' has a complexity of 7. Maximum allowed is 5  complexity
  18:16  error  Function 'LoginModal' has a complexity of 11. Maximum allowed is 5  complexity
  42:16  error    Function 'Page' has a complexity of 6. Maximum allowed is 5       complexity
  56:23  error    Async arrow function has a complexity of 6. Maximum allowed is 5  complexity
  19:16  error  Function 'EventNameInput' has a complexity of 6. Maximum allowed is 5  complexity
  20:27  error  Async arrow function has a complexity of 9. Maximum allowed is 5  complexity
```

### Lighthouse

현재 메인 페이지에서의 성능 지표의 점수는 다음과 같다.

- CLS → 25
- TBT → 29
- FCP → 10
- SI → 8
- LCP → 0

SI 와 LCP 두 점수가 낮을 것을 알 수 있다.

- SI 점수 개선법
  - CSS와 JS 파일을 최적화한다.
  - 레이지 로딩을 사용한다.
  - 이미지 최적화를 사용한다.
- LCP 점수 개선법
  - Above the Fold 콘텐츠 최적화한다.
  - LCP 요소가 이미지라면 preload를 통해 이미지 로드를 가속화한다.
  - 폰트 로드 최적화
  - 캐싱을 사용한다.

# 목표 설정

## 이번 리팩토링의 구체적인 목표

### 성능 개선

- 구글의 Lighthouse의 점수를 높이는 것을 최우선으로 삼는다

### 가독성 향상

- 코드 컨벤션을 통일시킨다.
- 확실한 의미를 가진 이름을 사용한다.

### 코드 모듈화 및 재사용성 증대

- 반복되는 코드의 양을 줄인다.
- 최대한 Solid 원칙에 따라 컴포넌트들을 재설계한다.

# 계획 세우기

## 리팩토링 단계별 전략

### 1. MSW 모킹

테스트 환경에서 실제 API 서버에 의존하지 않고, API 응답을 모킹(mocking)하여 안정적인 개발 환경을 구축한다.

성과:

- 개발 및 테스트 환경에서 API 서버의 가용성에 의존하지 않음.
- 다양한 시나리오(성공, 실패, 빈 응답 등)를 테스트 가능.

### 2. 구조 개선

코드베이스의 모듈화 및 재사용성을 높이고, 유지보수성을 향상시킨다.

- 폴더 구조를 FSD에 맞게 개선함.
- 재사용성이 높은 UI 컴포넌트를 분리.
- 의존성 정리 → 상위 모듈에서 하위 모듈로의 단방향 의존성을 유지.
- Vite의 코드 분할 기능을 활용해 초기 로딩 속도 개선.

### 3. API 개선

기존의 Fetch API 기반 호출을 개선하여 코드의 일관성을 유지하고, 캐싱, 리페칭, 에러 처리 등 데이터를 더 효율적으로 관리할 수 있도록 변경한다.

- Fetch API에서 SWR로 변경

### 4. 기능 리팩토링

- 중복 코드 제거 → 공통 유틸리티 함수로 분리.
- 로직 단순화 → 인덴트가 깊은 함수들을 얼리 리턴을 이용해 수정.

# 참고 자료와 가이드 라인

### Lighthouse

웹 애플리케이션의 성능, 접근성, SEO 등을 분석하고 개선점 제안해주면 개선점 위주로 수정

### TSdocs

TypeScript 코드베이스에 문서화를 추가하여, 개발자 간의 이해도를 높이고 코드 품질을 향상시킨다

1. 주석으로 TSdoc 규칙을 작성

```jsx
/**
 * 두 숫자를 더합니다.
 * @param a - 첫 번째 숫자
 * @param b - 두 번째 숫자
 * @returns 두 숫자의 합
 */
function add(a: number, b: number): number {
  return a + b;
}
```

1. TypeDoc을 사용해 문서 생성

```bash
npm install --save-dev typedoc
typedoc --out docs src/
```

### ChatGPT Reviewer

깃허브 액션에 ChatGPT를 활용해 리뷰를 달아주는 액션을 생성한다.

놓치고 넘어간 부분에 대해서 GPT가 리뷰를 해줄 것으로 기대된다.

### FSD 문서

https://feature-sliced.design/kr/docs/guides/tech/with-nextjs?utm_source=chatgpt.com

# 앞으로

사실 리팩토링은 코딩을 시작한 이후로 처음 해보는 작업이다. 그렇기 때문에 처음부터 계획을 세우는 과정에서 많은 어려움을 겪었다. 이번 리팩토링 작업이 단순히 계획에 그치지 않고 끝까지 마무리될 수 있도록 지속적으로 진행 상황을 점검하며 목표를 향해 나아가고 싶다.

리팩토링은 단순히 코드를 고치는 작업을 넘어, 평소에 공부했던 개념들을 실제로 적용해볼 수 있는 좋은 기회라고 생각한다. 현재 듣고 있는 TypeScript 강의에서 배운 타입 정의와 유틸리티 타입, 제네릭 등을 적극적으로 활용하여 중복된 타입 선언을 통합 관리하고, 코드 품질을 높이는 방향으로 개선할 예정다. 또한 읽고 있는 "프론트엔드 최적화 가이드" 책에서 배운 성능 최적화 방법을 프로젝트에 적용하며 구글 Lighthouse 점수를 높이는 데 집중할 계획이다. 이미지 최적화, 폰트 로드 개선, 코드 스플리팅 등의 작업 외에도 추가적인 개선 아이디어를 탐색하며 프로젝트를 발전시키고자 한다.

다음 작업으로는 MSW를 활용한 API 모킹 작업이 예정되어 있다. 실제 API 서버 없이도 다양한 시나리오를 테스트할 수 있는 환경을 구축하는 것은 리팩토링 과정에서 매우 중요한 단계이다.

마지막으로, 리팩토링은 단순히 작업을 끝내는 것에 그치는 것이 아니라, 새로운 기술과 개념을 내 것으로 만드는 과정이라고 생각한다. 프로젝트를 진행하는 동안 틈틈이 학습을 병행하며, 배운 내용을 즉각적으로 적용하려고 노력해야겠다. 끝까지 포기하지 않고 계획한 작업을 끝내고 싶다.
