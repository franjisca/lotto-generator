import React, { useState, useRef } from "react";
import { Sparkles, Download, RefreshCw, Trash2 } from "lucide-react";

interface LottoNumber {
  id: string;
  numbers: number[];
  createdAt: Date;
}

const LottoGenerator: React.FC = () => {
  const [lottoSets, setLottoSets] = useState<LottoNumber[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const lottoTicketRef = useRef<HTMLDivElement>(null);

  const generateLottoNumbers = (): number[] => {
    const numbers = new Set<number>();
    while (numbers.size < 6) {
      numbers.add(Math.floor(Math.random() * 45) + 1);
    }
    return Array.from(numbers).sort((a, b) => a - b);
  };

  const addLottoSet = () => {
    if (lottoSets.length >= 5) {
      alert("최대 5개까지만 생성할 수 있습니다!");
      return;
    }

    setIsGenerating(true);
    setTimeout(() => {
      const newLotto: LottoNumber = {
        id: `lotto-${Date.now()}`,
        numbers: generateLottoNumbers(),
        createdAt: new Date(),
      };
      setLottoSets([...lottoSets, newLotto]);
      setIsGenerating(false);
    }, 500);
  };

  const removeLottoSet = (id: string) => {
    setLottoSets(lottoSets.filter((set) => set.id !== id));
  };

  const clearAll = () => {
    setLottoSets([]);
  };

  const downloadAsImage = async () => {
    if (lottoSets.length === 0) return;

    try {
      // Canvas 생성
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Canvas 크기 설정 (높이를 늘림)
      const scale = 2; // 고해상도를 위한 스케일
      canvas.width = 600 * scale;
      canvas.height = (300 + lottoSets.length * 80) * scale; // 200 -> 300으로 증가
      ctx.scale(scale, scale);

      // 배경
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, 600, 300 + lottoSets.length * 80); // 높이 조정

      // 테두리
      ctx.strokeStyle = "#d1d5db";
      ctx.lineWidth = 2;
      ctx.setLineDash([10, 5]);
      ctx.strokeRect(20, 20, 560, 260 + lottoSets.length * 80); // 높이 조정
      ctx.setLineDash([]);

      // 제목
      ctx.font = 'bold 36px "Black Han Sans", sans-serif';
      ctx.fillStyle = "#1f2937";
      ctx.textAlign = "center";
      ctx.fillText("LOTTO 6/45", 300, 70);

      // 날짜
      ctx.font = '16px "Noto Sans KR", sans-serif';
      ctx.fillStyle = "#6b7280";
      ctx.fillText(
        new Date().toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        300,
        100
      );

      // 로또 번호들 (동일한 코드)
      lottoSets.forEach((set, index) => {
        const y = 140 + index * 70;

        // 배경 박스
        ctx.fillStyle = "#f9fafb";
        ctx.fillRect(40, y - 30, 520, 60);
        ctx.strokeStyle = "#e5e7eb";
        ctx.lineWidth = 1;
        ctx.strokeRect(40, y - 30, 520, 60);

        // 알파벳 원
        const gradient = ctx.createLinearGradient(60, y - 20, 60, y + 20);
        gradient.addColorStop(0, "#a855f7");
        gradient.addColorStop(1, "#ec4899");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(80, y, 20, 0, Math.PI * 2);
        ctx.fill();

        // 알파벳 텍스트
        ctx.font = 'bold 16px "Noto Sans KR", sans-serif';
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(String.fromCharCode(65 + index), 80, y);

        // 숫자들
        set.numbers.forEach((num, numIndex) => {
          const x = 150 + numIndex * 60;

          // 숫자 원 색상 결정
          let color = "";
          if (num <= 10) color = "#facc15"; // 노랑
          else if (num <= 20) color = "#60a5fa"; // 파랑
          else if (num <= 30) color = "#f87171"; // 빨강
          else if (num <= 40) color = "#4b5563"; // 회색
          else color = "#4ade80"; // 초록

          // 숫자 원 그리기
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(x, y, 24, 0, Math.PI * 2);
          ctx.fill();

          // 그림자 효과
          ctx.shadowColor = "rgba(0, 0, 0, 0.1)";
          ctx.shadowBlur = 4;
          ctx.shadowOffsetY = 2;
          ctx.fill();
          ctx.shadowColor = "transparent";

          // 숫자 텍스트
          ctx.font = 'bold 18px "Noto Sans KR", sans-serif';
          ctx.fillStyle = num > 30 && num <= 40 ? "#ffffff" : "#000000";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(num.toString(), x, y);
        });
      });

      // 하단 정보 (여유 공간을 더 줌)
      const bottomY = 120 + lottoSets.length * 70; // 140 -> 120으로 조정

      // 구분선
      ctx.strokeStyle = "#e5e7eb";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(40, bottomY + 20);
      ctx.lineTo(560, bottomY + 20);
      ctx.stroke();

      // 발행 번호
      ctx.font = '14px "Noto Sans KR", sans-serif';
      ctx.fillStyle = "#6b7280";
      ctx.textAlign = "center";
      ctx.fillText("발행 번호", 300, bottomY + 50);

      ctx.font = "12px monospace";
      ctx.fillStyle = "#9ca3af";
      ctx.fillText(
        `#${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        300,
        bottomY + 70
      );

      // 안내 문구
      ctx.font = '12px "Noto Sans KR", sans-serif';
      ctx.fillStyle = "#9ca3af";
      ctx.fillText("⚡ 이 번호들은 재미로만 사용하세요!", 300, bottomY + 100);
      ctx.fillText("행운을 빕니다! 🍀", 300, bottomY + 120);

      ctx.font = '11px "Noto Sans KR", sans-serif';
      ctx.fillStyle = "#d1d5db";
      ctx.fillText(
        "© Lotto Generator - Made by J!yeon 2025.12",
        300,
        bottomY + 150
      );

      // 다운로드
      const link = document.createElement("a");
      link.download = `lotto-ticket-${
        new Date().toISOString().split("T")[0]
      }.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (error) {
      console.error("이미지 다운로드 실패:", error);
      alert("이미지 다운로드에 실패했습니다.");
    }
  };
  const getNumberColor = (num: number): string => {
    if (num <= 10) return "bg-yellow-400 text-yellow-900";
    if (num <= 20) return "bg-blue-400 text-blue-900";
    if (num <= 30) return "bg-red-400 text-red-900";
    if (num <= 40) return "bg-gray-600 text-gray-100";
    return "bg-green-400 text-green-900";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 p-2 sm:p-4 relative overflow-hidden">
      {/* 배경 장식 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-60 sm:w-80 h-60 sm:h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -right-40 w-60 sm:w-80 h-60 sm:h-80 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 sm:w-80 h-60 sm:h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-4 sm:mb-8">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2 animate-pulse">
            🎰 로또 번호 생성기 🎰
          </h1>
          <p className="text-sm sm:text-lg text-gray-600">행운을 잡아보세요!</p>
        </div>

        {/* 컨트롤 버튼 */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-4 sm:mb-8 px-2">
          <button
            onClick={addLottoSet}
            disabled={lottoSets.length >= 5 || isGenerating}
            className={`
      px-4 sm:px-6 py-3 rounded-full font-bold text-white transition-all duration-300 transform
      ${
        lottoSets.length >= 5 || isGenerating
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 hover:scale-105 shadow-lg hover:shadow-xl"
      }
      flex items-center justify-center gap-2 w-full sm:w-auto
    `}
          >
            {isGenerating ? (
              <RefreshCw className="w-5 h-5 animate-spin" />
            ) : (
              <Sparkles className="w-5 h-5" />
            )}
            번호 생성 ({lottoSets.length}/5)
          </button>

          {lottoSets.length > 0 && (
            <>
              <button
                onClick={downloadAsImage}
                className="px-4 sm:px-6 py-3 rounded-full font-bold text-white bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <Download className="w-5 h-5" />
                이미지로 저장
              </button>

              <button
                onClick={clearAll}
                className="px-6 py-3 rounded-full font-bold text-white bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                <Trash2 className="w-5 h-5" />
                전체 삭제
              </button>
            </>
          )}
        </div>

        {/* 로또 티켓 */}
        <div
          ref={lottoTicketRef}
          className="bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl p-4 sm:p-8 mx-2 sm:mx-auto max-w-2xl"
          style={{ minHeight: "300px" }}
        >
          <div className="border-2 sm:border-4 border-dashed border-gray-300 rounded-xl sm:rounded-2xl p-3 sm:p-6">
            <div className="text-center mb-4 sm:mb-6">
              <h2 className="text-2xl sm:text-3xl font-black text-gray-800 mb-2">
                LOTTO 6/45
              </h2>
              <p className="text-xs sm:text-sm text-gray-500">
                {new Date().toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            {lottoSets.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">번호를 생성해주세요! 🎲</p>
              </div>
            ) : (
              <div className="space-y-3">
                {lottoSets.map((set, index) => (
                  <div key={set.id} className="relative group">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg sm:rounded-xl border border-gray-200 transition-all duration-300 hover:shadow-md">
                      <div className="flex items-center gap-1 sm:gap-4 w-full">
                        <div
                          className="w-7 h-7 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full text-white font-bold shadow-md flex-shrink-0"
                          style={{
                            display: "table",
                            position: "relative",
                            textAlign: "center",
                          }}
                        >
                          <span
                            style={{
                              display: "table-cell",
                              verticalAlign: "middle",
                              lineHeight: "28px",
                              textAlign: "center",
                              fontSize: "12px",
                            }}
                            className="sm:text-base sm:leading-10"
                          >
                            {String.fromCharCode(65 + index)}
                          </span>
                        </div>
                        <div className="flex gap-1 sm:gap-2">
                          {set.numbers.map((num) => (
                            <div
                              key={num}
                              className={`
          w-7 h-7 sm:w-12 sm:h-12 rounded-full font-bold text-xs sm:text-lg
          shadow-md transform transition-all duration-300 hover:scale-110 hover:rotate-3
          ${getNumberColor(num)} flex-shrink-0
        `}
                              style={{
                                display: "table",
                                position: "relative",
                                textAlign: "center",
                              }}
                            >
                              <span
                                style={{
                                  display: "table-cell",
                                  verticalAlign: "middle",
                                  lineHeight: "28px",
                                  textAlign: "center",
                                  fontSize: "12px",
                                }}
                                className="sm:text-lg sm:leading-[48px]"
                              >
                                {num}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={() => removeLottoSet(set.id)}
                        className="mt-2 sm:mt-0 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-2 text-red-500 hover:bg-red-50 rounded-lg self-end sm:self-auto"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {lottoSets.length > 0 && (
              <div className="mt-8 pt-6 border-t-2 border-gray-200">
                <div className="flex justify-center items-center">
                  <div className="text-center">
                    <p className="text-sm text-gray-500">발행 번호</p>
                    <p className="font-mono text-xs text-gray-400">
                      #{Math.random().toString(36).substr(2, 9).toUpperCase()}
                    </p>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-400">
                    ⚡ 이 번호들은 재미로만 사용하세요!
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    행운을 빕니다! 🍀
                  </p>
                  <p className="text-xs text-gray-300 mt-2">
                    © 2025 Lotto Generator - Made By J!yeon
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 하단 안내 - 티켓 외부 */}
        {lottoSets.length === 0 && (
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>⚡ 이 번호들은 재미로만 사용하세요!</p>
            <p className="mt-1">행운을 빕니다! 🍀</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LottoGenerator;
