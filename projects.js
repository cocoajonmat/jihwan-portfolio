/*
  작품과 사이트 정보. 내용을 바꿀 때는 이 파일만 고치면 됩니다.

  [SITE]
  bgVideo / bgYoutube / bgImage : 홈 배경(쇼릴)은 작품과 별개입니다. 유튜브 영상 ID(bgYoutube) → 무음 반복 영상 파일(bgVideo) → 이미지(bgImage) 순으로 쓰입니다.
                bgImage 는 영상이 로딩되는 동안과 연락 화면의 흐린 배경에도 쓰입니다. 예: "assets/bg-reel.mp4", "assets/bg-reel-poster.webp"
  homeInfo  : 홈 오른쪽 아래에 보이는 쇼릴 이름(title)과 분야(kind). 한국어/영어 모두 적습니다.
  showreel  : (선택) 쇼릴 영상 파일 경로. '쇼릴 보기'를 누르면 팝업으로 재생됩니다. 예: "assets/showreel.mp4"
  showreelYoutube : (선택) 쇼릴이 유튜브에 있을 때 영상 ID. showreel 이 비어 있을 때 사용됩니다.
  cats      : 작업 분야 메뉴. 작품의 cat 값과 id가 같으면 그 분야로 묶입니다.
  bio/focus : 이름 위에 마우스를 올리면 나오는 소개 카드

  [PROJECTS]
  id          : 두 자리 번호. 주소(#film-01)와 이미지 파일 이름에 쓰입니다.
  cat         : 작업 분야 (SITE.cats 의 id)
  image       : 썸네일(보정 후 대표 이미지). 목록 카드, 상세 화면의 재생 전 화면, 상세 화면의 흐린 배경에 쓰입니다.
  before      : 보정 전(BEFORE) 이미지. 비워 두면 전후 비교 없이 일반 플레이어가 나옵니다.
  preview     : (선택) 목록 카드에 마우스를 올리면 재생되는 3~5초 무음 영상 파일. 예: "assets/01-preview.mp4"
                비워 두면(또는 항목이 없으면) 썸네일만 보입니다. 터치 기기에서는 쓰이지 않습니다.
  videoBefore / videoAfter : (선택) 전후 비교 영상 파일 두 개. 둘 다 있으면 같이 재생되며 분할선으로 비교됩니다.
  youtube     : (선택) 유튜브 영상 ID. 전후 영상 파일이 없을 때 재생 버튼을 누르면 이 영상이 열립니다.
  layout      : 목록(2열)에서의 배치. "wide" = 두 칸 전체 / "offset" = 아래로 내려서 어긋나게(왼쪽 카드에 주면 왼쪽이 내려감) / "" = 한 칸.
                순서대로 자동 배치되므로 작품을 추가·삭제해도 빈칸이 생기지 않습니다.
  credits     : [역할, 이름, 본인 여부(1이면 강조)]
*/
window.SITE = {
  name: { ko: "윤지환", en: "Yoon Jihwan" },
  wordmark: "jihwan.yoon",
  year: 2026,
  email: "hello@example.com",
  phone: "010-2723-4101",
  links: [
    { label: "Instagram", text: "@colorbydavid", href: "https://www.instagram.com/colorbydavid/" },
    { label: "YouTube", text: "youtube.com/@윤지환작업", href: "https://www.youtube.com/@%EC%9C%A4%EC%A7%80%ED%99%98%EC%9E%91%EC%97%85" }
  ],
  // 홈 배경(쇼릴). 작품 목록과는 별개입니다. bgYoutube(유튜브) → bgVideo(파일) → bgImage 순으로 쓰입니다.
  bgVideo: "assets/bg-reel.mp4",
  bgYoutube: "",
  bgImage: "assets/bg-reel-poster.webp",
  // 홈 오른쪽 아래에 보이는 쇼릴 이름과 분야 문구
  homeInfo: { title: { ko: "Showreel - colorgrade", en: "Showreel - colorgrade" }, kind: { ko: "D.I", en: "D.I" } },
  showreel: "",
  showreelYoutube: "ELmlZ-FZvJc",
  focus: { ko: ["색보정"], en: ["D.I"] },
  bio: {
    ko: "색으로 이야기의 분위기를 완성합니다. 단편 영화, 뮤직비디오, 브랜드 필름, 다큐멘터리 작업을 합니다.",
    en: "I finish the mood of a story in color. Short films, music videos, brand films and documentaries."
  },
  cats: [
    { id: "film", ko: "단편 영화", en: "Short film" },
    { id: "mv", ko: "뮤직비디오", en: "Music video" },
    { id: "brand", ko: "브랜드 필름", en: "Brand film" },
    { id: "doc", ko: "다큐멘터리", en: "Documentary" }
  ]
};

(function () {
  function stills(id, n) { var a = []; for (var i = 1; i <= n; i++) a.push("assets/" + id + "-still-" + (i < 10 ? "0" : "") + i + ".webp"); return a; }
  var me = "윤지환", meEn = "Yoon Jihwan";
  function cr(ko, en) { return { ko: ko, en: en }; }

  window.PROJECTS = [
    {
      id: "01", cat: "film", youtube: "HVKK64J92cs", preview: "assets/bg-01.mp4", year: 2026, runtime: "12:40", layout: "wide",
      image: "assets/01-thumb.webp", before: "", frames: stills("01", 6),
      palette: ["#131720", "#31343d", "#5d5149", "#a67e56", "#eec874"],
      credits: cr([["감독", "감독 이름", 0], ["색보정", me, 1]],
                  [["Director", "Director name", 0], ["D.I", meEn, 1]]),
      ko: { title: "새벽 배달", kind: "단편 영화", role: "색보정",
        summary: "첫 배송이 시작되는 새벽 다섯 시. 찍어 온 장면의 호흡을 편집으로 다듬고, 텅스텐 톤의 따뜻함과 그림자의 푸른빛을 색보정으로 맞췄습니다." },
      en: { title: "Dawn Delivery", kind: "Short film", role: "D.I",
        summary: "Five in the morning, the first delivery of the day. The edit settles the breath of the footage; the grade balances warm tungsten against blue shadows." }
    },
    {
      id: "02", cat: "mv", youtube: "p74BRC_AZ9c", preview: "", year: 2025, runtime: "12:48", layout: "",
      image: "assets/02-thumb.webp", before: "", frames: stills("02", 5),
      palette: ["#10250e", "#2a4b20", "#749357", "#a9c77e", "#f1fcc4"],
      credits: cr([["감독", "감독 이름", 0], ["색보정", me, 1]],
                  [["Director", "Director name", 0], ["D.I", meEn, 1]]),
      ko: { title: "느티가 빰을 훑고", kind: "뮤직비디오", role: "색보정",
        summary: "숲길을 걷는 한 사람을 따라가는 4분짜리 뮤직비디오. 박자에 맞춘 컷 전환과 번지는 역광의 초록으로 여름 오후의 공기를 만들었습니다." },
      en: { title: "느티가 빰을 훑고", kind: "Music video", role: "D.I",
        summary: "A four-minute music video following one walker through a forest. Beat-matched cuts and a blooming backlit green carry the air of a summer afternoon." }
    },
    {
      id: "03", cat: "brand", youtube: "", preview: "", year: 2025, runtime: "01:30", layout: "offset",
      image: "assets/03-thumb.webp", before: "", frames: stills("03", 5),
      palette: ["#07070e", "#0a0914", "#1f0f27", "#632c6e", "#ff4fa3"],
      credits: cr([["클라이언트", "브랜드 이름", 0], ["색보정", me, 1]],
                  [["Client", "Brand name", 0], ["D.I", meEn, 1]]),
      ko: { title: "야간 영업", kind: "브랜드 필름", role: "색보정",
        summary: "밤새 불이 켜져 있는 가게들의 90초. 네온과 번진 불빛은 어둡게 눌러 두고, 사람의 얼굴에만 따뜻한 빛이 남도록 색을 잡았습니다." },
      en: { title: "Open Late", kind: "Brand film", role: "D.I",
        summary: "Ninety seconds of shops that stay lit all night. Neon and bokeh are held low so the only warm light left falls on the faces." }
    },
    {
      id: "04", cat: "doc", youtube: "", preview: "", year: 2024, runtime: "24:15", layout: "wide",
      image: "assets/04-thumb.webp", before: "", frames: stills("04", 5),
      palette: ["#2f3941", "#78838c", "#a1acb4", "#c9d3db", "#f3f8fc"],
      credits: cr([["감독", "감독 이름", 0], ["색보정", me, 1]],
                  [["Director", "Director name", 0], ["D.I", meEn, 1]]),
      ko: { title: "안개 주의보", kind: "다큐멘터리", role: "색보정",
        summary: "안개가 잦은 항구 마을의 한 해를 담은 다큐멘터리. 채도를 낮춘 차분한 색으로, 흐린 날에도 화면마다 결이 다르게 보이도록 정리했습니다." },
      en: { title: "Fog Advisory", kind: "Documentary", role: "D.I",
        summary: "A year in a harbor town where fog is routine. A quiet, low-saturation grade keeps every overcast shot distinct from the next." }
    },
    {
      id: "05", cat: "mv", youtube: "", preview: "", year: 2025, runtime: "04:10", layout: "offset",
      image: "assets/05-thumb.webp", before: "", frames: stills("05", 5),
      palette: ["#0e1525", "#1f354b", "#578593", "#7fbdc7", "#c5faf6"],
      credits: cr([["감독", "감독 이름", 0], ["색보정", me, 1]],
                  [["Director", "Director name", 0], ["D.I", meEn, 1]]),
      ko: { title: "여름의 끝", kind: "뮤직비디오", role: "색보정",
        summary: "여름이 끝나는 바닷가를 따라가는 뮤직비디오. 차가운 청록의 그림자와 밝게 뜬 하늘로 계절이 넘어가는 순간을 표현했습니다." },
      en: { title: "End of Summer", kind: "Music video", role: "D.I",
        summary: "A music video that follows the shore as summer ends. Cool teal shadows and a lifted sky mark the moment the season turns." }
    },
    {
      id: "06", cat: "brand", youtube: "", preview: "", year: 2025, runtime: "00:45", layout: "",
      image: "assets/06-thumb.webp", before: "", frames: stills("06", 5),
      palette: ["#0f060c", "#180812", "#280d15", "#521d1f", "#ac4954"],
      credits: cr([["클라이언트", "브랜드 이름", 0], ["색보정", me, 1]],
                  [["Client", "Brand name", 0], ["D.I", meEn, 1]]),
      ko: { title: "골목의 빛", kind: "브랜드 필름", role: "색보정",
        summary: "저녁 골목의 간판과 조명을 따뜻한 주황과 붉은 계열로 모은 45초짜리 광고. 원본의 들쭉날쭉한 색온도를 하나로 맞췄습니다." },
      en: { title: "Alley Light", kind: "Brand film", role: "D.I",
        summary: "A 45-second spot that gathers evening signs and lamps into warm orange and red. The uneven color temperatures of the original footage are matched into one." }
    },
    {
      id: "07", cat: "film", youtube: "", preview: "", year: 2024, runtime: "18:20", layout: "",
      image: "assets/07-thumb.webp", before: "", frames: stills("07", 5),
      palette: ["#243344", "#627893", "#879fbd", "#a9c4e5", "#d0e8fe"],
      credits: cr([["감독", "감독 이름", 0], ["색보정", me, 1]],
                  [["Director", "Director name", 0], ["D.I", meEn, 1]]),
      ko: { title: "첫눈", kind: "단편 영화", role: "색보정",
        summary: "첫눈이 오는 하루를 따라가는 단편. 말수가 적은 장면에서 침묵의 길이를 조절하는 데 집중한 편집 작업입니다." },
      en: { title: "First Snow", kind: "Short film", role: "D.I",
        summary: "A short film about the day of the first snowfall. An edit focused on the length of silence in a film that says very little." }
    },
    {
      id: "08", cat: "doc", youtube: "", preview: "", year: 2024, runtime: "31:05", layout: "offset",
      image: "assets/08-thumb.webp", before: "", frames: stills("08", 6),
      palette: ["#221512", "#392a26", "#3e3e39", "#495c5c", "#65b5cb"],
      credits: cr([["감독", "감독 이름", 0], ["색보정", me, 1]],
                  [["Director", "Director name", 0], ["D.I", meEn, 1]]),
      ko: { title: "바다 위의 집", kind: "다큐멘터리", role: "색보정",
        summary: "바다 위에 집을 짓고 사는 사람들의 일 년. 긴 호흡의 인터뷰를 편집하고, 물빛과 낡은 목재의 색을 서로 어긋나지 않게 맞췄습니다." },
      en: { title: "House on the Water", kind: "Documentary", role: "D.I",
        summary: "A year with people who live in houses built over the sea. Long interviews are cut for breath, and the water and weathered wood are graded to sit together." }
    }
  ];
})();
