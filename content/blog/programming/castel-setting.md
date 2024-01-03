---
title: Castel Account Book 프로젝트 구조와 기술 소개
date: "2024-01-05"
description: "사이드 프로젝트 Castel Account Book의 구조와 선택한 기술에 대해 간단히 소개합니다."
meta:
  - name: description
    content: 사이드 프로젝트 Castel Account Book의 구조와 선택한 기술에 대해 간단히 소개합니다.
  - property: og:title
    content: Castel Account Book 프로젝트 구조와 기술 세팅 삽질기
  - property: og:description
    content: 사이드 프로젝트 Castel Account Book의 구조와 선택한 기술에 대해 간단히 소개합니다.
---

## 왜 Castel Account Book 인가?

2023년 말부터 쉬면서 부족한 부분을 채우기 위해 사이드 프로젝트를 시작했고, 몇 번 실패한 가계부를 다시 해보기로 결정했다. 레포지토리 이름 정하는것부터 고민이었는데, 가계부를 영어표현으로 여러가지 방법이 있었지만 Account Book으로 선택했다. Account Book은 뭔가 심심해서 [Lucas](https://wiki.lucashan.space/)와 [Stella](https://www.jieunkim.site/)를 줄인 **Castel**을 붙여서 [Castel Account Book](https://github.com/StellaKim1230/castel-account-book/tree/main)으로 정했다.

패키지 매니저는 pnpm을 사용했고, Monorepo로 프로젝트를 구성했다. 서버는 NestJs + Fastify , ORM은 Prisma, Web은 Remix, DB는 SQLite를 선택했다. 이 기술들을 선택한 이유는 사용해보지 않은 기술들을 공부해보고 싶었기 때문이다.

## Monorepo

[위키백과](https://en.wikipedia.org/wiki/Monorepo)에서 Monorepo는 **여러 프로젝트의 코드를 동일한 저장소에 저장하는 소프트웨어 개발 전략**이라고 정의하고 있다.
Monorepo에 대해서는 설명을 잘 해 놓은 글들이 많기 때문에, 이 글에서는 자세히 다루지는 않는다.

프로젝트 구조를 확인하면 다음과 같다.

```bash
castel-account-book
├─ apps
│ ├─ server
│ │ ├─ src
│ │ ├─ prisma
│ ├─ web
├─ .dockerignore
├─ .gitignore
├─ docker-compose.yaml
├─ package.json
├─ pnpm-lock.yaml
├─ pnpm-workspace.yaml
└─ README.md
```

## Server

NestJs, Fastify, Prisma, SQLite

## Web

Remix

## 그 다음 포스팅

도커로 서버, 프론트 띄운 삽질 과정에 대한 글
