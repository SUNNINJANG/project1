import Link from "next/link";
import { getAllTrends } from "@/lib/content";

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const categoryColors: Record<string, string> = {
  "Market Insight": "bg-blue-100 text-blue-700",
  Supplement: "bg-emerald-100 text-emerald-700",
  "AI & Digital Health": "bg-purple-100 text-purple-700",
  "Consumer Trend": "bg-amber-100 text-amber-700",
  Regulatory: "bg-red-100 text-red-700",
  General: "bg-gray-100 text-gray-700",
};

export default function Home() {
  const trends = getAllTrends();
  const latestTrends = trends.slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-bg/60 via-background to-background" />
        <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">
              Global Wellness Intelligence
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              매일 아침, <br />
              <span className="gradient-text">세계의 웰니스 트렌드</span>를<br />
              만나보세요
            </h1>
            <p className="mt-6 text-lg text-muted leading-relaxed">
              글로벌 영양제 시장, AI 헬스케어, 소비자 트렌드까지. <br />
              NUVA가 매일 큐레이션하는 웰니스 인사이트로 건강한 내일을 준비하세요.
            </p>
            <div className="mt-8 flex gap-4">
              <Link
                href="/trends"
                className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-accent-light transition-colors"
              >
                트렌드 살펴보기
              </Link>
              <Link
                href="/about"
                className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground hover:bg-card-bg transition-colors"
              >
                NUVA 소개
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-card-bg">
        <div className="mx-auto grid max-w-6xl grid-cols-2 md:grid-cols-4 divide-x divide-border">
          {[
            { value: "Daily", label: "트렌드 업데이트" },
            { value: "6+", label: "글로벌 지역 커버" },
            { value: "50+", label: "모니터링 키워드" },
            { value: "AI", label: "큐레이션 기반" },
          ].map((stat) => (
            <div key={stat.label} className="px-6 py-8 text-center">
              <p className="text-2xl font-bold gradient-text">{stat.value}</p>
              <p className="mt-1 text-sm text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Trends */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">
              Latest Trends
            </p>
            <h2 className="mt-2 text-3xl font-bold">최신 웰니스 트렌드</h2>
          </div>
          <Link
            href="/trends"
            className="text-sm font-medium text-accent hover:text-accent-light transition-colors"
          >
            전체 보기 &rarr;
          </Link>
        </div>

        {latestTrends.length > 0 ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {latestTrends.map((trend) => (
              <Link
                key={trend.slug}
                href={`/trends/${trend.slug}`}
                className="card-hover rounded-2xl border border-border bg-card-bg p-6"
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      categoryColors[trend.category] || categoryColors.General
                    }`}
                  >
                    {trend.category}
                  </span>
                  <span className="text-xs text-muted">{formatDate(trend.date)}</span>
                </div>
                <h3 className="mt-3 text-lg font-semibold leading-snug">
                  {trend.title}
                </h3>
                <p className="mt-2 text-sm text-muted line-clamp-3">{trend.summary}</p>
                {trend.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {trend.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-background px-2 py-0.5 text-xs text-muted"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border border-dashed border-border p-16 text-center">
            <p className="text-4xl">🌿</p>
            <p className="mt-4 text-lg font-semibold">
              첫 번째 트렌드 브리핑이 곧 도착합니다
            </p>
            <p className="mt-2 text-sm text-muted">
              매일 오전 8시, AI가 큐레이션한 글로벌 웰니스 트렌드가 업데이트됩니다.
            </p>
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-accent to-accent-light">
        <div className="mx-auto max-w-6xl px-6 py-20 text-center text-white">
          <h2 className="text-3xl font-bold">당신만을 위한 영양, NUVA</h2>
          <p className="mt-4 text-white/80 max-w-lg mx-auto">
            건강검진 데이터와 AI 분석을 통해 나에게 딱 맞는 영양제를 추천받으세요.
            서비스 런칭 소식을 가장 먼저 받아보세요.
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <Link
              href="/chat"
              className="inline-block rounded-full bg-white px-8 py-3 text-sm font-semibold text-accent shadow-lg hover:shadow-xl transition-shadow"
            >
              AI 영양 상담 시작하기
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
