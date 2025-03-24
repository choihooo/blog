---
title: "Next.js로 구현하는 로그인"
date: 2025월 03월 12일 11:58
categories: [Dev, Next]
tags: [Nextjs, 로그인, Lucia]
series: "Next 스터디"
excerpt: "웹에서 인증은 필수적인 기능이다. 사용자의 데이터를 보호하고, 로그인한 사용자만 특정 기능을 이용할 수 있도록 제한하는 것이 중요하다."
thumbnail: "https://www.howu.run/image/next-login/thumbnail.svg"
---

## 1\. 왜 인증이 중요한가?

웹에서 인증은 필수적인 기능이다. 사용자의 데이터를 보호하고, 로그인한 사용자만 특정 기능을 이용할 수 있도록 제한하는 것이 중요하다.

인증 방식에는 여러 가지가 있지만, 이번 강의에서는 세션 기반 인증을 배웠다. 특히 **Next.js의 서버 액션과 Lucia 인증 라이브러리**를 활용하여 **인증 시스템**을 구현하는 방법을 살펴보겠습니다.

---

## 2\. Lucia vs NextAuth: 어떤 인증 라이브러리를 선택할까?

강의에서 Next.js에서 인증을 구현할 때 유명한 두 라이브러리로 **Lucia**와 **NextAuth.js** 얘기가 나왔다. 궁금해져서 지피티에게 물어보았다. 강의에서는 현재 **NextAuth.js**에 오류가 있어 **Lucia**를 선택하였다.

### 1️⃣ **Lucia**

✅ **세션 기반 인증** 지원 (쿠키 기반, 서버에서 인증 관리)

✅ **완전한 서버 사이드 인증** (API 없이 서버 액션으로 인증 가능)

✅ **직접적인 제어 가능** (커스텀 인증 시스템을 쉽게 구성 가능)

✅ **OAuth 지원은 제한적** (직접 구현 필요)

**💡 추천 대상**: 서버 액션 기반 인증을 원하고, **커스텀 인증 시스템을 구축하고 싶은 경우**

### 2️⃣ **NextAuth.js**

✅ **OAuth 소셜 로그인 지원** (Google, GitHub 등 다양한 제공자 지원)

✅ **JWT 기반 인증** (세션 대신 토큰을 사용)

✅ **설정이 간편** (빠른 설정 가능)

✅ **서버리스 환경에 적합**

**💡 추천 대상**: 빠른 OAuth 소셜 로그인 구현이 필요하고, **클라이언트 중심의 인증을 원할 경우**

**👉 결론**: Lucia는 **세션 기반 인증을 세밀하게 제어하고 싶은 경우** 적합하며, NextAuth.js는 **OAuth를 쉽게 적용하고 싶을 때 유용**합니다.

---

## 3\. 프로젝트 개요

이번 인증 시스템은 다음과 같은 기능을 포함한다.

✅ **회원가입**: 사용자를 등록하고 비밀번호를 안전하게 저장한다.

✅ **로그인**: 이메일과 비밀번호를 입력해 인증한다.

✅ **로그아웃**: 세션을 삭제하여 로그아웃한다.

✅ **인증 확인**: 현재 사용자의 로그인 상태를 확인한다.

✅ **보호된 페이지**: 로그인한 사용자만 접근 가능하게 만든다.

---

## 4\. 회원가입 기능 구현 (`signup` 분석)

회원가입은 이메일과 비밀번호를 입력받아 **비밀번호를 해싱하여 저장**하고, **로그인 세션을 생성**하는 방식으로 동작한다.

### 🔍 코드 분석

```jsx
'use server';
import { redirect } from 'next/navigation';
import { hashUserPassword } from '@/lib/hash';
import { createUser } from '@/lib/user';
import { createAuthSession } from '@/lib/auth';

export async function signup(prevState, formData) {
  const email = formData.get('email');
  const password = formData.get('password');

  if (!email.includes('@') || password.length < 8) {
    return { errors: { message: 'Invalid email or password' } };
  }

  const hashedPassword = hashUserPassword(password);
  const id = createUser(email, hashedPassword);
  await createAuthSession(id);
  redirect('/training');
}
```

✅ 비밀번호를 **암호화**하여 저장 (아니라면 DB를 볼 때 그냥 비밀번호가 평서문으로 다 보이기 때문)

✅ 회원가입 후 **자동 로그인** 및 `/training` 페이지로 이동

---

## 5\. 로그인 기능 구현 (`login` 분석)

사용자가 입력한 이메일과 비밀번호를 확인하고, **세션을 생성하여 로그인 상태를 유지한다**.

### 🔍 코드 분석

```jsx
export async function login(prevState, formData) {
  const email = formData.get('email');
  const password = formData.get('password');

  const existingUser = getUserByEmail(email);

  if (!existingUser) {
    return {
      errors: {
        email: 'Could not authenticate user, please check your credentials.',
      },
    };
  }

  const isValidPassword = verifyPassword(existingUser.password, password);

  if (!isValidPassword) {
    return {
      errors: {
        password: 'Could not authenticate user, please check your credentials.',
      },
    };
  }

  await createAuthSession(existingUser.id);
  redirect('/training');
}
```

✅ 이메일과 비밀번호 검증 후 **세션 생성**

✅ 오류 발생시 **오류 메시지 출력**

✅ 로그인 성공 시 **사용자 페이지로 이동**

---

## 6\. 로그아웃 기능 구현 (`logout` 분석)

로그아웃 시 **세션을 삭제하고 홈페이지로 이동**합니다.

### 🔍 코드 분석

```jsx
export async function logout() {
  await destroySession();
  redirect('/');
}
```

✅ 세션을 삭제하여 **로그아웃 처리**

✅ 홈페이지(`/`)로 리디렉트

---

## 7\. 인증 확인 (`verifyAuth` 분석)

쿠키를 확인하여 **현재 로그인된 사용자를 조회**한다.

### 🔍 코드 분석

```jsx
export async function verifyAuth() {
  const sessionCookie = cookies().get(lucia.sessionCookieName);

  if (!sessionCookie) {
    return {
      user: null,
      session: null,
    };
  }

  const sessionId = sessionCookie.value;

  if (!sessionId) {
    return {
      user: null,
      session: null,
    };
  }

  const result = await lucia.validateSession(sessionId);

  try {
    if (result.session && result.session.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
    if (!result.session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
  } catch {}

  return result;
}
```

✅ **쿠키에서 세션을 가져와 유효성 검사**

✅ 로그인된 사용자 정보 반환

---

## 8\. 보호된 페이지 (`training/page.js` 분석)

로그인한 사용자만 `training` 페이지에 접근할 수 있도록 설정한다.

### 🔍 코드 분석

```jsx
export default async function TrainingPage() {
  const result = await verifyAuth();
  if (!result.user) return redirect('/');

  return (
    <main>
      <h1>Find your favorite activity</h1>
      {/* 트레이닝 리스트 출력 */}
    </main>
  );
}
```

✅ **로그인 확인 후 페이지 렌더링**

✅ 로그인하지 않은 사용자는 **홈으로 리디렉트**

---

## 9\. 마무리 및 결론

이번 강의에서는 **Next.js + Lucia를 활용한 세션 기반 인증 시스템**을 구현하는 방법을 살펴보았다.

### 🔑 **정리**

-   **Lucia**를 사용하여 **세션 기반 인증**을 구축
-   **Next.js 서버 액션**을 활용하여 **API 없이도 인증 가능**
-   **로그인한 사용자만 접근할 수 있는 보호된 페이지 구현**