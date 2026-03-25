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

export default function TrendsPage() {
  const trends = getAllTrends();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-widest text-accent">
        Wellness Trends
      </p>
      <h1 className="mt-2 text-3xl font-bold md:text-4xl">글로벌 웰니스 트렌드</h1>
      <p className="mt-3 text-muted">
        매일 AI가 큐레이션하는 전 세계 웰니스, 영양제, 디지털 헬스 인사이트
      </p>

      {trends.length > 0 ? (
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {trends.map((trend) => (
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
              <h3 className="mt-3 text-lg font-semibold leading-snug">{trend.title}</h3>
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
        <div className="mt-12 rounded-2xl border border-dashed border-border p-16 text-center">
          <p className="text-4xl">🌿</p>
          <p className="mt-4 text-lg font-semibold">
            트렌드 브리핑 준비 중입니다
          </p>
          <p className="mt-2 text-sm text-muted">
            매일 오전 8시에 새로운 글로벌 웰니스 트렌드가 업데이트됩니다.
          </p>
        </div>
      )}
    </div>
  );
}
