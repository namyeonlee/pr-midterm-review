# PR Playbook — GitHub Pages edition

46-question classroom midterm review game for Intro to PR. No install, build, API key, or server is required.

## GitHub에 올리기 (컴퓨터에서)

1. ZIP 압축을 풉니다.
2. https://github.com/new 에서 저장소 이름을 pr-midterm-review 로 입력합니다. Public과 Add README를 선택하고 Create repository를 누릅니다.
3. Add file → Upload files를 누릅니다. 압축을 푼 폴더 안의 파일들을 선택해 업로드합니다. ZIP 자체나 상위 폴더를 업로드하지 않습니다. index.html이 저장소 첫 화면에 보여야 합니다.
4. Commit directly to the main branch를 선택하고 Commit changes로 저장합니다.
5. Settings → Pages → Source: Deploy from a branch → Branch: main → /(root) → Save.
6. 배포가 완료되면 Pages에 표시되는 Visit site를 누릅니다. 계정 이름이 namyeonlee이면 기본 주소는 https://namyeonlee.github.io/pr-midterm-review/ 입니다. 아직 배포된 주소가 아닙니다.

## Offline classroom backup

Keep all five app files together. Open index.html in a current desktop browser to run the game without an internet connection. Local-file progress persistence depends on the browser; keep the tab open during class.

## Classroom use and privacy

Use one instructor screen, 2–6 teams, and oral or written responses. Lecture cases adds 15 cases to the original board, warm-ups, and final. Instructor review contains all answers; it is not password protected. Publishing this package makes the questions and answers public. Source lecture PDFs and slides are not included.

Scores are saved in the current browser for the current site address. They do not automatically transfer from the original site to GitHub Pages, between browsers, or between devices. The GitHub copy and original site are independent; later edits need to be uploaded to each copy.

## Files

- index.html: entry page
- styles.css: appearance
- questions.js: original 31 questions
- lecture-cases.js: 15 lecture cases and source references
- app.js: game and scoring logic

## Official instructions

https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository
