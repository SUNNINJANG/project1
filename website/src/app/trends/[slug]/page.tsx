import Link from "next/link";
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
  "Market Insight": "bg-blue-100 text-blue-700",
  Supplement: "bg-emerald-100 text-emerald-700",
  "AI & Digital Health": "bg-purple-100 text-purple-700",
  "Consumer Trend": "bg-amber-100 text-amber-700",
  Regulatory: "bg-red-100 text-red-700",
  General: "bg-gray-100 text-gray-700",
};

export default async function TrendArticle({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const trend = await getTrendBySlug(slug);

  if (!trend) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <Link
        href="/trends"
        className="text-sm text-accent hover:text-accent-light transition-colors"
      >
        &larr; 트렌드 목록으로
      </Link>

      <div className="mt-6 flex items-center gap-3">
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            categoryColors[trend.category] || categoryColors.General
          }`}
        >
          {trend.category}
        </span>
        <span className="text-sm text-muted">{formatDate(trend.date)}</span>
      </div>

      <h1 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">
        {trend.title}
      </h1>
      <p className="mt-4 text-lg text-muted">{trend.summary}</p>

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

      <hr className="my-8 border-border" />

      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: trend.content }}
      />
    </article>
  );
}
