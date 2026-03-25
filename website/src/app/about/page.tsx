export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-widest text-accent">
        About NUVA
      </p>
      <h1 className="mt-2 text-3xl font-bold md:text-4xl">
        당신의 건강에 꼭 맞는 영양을
      </h1>

      <div className="mt-10 space-y-8 text-muted leading-relaxed">
        <p>
          <strong className="text-foreground">NUVA</strong>는 AI 기술과 건강 데이터를
          결합하여, 개인의 컨디션과 건강검진 결과에 기반한 맞춤형 영양제를 추천하는
          웰니스 플랫폼입니다.
        </p>

        <div className="rounded-2xl border border-border bg-card-bg p-8">
          <h2 className="text-xl font-bold text-foreground">우리가 해결하는 문제</h2>
          <ul className="mt-4 space-y-3">
            <li className="flex gap-3">
              <span className="text-accent font-bold">01</span>
              <span>
                수천 가지 영양제 중 나에게 맞는 것을 찾기 어려운 소비자의 고민
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent font-bold">02</span>
              <span>
                건강검진 결과를 받아도 구체적으로 무엇을 보충해야 할지 모르는 막막함
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent font-bold">03</span>
              <span>
                광고와 마케팅에 휘둘리지 않는, 근거 기반의 영양 정보 부재
              </span>
            </li>
          </ul>
        </div>

        <div className="rounded-2xl border border-border bg-card-bg p-8">
          <h2 className="text-xl font-bold text-foreground">NUVA의 접근 방식</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div className="text-center">
              <p className="text-3xl">🔬</p>
              <p className="mt-2 font-semibold text-foreground">데이터 기반 분석</p>
              <p className="mt-1 text-sm">
                건강검진표, 혈액검사, 생활습관 데이터를 AI가 종합 분석
              </p>
            </div>
            <div className="text-center">
              <p className="text-3xl">🤖</p>
              <p className="mt-2 font-semibold text-foreground">AI 매칭</p>
              <p className="mt-1 text-sm">
                부족한 영양소를 파악하고 시중 최적의 영양제를 추천
              </p>
            </div>
            <div className="text-center">
              <p className="text-3xl">🌍</p>
              <p className="mt-2 font-semibold text-foreground">글로벌 인사이트</p>
              <p className="mt-1 text-sm">
                전 세계 웰니스 트렌드를 매일 모니터링하여 최신 정보 제공
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-accent to-accent-light p-8 text-white">
          <h2 className="text-xl font-bold">로드맵</h2>
          <div className="mt-6 space-y-4">
            <div className="flex gap-4">
              <span className="shrink-0 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
                Phase 1
              </span>
              <div>
                <p className="font-semibold">웰니스 매거진 & 커뮤니티</p>
                <p className="text-sm text-white/80">
                  인스타그램 매거진을 통한 웰니스 커뮤니티 형성 및 글로벌 트렌드 공유
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="shrink-0 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
                Phase 2
              </span>
              <div>
                <p className="font-semibold">뉴스레터 & 데이터 수집</p>
                <p className="text-sm text-white/80">
                  구독자 확보, 사용자 건강 관심사 데이터 수집 및 분석
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="shrink-0 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
                Phase 3
              </span>
              <div>
                <p className="font-semibold">AI 매칭 플랫폼 런칭</p>
                <p className="text-sm text-white/80">
                  건강검진표 기반 맞춤 영양제 추천 및 구매 연동 서비스 출시
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
