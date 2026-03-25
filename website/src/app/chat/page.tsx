"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const INITIAL_MESSAGE: Message = {
  role: "assistant",
  content:
    "안녕하세요! NUVA AI 영양 상담사입니다.\n\n현재 컨디션이나 건강 고민을 말씀해 주시면, 부족할 수 있는 영양소와 맞춤 영양제를 추천해 드릴게요.\n\n편하게 말씀해 주세요!",
};

function formatContent(text: string) {
  return text.split("\n").map((line, i) => {
    const formatted = line.replace(
      /\*\*(.*?)\*\*/g,
      '<strong class="font-semibold">$1</strong>'
    );
    return (
      <span key={i}>
        {i > 0 && <br />}
        <span dangerouslySetInnerHTML={{ __html: formatted }} />
      </span>
    );
  });
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage() {
    const content = input.trim();
    if (!content || isLoading) return;

    const userMessage: Message = { role: "user", content };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages
            .filter((m) => m !== INITIAL_MESSAGE)
            .map((m) => ({
              role: m.role === "assistant" ? "model" : "user",
              content: m.content,
            })),
        }),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.message },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "죄송합니다. 일시적인 오류가 발생했습니다. 다시 시도해 주세요.",
        },
      ]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div className="mx-auto flex h-[calc(100vh-65px)] max-w-3xl flex-col px-4">
      {/* Chat header */}
      <div className="shrink-0 border-b border-border py-4 text-center">
        <h1 className="text-lg font-bold">
          <span className="gradient-text">NUVA</span> AI 영양 상담
        </h1>
        <p className="mt-1 text-xs text-muted">
          컨디션을 알려주시면 맞춤 영양소를 추천해 드려요
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto py-6 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-accent text-white rounded-br-sm"
                  : "bg-card-bg border border-border text-foreground rounded-bl-sm"
              }`}
            >
              {formatContent(msg.content)}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="rounded-2xl rounded-bl-sm border border-border bg-card-bg px-4 py-3">
              <div className="flex gap-1.5">
                <span className="h-2 w-2 animate-bounce rounded-full bg-accent/40" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-accent/40 [animation-delay:0.15s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-accent/40 [animation-delay:0.3s]" />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="shrink-0 border-t border-border py-4">
        <div className="flex items-end gap-2 rounded-2xl border border-border bg-card-bg p-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="증상이나 컨디션을 입력하세요..."
            rows={1}
            className="flex-1 resize-none bg-transparent px-2 py-1.5 text-sm outline-none placeholder:text-muted/60"
          />
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || isLoading}
            className="shrink-0 rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-light disabled:opacity-40 disabled:cursor-not-allowed"
          >
            전송
          </button>
        </div>
        <p className="mt-2 text-center text-[10px] text-muted/60">
          AI 상담은 참고용이며, 정확한 진단은 의료 전문가와 상담하세요.
        </p>
      </div>
    </div>
  );
}
