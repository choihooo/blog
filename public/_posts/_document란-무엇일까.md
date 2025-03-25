---
title: "_document란-무엇일까"
date: 2025월 03월 19일 16:37
categories: [Deb, Next]
tags: [Nextjs, SEO]
series: "Next 스터디"
excerpt: "Next.js에서는 애플리케이션의 모든 페이지가 React 컴포넌트로 이루어져 있지만, 기본적으로 HTML의 <html>, <head>, <body> 태그 같은 구조는 자동으로 생성됩니다. 하지만 때로는 이러한 구조를 커스터마이징할 필요가 있을 때가 있습니다. 바로 이때 사용하는 파일이 _document.js입니다."
thumbnail: "https://www.howu.run/image/_document란-무엇일까/thumbnail.webp"
---

# 1. _document 파일이란?
Next.js에서는 애플리케이션의 모든 페이지가 React 컴포넌트로 이루어져 있지만, 기본적으로 HTML의 <html>, <head>, <body> 태그 같은 구조는 자동으로 생성됩니다. 
하지만 때로는 이러한 구조를 커스터마이징할 필요가 있을 때가 있습니다. 바로 이때 사용하는 파일이 **_document.js**입니다.

_document.js는 Next.js 애플리케이션에서 HTML 문서의 기본 구조를 수정하는 파일입니다. 이 파일을 통해 각 페이지의 <html>, <head>, <body> 태그를 포함한 문서의 기본적인 설정을 변경할 수 있습니다.
 _document.js 파일은 Next.js의 **SSR**에 영향을 미치며, CSR 전 최초 페이지 요청 시 서버에서 HTML을 렌더링하는 과정에서 사용됩니다.

그러면 다음과 같은 의문점이 들수도 있습니다. 프로젝트 내에 index.html 파일도 있을텐데 왜 _document.js 파일에 설정해야할까?
이는 다음과 같습니다.

# 2. 왜 _document.js를 사용해야 할까?
Next.js에서는 HTML 문서를 자동으로 생성하므로, index.html 파일을 직접 수정하는 것 대신, _document.js 파일을 사용하여 HTML 구조를 커스터마이징하는 것이 중요합니다.

## 2.1 서버 사이드 렌더링(SSR)
Next.js는 기본적으로 서버 사이드 렌더링을 지원합니다. 페이지를 요청할 때 서버에서 HTML 문서가 렌더링되고, 이후 클라이언트로 전달됩니다. 이러한 구조에서 index.html 파일을 직접 수정하는 것은 불가능하며, 대신 _document.js 파일을 사용하여 애플리케이션 전체에 영향을 미치는 HTML 요소들을 수정합니다.

## 2.2 동적 콘텐츠 렌더링
Next.js는 페이지마다 동적으로 다른 콘텐츠를 렌더링합니다. 예를 들어, 각 페이지마다 다른 제목, 설명, 스타일 등을 설정할 수 있습니다. index.html을 사용하면 모든 페이지에서 동일한 HTML을 사용해야 하지만, _document.js는 애플리케이션 전역에서 공통으로 사용되는 HTML 구조를 설정하는 데 사용됩니다.
이 말은 동적인 메타 태그들을 index.html에서 관리할 수 없기 때문이다라고 이해하면 될 것 같습니다.

## 2.3 SEO와 성능 최적화
SEO 최적화를 위해 페이지별로 적절한 메타 태그를 설정해야 합니다. _document.js 파일에서 페이지에 공통으로 필요한 설정을 관리하고, 각 페이지별로 개별적인 메타 태그는 페이지 컴포넌트 내에서 설정할 수 있습니다. 이렇게 함으로써 SEO 최적화와 성능을 향상시킬 수 있습니다.

# 3. _document.js에서 설정할 수 있는 항목들
_document.js 파일을 사용하여 수정할 수 있는 HTML 구조와 설정 항목은 다음과 같습니다.

## 3.1 <html> 태그 속성
애플리케이션 전체에 적용되는 HTML의 <html> 태그에 속성을 추가할 수 있습니다. 예를 들어, lang="ko" 속성을 추가하여 한국어 페이지임을 명시할 수 있습니다.

```jsx
<Html lang="ko">
```

## 3.2 <head> 태그 내용
_document.js에서 <head> 태그 안에 전역 스타일, 폰트, 아이콘 등을 설정할 수 있습니다. 예를 들어, 애플리케이션 전역에서 사용하는 스타일 시트나 구글 폰트를 추가할 수 있습니다.

```jsx
<Head>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" />
  <link rel="icon" href="/favicon.ico" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</Head>
```

## 3.3 <body> 태그 수정
_document.js에서 <body> 태그를 수정하거나, 공통으로 적용할 클래스나 속성을 추가할 수 있습니다. 예를 들어, 애플리케이션 전역에서 사용할 body 클래스를 추가할 수 있습니다.

```jsx
<body className="custom-body">
```

## 3.4 외부 스크립트 및 스타일 추가
_document.js에서 애플리케이션에 필요한 외부 스크립트나 스타일을 추가할 수 있습니다. 예를 들어, Google Analytics 같은 외부 스크립트를 <head>나 <body>에 추가하여 애플리케이션 전반에 적용할 수 있습니다.

```jsx
<script src="https://www.example.com/script.js" />
```

# 4. _document.js와 페이지별 설정의 차이점
_document.js에서 설정하는 <head> 태그와 각 페이지에서 설정하는 <head> 태그는 역할과 범위가 다릅니다. _document.js는 애플리케이션 전체에 공통적인 설정을 적용하는 곳이고, 페이지별 <head> 태그는 각 페이지에 특화된 설정을 적용하는 곳입니다.

## 4.1 _document.js에서 설정
_document.js에서 설정하는 항목은 애플리케이션 전체에 공통적으로 적용됩니다. 예를 들어, 구글 폰트, 아이콘, 전역 스타일, 기본적인 메타 태그 등을 설정할 수 있습니다.


## 4.2 페이지별 설정
각 페이지에서 설정하는 <head> 태그는 해당 페이지에 맞는 특화된 설정을 할 수 있습니다. 예를 들어, 페이지 제목, 페이지별 메타 설명, 소셜 미디어용 이미지 등을 설정할 수 있습니다. 이는 next/head 컴포넌트를 사용하여 페이지 내에서 동적으로 설정할 수 있습니다.

```jsx
<Head>
  <title>My Blog Post</title>
  <meta name="description" content="This is a blog post about Next.js." />
  <meta property="og:image" content="https://example.com/og-image.jpg" />
</Head>
```

# 5. _document.js 활용 예시
다음은 _document.js 파일을 활용하여 설정을 커스터마이즈하는 예시입니다.

## 5.1 기본 설정 예시

```jsx
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="ko">
        <Head>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" />
          <link rel="icon" href="/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
```

5.2 외부 스크립트 추가 예시

```jsx
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="ko">
        <Head>
          <script async src="https://www.example.com/script.js" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
```

6. 결론
Next.js에서 _document.js 파일을 사용하는 이유는 HTML 문서의 기본 구조를 커스터마이즈하고, 애플리케이션 전반에 공통적으로 적용할 설정을 중앙에서 관리할 수 있기 때문입니다. _document.js는 **SSR**과 동적 페이지 렌더링을 고려한 최적화된 방식으로 HTML을 관리할 수 있게 해줍니다. 이를 통해 SEO 최적화, 성능 최적화, 공통 스타일 및 스크립트 설정 등을 효율적으로 처리할 수 있습니다.

따라서, Next.js 애플리케이션을 개발할 때 _document.js 파일을 적절히 활용하여 전체적인 HTML 구조와 설정을 관리하고, 각 페이지별로 필요한 설정은 next/head를 활용하여 동적으로 처리하는 방식으로 개발을 진행하는 것이 좋습니다.

