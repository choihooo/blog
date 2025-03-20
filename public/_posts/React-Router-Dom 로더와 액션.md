---
title: "React-Router-Dom 로더와 액션"
date: 2025월 02월 26일 03:44
categories: [Dev, Next]
tags: [Nextjs, Loader, Action]
series: "Next 스터디"
excerpt: "Next.js에서는 애플리케이션의 모든 페이지가 React 컴포넌트로 이루어져 있지만, 기본적으로 HTML의 `<html>`, `<head>`, `<body>` 태그 같은 구조는 자동으로 생성됩니다. 하지만 때로는 이러한 구조를 커스터마이징할 필요가 있을 때가 있습니다. 바로 이때 사용하는 파일이 **_document.js**입니다."
thumbnail: "https://www.howu.run/image/React-Router-Dom/thumbnail.webp"
---

# 1\. Loader와 Action은 왜 나오게 되었나?

### 데이터 API의 변화

Loader와 Action이 나오기 전인 React Router DOM v6.4 이전에는 라우팅과 데이터 페칭이 완전히 분리되어 있었습니다. 라우터는 단순히 URL에 따라 어떤 컴포넌트를 렌더링할지만 결정했고, 데이터 로딩은 각 컴포넌트의 책임이었습니다.

```jsx
function ProductPage() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    async function loadProduct() {
      setLoading(true);
      try {
        const response = await fetch(`/api/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  if (loading) return <p>로딩 중...</p>;
  if (!product) return <p>상품을 찾을 수 없습니다.</p>;

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>가격: {product.price}원</p>
    </div>
  );
}
```

이 방식에는 몇 가지 문제점이 있었습니다:

-   데이터 로딩 시 항상 로딩 상태를 거쳐야 함
-   컴포넌트가 마운트된 후에만 데이터 로딩 시작
-   페이지 전환 시 사용자 경험 저하
-   코드 중복 및 보일러플레이트 증가

### 선언적 라우팅에서 데이터 중심 라우팅으로의 전환

앞선 문제들을 해결하기위해 React Router v6.4에서는 라우팅 구성에 데이터 로딩 로직을 포함시킬 수 있게 되었습니다. 이를 통해 컴포넌트가 렌더링되기 전에 필요한 데이터를 미리 로드할 수 있습니다.

그리고 또한 `createBrowserRouter`는 데이터 로딩 기능을 포함한 라우터 설정을 가능하게 합니다. 기존에 주로 사용되던 `<BrowserRouter>`와 달리 객체 구성 방식을 사용하여 라우트를 정의합니다.

```jsx
import { 
  createBrowserRouter, 
  RouterProvider, 
  Route 
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/products/:id",
    element: <ProductPage />,
    loader: async ({ params }) => {
      const response = await fetch(`/api/products/${params.id}`);
      if (!response.ok) {
        throw new Response("상품을 찾을 수 없습니다", { status: 404 });
      }
      return response.json();
    },
    errorElement: <ErrorPage />
  }
]);

function App() {
  return <RouterProvider router={router} />;
}
```

`createBrowserRouter`의 주요 이점:

-   데이터 로딩과 라우팅의 통합
-   에러 처리 메커니즘 개선
-   중첩 라우트에서의 데이터 로딩 간소화
-   타입스크립트 지원 강화

# 2\. Loader란 무엇인가?

Loader는 React Router DOM v6.4에서 도입된 핵심 개념으로, 라우트 컴포넌트가 렌더링되기 전에 필요한 데이터를 비동기적으로 로드할 수 있게 해주는 함수입니다.

### Loader의 기본 개념

Loader는 다음과 같은 특징을 가집니다:

-   라우트 정의 시 함께 선언
-   컴포넌트 렌더링 전에 실행
-   비동기 함수(async/await) 지원
-   다양한 데이터 타입 반환 가능 (객체, 배열, 문자열 등)

```jsx
export async function loader() {
  const response = await fetch("http://localhost:8080/posts");
  if (!response.ok) {
    throw new Response("글 목록을 불러오는데 실패했습니다", { status: 500 });
  }
  const resData = await response.json();
  return resData.posts;
}

const router = createBrowserRouter([
  {
        path: "/",
        element: <Posts />,
        loader: postLoader,
    errorElement: <ErrorPage />
  }
]);
```

### 페이지 렌더링 전 데이터 로드

Loader를 사용하면 컴포넌트가 렌더링되기 전에 데이터를 로드할 수 있습니다. 이는 사용자 경험을 크게 향상시킵니다:

1.  사용자가 경로 이동을 시작하면 즉시 데이터 로딩 시작
2.  데이터 로딩이 완료될 때까지 이전 페이지 유지
3.  데이터 로딩이 완료되면 새 페이지로 전환

이러한 방식은 빈 로딩 상태를 보여주는 대신 데이터가 준비된 상태로 페이지를 렌더링할 수 있게 해줍니다.

### useLoaderData 훅 활용하기

`useLoaderData` 훅은 현재 라우트의 loader 함수에서 반환된 데이터에 접근할 수 있게 해줍니다:

```jsx
import { useLoaderData, Link } from 'react-router-dom';

import Modal from '../components/Modal';
import classes from './PostDetails.module.css';

function PostDetails() {
  const post = useLoaderData();

  if (!post) {
    return (
      <Modal>
        <main className={classes.details}>
          <h1>Could not find post</h1>
          <p>Unfortunately, the requested post could not be found.</p>
          <p>
            <Link to=".." className={classes.btn}>
              Okay
            </Link>
          </p>
        </main>
      </Modal>
    );
  }
  return (
    <Modal>
      <main className={classes.details}>
        <p className={classes.author}>{post.author}</p>
        <p className={classes.text}>{post.body}</p>
      </main>
    </Modal>
  );
}

export default PostDetails;
```

### 로딩 상태 관리하기

React Router는 데이터 로딩 중에도 UI를 제어할 수 있는 방법을 제공합니다:

```jsx
import { useNavigation } from "react-router-dom";

function Layout() {
  const navigation = useNavigation();

  return (
    <div>
      {navigation.state === "loading" && (
        <div className="loading-indicator">로딩 중...</div>
      )}
      <Outlet />
    </div>
  );
}
```

`useNavigation` 훅은 현재 네비게이션 상태를 제공합니다:

-   `idle`: 네비게이션이 진행 중이지 않음
-   `loading`: 데이터 로딩 중
-   `submitting`: 폼 제출 처리 중

# 3\. Action의 이해

Action은 주로 폼 제출과 같은 데이터 변경 작업을 처리하는 데 사용됩니다.

### Action의 기본 개념

Action은 다음과 같은 특징을 가집니다:

-   폼 제출 시 자동으로 호출
-   POST, PUT, PATCH, DELETE 같은 데이터 변경 작업에 적합
-   비동기 함수(async/await) 지원
-   폼 데이터 접근 및 처리 가능

```jsx
// Action 함수 정의
export async function action({ request }) {
  const formData = await request.formData();
  const postData = Object.fromEntries(formData);

  await fetch("http://localhost:8080/posts", {
    method: "POST",
    body: JSON.stringify(postData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return redirect("/");
}

// 라우트 설정에 Action 추가
const router = createBrowserRouter([
  {
        path: "/create-post",
        element: <NewPost />,
        action: newPostAction,
    }
]);
```

### 폼 제출 처리하기

React Router는 `<Form>` 컴포넌트를 제공하여 폼 제출을 쉽게 처리할 수 있게 해줍니다:

```jsx
import { Form, Link, redirect } from "react-router-dom";

function NewPost() {
  return (
    <Modal>
      <Form className={classes.form} method="post">
        <p>
          <label htmlFor="body">Text</label>
          <textarea id="body" required rows={3} name="body" />
        </p>
        <p>
          <label htmlFor="name">Your name</label>
          <input type="text" id="name" name="author" required />
        </p>
        <p className={classes.actions}>
          <Link type="button" to={".."}>
            Cancel
          </Link>
          <button>Submit</button>
        </p>
      </Form>
    </Modal>
  );
}
```

`<Form>` 컴포넌트의 이점:

-   자동으로 가장 가까운 라우트의 action 함수 호출
-   JavaScript 없이도 작동 (점진적 향상)
-   네비게이션 상태 관리 통합

### useActionData 훅 활용하기

`useActionData` 훅을 사용하면 action 함수에서 반환된 데이터에 접근할 수 있습니다. 이는 폼 유효성 검사 오류나 서버 응답을 처리하는 데 유용합니다:

```jsx
import { Form, useActionData } from "react-router-dom";

function NewProductPage() {
  const actionData = useActionData();

  return (
    <div>
      <h1>새 상품 등록</h1>
      {actionData?.errors && (
        <ul className="error-list">
          {Object.values(actionData.errors).map(error => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
      <Form method="post">
        {/* 폼 필드 */}
        <button type="submit">등록하기</button>
      </Form>
    </div>
  );
}

// Action 함수
export async function action({ request }) {
  const formData = await request.formData();
  const productData = {
    name: formData.get("name"),
    price: Number(formData.get("price")),
    description: formData.get("description")
  };

  const errors = validateProduct(productData);
  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  // 유효성 검사 통과 시 데이터 저장
  await saveProduct(productData);
  return redirect("/products");
}
```

### 데이터 변경 후 리다이렉션

Action 함수는 일반적으로 데이터 변경 후 다른 페이지로 리다이렉트합니다. React Router는 `redirect` 유틸리티 함수를 제공합니다:

```jsx
import { redirect } from "react-router-dom";

// Action 함수 정의
export async function action({ request }) {
  const formData = await request.formData();
  const postData = Object.fromEntries(formData);

  await fetch("http://localhost:8080/posts", {
    method: "POST",
    body: JSON.stringify(postData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return redirect("/");
}
```

Action 함수에서 리다이렉션을 수행하면 브라우저 URL이 자동으로 변경되고, 새 경로에 대한 loader 함수가 실행됩니다. 이를 통해 데이터 변경 후 최신 데이터를 보여줄 수 있습니다.