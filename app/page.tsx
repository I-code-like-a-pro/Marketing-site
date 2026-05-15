import { useState, useEffect, useRef } from "react";

const PALETTE = {
  obsidian: "#0A0A0F",
  ink: "#12121A",
  surface: "#1A1A28",
  surfaceLight: "#22223A",
  accent: "#6C63FF",
  accentGlow: "#8A84FF",
  accentMuted: "#2D2B5E",
  gold: "#F5C842",
  goldMuted: "#3A3010",
  text: "#F0EFF8",
  textMuted: "#8884A8",
  textDim: "#4A4870",
  border: "#2A2850",
  borderBright: "#3D3A72",
  teal: "#3ECFB8",
  tealMuted: "#0D3330",
  rose: "#FF5E7D",
  roseMuted: "#3A0F1A",
};

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const fn = () => setY(window.scrollY);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return y;
}

function Reveal({ children, delay = 0, dir = "up", style = {} }) {
  const [ref, inView] = useInView();
  const translate = dir === "up" ? "translateY(40px)" : dir === "left" ? "translateX(-40px)" : "translateX(40px)";
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "none" : translate,
      transition: `opacity 0.75s ease ${delay}s, transform 0.75s ease ${delay}s`,
      ...style
    }}>
      {children}
    </div>
  );
}

function Badge({ children, color = PALETTE.accent }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: "4px 14px", borderRadius: 100,
      border: `1px solid ${color}44`,
      background: `${color}18`,
      color: color,
      fontSize: 12, fontWeight: 600, letterSpacing: "0.06em",
      textTransform: "uppercase", fontFamily: "'DM Mono', monospace"
    }}>
      {children}
    </span>
  );
}

function PhoneMockup({ screen }) {
  return (
    <div style={{
      width: 230, height: 480,
      background: PALETTE.ink,
      borderRadius: 36,
      border: `2px solid ${PALETTE.borderBright}`,
      position: "relative",
      overflow: "hidden",
      boxShadow: `0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px ${PALETTE.border}, inset 0 1px 0 ${PALETTE.surfaceLight}`,
      flexShrink: 0
    }}>
      <div style={{
        position: "absolute", top: 14, left: "50%",
        transform: "translateX(-50%)",
        width: 60, height: 6, borderRadius: 3,
        background: PALETTE.border
      }} />
      <div style={{ paddingTop: 36, height: "100%", overflow: "hidden" }}>
        {screen}
      </div>
    </div>
  );
}

function AppScreen1() {
  return (
    <div style={{ padding: "0 16px", fontFamily: "inherit" }}>
      <p style={{ color: PALETTE.textMuted, fontSize: 11, marginBottom: 4 }}>Good morning</p>
      <p style={{ color: PALETTE.text, fontSize: 18, fontWeight: 700, marginBottom: 20 }}>Your day at a glance</p>
      {[
        { label: "Focus Time", val: "3h 24m", color: PALETTE.accent },
        { label: "Tasks Done", val: "12 / 18", color: PALETTE.teal },
        { label: "Streak", val: "🔥 14 days", color: PALETTE.gold },
      ].map(r => (
        <div key={r.label} style={{
          background: PALETTE.surface, borderRadius: 14,
          padding: "12px 16px", marginBottom: 10,
          border: `1px solid ${PALETTE.border}`,
          display: "flex", justifyContent: "space-between"
        }}>
          <span style={{ color: PALETTE.textMuted, fontSize: 12 }}>{r.label}</span>
          <span style={{ color: r.color, fontSize: 13, fontWeight: 700 }}>{r.val}</span>
        </div>
      ))}
      <div style={{
        background: `linear-gradient(135deg, ${PALETTE.accentMuted}, ${PALETTE.ink})`,
        borderRadius: 18, padding: 16, marginTop: 8,
        border: `1px solid ${PALETTE.accent}44`
      }}>
        <p style={{ color: PALETTE.textMuted, fontSize: 10, margin: 0 }}>NEXT UP</p>
        <p style={{ color: PALETTE.text, fontSize: 13, fontWeight: 600, margin: "4px 0 0" }}>Deep work block — 2pm</p>
      </div>
    </div>
  );
}

function AppScreen2() {
  return (
    <div style={{ padding: "0 16px" }}>
      <p style={{ color: PALETTE.textMuted, fontSize: 11 }}>INSIGHTS</p>
      <p style={{ color: PALETTE.text, fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Weekly Progress</p>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 80, marginBottom: 20 }}>
        {[0.4, 0.7, 0.5, 0.9, 0.65, 1.0, 0.8].map((h, i) => (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <div style={{
              width: "100%", height: h * 60,
              borderRadius: 6,
              background: i === 5 ? PALETTE.accent : `${PALETTE.accent}44`,
            }} />
            <span style={{ fontSize: 8, color: PALETTE.textDim }}>
              {["M","T","W","T","F","S","S"][i]}
            </span>
          </div>
        ))}
      </div>
      <div style={{ background: PALETTE.surface, borderRadius: 14, padding: 14, border: `1px solid ${PALETTE.border}` }}>
        <p style={{ color: PALETTE.teal, fontSize: 11, fontWeight: 700, margin: 0 }}>+23% vs last week</p>
        <p style={{ color: PALETTE.textMuted, fontSize: 10, margin: "2px 0 0" }}>Your most productive week yet</p>
      </div>
    </div>
  );
}

function AppScreen3() {
  return (
    <div style={{ padding: "0 16px" }}>
      <p style={{ color: PALETTE.textMuted, fontSize: 11 }}>GOALS</p>
      <p style={{ color: PALETTE.text, fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Milestones</p>
      {[
        { goal: "Launch MVP", pct: 88, color: PALETTE.accent },
        { goal: "10K users", pct: 42, color: PALETTE.teal },
        { goal: "Sleep 8h", pct: 71, color: PALETTE.gold },
      ].map(g => (
        <div key={g.goal} style={{ marginBottom: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ color: PALETTE.text, fontSize: 12 }}>{g.goal}</span>
            <span style={{ color: g.color, fontSize: 12, fontWeight: 700 }}>{g.pct}%</span>
          </div>
          <div style={{ height: 4, background: PALETTE.border, borderRadius: 2 }}>
            <div style={{ height: "100%", width: `${g.pct}%`, background: g.color, borderRadius: 2 }} />
          </div>
        </div>
      ))}
    </div>
  );
}

const NAV_LINKS = ["Features", "How It Works", "Pricing", "Testimonials"];

function Navbar({ scrollY }) {
  const solid = scrollY > 60;
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "0 max(32px, calc(50% - 640px))",
      height: 72,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: solid ? `${PALETTE.obsidian}E8` : "transparent",
      backdropFilter: solid ? "blur(20px)" : "none",
      borderBottom: solid ? `1px solid ${PALETTE.border}` : "none",
      transition: "all 0.4s ease",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 10,
          background: `linear-gradient(135deg, ${PALETTE.accent}, ${PALETTE.teal})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 16
        }}>⚡</div>
        <span style={{ color: PALETTE.text, fontWeight: 800, fontSize: 18, letterSpacing: "-0.02em", fontFamily: "'Clash Display', 'Plus Jakarta Sans', sans-serif" }}>Flowly</span>
      </div>
      <div style={{ display: "flex", gap: 36 }}>
        {NAV_LINKS.map(l => (
          <a key={l} href={`#${l.toLowerCase().replace(/ /g, "-")}`} style={{
            color: PALETTE.textMuted, fontSize: 13, textDecoration: "none",
            fontWeight: 500, letterSpacing: "0.01em",
            transition: "color 0.2s"
          }}
          onMouseEnter={e => e.target.style.color = PALETTE.text}
          onMouseLeave={e => e.target.style.color = PALETTE.textMuted}
          >{l}</a>
        ))}
      </div>
      <button style={{
        padding: "10px 24px", borderRadius: 100,
        background: PALETTE.accent, color: "#fff",
        border: "none", cursor: "pointer",
        fontSize: 13, fontWeight: 700, letterSpacing: "0.02em",
        boxShadow: `0 0 24px ${PALETTE.accent}55`,
        transition: "all 0.2s"
      }}
      onMouseEnter={e => { e.target.style.background = PALETTE.accentGlow; e.target.style.transform = "translateY(-1px)"; }}
      onMouseLeave={e => { e.target.style.background = PALETTE.accent; e.target.style.transform = "none"; }}
      >Get Early Access</button>
    </nav>
  );
}

function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [activeScreen, setActiveScreen] = useState(0);
  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => setActiveScreen(s => (s + 1) % 3), 3000);
    return () => clearInterval(id);
  }, []);

  const screens = [<AppScreen1 />, <AppScreen2 />, <AppScreen3 />];

  return (
    <section style={{
      minHeight: "100vh",
      background: PALETTE.obsidian,
      display: "flex", alignItems: "center",
      padding: "120px max(32px, calc(50% - 640px)) 80px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background orbs */}
      <div style={{
        position: "absolute", top: "10%", left: "5%",
        width: 500, height: 500, borderRadius: "50%",
        background: `radial-gradient(circle, ${PALETTE.accent}22 0%, transparent 70%)`,
        pointerEvents: "none"
      }} />
      <div style={{
        position: "absolute", bottom: "10%", right: "5%",
        width: 400, height: 400, borderRadius: "50%",
        background: `radial-gradient(circle, ${PALETTE.teal}18 0%, transparent 70%)`,
        pointerEvents: "none"
      }} />

      {/* Subtle grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `linear-gradient(${PALETTE.border}22 1px, transparent 1px), linear-gradient(90deg, ${PALETTE.border}22 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
        pointerEvents: "none"
      }} />

      <div style={{ display: "flex", alignItems: "center", gap: 80, width: "100%", position: "relative", zIndex: 1 }}>
        {/* Left copy */}
        <div style={{ flex: 1, maxWidth: 560 }}>
          <div style={{ marginBottom: 24, opacity: mounted ? 1 : 0, transition: "opacity 0.6s 0.1s" }}>
            <Badge color={PALETTE.teal}>🚀 Now in Beta — Join 12,000+ early users</Badge>
          </div>
          <h1 style={{
            fontFamily: "'Clash Display', 'Plus Jakarta Sans', sans-serif",
            fontSize: "clamp(44px, 5.5vw, 72px)",
            fontWeight: 800,
            color: PALETTE.text,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            margin: "0 0 24px",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "none" : "translateY(20px)",
            transition: "opacity 0.7s 0.2s, transform 0.7s 0.2s"
          }}>
            Build habits<br />
            <span style={{
              background: `linear-gradient(135deg, ${PALETTE.accent}, ${PALETTE.teal})`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
            }}>that actually</span>
            <br />stick.
          </h1>
          <p style={{
            color: PALETTE.textMuted, fontSize: 18, lineHeight: 1.7,
            marginBottom: 40, maxWidth: 460,
            opacity: mounted ? 1 : 0,
            transform: mounted ? "none" : "translateY(20px)",
            transition: "opacity 0.7s 0.35s, transform 0.7s 0.35s"
          }}>
            Flowly helps you design your ideal day, track momentum, and reach your goals — with AI-powered insights that actually understand how you work.
          </p>
          <div style={{
            display: "flex", gap: 16, flexWrap: "wrap",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "none" : "translateY(20px)",
            transition: "opacity 0.7s 0.5s, transform 0.7s 0.5s"
          }}>
            <button style={{
              padding: "16px 36px", borderRadius: 100,
              background: PALETTE.accent, color: "#fff",
              border: "none", cursor: "pointer",
              fontSize: 15, fontWeight: 700,
              boxShadow: `0 0 40px ${PALETTE.accent}55`,
              transition: "all 0.2s"
            }}
            onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = `0 0 60px ${PALETTE.accent}88`; }}
            onMouseLeave={e => { e.target.style.transform = "none"; e.target.style.boxShadow = `0 0 40px ${PALETTE.accent}55`; }}
            >Download Free →</button>
            <button style={{
              padding: "16px 36px", borderRadius: 100,
              background: "transparent", color: PALETTE.text,
              border: `1px solid ${PALETTE.borderBright}`,
              cursor: "pointer", fontSize: 15, fontWeight: 600,
              transition: "all 0.2s"
            }}
            onMouseEnter={e => { e.target.style.background = PALETTE.surfaceLight; e.target.style.borderColor = PALETTE.accent; }}
            onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.borderColor = PALETTE.borderBright; }}
            >▶ Watch Demo</button>
          </div>
          <div style={{
            display: "flex", gap: 32, marginTop: 48,
            opacity: mounted ? 1 : 0,
            transition: "opacity 0.7s 0.65s"
          }}>
            {[["50K+","Active users"],["4.9★","App Store rating"],["#1","Productivity app"]].map(([num, label]) => (
              <div key={label}>
                <p style={{ color: PALETTE.text, fontSize: 22, fontWeight: 800, margin: 0, letterSpacing: "-0.02em" }}>{num}</p>
                <p style={{ color: PALETTE.textMuted, fontSize: 12, margin: "2px 0 0" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Phone mockup */}
        <div style={{ position: "relative", flexShrink: 0, opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(30px)", transition: "opacity 0.9s 0.4s, transform 0.9s 0.4s" }}>
          <div style={{
            position: "absolute", inset: -40,
            background: `radial-gradient(circle, ${PALETTE.accent}30 0%, transparent 70%)`,
            pointerEvents: "none"
          }} />
          <PhoneMockup screen={screens[activeScreen]} />
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 16 }}>
            {[0,1,2].map(i => (
              <div key={i} onClick={() => setActiveScreen(i)} style={{
                width: i === activeScreen ? 20 : 6, height: 6,
                borderRadius: 3,
                background: i === activeScreen ? PALETTE.accent : PALETTE.textDim,
                cursor: "pointer", transition: "all 0.3s"
              }} />
            ))}
          </div>

          {/* Floating cards */}
          <div style={{
            position: "absolute", top: 60, right: -120,
            background: PALETTE.surface, borderRadius: 16,
            padding: "12px 16px", border: `1px solid ${PALETTE.border}`,
            boxShadow: `0 20px 40px rgba(0,0,0,0.4)`,
            minWidth: 160,
            animation: "float 3s ease-in-out infinite"
          }}>
            <p style={{ color: PALETTE.textMuted, fontSize: 10, margin: 0 }}>STREAK</p>
            <p style={{ color: PALETTE.gold, fontSize: 16, fontWeight: 700, margin: "2px 0 0" }}>🔥 14 days</p>
          </div>
          <div style={{
            position: "absolute", bottom: 100, left: -130,
            background: PALETTE.surface, borderRadius: 16,
            padding: "12px 16px", border: `1px solid ${PALETTE.tealMuted}`,
            boxShadow: `0 20px 40px rgba(0,0,0,0.4)`,
            minWidth: 150,
            animation: "float 3.5s ease-in-out infinite 0.5s"
          }}>
            <p style={{ color: PALETTE.textMuted, fontSize: 10, margin: 0 }}>THIS WEEK</p>
            <p style={{ color: PALETTE.teal, fontSize: 14, fontWeight: 700, margin: "2px 0 0" }}>+23% productivity</p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </section>
  );
}

function LogoStrip() {
  const logos = ["Notion","Figma","Linear","Slack","Stripe","Loom","Vercel","Raycast"];
  return (
    <div style={{
      background: PALETTE.ink,
      borderTop: `1px solid ${PALETTE.border}`,
      borderBottom: `1px solid ${PALETTE.border}`,
      padding: "28px 0",
      overflow: "hidden"
    }}>
      <p style={{ textAlign: "center", color: PALETTE.textDim, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20, fontFamily: "'DM Mono', monospace" }}>Trusted by teams at</p>
      <div style={{
        display: "flex", gap: 60, animation: "scroll 20s linear infinite",
        whiteSpace: "nowrap", width: "max-content"
      }}>
        {[...logos, ...logos].map((l, i) => (
          <span key={i} style={{ color: PALETTE.textDim, fontSize: 16, fontWeight: 700, letterSpacing: "-0.01em", fontFamily: "'Clash Display', sans-serif" }}>{l}</span>
        ))}
      </div>
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

const FEATURES = [
  {
    icon: "🧠",
    title: "AI-Powered Daily Planning",
    desc: "Flowly learns your peak hours, energy patterns, and work style — then builds you the perfect schedule automatically.",
    color: PALETTE.accent,
    screen: <AppScreen1 />,
    points: ["Smart time-blocking based on task type", "Learns your energy rhythms over time", "One-tap daily plan generation"]
  },
  {
    icon: "📊",
    title: "Deep Progress Analytics",
    desc: "See exactly where your time goes. Understand your streaks, identify bottlenecks, and celebrate wins with real data.",
    color: PALETTE.teal,
    screen: <AppScreen2 />,
    points: ["Visual productivity heatmaps", "Weekly & monthly trend analysis", "Goal completion forecasting"]
  },
  {
    icon: "🎯",
    title: "Goal Architecture",
    desc: "Break big ambitions into daily actions. Connect every task to a meaningful goal and watch the momentum build.",
    color: PALETTE.gold,
    screen: <AppScreen3 />,
    points: ["OKR-style goal frameworks", "Milestone tracking & celebration", "Habit stacking system"]
  },
];

function FeaturesSection() {
  const [active, setActive] = useState(0);
  return (
    <section id="features" style={{ background: PALETTE.obsidian, padding: "120px max(32px, calc(50% - 640px))" }}>
      <Reveal>
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <Badge color={PALETTE.accent}>Features</Badge>
          <h2 style={{
            fontFamily: "'Clash Display', 'Plus Jakarta Sans', sans-serif",
            fontSize: "clamp(36px, 4vw, 56px)",
            fontWeight: 800, color: PALETTE.text,
            letterSpacing: "-0.03em", lineHeight: 1.1,
            margin: "20px 0 16px"
          }}>Everything you need<br /><span style={{ color: PALETTE.textMuted }}>to do your best work</span></h2>
          <p style={{ color: PALETTE.textMuted, fontSize: 18, maxWidth: 480, margin: "0 auto" }}>Designed for how humans actually work — not how productivity gurus think we should.</p>
        </div>
      </Reveal>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
        <div>
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.1}>
              <div
                onClick={() => setActive(i)}
                style={{
                  padding: "28px 32px", borderRadius: 20, marginBottom: 16,
                  background: active === i ? PALETTE.surface : "transparent",
                  border: `1px solid ${active === i ? f.color + "55" : PALETTE.border}`,
                  cursor: "pointer", transition: "all 0.3s",
                  borderLeft: active === i ? `3px solid ${f.color}` : `1px solid ${PALETTE.border}`
                }}
                onMouseEnter={e => { if (active !== i) e.currentTarget.style.background = PALETTE.surface + "88"; }}
                onMouseLeave={e => { if (active !== i) e.currentTarget.style.background = "transparent"; }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: 20 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                    background: `${f.color}22`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 20
                  }}>{f.icon}</div>
                  <div>
                    <h3 style={{ color: PALETTE.text, fontSize: 18, fontWeight: 700, margin: "0 0 6px", letterSpacing: "-0.01em" }}>{f.title}</h3>
                    <p style={{ color: PALETTE.textMuted, fontSize: 14, lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
                    {active === i && (
                      <ul style={{ margin: "16px 0 0", padding: 0, listStyle: "none" }}>
                        {f.points.map(pt => (
                          <li key={pt} style={{ color: f.color, fontSize: 13, marginBottom: 6, display: "flex", alignItems: "center", gap: 8 }}>
                            <span>✓</span>
                            <span style={{ color: PALETTE.textMuted }}>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal dir="right">
          <div style={{ display: "flex", justifyContent: "center", position: "relative" }}>
            <div style={{
              position: "absolute", inset: -60,
              background: `radial-gradient(circle, ${FEATURES[active].color}25 0%, transparent 70%)`,
              pointerEvents: "none", transition: "all 0.5s"
            }} />
            <div style={{ transition: "transform 0.4s ease", transform: "scale(1.05)" }}>
              <PhoneMockup screen={FEATURES[active].screen} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const STEPS = [
  { n: "01", title: "Download & Set Up", desc: "Takes less than 2 minutes. Tell us your goals, your schedule, and your energy patterns.", icon: "📲" },
  { n: "02", title: "Design Your System", desc: "Flowly builds a personalized productivity architecture based on your unique work style.", icon: "🏗️" },
  { n: "03", title: "Execute with Clarity", desc: "Every day starts with a clear, focused plan. No decision fatigue. Just flow.", icon: "⚡" },
  { n: "04", title: "Watch Yourself Grow", desc: "Track momentum, celebrate streaks, and iterate with real insights — not guesswork.", icon: "📈" },
];

function HowItWorksSection() {
  return (
    <section id="how-it-works" style={{
      background: PALETTE.ink,
      padding: "120px max(32px, calc(50% - 640px))",
      borderTop: `1px solid ${PALETTE.border}`,
    }}>
      <Reveal>
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <Badge color={PALETTE.teal}>How It Works</Badge>
          <h2 style={{
            fontFamily: "'Clash Display', 'Plus Jakarta Sans', sans-serif",
            fontSize: "clamp(36px, 4vw, 56px)",
            fontWeight: 800, color: PALETTE.text,
            letterSpacing: "-0.03em", lineHeight: 1.1,
            margin: "20px 0 16px"
          }}>From chaos to<br /><span style={{
            background: `linear-gradient(135deg, ${PALETTE.teal}, ${PALETTE.accent})`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
          }}>clarity in 4 steps</span></h2>
        </div>
      </Reveal>
      <div style={{ position: "relative" }}>
        {/* Connector line */}
        <div style={{
          position: "absolute", top: 60, left: "50%", transform: "translateX(-50%)",
          width: 1, height: "calc(100% - 120px)",
          background: `linear-gradient(${PALETTE.accent}44, ${PALETTE.teal}44)`,
          zIndex: 0
        }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.12}>
              <div style={{
                display: "flex", gap: 40,
                flexDirection: i % 2 === 0 ? "row" : "row-reverse",
                alignItems: "center",
                position: "relative", zIndex: 1
              }}>
                <div style={{ flex: 1, textAlign: i % 2 === 0 ? "right" : "left" }}>
                  <span style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 11, color: PALETTE.accent,
                    letterSpacing: "0.1em", display: "block", marginBottom: 8
                  }}>{s.n}</span>
                  <h3 style={{ color: PALETTE.text, fontSize: 24, fontWeight: 700, margin: "0 0 12px", letterSpacing: "-0.02em" }}>{s.title}</h3>
                  <p style={{ color: PALETTE.textMuted, fontSize: 15, lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
                </div>
                <div style={{
                  width: 72, height: 72, flexShrink: 0,
                  borderRadius: 24,
                  background: PALETTE.surface,
                  border: `1px solid ${PALETTE.borderBright}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 28,
                  boxShadow: `0 0 40px ${PALETTE.accent}22`
                }}>{s.icon}</div>
                <div style={{ flex: 1 }} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const PLANS = [
  {
    name: "Free",
    price: "$0",
    per: "forever",
    desc: "For curious individuals getting started",
    features: ["3 active habits", "7-day history", "Basic analytics", "Daily planning", "Email support"],
    cta: "Get Started",
    color: PALETTE.textMuted,
    highlighted: false
  },
  {
    name: "Pro",
    price: "$9",
    per: "per month",
    desc: "For driven people serious about growth",
    features: ["Unlimited habits", "Full history", "AI insights", "Goal architecture", "Smart scheduling", "Priority support", "All integrations"],
    cta: "Start Free Trial",
    color: PALETTE.accent,
    highlighted: true
  },
  {
    name: "Team",
    price: "$29",
    per: "per team/month",
    desc: "For high-performance teams",
    features: ["Everything in Pro", "Up to 20 members", "Team analytics", "Shared goals", "Admin dashboard", "Slack integration", "Dedicated CSM"],
    cta: "Contact Us",
    color: PALETTE.teal,
    highlighted: false
  }
];

function PricingSection() {
  return (
    <section id="pricing" style={{
      background: PALETTE.obsidian,
      padding: "120px max(32px, calc(50% - 640px))",
      borderTop: `1px solid ${PALETTE.border}`,
    }}>
      <Reveal>
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <Badge color={PALETTE.gold}>Pricing</Badge>
          <h2 style={{
            fontFamily: "'Clash Display', 'Plus Jakarta Sans', sans-serif",
            fontSize: "clamp(36px, 4vw, 56px)",
            fontWeight: 800, color: PALETTE.text,
            letterSpacing: "-0.03em",
            margin: "20px 0 16px"
          }}>Simple, honest pricing</h2>
          <p style={{ color: PALETTE.textMuted, fontSize: 18 }}>No tricks. No hidden fees. Cancel anytime.</p>
        </div>
      </Reveal>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
        {PLANS.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.1}>
            <div style={{
              background: p.highlighted ? PALETTE.surface : PALETTE.ink,
              border: `1px solid ${p.highlighted ? p.color + "88" : PALETTE.border}`,
              borderRadius: 24, padding: 36,
              position: "relative", overflow: "hidden",
              boxShadow: p.highlighted ? `0 0 60px ${p.color}22` : "none",
              height: "100%", boxSizing: "border-box"
            }}>
              {p.highlighted && (
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 3,
                  background: `linear-gradient(90deg, ${PALETTE.accent}, ${PALETTE.teal})`
                }} />
              )}
              {p.highlighted && (
                <div style={{ position: "absolute", top: 16, right: 16 }}>
                  <Badge color={PALETTE.accent}>Most Popular</Badge>
                </div>
              )}
              <p style={{ color: p.color, fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 12px", fontFamily: "'DM Mono', monospace" }}>{p.name}</p>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 8 }}>
                <span style={{ fontSize: 48, fontWeight: 800, color: PALETTE.text, letterSpacing: "-0.03em", fontFamily: "'Clash Display', sans-serif" }}>{p.price}</span>
                <span style={{ color: PALETTE.textMuted, fontSize: 14 }}>/{p.per}</span>
              </div>
              <p style={{ color: PALETTE.textMuted, fontSize: 14, margin: "0 0 28px" }}>{p.desc}</p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px" }}>
                {p.features.map(f => (
                  <li key={f} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 12, color: PALETTE.textMuted, fontSize: 14 }}>
                    <span style={{ color: p.color, fontSize: 12 }}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <button style={{
                width: "100%", padding: "14px", borderRadius: 100,
                background: p.highlighted ? p.color : "transparent",
                color: p.highlighted ? "#fff" : PALETTE.text,
                border: `1px solid ${p.highlighted ? p.color : PALETTE.borderBright}`,
                cursor: "pointer", fontSize: 14, fontWeight: 700,
                transition: "all 0.2s"
              }}
              onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.target.style.transform = "none"; }}
              >{p.cta}</button>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

const TESTIMONIALS = [
  { name: "Sarah Chen", role: "Product Designer @ Vercel", text: "Flowly genuinely changed how I start my day. I used to spend 30 minutes figuring out what to tackle. Now it's just... there. Clear and obvious.", avatar: "SC", color: PALETTE.accent },
  { name: "Marcus Okafor", role: "Indie Hacker", text: "I've tried every productivity app. Flowly is the first one that adapted to me instead of forcing me into a system. The AI suggestions are eerily accurate.", avatar: "MO", color: PALETTE.teal },
  { name: "Priya Nair", role: "Engineering Manager @ Stripe", text: "My team noticed I was shipping faster. Flowly helped me protect deep work time and stop context-switching every 20 minutes.", avatar: "PN", color: PALETTE.gold },
  { name: "James Park", role: "Freelance Developer", text: "The streak system is deceptively motivating. 47 days and counting. I don't want to break it.", avatar: "JP", color: PALETTE.rose },
  { name: "Lena Möller", role: "Head of Content @ Linear", text: "I was skeptical of 'AI scheduling' but Flowly understands that I do creative work better at 10pm. No other app figured that out.", avatar: "LM", color: PALETTE.accentGlow },
  { name: "Tariq Hassan", role: "Startup Founder", text: "Between the analytics and goal tracking, Flowly is essentially a co-founder for my personal productivity. Highly recommended.", avatar: "TH", color: PALETTE.teal },
];

function TestimonialsSection() {
  return (
    <section id="testimonials" style={{
      background: PALETTE.ink,
      padding: "120px max(32px, calc(50% - 640px))",
      borderTop: `1px solid ${PALETTE.border}`,
    }}>
      <Reveal>
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <Badge color={PALETTE.rose}>Testimonials</Badge>
          <h2 style={{
            fontFamily: "'Clash Display', 'Plus Jakarta Sans', sans-serif",
            fontSize: "clamp(36px, 4vw, 56px)",
            fontWeight: 800, color: PALETTE.text,
            letterSpacing: "-0.03em",
            margin: "20px 0"
          }}>People love<br />their new routine</h2>
        </div>
      </Reveal>
      <div style={{ columns: 3, gap: 20 }}>
        {TESTIMONIALS.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.08}>
            <div style={{
              breakInside: "avoid", marginBottom: 20,
              background: PALETTE.surface, borderRadius: 20,
              padding: 28, border: `1px solid ${PALETTE.border}`,
              transition: "border-color 0.3s"
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = t.color + "66"}
            onMouseLeave={e => e.currentTarget.style.borderColor = PALETTE.border}
            >
              <p style={{ color: PALETTE.text, fontSize: 15, lineHeight: 1.7, margin: "0 0 24px" }}>"{t.text}"</p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: "50%",
                  background: `${t.color}33`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: t.color, fontSize: 12, fontWeight: 700
                }}>{t.avatar}</div>
                <div>
                  <p style={{ color: PALETTE.text, fontSize: 13, fontWeight: 700, margin: 0 }}>{t.name}</p>
                  <p style={{ color: PALETTE.textMuted, fontSize: 12, margin: 0 }}>{t.role}</p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section style={{
      background: PALETTE.obsidian,
      padding: "120px max(32px, calc(50% - 640px))",
      borderTop: `1px solid ${PALETTE.border}`,
    }}>
      <Reveal>
        <div style={{
          background: PALETTE.surface,
          border: `1px solid ${PALETTE.borderBright}`,
          borderRadius: 32, padding: "80px 60px",
          textAlign: "center",
          position: "relative", overflow: "hidden"
        }}>
          <div style={{
            position: "absolute", top: "-40%", left: "50%", transform: "translateX(-50%)",
            width: 600, height: 400, borderRadius: "50%",
            background: `radial-gradient(circle, ${PALETTE.accent}20 0%, transparent 70%)`,
            pointerEvents: "none"
          }} />
          <Badge color={PALETTE.gold}>🎉 Launch Offer</Badge>
          <h2 style={{
            fontFamily: "'Clash Display', 'Plus Jakarta Sans', sans-serif",
            fontSize: "clamp(40px, 4.5vw, 64px)",
            fontWeight: 800, color: PALETTE.text,
            letterSpacing: "-0.03em", lineHeight: 1.1,
            margin: "24px 0 20px"
          }}>
            Start your best<br />
            <span style={{
              background: `linear-gradient(135deg, ${PALETTE.accent}, ${PALETTE.teal})`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
            }}>chapter today.</span>
          </h2>
          <p style={{ color: PALETTE.textMuted, fontSize: 18, maxWidth: 440, margin: "0 auto 40px", lineHeight: 1.7 }}>
            Join 50,000+ people who chose to work smarter. Free forever. No credit card required.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            {["App Store", "Google Play"].map(platform => (
              <button key={platform} style={{
                padding: "16px 36px", borderRadius: 100,
                background: PALETTE.accent, color: "#fff",
                border: "none", cursor: "pointer",
                fontSize: 15, fontWeight: 700,
                boxShadow: `0 0 40px ${PALETTE.accent}44`,
                transition: "all 0.2s"
              }}
              onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.target.style.transform = "none"; }}
              >Download on {platform}</button>
            ))}
          </div>
          <p style={{ color: PALETTE.textDim, fontSize: 12, marginTop: 24 }}>iOS 16+ · Android 12+ · Free to use, always</p>
        </div>
      </Reveal>
    </section>
  );
}

function Footer() {
  const cols = {
    Product: ["Features", "Pricing", "Roadmap", "Changelog"],
    Company: ["About", "Blog", "Careers", "Press"],
    Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
    Support: ["Help Center", "Contact Us", "Status", "Community"]
  };
  return (
    <footer style={{
      background: PALETTE.ink,
      borderTop: `1px solid ${PALETTE.border}`,
      padding: "80px max(32px, calc(50% - 640px)) 40px"
    }}>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: 60, marginBottom: 60 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: `linear-gradient(135deg, ${PALETTE.accent}, ${PALETTE.teal})`, display: "flex", alignItems: "center", justifyContent: "center" }}>⚡</div>
            <span style={{ color: PALETTE.text, fontWeight: 800, fontSize: 18, fontFamily: "'Clash Display', sans-serif" }}>Flowly</span>
          </div>
          <p style={{ color: PALETTE.textMuted, fontSize: 14, lineHeight: 1.7, maxWidth: 240, margin: 0 }}>The productivity app that works the way you do — not the other way around.</p>
        </div>
        {Object.entries(cols).map(([section, links]) => (
          <div key={section}>
            <p style={{ color: PALETTE.text, fontSize: 13, fontWeight: 700, margin: "0 0 20px", letterSpacing: "0.02em" }}>{section}</p>
            {links.map(l => (
              <a key={l} href="#" style={{ display: "block", color: PALETTE.textMuted, fontSize: 13, textDecoration: "none", marginBottom: 12, transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = PALETTE.text}
              onMouseLeave={e => e.target.style.color = PALETTE.textMuted}
              >{l}</a>
            ))}
          </div>
        ))}
      </div>
      <div style={{ borderTop: `1px solid ${PALETTE.border}`, paddingTop: 32, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <p style={{ color: PALETTE.textDim, fontSize: 13, margin: 0 }}>© 2025 Flowly Inc. All rights reserved.</p>
        <div style={{ display: "flex", gap: 24 }}>
          {["Twitter","LinkedIn","Instagram","Discord"].map(s => (
            <a key={s} href="#" style={{ color: PALETTE.textDim, fontSize: 13, textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={e => e.target.style.color = PALETTE.accent}
            onMouseLeave={e => e.target.style.color = PALETTE.textDim}
            >{s}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const scrollY = useScrollY();

  return (
    <div style={{
      fontFamily: "'Plus Jakarta Sans', 'DM Sans', system-ui, sans-serif",
      background: PALETTE.obsidian,
      minHeight: "100vh",
      WebkitFontSmoothing: "antialiased",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${PALETTE.obsidian}; }
        ::-webkit-scrollbar-thumb { background: ${PALETTE.borderBright}; border-radius: 3px; }
      `}</style>
      <Navbar scrollY={scrollY} />
      <HeroSection />
      <LogoStrip />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <PricingSection />
      <CtaSection />
      <Footer />
    </div>
  );
}