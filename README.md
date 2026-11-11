# jihwan.yoon 포트폴리오 (시안 G)

영상 색보정 일을 하는 윤지환 님의 포트폴리오 사이트입니다.
HTML, CSS, JavaScript만 쓰는 정적 사이트라서 설치나 빌드 없이 바로 열립니다.

> 지금 들어 있는 이름, 작품, 이미지, 영상은 모두 **샘플(자리표시)** 입니다. 실제 내용으로 바꾸는 방법은 아래에 있습니다.

---

## 1. 열어서 보기

1. VS Code에서 `파일 → 폴더 열기`로 이 폴더(`jihwan-portfolio`)를 엽니다.
2. 처음 열면 오른쪽 아래에 확장 프로그램 추천이 뜹니다. **Live Server** 를 설치하세요.
3. `index.html` 을 열고 오른쪽 아래 **Go Live** 를 누르면 브라우저에서 사이트가 열립니다. 파일을 저장하면 화면이 자동으로 새로고침됩니다.

`index.html` 을 더블클릭해서 열어도 대부분 보이지만, **유튜브 영상은 이 방식에서 오류가 날 수 있으니** 영상 확인은 Live Server로 하세요.
IntelliJ로 열어서 고쳐도 됩니다. 어떤 에디터든 글자 파일만 고치면 되고, 미리보기는 브라우저로 보면 됩니다.

## 2. 파일 지도

| 파일 | 하는 일 |
|---|---|
| `projects.js` | **내용은 여기서만 고치면 됩니다.** 이름, 연락처, 소개, 작품 목록, 영상 경로 |
| `index.html` | 화면 뼈대 (홈, 작품 목록, 작품 상세, 연락 화면, 쇼릴 팝업) |
| `styles.css` | 디자인 (색, 글자, 배치). 맨 위 `:root` 에 색과 글꼴 변수가 있습니다 |
| `app.js` | 화면 동작 (홈 배경, 이름 카드, 작품 목록, 전후 비교 플레이어, 화면 전환) |
| `lib.js`, `shared.css` | 공통 부품 (한/영 전환, 스틸 확대 보기, 쇼릴 팝업) |
| `assets/` | 이미지와 영상. 지금은 전부 샘플입니다 |

## 3. 내용 바꾸기 (`projects.js`)

### 이름, 연락처, 소개
파일 맨 위 `window.SITE` 에 있습니다.

```js
name: { ko: "윤지환", en: "Yoon Jihwan" },
wordmark: "jihwan.yoon",        // 왼쪽 위 로고와 홈의 큰 이름
email: "hello@example.com",     // 실제 이메일로
phone: "010-0000-0000",         // 실제 번호로 (공개가 부담스러우면 지우는 것도 방법)
links: [ ... ],                 // 인스타그램, 유튜브 주소
bgVideo: "assets/bg-reel.mp4",  // 홈 배경(쇼릴) 영상. 작품 목록과는 별개입니다
showreel: "assets/showreel.mp4",// '쇼릴 보기' 팝업에서 재생될 영상
```

### 작품 추가·수정
`window.PROJECTS` 안의 작품 하나가 아래 모양입니다. 새 작품은 하나를 복사해서 번호(`id`)만 바꾸면 됩니다.

| 항목 | 설명 |
|---|---|
| `id` | 두 자리 번호 (`"09"`). 주소(`#film-09`)와 이미지 파일 이름에 쓰입니다 |
| `cat` | 분야. `SITE.cats` 의 `id` 중 하나 (`film`, `mv`, `brand`, `doc`) |
| `image` | 보정 후(AFTER) 대표 이미지. 목록 카드와 상세 화면에 쓰입니다 |
| `before` | (지금은 쓰지 않음) 보정 전 이미지. 비워 두면(`""`) 전후 비교 없이 일반 플레이어가 나옵니다. 전후 비교는 풀영상 안의 와이퍼로 보여 줍니다 |
| `frames` | 상세 화면 아래 스틸 이미지들 |
| `youtube` | 풀영상의 유튜브 영상 ID (주소의 `v=` 뒤 글자) |
| `videoBefore`, `videoAfter` | 전후 비교용 영상 파일 두 개 (둘 다 있어야 합니다) |
| `layout` | 목록(2열)에서의 배치. `"wide"` = 두 칸 전체, `"offset"` = 아래로 내려서 어긋나게, `""` = 한 칸 |
| `preview` | (선택) 목록에서 마우스를 올리면 재생되는 3~5초 무음 mp4 |
| `credits`, `palette`, `ko`/`en` | 크레딧, 색 구성(색 코드 5개), 제목·소개 문구 |

목록은 순서대로 자동 배치되어서 작품을 추가·삭제해도 빈칸이 생기지 않습니다. 다만 `wide` 와 `offset` 의 짝이 어색해지지 않았는지 목록 화면을 한 번 확인하세요.

## 4. 영상 넣는 방법

영상은 용도에 따라 다르게 넣습니다.

| 용도 | 방법 |
|---|---|
| 쇼릴, 작품 본편 (긴 영상) | **유튜브에 올리고 ID만 적기.** `showreelYoutube: "영상ID"`, 작품은 `youtube: "영상ID"` |
| 홈 배경 (`SITE` 맨 위) | 무음 영상을 파일로 넣고 `bgVideo: "assets/bg-reel.mp4"`, 로딩 중에 보일 이미지는 `bgImage`. 유튜브를 쓰려면 `bgYoutube: "영상ID"` |
| 목록 카드 미리보기 | 3~5초 무음 mp4 (원본 → 와이퍼 → 보정본)를 파일로 넣고 `preview: "assets/01-preview.mp4"` |
| 전후 비교 (선택) | 영상 파일 두 개를 쓰는 방식(`videoBefore`, `videoAfter`)은 지금 쓰지 않습니다. 비교는 풀영상의 와이퍼로 보여 줍니다 |
| 쇼릴을 파일로 | 작게 줄여서 `showreel: "assets/showreel.mp4"` (유튜브를 쓰면 `showreel` 은 빈 문자열 `""` 로) |

> 파일로 넣을 영상은 꼭 줄이세요. GitHub은 **파일 하나가 100MB를 넘으면 올라가지 않고**, 용량이 크면 사이트도 느려집니다.
> 원본은 `raw/` 폴더에 두세요. 이 폴더는 git에 올라가지 않습니다.

### 영상 줄이기 (ffmpeg)

```bash
# 홈 배경: 소리 없음, 높이 1080. 영상에 검은 띠가 있으면 crop 으로 잘라냄 (예: 4K 영상의 위아래 260px)
ffmpeg -i raw/원본.mp4 -vf "crop=3840:1640:0:260,scale=-2:1080:flags=lanczos" -an -c:v libx264 -preset slow -crf 24 -pix_fmt yuv420p -movflags +faststart assets/bg-reel.mp4

# 전후 비교: 두 클립은 길이, 해상도, 구도가 같아야 합니다
ffmpeg -i raw/before.mov -an -vf scale=1280:-2 -c:v libx264 -crf 27 -pix_fmt yuv420p -movflags +faststart assets/01-before.mp4
ffmpeg -i raw/after.mov  -an -vf scale=1280:-2 -c:v libx264 -crf 27 -pix_fmt yuv420p -movflags +faststart assets/01-after.mp4
```

### 이미지 규격

| 파일 | 크기 | 형식 |
|---|---|---|
| `NN-thumb.webp` (보정 후 대표) | 1600×900 | webp |
| `NN-still-01.webp` … (스틸) | 1280×720 | webp |

```bash
ffmpeg -i raw/원본.jpg -vf scale=1600:-2 -c:v libwebp -quality 82 assets/01-thumb.webp
```

## 5. 샘플 표시

작품 목록 맨 아래의 "샘플 시안 G" 문구는 이미 지웠습니다. 영상이 없는 작품의 "영상 준비 중 · 샘플" 안내는 `youtube` 를 연결하면 사라집니다.

## 6. 인터넷에 올리기 (GitHub Pages, 무료)

1. GitHub에서 새 저장소를 만듭니다. (예: `jihwan-portfolio`, Public)
2. 이 폴더에서 터미널로 올립니다.
   ```bash
   git init
   git add .
   git commit -m "first commit"
   git branch -M main
   git remote add origin https://github.com/내아이디/jihwan-portfolio.git
   git push -u origin main
   ```
3. 저장소의 `Settings → Pages` 에서 Source를 `Deploy from a branch`, Branch를 `main` / `(root)` 로 저장합니다.
4. 1~2분 뒤 `https://내아이디.github.io/jihwan-portfolio/` 로 열립니다.

도메인을 따로 사고 싶으면 같은 Pages 설정에서 Custom domain에 연결하면 됩니다.

## 7. 올리기 전 확인

- 한/영 전환(오른쪽 위 KO / EN)이 두 언어 모두 자연스러운지
- 휴대폰 폭에서 홈의 큰 이름, 버튼이 겹치지 않는지
- 작품 상세에서 영상과 전후 비교가 재생되는지, 쇼릴 팝업이 열리고 `Esc` 로 닫히는지
- 브라우저 개발자 도구(F12) 콘솔에 빨간 오류가 없는지
