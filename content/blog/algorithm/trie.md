---
title: Trie 알고리즘
meta:
  - name: description
    content: 트라이 알고리즘, trie 알고리즘, Trie 알고리즘
  - property: og:title
    content: Trie 알고리즘
  - property: og:description
    content: Trie 알고리즘에 대해 정리하였습니다.
---

## Trie 개념

트라이(Trie)란 문자열을 저장하고 효율적으로 탐색하기 위한 트리 형태의 자료구조입니다. 트리 형태의 자료구조는 다음과 같은 그림으로 이루어집니다.

<center>
  <figure>
    <img src="https://user-images.githubusercontent.com/22426851/98461577-96c08880-21f0-11eb-8a8d-88017f1efd1b.jpeg" alt="tree algorithm">
    <figcaption style="font-size: 14px;">
      <a href="http://blog.daum.net/servant2342/8382646" target="_blank" rel="noopener noreferrer">이미지 출처</a>
    </figcaption>
  </figure>
</center>

트리 구조는 기본적으로 **Node(Root Node, Parent Node, Child Node)**, **Edge**, **Terminal Node**, **Degree** 등으로 이루어집니다.

**Root Node** : 트리 구조에서 최상위에 존재하는 A와 같은 노드입니다.  
**Parent Node** : 예를 들어 E, F의 Parent Node는 B입니다.  
**Child Node** : 예를 들어 B의 Child Node는 E, F입니다  
**Edge** : Node와 Node를 연결하는 선입니다.  
**Terminal Node** : Child Node가 없는 노드입니다. 위 그림에서는 K, L, F, G, M, I, J입니다.  
**Degree** : Child Node를 가지고 있는 수 입니다. 위 그림에서 D의 Degree는 3입니다.

## 사용목적

주로 문자열 탐색할 때 사용되는데 단순하게 하나씩 비교하면서 탐색을 하는 것보다 효율적입니다. 하지만 각 노드에서 다음 노드를 가리키고 있는 노드의 주소를 저장하는 포인터 배열이 필요합니다. 즉, 노드 개수만큼 필요한 포인터 배열을 가지고 있어야 합니다.

사용 예) 검색어 자동완성, 사전에서 문자열 검사 등.

## 시간복잡도

트라이 알고리즘을 만들 때 시간복잡도는 O(M\*N)이고, 탐색할때 시간복잡도는 O(N)입니다.

총 문자열의 수를 M, 제일 긴 문자열의 길이를 N이라고 가정합니다. 예를 들어 아래와 같은 문자열 배열이 있다면 모든 문자열을 넣어야 하니 M개의 트라이 자료구조에 넣고, 긴 문자열만큼 걸리니까 N만큼 걸립니다.

탐색할 때는 트리를 타고 들어가봤자 긴 문자열의 길이만큼 탐색하기 때문에 O(N)이 됩니다.

```javascript
trie = ["Joe", "John", "Johnny", "Jane", "Jack"]
```

<center>
  <figure>
    <img src="https://user-images.githubusercontent.com/22426851/97883307-0a354680-1d68-11eb-83c0-d4377246bbed.jpg" alt="trie algorithm">
    <figcaption style="font-size: 14px;">
      <a href="https://blog.ilkyu.kr/entry/%ED%8C%8C%EC%9D%B4%EC%8D%AC%EC%97%90%EC%84%9C-Trie-%ED%8A%B8%EB%9D%BC%EC%9D%B4-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0" target="_blank" rel="noopener noreferrer">이미지 출처</a>
    </figcaption>
  </figure>
</center>

## Trie 알고리즘 관련 문제 구현

예제: [프로그래머스 2018 카카오 블라인드 채용 [3]차 자동완성 문제](https://programmers.co.kr/learn/courses/30/lessons/17685)

사용언어 : python3

```javascript
trie = ["word", "war", "warrior", "world"]
```

단어를 찾을 때 입력해야 할 총 문자 수를 리턴해야합니다.

- `word`는 `word`까지 모두 입력해야 합니다. (입력할 총 문자 수 4)
- `war`는 `war`까지 모두 입력해야 합니다. (입력할 총 문자 수 3)
- `warrior`는 `warr`까지만 입력하면 됩니다. (war단어와 구분되어야 합니다. 입력할 총 문자 수 4)
- `world`는 `worl`까지만 입력하면 됩니다. (word단어와 구분되어야 합니다. 입력할 총 문자 수 4)

각 단어의 입력할 총 문자 수를 다 더하면 15를 리턴하게 됩니다.  
문제에서 입출력 예제인 위 배열로 트라이 알고리즘을 그려보면 아래와 같습니다.

<center>
  <figure>
    <img src="https://user-images.githubusercontent.com/22426851/98465231-3428b600-220b-11eb-9721-01daf7f092dd.png" alt="trie algorithm">
  </figure>
</center>

**구현 방법은 아래와 같습니다.**

```python
# 구현 코드
def make_trie(words):
    root = {}
    for word in words:
        current = root
        for letter in word:
            current.setdefault(letter, [0, {}])
            current[letter][0] += 1
            current = current[letter][1]
    return root

def solution(words):
    answer = 0
    trie = make_trie(words)

    for word in words:
        cur_Trie = trie
        for i in range(len(word)):
            if cur_Trie[word[i]][0] == 1 :
                break
            cur_Trie = cur_Trie[word[i]][1]
        answer += i+1
    return answer
```

- Trie를 **dictionary** 구조로 만듭니다.
- python의 **setdefault**함수를 사용해서 문자열 수만큼 for문을 돌고, 각 문자열의 길이만큼 for문을 돌면서 **dictionary** 에 삽입합니다.
- 삽입하는 내용은 각 문자와 문자에 방문한 카운트를 1씩 증가시킵니다. 만들어진 트라이 구조는 아래와 같습니다. **(핵심)**
  > python의 dictionary setdefault(keyname, value) 함수는 지정된 키가 있는 항목의 값을 반환하고, 키가 없는 경우 지정된 값으로 키를 삽입합니다.

```python
# make_trie의 구조
{
    'w': [4, {'a': [2, {'r': [2, {'r': [1, {'i': [1, {'o': [1, {'r': [1, {}]}]}]}]}]}], 'o': [2, {'r': [2, {'d': [1, {}], 'l': [1, {'d': [1, {}]}]}]}]}]
}
```

- 그다음에 만들어진 **make_trie** 함수에서 단어를 찾을 때 입력해야 할 총 문자의 수를 찾습니다.  
  구현 코드 중 아래 코드 부분이 트라이에서 각 문자열을 for문으로 돌면서 문자ㄷ열을 만들기 위해 입력해야 할 총 문자의 수를 찾는 부분입니다.

```python
for i in range(len(word)):
    if cur_Trie[word[i]][0] == 1 :
        break
    cur_Trie = cur_Trie[word[i]][1]
answer += i+1
```

- 1이 나오면 이 문자는 더이상 찾지 않아도 문자열을 찾을 수 있습니다. 그 이유는, 더이상 다른 단어와 중복되지 않기 때문입니다.
- 예를 들어 `warrior`를 for문으로 돌면서 `w, a, r, r, i, o, r`순서로 찾으면 `w = 4, a = 2, r = 2, r = 1, i = 1, o = 1, r = 1`의 수가 나옵니다.  
  `warrior`은 `warr`까지만 찾으면 `warrior`를 완성 할 수 있습니다. 그 이유는, warr 단어에서 4번째 있는 r의 카운트가 1이기 때문에 다른 단어와 중복되지 않기 때문입니다.
- 다른 예로 `word`는 `word` 끝까지 찾아야 합니다. 그 이유는 `world` 문자열과 `wor`까지 중복되기 때문에 `world`의 문자와 구분해주기 위해서 `word` 4개의 문자를 입력해야 합니다.
- 결과는 아래와 같습니다. (4 + 3 + 4 + 4 = 15)

```javascript
// 최소 입력 받아야 할 문자 수
'word' = 4
'war' = 3
'warrior' = 4
'world' = 4
```
