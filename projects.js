/*
  작품과 사이트 정보. 내용을 바꿀 때는 이 파일만 고치면 됩니다.

  [SITE]
  bgVideo / bgYoutube / bgImage : 홈 배경(쇼릴)은 작품과 별개입니다. 유튜브 영상 ID(bgYoutube) → 무음 반복 영상 파일(bgVideo) → 이미지(bgImage) 순으로 쓰입니다.
                bgImage 는 영상이 로딩되는 동안과 연락 화면의 흐린 배경에도 쓰입니다. 예: "assets/bg-showreel-hd.mp4", "assets/bg-reel-poster.webp"
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
  awards      : (선택) 영화제 수상·노미네이트 내역. 상세 화면의 소개 문구 아래에 표로 보입니다. 없으면 이 칸은 나타나지 않습니다.
                cr([[영화제 이름, 결과, 장소], ...], [[English name, result, place], ...]) 모양으로 한국어/영어를 모두 적습니다.
  summary     : 상세 화면의 소개 문구(ko/en 안). 지금은 기획 의도를 적는 자리로 씁니다.
*/
window.SITE = {
  name: { ko: "윤지환", en: "Yoon Jihwan" },
  wordmark: "jihwan.yoon",
  year: 2026,
  email: "colorbydavid@naver.com",
  phone: "010-2723-4101",
  links: [
    { label: "Instagram", text: "@colorbydavid", href: "https://www.instagram.com/colorbydavid/" },
    { label: "YouTube", text: "youtube.com/@윤지환작업", href: "https://www.youtube.com/@%EC%9C%A4%EC%A7%80%ED%99%98%EC%9E%91%EC%97%85" }
  ],
  // 홈 배경(쇼릴). 작품 목록과는 별개입니다. bgYoutube(유튜브) → bgVideo(파일) → bgImage 순으로 쓰입니다.
  bgVideo: "assets/bg-showreel-hd.mp4",
  bgYoutube: "",
  bgImage: "assets/bg-reel-poster.webp",
  // 홈 오른쪽 아래에 보이는 쇼릴 이름과 분야 문구
  homeInfo: { title: { ko: "Showreel - colorgrade", en: "Showreel - colorgrade" }, kind: { ko: "D.I", en: "D.I" } },
  showreel: "",
  showreelYoutube: "ELmlZ-FZvJc",
  focus: { ko: ["D.I"], en: ["D.I"] },
  bio: {
    // 줄바꿈(\n)과 빈 줄은 이름 카드와 연락 화면에서 그대로 보입니다.
    ko: "색으로 장면의 분위기와 감정을 설계합니다.\n\n작품이 가진 고유한 이야기를 이해하고,\n그 순간에 어울리는 색과 온도를 찾아갑니다.\n\n화면 너머의 감정까지 전달하는 컬러를 만듭니다.",
    en: "I design the mood and emotion of a scene through color.\n\nI listen for the story unique to each work,\nand search for the color and temperature that belong to that moment.\n\nI make color that carries emotion beyond the screen."
  },
  cats: [
    { id: "dancefilm", ko: "Dancefilm", en: "Dancefilm" },
    { id: "mv", ko: "MV", en: "MV" },
    { id: "movie", ko: "Movie", en: "Movie" }
  ]
};

(function () {
  function stills(id, n) { var a = []; for (var i = 1; i <= n; i++) a.push("assets/" + id + "-still-" + (i < 10 ? "0" : "") + i + ".webp"); return a; }
  var me = "윤지환", meEn = "Yoon Jihwan";
  function cr(ko, en) { return { ko: ko, en: en }; }

  window.PROJECTS = [
    {
      id: "01", cat: "dancefilm", youtube: "FlLhlmD5D8Y", preview: "assets/01-preview.mp4", year: 2026, runtime: "12:48", layout: "wide",
      image: "assets/01-thumb.webp", before: "", frames: stills("01", 9),
      palette: ["#140806", "#372616", "#594427", "#887453", "#beab8c"],
      credits: cr([["감독", "이윤지", 0], ["D.I", me, 1]],
                  [["Director", "Lee Yoonji", 0], ["D.I", meEn, 1]]),
      awards: cr([["제9회 서울무용영화제 (SeDAFF)", "노미네이트", "한국, 서울"],
                  ["제16회 DanzaTTack", "노미네이트", "스페인, 테네리페"],
                  ["제8회 IMMAGINA film festival", "심사위원 언급상", "이탈리아, 나폴리"]],
                 [["9th Seoul Dance Film Festival (SeDAFF)", "Nominee", "Seoul, South Korea"],
                  ["16th DanzaTTack", "Nominee", "Tenerife, Spain"],
                  ["8th IMMAGINA Film Festival", "Jury Special Mention", "Naples, Italy"]]),
      ko: { title: "느티가 빰을 훑고", kind: "Dancefilm", role: "D.I",
        summary: "이 영화는 아인의 흔들림을 성장을 위한 통과 의례나 극복해야 할 결핍으로 규정하지 않는다. 오히려 나아가려다 멈추고 붙잡으려다 놓치는 그 불완전한 움직임이야말로 인간이 지닌 가장 날 것의 상태라고 믿는다. 바람에 흔들린 느티나무 가지가 뺨을 훑고 지나갈 때, 우리는 다정한 위로가 아닌 서늘하고도 명확한 ‘살아있음’의 감각을 마주하게 된다." },
      en: { title: "When the Zelkova sways", kind: "Dancefilm", role: "D.I",
        summary: "This film does not define Ain's unsteadiness as a rite of passage toward growth, or as a lack to be overcome. Instead, it believes that those imperfect movements, stopping just as one tries to move forward and losing what one reaches to hold, are the rawest state a human being can be in. When a zelkova branch swaying in the wind brushes across a cheek, what we meet is not a tender comfort but a cool, unmistakable sense of being alive." }
    },
    {
      id: "02", cat: "mv", youtube: "t8wWx2-SJWQ", preview: "assets/02-preview-v2.mp4", year: 2025, runtime: "03:40", layout: "",
      image: "assets/02-thumb.webp", before: "", frames: stills("02", 11),
      palette: ["#747474", "#a22929", "#a46327", "#121747"],
      credits: cr([["작곡 · 작사", "JJ", 0], ["감독", "김승희", 0], ["D.I", me, 1]],
                  [["Music & Lyrics", "JJ", 0], ["Director", "Kim Seunghee", 0], ["D.I", meEn, 1]]),
      ko: { title: "광기", kind: "MV", role: "D.I",
        summary: "음악을 포기한 채 평범한 일상을 살아가던 한 남자.\n우연히 들어선 타로 천막에서 마주한 것은 잊고 지냈던 과거의 꿈과 채워지지 않은 욕망이었다.\n과거로 돌아갈 수 있다면, 그는 과연 어떤 선택을 할 것인가?" },
      en: { title: "Madness", kind: "MV", role: "D.I",
        summary: "A man who gave up music and lives an ordinary life.\nWhat he meets in a tarot tent he happens to step into is the dream he once forgot and the desire that was never filled.\nIf he could go back to the past, what choice would he make?" }
    },
    {
      id: "03", cat: "dancefilm", youtube: "", preview: "", year: 2024, runtime: "24:15", layout: "offset",
      image: "assets/03-thumb.webp", before: "", frames: stills("03", 5),
      palette: ["#2f3941", "#78838c", "#a1acb4", "#c9d3db", "#f3f8fc"],
      credits: cr([["감독", "감독 이름", 0], ["D.I", me, 1]],
                  [["Director", "Director name", 0], ["D.I", meEn, 1]]),
      ko: { title: "안개 주의보", kind: "Dancefilm", role: "D.I",
        summary: "안개가 잦은 항구 마을의 한 해를 담은 다큐멘터리. 채도를 낮춘 차분한 색으로, 흐린 날에도 화면마다 결이 다르게 보이도록 정리했습니다." },
      en: { title: "Fog Advisory", kind: "Dancefilm", role: "D.I",
        summary: "A year in a harbor town where fog is routine. A quiet, low-saturation grade keeps every overcast shot distinct from the next." }
    },
    {
      id: "04", cat: "mv", youtube: "", preview: "", year: 2025, runtime: "04:10", layout: "wide",
      image: "assets/04-thumb.webp", before: "", frames: stills("04", 5),
      palette: ["#0e1525", "#1f354b", "#578593", "#7fbdc7", "#c5faf6"],
      credits: cr([["감독", "감독 이름", 0], ["D.I", me, 1]],
                  [["Director", "Director name", 0], ["D.I", meEn, 1]]),
      ko: { title: "여름의 끝", kind: "MV", role: "D.I",
        summary: "여름이 끝나는 바닷가를 따라가는 뮤직비디오. 차가운 청록의 그림자와 밝게 뜬 하늘로 계절이 넘어가는 순간을 표현했습니다." },
      en: { title: "End of Summer", kind: "MV", role: "D.I",
        summary: "A music video that follows the shore as summer ends. Cool teal shadows and a lifted sky mark the moment the season turns." }
    },
    {
      id: "05", cat: "dancefilm", youtube: "", preview: "", year: 2025, runtime: "00:45", layout: "offset",
      image: "assets/05-thumb.webp", before: "", frames: stills("05", 5),
      palette: ["#0f060c", "#180812", "#280d15", "#521d1f", "#ac4954"],
      credits: cr([["클라이언트", "브랜드 이름", 0], ["D.I", me, 1]],
                  [["Client", "Brand name", 0], ["D.I", meEn, 1]]),
      ko: { title: "골목의 빛", kind: "Dancefilm", role: "D.I",
        summary: "저녁 골목의 간판과 조명을 따뜻한 주황과 붉은 계열로 모은 45초짜리 광고. 원본의 들쭉날쭉한 색온도를 하나로 맞췄습니다." },
      en: { title: "Alley Light", kind: "Dancefilm", role: "D.I",
        summary: "A 45-second spot that gathers evening signs and lamps into warm orange and red. The uneven color temperatures of the original footage are matched into one." }
    },
    {
      id: "06", cat: "dancefilm", youtube: "", preview: "", year: 2024, runtime: "18:20", layout: "",
      image: "assets/06-thumb.webp", before: "", frames: stills("06", 5),
      palette: ["#243344", "#627893", "#879fbd", "#a9c4e5", "#d0e8fe"],
      credits: cr([["감독", "감독 이름", 0], ["D.I", me, 1]],
                  [["Director", "Director name", 0], ["D.I", meEn, 1]]),
      ko: { title: "첫눈", kind: "Dancefilm", role: "D.I",
        summary: "첫눈이 오는 하루를 따라가는 단편. 말수가 적은 장면에서 침묵의 길이를 조절하는 데 집중한 편집 작업입니다." },
      en: { title: "First Snow", kind: "Dancefilm", role: "D.I",
        summary: "A short film about the day of the first snowfall. An edit focused on the length of silence in a film that says very little." }
    },
    {
      id: "07", cat: "mv", youtube: "", preview: "", year: 2024, runtime: "31:05", layout: "wide",
      image: "assets/07-thumb.webp", before: "", frames: stills("07", 6),
      palette: ["#221512", "#392a26", "#3e3e39", "#495c5c", "#65b5cb"],
      credits: cr([["감독", "감독 이름", 0], ["D.I", me, 1]],
                  [["Director", "Director name", 0], ["D.I", meEn, 1]]),
      ko: { title: "바다 위의 집", kind: "MV", role: "D.I",
        summary: "바다 위에 집을 짓고 사는 사람들의 일 년. 긴 호흡의 인터뷰를 편집하고, 물빛과 낡은 목재의 색을 서로 어긋나지 않게 맞췄습니다." },
      en: { title: "House on the Water", kind: "MV", role: "D.I",
        summary: "A year with people who live in houses built over the sea. Long interviews are cut for breath, and the water and weathered wood are graded to sit together." }
    }
  ];
})();
