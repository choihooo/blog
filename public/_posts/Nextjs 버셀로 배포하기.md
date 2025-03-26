---
title: "Nextjs 버셀로 배포하기"
date: 2025월 03월 26일 18:00
categories: [Dev, Next]
tags: [Nextjs, SEO]
series: "Next 스터디"
excerpt: "Next.js는 **표준 빌드(Standard Build)**와 **전체 정적 빌드(Full Static Build)** 두 가지 방식으로 배포할 수 있다."
thumbnail: "https://www.howu.run/image/next-vercel/thumbnail.png"
---

# 1. 배포 방식 선택

Next.js는 **표준 빌드(Standard Build)**와 **전체 정적 빌드(Full Static Build)** 두 가지 방식으로 배포할 수 있다.

**표준 빌드**

- next build로 node.js 서버에서 실행하여 서버 사이드 애플리케이션을 만든다.
- **getStaticProps**를 사용하는 페이지는 사전 생성된다.

**전체 정적 빌드**

- next export를 사용하여 정적 웹 사이트를 생성한다.
- 서버가 필요없고 호스팅이 쉽다.

Vercel은 기본적으로 **표준 빌드 방식**을 사용한다. API 라우트를 포함한 동적 기능을 활용하려면 **`next build`를 실행하는 방식**으로 배포해야 한다.

> 참고: next export를 사용하면 정적 파일만 배포되므로, **getServerSideProps**나 API 라우트(/api 폴더 내부)는 사용할 수 없다.
> 

---

# 2. Vercel에 배포하기

### **1) 사전 준비**

- GitHub 레포지토리가 있어야 한다.
- Node.js 및 Git이 설치되어 있어야 한다.

### **2) 로컬에서 빌드 테스트**

먼저 로컬 환경에서 프로젝트가 정상적으로 빌드되는지 확인한다.

```
npm run build
npm start
```

위 명령어를 실행했을 때 문제가 없다면 배포 준비가 된 것이다.

> npm run build 푸시하기 전에 꼭 해보는 게 좋은거 같다. 커밋 했다가 빌드 실패가 난적이 한두번이 아니다.
> 

### **3) GitHub에 코드 업로드**

Vercel과 연동하려면 프로젝트를 GitHub에 올려야 한다. 레포지토리를 연결하고, 푸시를 하면 된다.

### **4) Vercel에서 배포하기**

1. 버셀에 가입하고 로그인한다.
2. "New Project"를 클릭한 후, GitHub 저장소를 가져온다.
3. 프로젝트를 선택하고 "Import" 버튼을 누른다.
4. 기본 설정을 유지한 채 "Deploy"를 클릭하면 자동으로 배포가 진행된다.
5. 배포가 완료되면 Vercel에서 제공하는 URL이 생성된다.

> TIP: 배포 후 Vercel에서 제공하는 로그를 확인하여 에러가 있는지 점검할 수 있다. 그대로 GPT에 물어봐도 잘 알려주고, 구글에 검색해도 해결한걸 올려놓은 사람이 많아 금새 해결이 가능하다.
> 

---

# 3. 배포 후 추가 설정

### **1) 환경 변수 설정**

Vercel에서는 `.env.local` 파일을 사용하지 않고, 환경 변수를 직접 관리해야 한다.

1. "Settings" → "Environment Variables"로 이동한다.
2. 환경 변수를 추가하고 저장한 뒤, "Redeploy"를 클릭해서 적용한다.

```
NEXT_PUBLIC_API_URL=https://api.example.com
SECRET_KEY=mysecretkey
```

> 주의: NEXT_PUBLIC_로 시작하는 변수만 클라이언트 측에서 접근 가능하다.
> 

환경에 따른 환경 변수 설정도 가능하다.

### **2) 커스텀 도메인 연결**

Vercel에서 제공하는 기본 도메인이 아니라, 직접 구매한 도메인을 연결할 수도 있다.

1. Vercel 대시보드에서 "Domains" 탭으로 이동한다.
2. 원하는 도메인을 입력하고 "Add"를 클릭한다.
3. 도메인 제공업체에서 DNS 설정을 Vercel의 가이드에 맞춰 변경하면 연결이 완료된다.

> 나중에 커스텀 도메인 연결과, 서브 도메인 연결하는 법도 올릴 예정이다.
> 

### **3) 자동 배포 설정**

Vercel은 기본적으로 GitHub와 연동하여 자동 배포를 지원한다.

- `main` 브랜치에 푸시하면 자동으로 배포된다.
- 별도의 브랜치를 생성해 개발 환경을 유지하고 싶다면, "Preview Deployment" 기능을 활용하면 된다.

```
git push origin feature/new-feature
```

Vercel에서 해당 브랜치를 자동으로 빌드하여 미리보기를 제공해 준다.
