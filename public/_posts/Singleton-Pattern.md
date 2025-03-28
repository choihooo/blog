---
title: "Singleton-Pattern"
date: 2025월 03월 28일 12:54
categories: [Dev]
tags: [디자인패턴, 싱글톤 패턴]
series: "Design Pattern"
excerpt: '싱글톤 패턴은 애플리케이션 내에서 특정 클래스의 인스턴스를 단 하나만 생성하고, 이를 전역에서 공유 할 수 있도록 하는 디자인 패턴이다. 즉, 한 번 생성된 인스턴스는 계속 재사용되며, 새로운 인스턴스가 생성되지 않는다.'
thumbnail: "https://www.howu.run/image/designPattern/1.svg"
---

# 싱글톤 패턴

## 1. 싱글톤 패턴이란?

### 💎 싱글톤의 기본 개념

싱글톤 패턴은 애플리케이션 내에서 특정 클래스의 인스턴스를 단 하나만 생성하고, 이를 전역에서 공유 할 수 있도록 하는 디자인 패턴이다. 즉, 한 번 생성된 인스턴스는 계속 재사용되며, 새로운 인스턴스가 생성되지 않는다.

**📌 싱글톤의 핵심 특징**

1. 오직 하나의 인스턴스만 존재
2. 전역적으로 접근 가능
3. 여러 모듈에서 동일한 객체를 공유

### 💎 언제, 왜 사용하는가?

싱글톤 패턴은 앞서서 말했듯이 생성된 인스턴스를 재사용하며, 새로운 인스턴스를 재생성하지 않는다. 그렇기 때문에 주로 전역적으로 관리해야하는 상태나 리소스를 다룰 때 유용하다.

- Config 관리
- 캐시 관리
- DB 연결

## 2. 타입스크립트에서 싱글톤 구현 방법

### 💎 기본적인 싱글톤 구현(ES Module의 특성 활용)

ES 모듈의 import는 기본적으로 싱글톤으로 동작한다.

해당 모듈이 import할때 한 번만 실행된다. 그렇기 때문에 import 할 때마다 새로운 인스턴스가 아니라 처음 생성된 인스턴스를 재사용하게 된다.

```tsx
// Grimpan.ts
class Grimpan {
	constructor(canvas: HTMLElement | null) {
		if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
			throw new Error('canvas 엘리먼트를 입력하세요');
		}
	}
	
	initialize() {}
	initializeMenu() {}
}

export default new Grimpan(document.querySelector('canvas'));

// index.ts
import G1 from './Grimpan.js';
import G2 from './Grimpan.js';

console.log(G1 === G2); // true
```

### 💎 getInstance() 메서드를 활용한 싱글톤

```tsx
// Grimpan.ts
class Grimpan {
	private static instance: Grimpan;
	private constructor(canvas: HTMLElement | null) { // new로 새로운 인스턴스 만드는 거 방지 private
		if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
			throw new Error('canvas 엘리먼트를 입력하세요');
		}
	}
	
	initialize() {}
	initializeMenu() {}
	
	static getInstance() {
		if (!this.instance) {
			this.instance = new Grimpan(document.querySelector('canvas'))
		}
		return this.instance;
	}
}

export default Grimpan

// index.ts
import Grimpan from './Grimpan.js';

console.log(Grimpan.getInstance() === Grimpan.getInstance()); // true
```

## 3. 싱글톤의 장점과 단점

### ✅ 장점

- 인스턴스 관리 용이
    - 싱글톤 패턴을 사용하면 애플리케이션 내에 단 하나의 인스턴스만 존재하게 되어, 일관되게 관리하게 쉽다.
- 메모리 절약
    - 인스턴스가 하나만 생성되므로 메모리 낭비를 줄일 수 있다.
- 글로벌 접근성 제공
    - 설정이나 상태를 전역으로 관리하고자 할 때 유리하다
- 디버깅 용이
    - 한 번만 생성된 인스턴스가 재사용되기 때문에, 디버깅할 때 객체의 상태를 추적하기가 용이하다.

### ❎ 단점

- 테스트 어려움
    - 단위 테스트에서 독립적인 테스트가 어려워질 수 있다. 테스트 중에 싱글톤 인스턴스의 상태가 의도치않게 변경되거나 테스트 간에 상태가 공유될 위험이 있다.
- 전역 상태의 남용
    - 전역 상태를 사용하게 되므로, 애플리케이션이 커지면 그 상태를 추적하고 관리하는 것이 어려워질 수 있다. 복잡한 의존성을 갖게 되어 코드의 유지보수가 힘들어질 수 있다.
- 의존성 관리의 복잡성
    - 해당 인스턴스에 의존하는 객체가 많아지면 의존성 주입이나 인스턴스를 관리하는 일이 복잡해질 수 있다.

## **4. 싱글톤을 사용할 때 주의해야 할 점**

### 💎 **단일 책임 원칙(SRP) 위반 가능성**

싱글톤 패턴을 사용할 때, 여러 기능을 하나의 클래스에 모두 몰아서 구현하는 경우가 많다. 이로 인해 책임이 분산되지 않고 하나의 클래스에 과도한 기능이 집중될 수 있다.

**해결방법:**

작고 구체적인 책임을 가진 클래스로 유지하고, 각 책임을 분리한다. 예를 들어, 각 기능별로 여러 싱글톤 클래스를 사용하거나, 다른 디자인 패턴을 적용할 수 있다.

```tsx
// 로그 관리
class Logger {
  private static instance: Logger;
  private constructor() {}
  static getInstance() {
    if (!Logger.instance) Logger.instance = new Logger();
    return Logger.instance;
  }
  log(message: string) { console.log(message); }
}

// 설정 관리
class Config {
  private static instance: Config;
  private settings: Record<string, any> = {};
  static getInstance() {
    if (!Config.instance) Config.instance = new Config();
    return Config.instance;
  }
  set(key: string, value: any) { this.settings[key] = value; }
  get(key: string) { return this.settings[key]; }
}

// 네트워크 관리
class NetworkManager {
  private static instance: NetworkManager;
  private constructor() {}
  static getInstance() {
    if (!NetworkManager.instance) NetworkManager.instance = new NetworkManager();
    return NetworkManager.instance;
  }
  fetchData(url: string) { console.log(`Fetching ${url}`); }
}

// 사용 예시
Logger.getInstance().log("This is a log message");
Config.getInstance().set("theme", "dark");
NetworkManager.getInstance().fetchData("https://api.example.com");

```

### 💎 **테스트가 어려워지는 문제와 해결 방법**

싱글톤은 전역으로 상태를 유지하기 때문에, 그 상태가 테스트 중에 공유될 수 있다. 특히, 단위 테스트를 작성할 때, 싱글톤 인스턴스의 상태가 테스트 간에 영향을 미쳐 독립적인 테스트가 어려워질 수 있다.

**해결방법:**

의존성 주입 방식을 적용하여 인스턴스에 의존하는 클래스들을 테스트하기 용이하도록 한다. 예를 들어, 테스트에서 싱글톤의 인스턴스를 Mock 하거나 스텁을 사용하여 독립적인 테스트가 가능하도록 한다.

```tsx
// 실제 DB
class Database {
  private static instance: Database;
  private constructor() {}
  static getInstance() {
    if (!Database.instance) Database.instance = new Database();
    return Database.instance;
  }
  connect() { return "DB connected"; }
}

// MockDB
class MockDatabase {
  connect() { return "Mock DB connected"; }
}

// 의존성 주입을 통한 테스트
class App {
  private db: Database | MockDatabase;
  constructor(db: Database | MockDatabase) { this.db = db; }
  run() { console.log(this.db.connect()); }
}

// 테스트
const mockDb = new MockDatabase();
const app = new App(mockDb);
app.run();  // Mock DB connected

```

### 💎 **기능이 과도하게 추가되면서 비대해지는 문제**

싱글톤 패턴을 사용하면서 하나의 인스턴스가 여러 기능을 담당하게 되면, 점차 기능이 추가되면서 그 클래스가 비대해질 위험이 있다. 이로 인해 코드가 복잡해지고, 가독성이 떨어지면, 유지보수가 어려워질 수 있다.

**해결방법:**

기능을 작은 단위로 분리하여 하나의 싱글톤 인스턴스가 과도한 책읨을 지지 않도록 한다. 각 기능을 담당하는 여러 싱글톤 클래스를 만들거나 상속을 통해 기능을 분리하여 관리할 수 있다.

```tsx
// 싱글톤 클래스 예시 (기능 분리 전)
class AppSettings {
  private static instance: AppSettings;
  private theme: string = "light";
  private language: string = "en";
  private userToken: string | null = null;

  private constructor() {}

  static getInstance() {
    if (!AppSettings.instance) {
      AppSettings.instance = new AppSettings();
    }
    return AppSettings.instance;
  }

  setTheme(theme: string) {
    this.theme = theme;
  }

  setLanguage(language: string) {
    this.language = language;
  }

  setUserToken(token: string) {
    this.userToken = token;
  }

  // 여러 가지 기능을 처리하는 메서드들이 많아져 비대해짐
  resetSettings() {
    this.theme = "light";
    this.language = "en";
    this.userToken = null;
  }
}

// 해결 방법 (기능을 분리하여 관리)
class ThemeManager {
  private static instance: ThemeManager;
  private theme: string = "light";

  private constructor() {}

  static getInstance() {
    if (!ThemeManager.instance) {
      ThemeManager.instance = new ThemeManager();
    }
    return ThemeManager.instance;
  }

  setTheme(theme: string) {
    this.theme = theme;
  }

  getTheme() {
    return this.theme;
  }
}

class LanguageManager {
  private static instance: LanguageManager;
  private language: string = "en";

  private constructor() {}

  static getInstance() {
    if (!LanguageManager.instance) {
      LanguageManager.instance = new LanguageManager();
    }
    return LanguageManager.instance;
  }

  setLanguage(language: string) {
    this.language = language;
  }

  getLanguage() {
    return this.language;
  }
}

class UserTokenManager {
  private static instance: UserTokenManager;
  private userToken: string | null = null;

  private constructor() {}

  static getInstance() {
    if (!UserTokenManager.instance) {
      UserTokenManager.instance = new UserTokenManager();
    }
    return UserTokenManager.instance;
  }

  setUserToken(token: string) {
    this.userToken = token;
  }

  getUserToken() {
    return this.userToken;
  }
}

// 사용 예시
const themeManager = ThemeManager.getInstance();
themeManager.setTheme("dark");

const languageManager = LanguageManager.getInstance();
languageManager.setLanguage("fr");

const userTokenManager = UserTokenManager.getInstance();
userTokenManager.setUserToken("abc123");

```

## **5. 리액트에서 싱글톤 패턴 적용하기**

### 💎 싱글톤을 활용한 상태 관리

리액트에서 싱글톤 패턴은 **애플리케이션의 전역 상태**를 관리할 때 유용할 수 있습니다. 싱글톤 패턴을 사용하여 전역적으로 공유되는 **상태나 서비스**를 관리하고, 애플리케이션의 어느 컴포넌트에서도 동일한 인스턴스를 접근할 수 있도록 할 수 있습니다.

예를 들어, 사용자 인증 상태나 로깅, 설정값 등을 싱글톤 객체로 관리하면, 여러 컴포넌트가 동일한 상태를 참조하고 변경할 수 있습니다.

```tsx
// AuthService.ts (싱글톤 패턴을 활용한 인증 상태 관리)
class AuthService {
  private static instance: AuthService;
  private isAuthenticated: boolean = false;

  private constructor() {}

  static getInstance() {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  login() {
    this.isAuthenticated = true;
  }

  logout() {
    this.isAuthenticated = false;
  }

  getAuthStatus() {
    return this.isAuthenticated;
  }
}

// App.tsx (컴포넌트에서 싱글톤 활용)
import React, { useState } from 'react';
import AuthService from './AuthService';

const App: React.FC = () => {
  const [authStatus, setAuthStatus] = useState(AuthService.getInstance().getAuthStatus());

  const login = () => {
    AuthService.getInstance().login();
    setAuthStatus(AuthService.getInstance().getAuthStatus());
  };

  const logout = () => {
    AuthService.getInstance().logout();
    setAuthStatus(AuthService.getInstance().getAuthStatus());
  };

  return (
    <div>
      <h1>{authStatus ? 'Logged In' : 'Logged Out'}</h1>
      <button onClick={login}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default App;
```

### 💎 Redux/Context API vs. 싱글톤 비교

- **Redux**나 **Context API**는 애플리케이션의 상태를 **전역적으로 관리**하는 데 초점을 맞추고 있습니다. **구성 요소들이 복잡**하고 **상태를 쉽게 추적**할 수 있는 장점이 있습니다.
- 반면, **싱글톤 패턴**은 **단일 인스턴스**를 관리하는 데 적합하고, **단순한 상태나 서비스**를 관리할 때 유리합니다. 그러나 **상태 관리가 복잡해지면** 유지보수가 어려울 수 있습니다.

### 💎 언제 싱글톤을 활용하면 좋은가?

- **단일 인스턴스가 필요한 경우**
    - 애플리케이션에서 하나의 인스턴스만 존재해야 하는 **유틸리티 객체나 서비스**에 적합합니다. 예를 들어, **인증 관리**, **로깅 서비스**, **설정 관리** 등에서 싱글톤을 사용하면 **효율적인 상태 공유**가 가능합니다.
- **애플리케이션 전역에서 동일한 데이터나 상태를 사용하는 경우**
    - 여러 컴포넌트에서 동일한 데이터를 참조해야 하는 경우, 싱글톤 패턴을 사용하면 **동일한 인스턴스를 공유**하므로 상태의 일관성을 유지할 수 있습니다.
- **상태 변경이 적고, 복잡하지 않은 경우**
    - 상태 변경이 **드물고** 상태 관리가 **단순한** 경우 싱글톤을 활용하여 **간단한 구현**으로 상태를 관리할 수 있습니다. 예를 들어, **전역적인 설정 값**을 싱글톤으로 관리하는 것이 좋습니다.
- **상태를 변경할 필요 없이, 설정이나 로그와 같은 하나의 인스턴스만 필요한 경우**
    - 설정이나 로그, 네트워크 관리와 같이 한 번 설정하고 계속해서 동일하게 사용할 서비스에 유용합니다. 예를 들어, 애플리케이션의 **단일 진입점**을 관리할 때 싱글톤을 사용하면 좋습니다.

## **6. 싱글톤을 대체할 수 있는 패턴과 해결책**

### 💎 의존성 주입(DI, Dependency Injection)

의존성 주입은 객체의 **생성 및 의존 관계**를 외부에서 관리하여 **싱글톤 패턴의 단점**인 **전역 상태 공유** 문제를 해결할 수 있습니다.

**DI를 사용하면** 필요한 객체를 외부에서 주입받기 때문에 **테스트 용이성**과 **유연성**이 증가합니다.

```tsx
// AuthService.ts
class AuthService {
  login() { console.log("Logged in"); }
  logout() { console.log("Logged out"); }
}

// App.tsx
class App {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }
}

// 외부에서 의존성 주입
const authService = new AuthService();
const app = new App(authService);

```

### 💎 팩토리 패턴을 활용한 유연한 인스턴스 관리

팩토리 패턴은 **객체 생성 로직을 별도의 팩토리 메서드로 분리**하여 인스턴스 생성의 **유연성을 높이는 방법**입니다. 싱글톤 대신 팩토리 패턴을 사용하면 **필요에 따라 인스턴스를 생성**하거나 **다양한 조건에 맞는 인스턴스를 생성**할 수 있습니다.

```tsx
// Logger.ts
class Logger {
  log(message: string) {
    console.log(message);
  }
}

// LoggerFactory.ts
class LoggerFactory {
  static createLogger() {
    return new Logger();
  }
}

// App.tsx
const logger = LoggerFactory.createLogger();
logger.log("This is a log message");

```

### 💎 모듈 패턴과 객체 리터럴을 활용한 대안

모듈 패턴과 객체 리터럴은 **전역 상태**를 **숨기고** 클로저를 사용하여 **내부 상태를 관리**하는 방식으로 싱글톤을 대체할 수 있습니다.

**클래스를 사용하지 않고**도 전역 상태를 관리할 수 있어 싱글톤을 구현할 때와 유사한 효과를 낼 수 있습니다.

```tsx
// Logger.ts (모듈 패턴 활용)
const Logger = (() => {
  let instance: any;
  
  function createInstance() {
    return { log: (message: string) => console.log(message) };
  }

  return {
    getInstance: () => {
      if (!instance) instance = createInstance();
      return instance;
    }
  };
})();

// App.tsx
const logger = Logger.getInstance();
logger.log("This is a log message");

```

## **7. 결론: 싱글톤을 올바르게 사용하는 법**

### 💎 싱글톤이 적합한 경우와 그렇지 않은 경우

**적합한 경우**:

- **단일 인스턴스**만 필요한 경우 (예: 설정 관리, 로그 관리, 네트워크 요청 관리 등)
- **전역 상태**를 공유하고, **상태 관리**가 단순한 경우
- **애플리케이션 전반에서 동일한 인스턴스**가 사용되어야 하는 경우

**적합하지 않은 경우**:

- **복잡한 상태 관리**가 필요한 경우 (예: 다양한 컴포넌트에서 동적으로 상태가 변화하는 경우)
- **확장성**과 **유지보수**가 중요한 경우 (싱글톤은 특정 클래스에 기능이 집중되어 관리가 어려워질 수 있음)
- **테스트**가 중요한 경우 (싱글톤은 테스트 환경에서 예측 불가능한 동작을 일으킬 수 있음)

### 💎 유지보수성을 고려한 싱글톤 설계 원칙

**단일 책임 원칙(SRP)**: 싱글톤이 하나의 **책임만 가지도록** 설계해야 합니다. 너무 많은 기능을 맡기면 관리가 어려워집니다.

**상태 관리 간소화**: 싱글톤에 **복잡한 상태**를 관리하게 하기보다는, **상태를 단순화**하고 외부에서 관리할 수 있도록 합니다.

**의존성 관리**: 싱글톤이 의존성을 **외부에서 주입받도록** 설계하여, **테스트 용이성**과 **확장성**을 고려합니다.

**상태 변화 최소화**: 상태 변화가 잦은 싱글톤은 예기치 않은 버그를 초래할 수 있으므로, 상태 변화가 **필요 최소화** 되도록 합니다.