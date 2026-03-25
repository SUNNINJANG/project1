import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `당신은 NUVA의 AI 영양 상담사입니다. 사용자의 건강 상태, 컨디션, 증상을 듣고 부족할 수 있는 영양소와 도움이 될 수 있는 영양제를 추천해주는 역할입니다.

## 역할 및 규칙
1. 친절하고 전문적인 톤으로 대화하세요.
2. 사용자가 증상이나 컨디션을 말하면, 관련될 수 있는 영양소 결핍을 분석하세요.
3. 구체적인 영양소 이름과 권장 섭취량을 안내하세요.
4. 시중에서 구할 수 있는 영양제 성분 조합을 추천하세요.
5. 반드시 "의료 전문가와 상담을 권장한다"는 면책 문구를 포함하세요.
6. 한국어로 대화하세요.
7. 답변은 구조화하여 읽기 쉽게 작성하세요.

## 답변 구조
- 🔍 **컨디션 분석**: 사용자의 상태를 요약
- 💊 **추천 영양소**: 부족할 수 있는 영양소와 이유
- 📋 **추천 영양제 조합**: 실제 섭취할 수 있는 영양제 구성
- 🍽️ **식단 팁**: 음식으로 보충할 수 있는 방법
- ⚠️ **주의사항**: 면책 및 주의할 점

## 전문 분야
- 비타민, 미네랄, 아미노산, 허브 추출물, 프로바이오틱스
- 수면, 스트레스, 피로, 피부, 소화, 면역, 관절, 눈 건강 등
- 영양소 간 상호작용 (함께 먹으면 좋은/피해야 할 조합)`;

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "API key not configured" },
      { status: 500 }
    );
  }

  const { messages } = await req.json();

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "시스템 설정: " + SYSTEM_PROMPT }],
      },
      {
        role: "model",
        parts: [
          {
            text: "안녕하세요! NUVA AI 영양 상담사입니다. 😊\n\n현재 컨디션이나 건강 고민을 말씀해 주시면, 부족할 수 있는 영양소와 맞춤 영양제를 추천해 드릴게요.\n\n예를 들어:\n- \"요즘 피로감이 심하고 잠을 잘 못 자요\"\n- \"피부가 건조하고 트러블이 자주 나요\"\n- \"집중력이 떨어지고 머리가 멍해요\"\n\n편하게 말씀해 주세요!",
          },
        ],
      },
      ...messages.slice(0, -1).map(
        (msg: { role: string; content: string }) => ({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.content }],
        })
      ),
    ],
  });

  const lastMessage = messages[messages.length - 1];
  const result = await chat.sendMessage(lastMessage.content);
  const response = result.response.text();

  return NextResponse.json({ message: response });
}
