---
title: "NestJs 컨트롤러 기초"
date: 2025월 04월 15일 21:22
categories: [Deb, Nest]
tags: [NestJs, SEO]
series: "Nest"
excerpt: "Next.js에서는 애플리케이션의 모든 페이지가 React 컴포넌트로 이루어져 있지만, 기본적으로 HTML의 <html>, <head>, <body> 태그 같은 구조는 자동으로 생성됩니다. 하지만 때로는 이러한 구조를 커스터마이징할 필요가 있을 때가 있습니다. 바로 이때 사용하는 파일이 _document.js입니다."
thumbnail: "https://www.howu.run/image/nestThumbnail/1.png"
---

# 코드

```tsx
import {
  Controller,
  Delete,
  Get,
  Post,
  Patch,
  Param,
  NotFoundException,
  Body,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';

interface Movie {
  id: number;
  title: string;
}

@Controller('movie')
export class AppController {
  constructor(private readonly appService: AppService) {}

  private movies: Movie[] = [
    {
      id: 1,
      title: '해리포터',
    },
    {
      id: 2,
      title: '해리포터',
    },
  ];

  private idCounter = 3;
  @Get()
  getMovies(
    @Query("title") title?: string
  ) {
    if(!title){
      return this.movies;
    }
    return this.movies.filter((m)=> m.title.startsWith(title));
  }

  @Get(':id')
  getMovie(@Param('id') id: string) {
    const movie = this.movies.find((m) => m.id === +id);

    if (!movie) {
      // return new Error('영화가 없습니다.');
      // return new NotFoundException('존재하지 않는 ID의 영화입니다.'); return으로 에러 반환하면 안된다!
      throw new NotFoundException('존재하지 않는 ID의 영화입니다.');
    }

    return movie;
  }

  @Post()
  postMovie(@Body('title') title: string) {
    const movie: Movie = {
      id: this.idCounter++,
      title: title,
    };

    this.movies.push(movie);

    return movie;
  }

  @Patch(':id')
  patchMovie(@Param('id') id: string, @Body('title') title: string) {
    const movie = this.movies.find((m) => m.id === +id);
    if (!movie) {
      throw new NotFoundException('존재하지 않는 ID의 영화입니다');
    }

    Object.assign(movie, { title });

    return movie;
  }

  @Delete(':id')
  deleteMovie(
    @Param('id') id: string
  ) {
    // const delMoive = this.movies.find((m)=> m.id !== +id);
    
    // if(!delMoive){
    //   throw new NotFoundException('존재하지 않는 ID의 영화입니다');
    // }
    // this.movies = this.movies.filter((m) => delMoive === m);
    // return delMoive;

    const movieIndex = this.movies.findIndex((m)=> m.id === +id);

    if(movieIndex === -1){
      throw new NotFoundException('존재하지 않는 ID의 영화입니다');
    }
    this.movies.splice(movieIndex, 1);

    return id;
  }
}

```

# 배운점

## LP1

```jsx
getMovie(@Param('id') id: string) {
    const movie = this.movies.find((m) => m.id === +id);

    if (!movie) {
      // 1. return new Error('영화가 없습니다.');
      // 2. return new NotFoundException('존재하지 않는 ID의 영화입니다.'); return으로 에러 반환하면 안된다!
      throw new NotFoundException('존재하지 않는 ID의 영화입니다.');
    }

    return movie;
  }
```

### 1번 코드

1번 코드에서는 Error로 에러 객체를 생성한게 부족했다.  1번 코드처럼 에러처리를 하게 된다면

```jsx
{
    "statusCode": 500,
    "message": "Internal server error"
}
```

다음과 같이 반환된다. 하지만 NotFoundException으로 에러 처리를 하게 된다면,

```jsx
{
    "message": "존재하지 않는 ID의 영화입니다.",
    "error": "Not Found",
    "statusCode": 404
}
```

다음처럼 error와 statusCode가 잘 반환된다.

### 2번 코드

2번 코드 처럼 에러 처리를 할때 throw가 아니라 return으로 반환하게 된다면 2-1 처럼 에러가 잘 나오는게 아니라 다음처럼 반환한다.

```jsx
{
    "response": {
        "message": "존재하지 않는 ID의 영화입니다.",
        "error": "Not Found",
        "statusCode": 404
    },
    "status": 404,
    "options": {},
    "message": "존재하지 않는 ID의 영화입니다.",
    "name": "NotFoundException"
}
```

그렇기 때문에 꼭 에러를 던지려면 return이 아니라 throw를 통해 에러를 던져줘야한다.

## LP2

`Object.assign(movie, { title });`

다음의 코드는 movie Object의 title 값을 title 변수로 업데이트 한다는 뜻이다.

참조하고 있는 원본 데이터를 업데이트 하기 때문에 movies 리스트의 원소가 업데이트 된다.

또한 코드를 실행하면 반환값으로 업데이트된 movie가 반환되게 된다.

## LP3

위에 주석 처리한 다음 코드를 살펴보면

```tsx
const delMovie = this.movies.find((m)=> m.id !== +id);
    if(!delMovie){
      throw new NotFoundException('존재하지 않는 ID의 영화입니다');
    }
    this.movies = this.movies.filter((m) => delMovie === m);
return delMovie;
```

### 1번째 문제점

`this.movies.find((m)=> m.id !== +id)` 

이 코드는 id 값이 같지 않는 원소를 찾기 때문에 삭제하려는 영화가 아닌 다른 영화를 찾게 된다.

뭔 생각으로 이렇게 썼는지 모르겠지만, 실수하지 않게 조심해야겠다.

### 2번째 문제점

`this.movies.filter((m) => delMovie === m)`

이 코드는 객체의 참조를 비교하게 되게 때문에 내가 의도한 값이 동일한 영화를 찾기가 힘들다. 그렇기 때문에 id 값을 비교하여 filter 하는 것이 올바른 방법이다.(`this.movies.filter((m) => [m.id](http://m.id/) !== +id)`)

# 마무리

새로운 것을 배우는 것은 언제나 재밌다. 얼른 NestJs를 제대로 할 줄 알고 써먹을수 있는 프로젝트를 해보고 싶다.