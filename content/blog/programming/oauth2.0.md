---
title: OAuth2.0
date: "2021-02-21"
meta:
  - name: description
    content: OAuth는 인터넷 사용자들이 비밀번호를 제공하지 않고 다른 웹사이트 상의 자신들의 정보에 대해 웹사이트나 애플리케이션의 접근 권한을 부여할 수 있는 공통적인 수단으로서 사용되는, 접근 위임을 위한 개방형 표준이다.
  - property: og:title
    content: OAuth, OAuth1.0, OAuth2.0에 대해 간략히 소개한다.
  - property: og:description
    content: OAuth는 인터넷 사용자들이 비밀번호를 제공하지 않고 다른 웹사이트 상의 자신들의 정보에 대해 웹사이트나 애플리케이션의 접근 권한을 부여할 수 있는 공통적인 수단으로서 사용되는, 접근 위임을 위한 개방형 표준이다.
---

<h2 id="second-heading">들어가며</h2>

회사에서 OAuth2.0에 대해서 정리하고 교육한 내용을 간단하게 글로 정리해본다.

## OAuth 생긴 배경

기존의 인증 방식은 Id/Password로 인증했었고, 이는 보안상으로 매우 취약했다. 그리고 구글의 AuthSub, AOL의 OpenAuth, 야후의 BBAuth, 아마존 웹서비스의 API 등 인증방식이 너무 다양했다. 이런 다양한 인증방식을 OAuth는 표준화시켰고, 이 인증을 공유하는 애플리케이션끼리는 별도의 인증이 필요 없다. 즉, 여러 애플리케이션을 통합하여 사용할 수 있게 되었다.

## OAuth 용어

- 사용자(user): 서비스 제공자와 소비자를 사용하는 계정을 가지고 있는 개인
- 소비자(consumer): Open API를 이용하여 개발된 OAuth를 사용하여 서비스 제공자에게 접근하는 웹사이트 또는 애플리케이션
- 서비스 제공자(service provider): OAuth를 통해 접근을 지원하는 웹 애플리케이션(Open API를 제공하는 서비스)
- 소비자 키(consumer key): 소비자가 서비스 제공자에게 자신을 식별하는데 사용하는 키
- 소비자 비밀번호(consumer secret): 서비스 제공자에서 소비자가 자신임을 인증하기 위한 키
- 요청 토큰(request token): 소비자가 사용자에게 접근 권한을 인증받기 위해 정보가 담겨있으며 후에 접근 토큰으로 변환된다.
- 접근 토큰(access token): 인증 후에 사용자가 서비스 제공자가 아닌 소비자를 통해서 보호된 자원에 접근하기 위한 키를 포함한 값.

[참고](https://ko.wikipedia.org/wiki/OAuth)

## OAuth 인증 방식

  <center>
    <figure>
      <img src="https://user-images.githubusercontent.com/22426851/108617680-ccb21180-745b-11eb-8acf-18db66ca1a17.png" alt="oauth authorization">
    </figure>
  </center>

1. 소비자가 서비스 제공자에게 요청 토큰을 요청한다.
2. 서비스 제공자가 소비자에게 요청 토큰을 발급한다.
3. 소비자가 서비스 제공자에게 사용자 인증 페이지를 호출한다.
4. 서비스 제공자는 소비자가 로그인이 완료되면 사용자의 권한 요청을 수락하여 접근 토큰을 발급한다.
5. 소비자는 접근 토큰을 이용해서 서비스 제공자에게 필요한 정보를 요청한다.

## OAuth 1.0 vs OAuth 2.0

OAuth2.0에서는 몇 가지가 추가 및 변경되었다.
Oauth1.0에서 사용하던 용어가 일부 변경되었다. 1.0에서 사용하던 User는 Resource Owner로 변경되었고, Protected Resource는 Resource Server로 변경되었다(또, Resource Server와 Authorization Server가 분리되었다). Client라는 용어가 생겼는데 이는 1.0에서 Consumer라는 용어가 대체되었고, Consumer key는 Client Id로, Consumer Secret은 Client Secret으로 변경되었다.

Client Id와 Client Secret은 Client(웹사이트나 애플리케이션)가 서비스 제공자에게 자신을 식별하고 인증하는데 사용하는 것으로 미리 발급받아야 한다.

## OAuth 2.0 Grant Type

OAuth2.0에서는 하나로 통일되었던 인증방식이 다양한 인증방식으로 분리되었다.

### Authorization Code Grant

권한 코드 부여 승인 방식으로 일반적인 웹사이트에서 소셜로그인과 같은 인증을 받을 때 가장 많이 쓰는 방식이다.

  <center>
    <figure>
      <img src="https://user-images.githubusercontent.com/22426851/108618270-1bfa4100-7460-11eb-9877-34e4af38997f.png">
    </figure>
  </center>

Auth code는 일회성으로 Access Token, Refresh Token이 발급 완료되면, Authorization Server에서 보안상 Auth Code를 폐기한다. 처음에 Access Token을 다시 발급 받으려면 Auth Code부터 다시 발급받아야 한다.

Resource Server에는 클라이언트에서 직접 접근할지, 서버에서 접근할지는 아키텍처 구성에 따라 달라진다.
필자가 경험했던 방식은, 서버에서 Resource server로 접근해서 사용자의 정보를 DB에 저장하고, 클라이언트에 정보를 전달해주는 방식으로 사용했었다.

### Implicit Grant Type

암시적 인증 방식은 Authorization Code 없이 클라이언트에서 Redirect Url로 Access Token을 바로 발급받아서 사용하는 방식이다. Access Token이 브라우저에 기록되어서 만료 기간을 짧게 발급해 보안 위험을 줄입니다. (권장되지 않는 방식이다)

이 방식은 Refresh Token이 없기 때문에 다시 Access Token을 발급받으려면 승인 과정을 다시 통해야 한다.

  <center>
    <figure>
      <img src="https://user-images.githubusercontent.com/22426851/108618581-ac398580-7462-11eb-9043-77e556e23ca3.png">
    </figure>
  </center>

### Resource Owner Password Credentials Grant Type

사용자가 Client(Webpage)에 Id/Password만 넘겨서 Access Token을 받아오는 방식이다.

<center>
    <figure>
      <img src="https://user-images.githubusercontent.com/22426851/108618766-13a40500-7464-11eb-8735-248cb9ffcf24.png">
    </figure>
  </center>

### Client Credentials Grant Type

애플리케이션이 Confidential Client일 때 id와 secret을 가지고 인증하는 방식이다.  
Confidential Client란 client secret을 안전하게 보관할 수 있는 Client를 의미한다.

<center>
    <figure>
      <img src="https://user-images.githubusercontent.com/22426851/108618819-79908c80-7464-11eb-838d-79a738eb3a7e.png">
    </figure>
  </center>

## 마무리

OAuth에 대해서 간단히 정리해봤다. OAuth의 생긴 배경에 대해 알게 되었고 언제 어떻게 사용되는지도 정리가 된 것 같다. 정리하면서 몇 가지 아쉬운 점이 있었다.

- 직접 클라이언트-서버 구현해서 인증 방식을 더 자세히 정리해봤으면 좋았을 것.
- 요청과 응답받을때 어떠한 값들을 주고받는지 자세히 정리했으면 좋았을 것.
  - scope, state, id-token, openId, grant_type 등.

몇 가지 아쉬웠던점을 남기고, 다음에는 직접 OAuth2.0인증을 구현해보고 글로 작성해봐야겠다.
