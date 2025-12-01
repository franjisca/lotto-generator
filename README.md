# 🎰 로또 번호 생성기

재미로 즐기는 로또 번호 생성기입니다. React + TypeScript + Tailwind CSS로 만들어졌습니다.

## ✨ 기능

- 🎲 중복되지 않는 로또 번호 자동 생성 (1-45)
- 📝 최대 5줄까지 번호 생성 가능
- 🖼️ 실제 로또 용지 형태로 이미지 저장
- 🎨 아름다운 UI/UX 디자인
- 📱 반응형 디자인 (모바일 지원)

## 🚀 시작하기

### 필수 요구사항

- Node.js 18.0.0 이상
- npm 또는 yarn

### 설치 및 실행

```bash
# 저장소 클론
git clone https://github.com/your-username/lotto-generator.git
cd lotto-generator

# 의존성 설치
npm install

# 개발 서버 실행 (둘 다 가능)
npm start
# 또는
npm run dev

# 프로덕션 빌드
npm run build
```

## 📦 GitHub Pages 배포

1. 저장소 설정에서 GitHub Pages 활성화
2. Source를 "GitHub Actions"로 설정
3. main 브랜치에 푸시하면 자동으로 배포됩니다

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

배포된 사이트는 `https://your-username.github.io/lotto-generator/` 에서 확인할 수 있습니다.

## 🛠️ 기술 스택

- **React** - UI 라이브러리
- **TypeScript** - 타입 안정성
- **Tailwind CSS** - 스타일링
- **Vite** - 빌드 도구
- **html2canvas** - 이미지 변환
- **Lucide React** - 아이콘

## 📝 프로젝트 구조

```
lotto-generator/
├── src/
│   ├── components/
│   │   └── LottoGenerator.tsx    # 메인 컴포넌트
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

## 🎯 사용 방법

1. "번호 생성" 버튼을 클릭하여 로또 번호를 생성합니다
2. 최대 5개까지 생성할 수 있습니다
3. "이미지로 저장" 버튼을 클릭하여 PNG 파일로 다운로드합니다
4. 개별 번호 세트는 휴지통 아이콘으로 삭제할 수 있습니다
5. "전체 삭제" 버튼으로 모든 번호를 초기화할 수 있습니다

## ⚠️ 주의사항

이 프로그램은 재미로만 사용하세요. 실제 로또 당첨을 보장하지 않습니다.

## 📄 라이선스

MIT License

---

Made with ❤️ for fun
