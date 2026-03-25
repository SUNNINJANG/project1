import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllTrends, getTrendBySlug } from "@/lib/content";

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });
}

export async function generateStaticParams() {
  const trends = getAllTrends();
  return trends.map((trend) => ({ slug: trend.slug }));
}

const categoryColors: Record<string, string> = {
  Supplement: "bg-emerald-100 text-emerald-700",
  "Exercise & Fitness": "bg-orange-100 text-orange-700",
  "Diet & Nutrition": "bg-lime-100 text-lime-700",
  "Mental Health": "bg-violet-100 text-violet-700",
  "Gut Health": "bg-pink-100 text-pink-700",
  Sleep: "bg-indigo-100 text-indigo-700",
  "Skin & Beauty": "bg-rose-100 text-rose-700",
  Longevity: "bg-cyan-100 text-cyan-700",
  "AI & Digital Health": "bg-purple-100 text-purple-700",
  "Market Insight": "bg-blue-100 text-blue-700",
  Regulatory: "bg-red-100 text-red-700",
  General: "bg-gray-100 text-gray-700",
};

const categoryIcons: Record<string, string> = {
  Supplement: "💊",
  "Exercise & Fitness": "🏋️",
  "Diet & Nutrition": "🥗",
  "Mental Health": "🧠",
  "Gut Health": "🦠",
  Sleep: "😴",
  "Skin & Beauty": "✨",
  Longevity: "🧬",
  "AI & Digital Health": "🤖",
  "Market Insight": "📊",
  Regulatory: "📜",
};

export default async function TrendArticle({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const trend = await getTrendBySlug(slug);

  if (!trend) notFound();

  const allTrends = getAllTrends();
  const currentIndex = allTrends.findIndex((t) => t.slug === slug);
  const prevTrend = currentIndex < allTrends.length - 1 ? allTrends[currentIndex + 1] : null;
  const nextTrend = currentIndex > 0 ? allTrends[currentIndex - 1] : null;

  return (
    <>
      {/* Hero with cover image */}
      {trend.image && (
        <div className="relative h-[400px] w-full overflow-hidden bg-gray-900">
          <Image
            src={trend.image}
            alt={trend.title}
            fill
            className="object-cover opacity-60"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 mx-auto max-w-3xl px-6 pb-10">
            <div className="flex items-center gap-3">
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  categoryColors[trend.category] || categoryColors.General
                }`}
              >
                {categoryIcons[trend.category] || ""} {trend.category}
              </span>
              <span className="text-sm text-white/70">
                {formatDate(trend.date)}
              </span>
            </div>
            <h1 className="mt-4 text-3xl font-bold leading-tight text-white md:text-4xl">
              {trend.title}
            </h1>
          </div>
        </div>
      )}

      <article className="mx-auto max-w-3xl px-6 py-10">
        {/* Back link */}
        <Link
          href="/trends"
          className="inline-flex items-center gap-1 text-sm text-accent hover:text-accent-light transition-colors"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="shrink-0"
          >
            <path
              d="M10 12L6 8L10 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          트렌드 목록으로
        </Link>

        {/* Title section (when no cover image) */}
        {!trend.image && (
          <div className="mt-8">
            <div className="flex items-center gap-3">
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  categoryColors[trend.category] || categoryColors.General
                }`}
              >
                {categoryIcons[trend.category] || ""} {trend.category}
              </span>
              <span className="text-sm text-muted">
                {formatDate(trend.date)}
              </span>
            </div>
            <h1 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">
              {trend.title}
            </h1>
          </div>
        )}

        {/* Summary box */}
        <div className="mt-8 rounded-2xl border-l-4 border-accent bg-accent-bg/40 p-6">
          <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">
            Summary
          </p>
          <p className="text-base leading-relaxed text-foreground/80">
            {trend.summary}
          </p>
        </div>

        {/* Tags */}
        {trend.tags.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {trend.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-accent-bg px-3 py-1 text-xs font-medium text-accent"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Article content */}
        <div
          className="article-content mt-10"
          dangerouslySetInnerHTML={{ __html: trend.content }}
        />

        {/* Disclaimer */}
        <div className="mt-12 rounded-xl bg-card-bg border border-border p-5 text-xs text-muted leading-relaxed">
          <strong className="text-foreground">Disclaimer</strong>: 이 콘텐츠는 정보 제공 목적으로 작성되었으며, 의료적 조언을 대체하지 않습니다.
          영양제 복용 전 반드시 의료 전문가와 상담하세요.
        </div>

        {/* Navigation */}
        <nav className="mt-12 grid gap-4 md:grid-cols-2 border-t border-border pt-8">
          {prevTrend ? (
            <Link
              href={`/trends/${prevTrend.slug}`}
              className="group rounded-xl border border-border p-5 hover:border-accent/40 transition-colors"
            >
              <p className="text-xs text-muted">이전 기사</p>
              <p className="mt-1 text-sm font-semibold group-hover:text-accent transition-colors line-clamp-2">
                {prevTrend.title}
              </p>
            </Link>
          ) : (
            <div />
          )}
          {nextTrend ? (
            <Link
              href={`/trends/${nextTrend.slug}`}
              className="group rounded-xl border border-border p-5 hover:border-accent/40 transition-colors text-right"
            >
              <p className="text-xs text-muted">다음 기사</p>
              <p className="mt-1 text-sm font-semibold group-hover:text-accent transition-colors line-clamp-2">
                {nextTrend.title}
              </p>
            </Link>
          ) : (
            <div />
          )}
        </nav>
      </article>
    </>
  );
}
