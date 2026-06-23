import { useState, useEffect, useCallback } from "react";
import {
  ChevronLeft, ChevronRight, Monitor, CheckCircle2,
  ArrowRight, Users, BookOpen, Code2, Layers, XCircle,
  HelpCircle, Lightbulb, MessageSquare, Target, Zap,
  TrendingUp, GitBranch, User, RefreshCw,
} from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

// ─── Screenshot imports ───────────────────────────────────────────
import imgHomepage   from "@/imports/cropped/______________2026-06-22_211540.png";
import imgTasks      from "@/imports/cropped/______________2026-06-22_211549.png";
import imgCourses    from "@/imports/cropped/______________2026-06-22_211555.png";
import imgGuide      from "@/imports/cropped/______________2026-06-22_211609.png";
import imgErrors     from "@/imports/cropped/______________2026-06-22_211621.png";
import imgOopCourse  from "@/imports/cropped/______________2026-06-22_211634.png";
import imgTopicPage  from "@/imports/cropped/______________2026-06-22_211644.png";
import imgTheoryCode from "@/imports/cropped/uchicode-theory-loop-accumulation.png";
import imgAiBefore   from "@/imports/______________2026-06-22_211727.png";
import imgAiAfter    from "@/imports/______________2026-06-22_211749.png";
import imgProfile    from "@/imports/cropped/______________2026-06-22_211800.png";
import imgQrCode     from "@/imports/uchicode-qr.png";

// ─── Design tokens ───────────────────────────────────────────────
const W = 960, H = 540;
const C = "#22D3EE", V = "#818CF8", G = "#34D399";
const BG = "#07101E";
const TOTAL = 18;
const GRID: React.CSSProperties = {
  backgroundImage:
    "linear-gradient(rgba(34,211,238,0.03) 1px,transparent 1px)," +
    "linear-gradient(90deg,rgba(34,211,238,0.03) 1px,transparent 1px)",
  backgroundSize: "56px 56px",
};

// ─── Primitives ──────────────────────────────────────────────────
const card = (x?: React.CSSProperties): React.CSSProperties => ({
  background: "rgba(255,255,255,0.04)",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "rgba(255,255,255,0.08)",
  borderRadius: 12, ...x,
});

function Tag({ label, color }: { label: string; color: string }) {
  return (
    <span style={{ fontSize: 10, fontWeight: 700, color, background: color + "1A", borderWidth: 1, borderStyle: "solid", borderColor: color + "30", borderRadius: 5, padding: "2px 8px", letterSpacing: "0.04em" }}>{label}</span>
  );
}

function Li({ children, color = C }: { children: React.ReactNode; color?: string }) {
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 9 }}>
      <span style={{ display: "inline-block", width: 5, height: 5, borderRadius: "50%", background: color, flexShrink: 0, marginTop: 8, opacity: 0.85 }} />
      <span style={{ fontSize: 15, color: "#CBD5E1", lineHeight: 1.5 }}>{children}</span>
    </div>
  );
}

// ─── Browser mockup ──────────────────────────────────────────────
function BrowserMock({ label, imgSrc, flex = 1, imgPosition = "top center" }: {
  label: string; imgSrc?: string; flex?: number; imgPosition?: string;
}) {
  return (
    <div style={{
      flex, background: "#0B1424", borderWidth: 1, borderStyle: "solid",
      borderColor: "rgba(255,255,255,0.1)", borderRadius: 10,
      overflow: "hidden", display: "flex", flexDirection: "column",
      boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
    }}>
      {/* chrome */}
      <div style={{ background: "#060E1B", padding: "7px 12px", display: "flex", alignItems: "center", gap: 6, borderBottom: "1px solid rgba(255,255,255,0.06)", flexShrink: 0 }}>
        {["#EF4444","#F59E0B","#22C55E"].map(col => (
          <div key={col} style={{ width: 8, height: 8, borderRadius: "50%", background: col, opacity: 0.6 }} />
        ))}
        <div style={{ flex: 1, background: "rgba(255,255,255,0.05)", borderRadius: 4, padding: "3px 10px", marginLeft: 6 }}>
          <span style={{ fontSize: 10, color: "#2D4A6B", fontFamily: "'JetBrains Mono',monospace" }}>uchicode.ru</span>
        </div>
      </div>
      {/* screen */}
      {imgSrc ? (
        <div style={{ flex: 1, overflow: "hidden", background: "#0B1424" }}>
          <ImageWithFallback
            src={imgSrc}
            alt={label}
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: imgPosition, display: "block" }}
          />
        </div>
      ) : (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, padding: 16, minHeight: 110 }}>
          <Monitor size={24} color="#152540" />
          <span style={{ fontSize: 10.5, color: "#152540", textAlign: "center", fontStyle: "italic", lineHeight: 1.5, maxWidth: 200 }}>{label}</span>
        </div>
      )}
    </div>
  );
}

// ─── Narrow panel mockup (for AI screenshots) ────────────────────
function PanelMock({ label, imgSrc, accent = C }: { label: string; imgSrc?: string; accent?: string }) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ ...card({ borderColor: accent + "25", background: accent + "07" }), padding: "5px 12px", display: "flex", justifyContent: "center" }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: accent }}>{label}</span>
      </div>
      <div style={{
        flex: 1, background: "#0B1424", borderWidth: 1, borderStyle: "solid",
        borderColor: "rgba(255,255,255,0.1)", borderRadius: 10, overflow: "hidden",
        boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
      }}>
        {imgSrc ? (
          <ImageWithFallback
            src={imgSrc}
            alt={label}
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }}
          />
        ) : (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
            <Monitor size={20} color="#152540" />
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Slide frame ─────────────────────────────────────────────────
function Frame({ title, thesis, n, children, accent = C }: {
  title: string; thesis?: string; n: number; children: React.ReactNode; accent?: string;
}) {
  return (
    <div style={{ width: W, height: H, background: BG, display: "flex", flexDirection: "column", fontFamily: "Inter,sans-serif", overflow: "hidden", position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, ...GRID, pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(to right,${accent}55,${V}44,transparent)` }} />
      <span style={{ position: "absolute", top: 12, right: 18, fontSize: 9.5, color: "#1E3A5F", fontFamily: "'JetBrains Mono',monospace", zIndex: 2 }}>
        {String(n).padStart(2,"0")} / {String(TOTAL).padStart(2,"0")}
      </span>
      <div style={{ position: "relative", zIndex: 1, padding: "15px 40px 11px", borderBottom: "1px solid rgba(255,255,255,0.05)", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: thesis ? 5 : 0 }}>
          <div style={{ width: 3, height: 22, borderRadius: 2, background: `linear-gradient(to bottom,${accent},${V})`, flexShrink: 0 }} />
          <h2 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: 21, color: "#F1F5F9", margin: 0 }}>{title}</h2>
        </div>
        {thesis && <p style={{ fontSize: 13, color: accent, margin: "0 0 0 13px", fontWeight: 500 }}>{thesis}</p>}
      </div>
      <div style={{ position: "relative", zIndex: 1, flex: 1, padding: "14px 40px 14px", overflow: "hidden" }}>{children}</div>
    </div>
  );
}

// ─── Learning loop (slide 11) ────────────────────────────────────
function LearningLoop() {
  const cx = 440, cy = 195, r = 130;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const steps = [
    { label: "Понял", sub: "объяснение", angle: -90, color: C },
    { label: "Пример", sub: "посмотрел код", angle: -18, color: V },
    { label: "Попробовал", sub: "решил задачу", angle: 54, color: "#F97316" },
    { label: "Проверил", sub: "self-check", angle: 126, color: G },
    { label: "Разобрал\nошибку", sub: "при необходимости", angle: 198, color: "#F59E0B" },
  ];
  const pt = (angle: number, rad: number) => ({
    x: cx + rad * Math.cos(toRad(angle)),
    y: cy + rad * Math.sin(toRad(angle)),
  });
  const arcPath = (a1: number, a2: number) => {
    const start = pt(a1, r + 16);
    const end = pt(a2, r + 16);
    return `M ${start.x} ${start.y} A ${r + 16} ${r + 16} 0 0 1 ${end.x} ${end.y}`;
  };
  return (
    <svg viewBox="0 0 880 390" width="100%" height="100%" overflow="visible">
      <defs>
        <marker id="larc" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L7,3 z" fill="rgba(255,255,255,0.3)" />
        </marker>
        <radialGradient id="loopglow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={V} stopOpacity="0.1" />
          <stop offset="100%" stopColor={V} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="5 5" />
      <ellipse cx={cx} cy={cy} rx="80" ry="60" fill="url(#loopglow)" />
      {steps.map((s, i) => {
        const next = steps[(i + 1) % steps.length];
        return <path key={`arc-${i}`} d={arcPath(s.angle + 28, next.angle - 28)} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" markerEnd="url(#larc)" />;
      })}
      <circle cx={cx} cy={cy} r="38" fill={BG} stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
      <text x={cx} y={cy - 4} textAnchor="middle" fill="#64748B" fontSize="10" style={{ fontFamily: "'JetBrains Mono',monospace" }}>учебный</text>
      <text x={cx} y={cy + 11} textAnchor="middle" fill="#94A3B8" fontSize="12" style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700 }}>цикл</text>
      <RefreshCw size={0} />
      {steps.map(s => {
        const p = pt(s.angle, r);
        const lines = s.label.split("\n");
        const h = lines.length > 1 ? 50 : 42;
        return (
          <g key={s.label}>
            <rect x={p.x - 54} y={p.y - h / 2} width="108" height={h} rx="10" fill={s.color + "14"} stroke={s.color + "38"} strokeWidth="1.5" />
            {lines.map((line, li) => (
              <text key={li} x={p.x} y={p.y - (lines.length - 1) * 8 + li * 15 + 2} textAnchor="middle" fill={s.color} fontSize="12" style={{ fontWeight: 700 }}>{line}</text>
            ))}
            <text x={p.x} y={p.y + (lines.length > 1 ? 20 : 14)} textAnchor="middle" fill="#475569" fontSize="9.5">{s.sub}</text>
          </g>
        );
      })}
    </svg>
  );
}

// ─── Slides ──────────────────────────────────────────────────────
const slides: { content: React.ReactNode; notes: string }[] = [

  // 1 ─ Title
  {
    notes: "Я представляю сайт uchicode.ru. Это учебный сайт по C++ и ООП для тех, кто только входит в программирование. Он ведёт не через случайные материалы, а через понятный путь: курс, тема, пример, задача и прогресс. На защите я покажу, как сайт помогает сделать первый шаг в C++.",
    content: (
      <div style={{ width: W, height: H, background: BG, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Inter,sans-serif", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, ...GRID }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(to right,${C}55,${V}44,transparent)` }} />
        <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translate(-50%,-50%)", width: 500, height: 220, background: `radial-gradient(ellipse,${C}0F 0%,transparent 70%)`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "15%", right: "10%", width: 260, height: 140, background: `radial-gradient(ellipse,${V}0A 0%,transparent 70%)`, pointerEvents: "none" }} />
        <pre style={{ position: "absolute", top: 26, right: 44, fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, color: `${C}15`, lineHeight: 1.9, margin: 0, userSelect: "none", textAlign: "right" }}>
          {"#include <iostream>\nint main() {\n  // начни здесь\n  return 0;\n}"}
        </pre>
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "0 64px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: `${C}16`, borderWidth: 1, borderStyle: "solid", borderColor: `${C}28`, borderRadius: 20, padding: "4px 14px", marginBottom: 18 }}>
            <BookOpen size={11} color={C} />
            <span style={{ fontSize: 11, color: C, fontWeight: 600, letterSpacing: "0.1em" }}>UCHICODE.RU · C++ START</span>
          </div>
          <h1 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: 84, color: "#F1F5F9", margin: "0 0 10px", letterSpacing: "-3px", lineHeight: 1 }}>Uchicode</h1>
          <p style={{ fontSize: 18, color: "#64748B", margin: "0 0 28px" }}>Сайт для входа в программирование через C++</p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 28 }}>
            {[
              { t: "Вход в программирование", c: C },
              { t: "C++ через практику", c: V },
              { t: "Путь и прогресс", c: G },
            ].map(b => (
              <div key={b.t} style={{ ...card({ padding: "6px 14px", borderColor: b.c + "28", background: b.c + "09" }), display: "flex", alignItems: "center", gap: 7 }}>
                <CheckCircle2 size={12} color={b.c} />
                <span style={{ fontSize: 12, color: "#94A3B8" }}>{b.t}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 32, justifyContent: "center", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 16 }}>
            {["Автор: _______________","Группа: ________","Колледж: _______________"].map(t => (
              <span key={t} style={{ fontSize: 12, color: "#334155" }}>{t}</span>
            ))}
          </div>
        </div>
        <span style={{ position: "absolute", bottom: 12, right: 18, fontSize: 9.5, color: "#1E3A5F", fontFamily: "'JetBrains Mono',monospace" }}>01 / 18</span>
      </div>
    ),
  },

  // 2 ─ Что такое Uchicode
  {
    notes: "Uchicode — это сайт, который собирает вход в C++ в один сценарий. Ученик открывает курс, идёт по темам, смотрит пример и переходит к задаче. Если он ошибся или застрял, рядом есть разбор частых ошибок и AI-советник. Профиль показывает, что уже пройдено.",
    content: (
      <Frame title="Что такое Uchicode" thesis="uchicode.ru помогает пройти путь от первой темы к первой задаче." n={2}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, height: "100%" }}>
          {[
            { icon: <BookOpen size={20}/>, t: "C++ и ООП", s: "Два курса с понятным порядком тем", color: C },
            { icon: <Code2 size={20}/>, t: "Пример + задача", s: "Теория сразу связана с практикой", color: V },
            { icon: <Lightbulb size={20}/>, t: "Ошибки рядом", s: "Понятно, почему код не работает", color: "#F59E0B" },
            { icon: <MessageSquare size={20}/>, t: "AI-советник", s: "Помогает, когда ученик застрял", color: G },
          ].map(item => (
            <div key={item.t} style={{ ...card({ padding: "14px 16px", borderColor: item.color + "22", background: item.color + "07" }), display: "flex", gap: 11, alignItems: "flex-start" }}>
              <span style={{ color: item.color, flexShrink: 0, marginTop: 1 }}>{item.icon}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14.5, color: "#F1F5F9", marginBottom: 4 }}>{item.t}</div>
                <div style={{ fontSize: 12.5, color: "#64748B", lineHeight: 1.4 }}>{item.s}</div>
              </div>
            </div>
          ))}
        </div>
      </Frame>
    ),
  },

  // 3 ─ Проблема новичка
  {
    notes: "Когда человек только входит в программирование, главная проблема — не один сложный термин. Сложно понять, с чего начать, где посмотреть пример и как проверить себя. C++ быстро пугает ошибками и файлами. Uchicode снижает этот хаос и показывает следующий шаг.",
    content: (
      <Frame title="Проблема новичка" thesis="В начале C++ мешает хаос: непонятно, что учить и как проверять себя." n={3} accent={V}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 40px 1fr", gap: 0, height: "100%", alignItems: "center" }}>
          <div style={{ ...card({ padding: "16px 18px", borderColor: "#EF444428", background: "#EF44440A" }) }}>
            <div style={{ fontWeight: 700, fontSize: 13, color: "#EF4444", marginBottom: 10, display: "flex", gap: 6, alignItems: "center" }}>
              <XCircle size={13}/> Без маршрута
            </div>
            {["Материалы разбросаны","Непонятен первый шаг","Ошибки пугают","Прогресс не виден"].map((t, i) => (
              <div key={i} style={{ display: "flex", gap: 7, marginBottom: 7 }}>
                <XCircle size={11} color="#EF4444" style={{ flexShrink: 0, marginTop: 3, opacity: 0.55 }} />
                <span style={{ fontSize: 13.5, color: "#64748B" }}>{t}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ArrowRight size={18} color="#1E3A5F" />
          </div>
          <div style={{ ...card({ padding: "16px 18px", borderColor: C + "28", background: C + "07" }) }}>
            <div style={{ fontWeight: 700, fontSize: 13, color: C, marginBottom: 10, display: "flex", gap: 6, alignItems: "center" }}>
              <CheckCircle2 size={13}/> С uchicode.ru
            </div>
            {["Курс ведёт по шагам","Тема даёт пример","Задача закрепляет","Профиль показывает путь"].map((t, i) => (
              <div key={i} style={{ display: "flex", gap: 7, marginBottom: 7 }}>
                <CheckCircle2 size={11} color={C} style={{ flexShrink: 0, marginTop: 3, opacity: 0.65 }} />
                <span style={{ fontSize: 13.5, color: "#CBD5E1" }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </Frame>
    ),
  },

  // 4 ─ Для кого
  {
    notes: "Сайт рассчитан на начинающих. В первую очередь это студенты и те, кто только пробует программирование через C++. Он полезен тем, кому нужна не только теория, но и путь к практике. Для преподавателя это может быть дополнительный учебный ресурс.",
    content: (
      <Frame title="Для кого сайт" thesis="Для тех, кто хочет войти в программирование через C++ без хаоса." n={4}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, height: "100%" }}>
          {[
            { icon: <Users size={22}/>, label: "Студенты колледжа", sub: "Понятный старт в C++", color: C },
            { icon: <BookOpen size={22}/>, label: "Новички в C++", sub: "Первый шаг без хаоса", color: V },
            { icon: <Code2 size={22}/>, label: "Нужна практика", sub: "Объяснение сразу ведёт к задаче", color: G },
            { icon: <Target size={22}/>, label: "Преподаватели", sub: "Дополнительный учебный ресурс", color: "#FBBF24" },
          ].map(p => (
            <div key={p.label} style={{ ...card({ padding: "14px 18px", borderColor: p.color + "22", background: p.color + "07" }), display: "flex", gap: 12, alignItems: "flex-start" }}>
              <span style={{ color: p.color, flexShrink: 0, marginTop: 1 }}>{p.icon}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, color: "#F1F5F9", marginBottom: 4 }}>{p.label}</div>
                <div style={{ fontSize: 13, color: "#64748B", lineHeight: 1.4 }}>{p.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </Frame>
    ),
  },

  // 5 ─ Главная страница
  {
    notes: "Главная страница нужна для первого знакомства. Она сразу показывает, что это сайт про C++ и что здесь есть понятный маршрут. Новичок видит, с чего начать, и не теряется в большом меню. Это важный вход в обучение.",
    content: (
      <Frame title="Главная страница" thesis="Первый экран показывает, с чего начать путь в C++." n={5}>
        <div style={{ display: "flex", gap: 18, height: "100%" }}>
          <BrowserMock label="Главная страница" imgSrc={imgHomepage} flex={1.6} imgPosition="top left" />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10, justifyContent: "center" }}>
            {[
              { t: "Пять шагов до первой задачи", c: C },
              { t: "Понятный вход без хаоса", c: V },
              { t: "Курсы, задачи и гайд рядом", c: G },
            ].map(item => (
              <div key={item.t} style={{ ...card({ padding: "11px 14px", borderColor: item.c + "22", background: item.c + "07" }), display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: item.c, flexShrink: 0 }} />
                <span style={{ fontSize: 14, color: "#CBD5E1" }}>{item.t}</span>
              </div>
            ))}
          </div>
        </div>
      </Frame>
    ),
  },

  // 6 ─ Курсы
  {
    notes: "На сайте есть два направления: База C++ и ООП C++. Они помогают не выбирать тему наугад. Ученик открывает курс и идёт по порядку. Так вход в программирование становится спокойнее и понятнее.",
    content: (
      <Frame title="Курсы" thesis="Курсы задают порядок: от базы C++ к ООП." n={6}>
        <div style={{ display: "flex", gap: 18, height: "100%" }}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10, justifyContent: "center" }}>
            {[
              { name: "База C++", tag: "Доступен", tagColor: G, sub: "Первый шаг: ввод, условия, циклы и простые задачи.", color: C },
              { name: "ООП C++", tag: "Доступен", tagColor: G, sub: "Следующий уровень: структуры, классы и практика.", color: V },
            ].map(course => (
              <div key={course.name} style={{ ...card({ padding: "14px 18px", borderColor: course.color + "22", background: course.color + "07" }) }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <span style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: 16, color: "#F1F5F9" }}>{course.name}</span>
                  <Tag label={course.tag} color={course.tagColor} />
                </div>
                <div style={{ fontSize: 13, color: "#64748B" }}>{course.sub}</div>
              </div>
            ))}
            <div style={{ ...card({ padding: "9px 14px", display: "flex", alignItems: "center", gap: 7 }) }}>
              <ArrowRight size={12} color="#334155" />
              <span style={{ fontSize: 12, color: "#475569" }}>Курс → тема → пример → задача → прогресс</span>
            </div>
          </div>
          <BrowserMock label="Страница курсов" imgSrc={imgCourses} flex={1.1} />
        </div>
      </Frame>
    ),
  },

  // 7 ─ Структура курса ООП C++
  {
    notes: "Страница курса показывает, где ученик находится сейчас. Видно открытые уроки, статус и следующий шаг. Это снижает ощущение хаоса: не нужно самому собирать маршрут из разных источников. Курс ведёт от темы к теме.",
    content: (
      <Frame title="Структура курса ООП C++" thesis="Ученик видит открытые уроки и двигается по порядку." n={7} accent={V}>
        <div style={{ display: "flex", gap: 18, height: "100%" }}>
          <BrowserMock label="Страница курса ООП C++" imgSrc={imgOopCourse} flex={1.4} />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 9, justifyContent: "center" }}>
            {[
              { t: "Видно, что уже доступно", c: G },
              { t: "Каждый урок ведёт к практике", c: C },
              { t: "Следующий шаг не надо угадывать", c: V },
            ].map(item => (
              <div key={item.t} style={{ ...card({ padding: "11px 14px", borderColor: item.c + "22", background: item.c + "07" }), display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: item.c, flexShrink: 0 }} />
                <span style={{ fontSize: 13.5, color: "#CBD5E1" }}>{item.t}</span>
              </div>
            ))}
          </div>
        </div>
      </Frame>
    ),
  },

  // 8 ─ Страница темы
  {
    notes: "Страница темы объясняет одну идею, а не перегружает ученика большой лекцией. Рядом есть пример, синтаксис, частые ошибки и переход к практике. Такой формат помогает быстрее понять, как теория превращается в код. Ученик видит всё в одном сценарии.",
    content: (
      <Frame title="Страница темы" thesis="Объяснение, пример и практика находятся в одном сценарии." n={8}>
        <div style={{ display: "flex", gap: 18, height: "100%" }}>
          <div style={{ flex: 1.4, position: "relative" }}>
            <BrowserMock label="Страница темы «Многофайловый проект»" imgSrc={imgTopicPage} flex={1} />
            {[
              { top: "15%", label: "Теги темы", color: C },
              { top: "40%", label: "Зачем нужна тема", color: V },
              { top: "65%", label: "Теория и примеры", color: "#F59E0B" },
              { top: "85%", label: "Синтаксис / задачи", color: G },
            ].map(c => (
              <div key={c.label} style={{ position: "absolute", right: 0, top: c.top, display: "flex", alignItems: "center", transform: "translateY(-50%)" }}>
                <div style={{ width: 14, height: 1, background: c.color, opacity: 0.35 }} />
                <div style={{ background: c.color + "20", borderWidth: 1, borderStyle: "solid", borderColor: c.color + "38", borderRadius: "0 6px 6px 0", padding: "3px 8px" }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: c.color, whiteSpace: "nowrap" }}>{c.label}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 9, justifyContent: "center" }}>
            <Li color={C}>Одна понятная тема</Li>
            <Li color={V}>Пример рядом с объяснением</Li>
            <Li color="#F59E0B">Ошибки разобраны заранее</Li>
            <Li color={G}>Переход к задаче</Li>
          </div>
        </div>
      </Frame>
    ),
  },

  // 9 ─ Пример кода
  {
    notes: "В теме есть не только текст, но и пример кода. Ученик видит, как теория применяется в программе. Это помогает проще войти в программирование, потому что объяснение и код находятся рядом.",
    content: (
      <Frame title="Пример кода внутри темы" thesis="Ученик сразу видит, как идея работает в реальном C++ коде." n={9} accent={V}>
        <div style={{ display: "flex", gap: 18, height: "100%" }}>
          <div style={{ flex: 1.6, background: "#0F1A2A", borderRadius: 10, overflow: "hidden", borderWidth: 1, borderStyle: "solid", borderColor: "rgba(255,255,255,0.1)", boxShadow: "0 8px 24px rgba(0,0,0,0.4)" }}>
            <div style={{ background: "#0A1019", padding: "7px 14px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 10, color: C, fontFamily: "'JetBrains Mono',monospace", fontWeight: 600 }}>C++</span>
              <span style={{ fontSize: 10, color: "#334155" }}>Цикл while и стоп-значение</span>
            </div>
            <ImageWithFallback
              src={imgTheoryCode}
              alt="Пример кода C++ с циклом while и стоп-значением"
              style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "top", display: "block", background: "#24262B" }}
            />
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10, justifyContent: "center" }}>
            <Li color={C}>Реальный пример в уроке</Li>
            <Li color={V}>Код связан с объяснением</Li>
            <Li color={G}>Логику можно разобрать сразу</Li>
            <div style={{ ...card({ padding: "9px 12px", borderColor: C + "1A", marginTop: 4 }) }}>
              <span style={{ fontSize: 11.5, color: "#475569" }}>Код помогает увидеть, как тема работает на практике</span>
            </div>
          </div>
        </div>
      </Frame>
    ),
  },

  // 10 ─ Практические задачи
  {
    notes: "Задачи нужны, чтобы ученик не остановился на чтении. После темы он может перейти к практике и закрепить идею. В каталоге виден статус: что доступно и что уже пройдено. Так теория превращается в действие.",
    content: (
      <Frame title="Практические задачи" thesis="Задача превращает объяснение в навык." n={10} accent={V}>
        <div style={{ display: "flex", gap: 18, height: "100%" }}>
          <BrowserMock label="Страница задач" imgSrc={imgTasks} flex={1.6} />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10, justifyContent: "center" }}>
            <Li color={C}>Задачи после тем</Li>
            <Li color={V}>Статус: пройдено / доступно</Li>
            <Li color={G}>Практика по C++ и ООП</Li>
            <div style={{ ...card({ padding: "9px 12px", borderColor: "#F59E0B1A", marginTop: 4 }) }}>
              <span style={{ fontSize: 11.5, color: "#475569" }}>63 задачи — часть ещё в разработке</span>
            </div>
          </div>
        </div>
      </Frame>
    ),
  },

  // 11 ─ Как учиться
  {
    notes: "Страница 'Как учиться' показывает простой способ не застрять на задаче. Сначала нужно понять условие, потом собрать минимальный код, добавить одно действие и проверить результат. Это помогает новичку работать спокойно. Он видит не только что учить, но и как учиться.",
    content: (
      <Frame title="Как учиться" thesis="Сайт показывает не только темы, но и способ работы с задачей." n={11}>
        <div style={{ display: "flex", gap: 18, height: "100%" }}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 0, justifyContent: "center" }}>
            {[
              { n: "01", t: "Разбери условие", s: "Что дано, что вывести, в каком файле", color: C },
              { n: "02", t: "Собери минимальный код", s: "Структура, которая компилируется", color: V },
              { n: "03", t: "Добавь одно действие", s: "Один шаг — сразу запусти", color: "#F97316" },
              { n: "04", t: "Проверь результат", s: "Пример + условие + статус задачи", color: G },
            ].map(item => (
              <div key={item.n} style={{ ...card({ padding: "9px 14px", borderColor: item.color + "22", background: item.color + "07", marginBottom: 8 }), display: "flex", alignItems: "center", gap: 11 }}>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, fontWeight: 700, color: item.color, width: 22, flexShrink: 0 }}>{item.n}</span>
                <div>
                  <span style={{ fontWeight: 700, fontSize: 13.5, color: "#F1F5F9" }}>{item.t}</span>
                  <span style={{ fontSize: 12, color: "#475569", marginLeft: 8 }}>{item.s}</span>
                </div>
              </div>
            ))}
          </div>
          <BrowserMock label="Страница «Как учиться»" imgSrc={imgGuide} flex={1.2} />
        </div>
      </Frame>
    ),
  },

  // 12 ─ Частые ошибки
  {
    notes: "Ошибки — одна из главных причин, почему новичок бросает C++. На сайте они разобраны понятным способом: что сломалось, почему возникло и как исправить. Это помогает не просто скопировать правильный код, а понять причину. Поэтому ошибки становятся частью обучения.",
    content: (
      <Frame title="Частые ошибки" thesis="Разбор ошибок помогает понять, почему код не работает." n={12} accent="#F59E0B">
        <div style={{ display: "flex", gap: 18, height: "100%" }}>
          <BrowserMock label="Страница «Частые ошибки»" imgSrc={imgErrors} flex={1.6} />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10, justifyContent: "center" }}>
            {[
              { icon: <XCircle size={18}/>,      t: "Что сломалось",      c: "#EF4444" },
              { icon: <HelpCircle size={18}/>,   t: "Почему возникло",    c: "#F59E0B" },
              { icon: <Lightbulb size={18}/>,    t: "Как исправить",      c: C },
              { icon: <CheckCircle2 size={18}/>, t: "Что запомнить",      c: G },
            ].map(item => (
              <div key={item.t} style={{ ...card({ padding: "10px 14px", borderColor: item.c + "22", background: item.c + "07" }), display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: item.c, flexShrink: 0 }}>{item.icon}</span>
                <span style={{ fontSize: 14, color: "#CBD5E1" }}>{item.t}</span>
              </div>
            ))}
          </div>
        </div>
      </Frame>
    ),
  },

  // 13 ─ AI-советник
  {
    notes: "AI-советник нужен не вместо курса, а внутри курса. Если ученик не понял тему, код или ошибку, он может задать вопрос. Ответ идёт по выделенному фрагменту и простыми словами. Это помогает не бросить обучение на сложном месте.",
    content: (
      <Frame title="AI-советник в теме" thesis="Если ученик не понял фрагмент, он может сразу получить объяснение." n={13} accent={G}>
        <div style={{ display: "flex", gap: 18, height: "100%" }}>
          <PanelMock label="Вопрос" imgSrc={imgAiBefore} accent={C} />
          <PanelMock label="Объяснение" imgSrc={imgAiAfter} accent={G} />
          <div style={{ flex: 0.9, display: "flex", flexDirection: "column", gap: 9, justifyContent: "center" }}>
            <Li color={C}>Выделение текста</Li>
            <Li color={G}>Вопрос по фрагменту</Li>
            <Li color={V}>Ответ простыми словами</Li>
            <div style={{ ...card({ padding: "9px 12px", borderColor: "#F59E0B1A", marginTop: 4 }) }}>
              <span style={{ fontSize: 11.5, color: "#475569" }}>15 запросов · советник, не замена курсу</span>
            </div>
          </div>
        </div>
      </Frame>
    ),
  },

  // 14 ─ Профиль и прогресс
  {
    notes: "Профиль нужен не только для аккаунта. Он показывает движение ученика по сайту. Пользователь видит пройденные уроки, задачи и доступный AI-лимит. Это помогает не терять прогресс и продолжать обучение дальше.",
    content: (
      <Frame title="Профиль и прогресс" thesis="Ученик видит свой путь и следующий шаг." n={14}>
        <div style={{ display: "flex", gap: 18, height: "100%" }}>
          <BrowserMock label="Профиль и прогресс" imgSrc={imgProfile} flex={1.4} />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10, justifyContent: "center" }}>
            <Li color={C}>Пройденные уроки</Li>
            <Li color={V}>Решённые задачи</Li>
            <Li color={G}>AI-лимит</Li>
            <Li color="#F59E0B">Следующий шаг</Li>
            <div style={{ ...card({ padding: "9px 12px", borderColor: "#47556920", marginTop: 4 }) }}>
              <span style={{ fontSize: 11.5, color: "#475569" }}>Связь с преподавателем — план развития</span>
            </div>
          </div>
        </div>
      </Frame>
    ),
  },

  // 15 ─ Что будет дальше
  {
    notes: "Дальше сайт можно развивать в сторону большей интерактивности. В планах — решение задач прямо на сайте, обратная связь по решениям и связь с преподавателем. Важно, что это именно планы развития, а не готовые функции. Сейчас главная ценность — понятный учебный путь.",
    content: (
      <Frame title="Что будет дальше" thesis="Следующий шаг — сделать практику на сайте ещё удобнее." n={15} accent={V}>
        <div style={{ display: "flex", flexDirection: "column", gap: 9, height: "100%", justifyContent: "center" }}>
          {[
            { n:"1", label:"Решение задач на сайте",     sub:"Писать и проверять код в одном месте", color: C },
            { n:"2", label:"Обратная связь по решениям", sub:"Понятный разбор после попытки",         color: V },
            { n:"3", label:"Связь с преподавателем",     sub:"Помощь по прогрессу ученика",          color: G },
            { n:"4", label:"Улучшенный прогресс",        sub:"Больше видно по пути обучения",        color: "#F59E0B" },
            { n:"5", label:"Больше практики",            sub:"Новые задачи, уровни, повторение",       color: "#A78BFA" },
          ].map(item => (
            <div key={item.n} style={{ ...card({ padding: "8px 16px", display: "flex", alignItems: "center", gap: 12, borderColor: item.color + "22", background: item.color + "07" }) }}>
              <div style={{ width: 24, height: 24, borderRadius: 12, background: item.color, color: "#000", fontSize: 11, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{item.n}</div>
              <div style={{ flex: 1 }}>
                <span style={{ fontWeight: 700, fontSize: 14, color: "#F1F5F9" }}>{item.label}</span>
                <span style={{ fontSize: 12, color: "#475569", marginLeft: 8 }}>{item.sub}</span>
              </div>
              <Tag label="План" color={item.color} />
            </div>
          ))}
        </div>
      </Frame>
    ),
  },

  // 16 ─ Итог
  {
    notes: "Главный вывод простой: uchicode.ru помогает войти в программирование через C++. Сайт даёт понятный маршрут, примеры, задачи, частые ошибки, AI-советник и прогресс. Это уже рабочая основа учебного сайта. Дальше его можно развивать через более интерактивную практику.",
    content: (
      <div style={{ width: W, height: H, background: BG, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Inter,sans-serif", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, ...GRID }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(to right,${C}55,${V}44,transparent)` }} />
        <div style={{ position: "absolute", top: "35%", left: "50%", transform: "translate(-50%,-50%)", width: 540, height: 260, background: `radial-gradient(ellipse,${C}0D 0%,transparent 70%)`, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, width: "100%", padding: "0 70px", display: "grid", gridTemplateColumns: "1fr 190px", gap: 36, alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: `${C}16`, borderWidth: 1, borderStyle: "solid", borderColor: `${C}28`, borderRadius: 20, padding: "4px 14px", marginBottom: 20, fontSize: 11, color: C, fontWeight: 600, letterSpacing: "0.1em" }}>
              ИТОГ
            </div>
            <p style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: 27, color: "#F1F5F9", margin: "0 0 22px", lineHeight: 1.35 }}>
              uchicode.ru помогает войти в программирование через C++: понятный путь, практика и прогресс.
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
              {["Учебный сайт","C++ и ООП","Пример + задача","AI рядом","Прогресс"].map(t => (
                <div key={t} style={{ ...card({ padding: "6px 12px", display: "flex", alignItems: "center", gap: 6 }) }}>
                  <CheckCircle2 size={12} color={C} />
                  <span style={{ fontSize: 12, color: "#64748B" }}>{t}</span>
                </div>
              ))}
            </div>
            <span style={{ fontSize: 20, fontFamily: "'Outfit',sans-serif", fontWeight: 700, color: C }}>Спасибо за внимание</span>
          </div>
          <div style={{ ...card({ padding: 14, borderColor: C + "35", background: "rgba(255,255,255,0.06)" }), display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
            <div style={{ background: "#FFFFFF", borderRadius: 10, padding: 10, boxShadow: "0 10px 28px rgba(0,0,0,0.35)" }}>
              <ImageWithFallback
                src={imgQrCode}
                alt="QR-код на сайт uchicode.ru"
                style={{ width: 128, height: 128, display: "block" }}
              />
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 10, color: "#64748B", marginBottom: 3 }}>сайт проекта</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 15, fontWeight: 700, color: "#F1F5F9" }}>uchicode.ru</div>
            </div>
          </div>
        </div>
        <span style={{ position: "absolute", bottom: 12, right: 18, fontSize: 9.5, color: "#1E3A5F", fontFamily: "'JetBrains Mono',monospace" }}>16 / 18</span>
      </div>
    ),
  },

  // 17 ─ Шпаргалка
  {
    notes: "Этот слайд — для тебя. Сфотографируй его на телефон и используй перед выступлением.",
    content: (
      <div style={{ width: W, height: H, background: "#040C18", display: "flex", flexDirection: "column", fontFamily: "Inter,sans-serif", overflow: "hidden" }}>
        <div style={{ padding: "12px 32px 10px", borderBottom: "1px solid rgba(255,255,255,0.08)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: 17, color: "#F1F5F9" }}>Шпаргалка докладчика</span>
          <span style={{ fontSize: 10, color: "#1E3A5F", fontFamily: "'JetBrains Mono',monospace" }}>17 / 18</span>
        </div>
        <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1px 1fr", overflow: "hidden" }}>
          <div style={{ overflowY: "auto", padding: "10px 24px 10px 28px", scrollbarWidth: "thin", scrollbarColor: "#1E3A5F transparent" }}>
            {[
              { n: "1",  t: "uchicode.ru — сайт для входа в программирование через C++." },
              { n: "2",  t: "Главная идея: меньше хаоса, больше понятного пути." },
              { n: "3",  t: "Ученик идёт: курс → тема → пример → задача." },
              { n: "4",  t: "Курсы: База C++ и ООП C++." },
              { n: "5",  t: "Тема даёт объяснение и пример рядом." },
              { n: "6",  t: "Задачи закрепляют материал на практике." },
              { n: "7",  t: "Частые ошибки объясняют, почему код не работает." },
              { n: "8",  t: "AI-советник помогает, когда ученик застрял." },
            ].map(item => (
              <div key={item.n} style={{ marginBottom: 8 }}>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, fontWeight: 700, color: C, marginRight: 6 }}>{item.n}.</span>
                <span style={{ fontSize: 13.4, color: "#F8FAFC", lineHeight: 1.45 }}>{item.t}</span>
              </div>
            ))}
          </div>
          <div style={{ background: "rgba(255,255,255,0.06)" }} />
          <div style={{ overflowY: "auto", padding: "10px 28px 10px 24px", scrollbarWidth: "thin", scrollbarColor: "#1E3A5F transparent" }}>
            {[
              { n: "9",  t: "Профиль показывает уроки, задачи, AI-лимит и прогресс." },
              { n: "10", t: "Сайт уже работает как основа учебного маршрута." },
              { n: "11", t: "Планы: задачи на сайте, обратная связь, преподаватель." },
              { n: "12", t: "Не обещать: автопроверку, оплату, менторский кабинет." },
              { n: "13", t: "Фокус доклада: сайт, польза, путь ученика." },
              { n: "14", t: "Финал: C++ проще начать, когда есть структура." },
              { n: "15", t: "QR ведёт на uchicode.ru." },
              { n: "16", t: "Говорить спокойно: это учебный проект, но уже рабочий." },
            ].map(item => (
              <div key={item.n} style={{ marginBottom: 8 }}>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, fontWeight: 700, color: V, marginRight: 6 }}>{item.n}.</span>
                <span style={{ fontSize: 13.4, color: "#F8FAFC", lineHeight: 1.45 }}>{item.t}</span>
              </div>
            ))}
            <div style={{ marginTop: 8, padding: "7px 12px", background: "rgba(255,255,255,0.03)", borderWidth: 1, borderStyle: "solid", borderColor: "rgba(255,255,255,0.07)", borderRadius: 8 }}>
              <span style={{ fontSize: 12, color: "#94A3B8" }}>Сфотографируй этот слайд перед защитой.</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },

  // 18 ─ Полный текст выступления
  {
    notes: "Готовый текст выступления. Его можно использовать как основу перед защитой.",
    content: (() => {
      const script = [
        { n: "01", title: "Uchicode", text: "Я представляю сайт uchicode.ru. Это учебный сайт по C++ и ООП для тех, кто только входит в программирование. Его цель — не просто дать текст, а провести ученика по понятному пути. В этом пути есть курс, тема, пример кода, задача, частые ошибки, AI-советник и прогресс." },
        { n: "02", title: "Что такое Uchicode", text: "Uchicode собирает обучение C++ в один сценарий. Ученик не прыгает между разными материалами. Он открывает курс, идёт по темам, смотрит пример и переходит к задаче. Если что-то непонятно, рядом есть разбор ошибок и AI-советник." },
        { n: "03", title: "Проблема новичка", text: "Когда человек начинает программировать, ему сложно понять, с чего стартовать. В C++ быстро появляются новые слова, ошибки и файлы. Без маршрута ученик теряется и откладывает практику. Uchicode снижает этот хаос и показывает следующий шаг." },
        { n: "04", title: "Для кого сайт", text: "Сайт рассчитан на начинающих. Это студенты колледжа, новички в C++ и те, кому нужна практика после теории. Для преподавателя Uchicode может быть дополнительным учебным ресурсом. Главная аудитория — человек, который делает первые шаги в программировании." },
        { n: "05", title: "Главная страница", text: "Главная страница объясняет, что это за сайт и куда идти дальше. Она показывает маршрут до первой задачи и не перегружает пользователя. Новичок сразу видит, что обучение устроено по шагам. Это удобный вход в сайт." },
        { n: "06", title: "Курсы", text: "На сайте есть два курса: База C++ и ООП C++. Курсы помогают не выбирать тему наугад. Ученик видит порядок и постепенно переходит от простых тем к более сложным. Это делает начало обучения спокойнее." },
        { n: "07", title: "Курс ООП C++", text: "Страница курса показывает открытые уроки, статус и следующий шаг. Ученик понимает, где он находится сейчас. Ему не нужно самому собирать порядок тем из разных источников. Курс ведёт его от урока к уроку." },
        { n: "08", title: "Страница темы", text: "Страница темы объясняет одну конкретную идею. Рядом есть пример, синтаксис, частые ошибки и переход к практике. Такой формат важен для новичка: он видит не только теорию, но и применение. Объяснение, пример и задача находятся рядом." },
        { n: "09", title: "Пример кода", text: "В теме есть пример C++ кода. Ученик сразу видит, как идея работает в программе. Это проще, чем читать теорию отдельно от кода. Такой пример помогает сделать первый практический шаг." },
        { n: "10", title: "Практические задачи", text: "Задачи нужны, чтобы закрепить тему. Они переводят объяснение в действие. У задачи есть статус, поэтому ученик видит, что уже сделано и что доступно дальше. Практика делает обучение реальным." },
        { n: "11", title: "Как учиться", text: "Страница 'Как учиться' объясняет, как работать с задачей. Сначала нужно разобрать условие, потом собрать минимальный код, добавить одно действие и проверить результат. Это помогает новичку не пытаться написать всё сразу. Сайт учит не только C++, но и способу работы." },
        { n: "12", title: "Частые ошибки", text: "Ошибки в C++ часто пугают начинающих. На сайте они разобраны по схеме: что сломалось, почему возникло и как исправить. Это помогает понять причину, а не просто скопировать ответ. Ошибки становятся частью обучения." },
        { n: "13", title: "AI-советник", text: "AI-советник работает внутри обучения. Ученик может выделить фрагмент темы или кода и задать вопрос. Ответ приходит простыми словами по конкретному месту. Это не замена курсу, а помощь, когда ученик застрял." },
        { n: "14", title: "Профиль и прогресс", text: "Профиль показывает движение ученика. Там видно пройденные уроки, решённые задачи и AI-лимит. Это помогает не терять результат и понимать, куда двигаться дальше. Для учебного сайта прогресс очень важен." },
        { n: "15", title: "Что дальше", text: "Дальше сайт можно развивать в сторону большей интерактивности. В планах — решение задач прямо на сайте, обратная связь по решениям и связь с преподавателем. Эти функции я показываю именно как планы развития. Сейчас главная ценность — понятный путь обучения." },
        { n: "16", title: "Итог", text: "Uchicode помогает войти в программирование через C++. Он даёт не разрозненные материалы, а последовательный маршрут: курс, тема, пример, задача, ошибки, AI и прогресс. Сайт уже показывает рабочую основу учебной платформы. Дальше её можно развивать через интерактивную практику." },
        { n: "КР", title: "Если нужно сказать совсем кратко", text: "Uchicode — это учебный сайт по C++ и ООП для новичков. Он помогает войти в программирование через понятный маршрут: курс, тема, пример кода, задача, частые ошибки, AI-советник и прогресс. Главная польза проекта в том, что ученик не прыгает между разными материалами, а видит последовательный путь обучения. Сейчас сайт уже показывает основу учебной платформы, а дальше его можно развивать через решение задач прямо на сайте, обратную связь и связь с преподавателем." },
      ];
      const half = Math.ceil(script.length / 2);
      return (
        <div style={{ width: W, height: H, background: "#040C18", display: "flex", flexDirection: "column", fontFamily: "Inter,sans-serif", overflow: "hidden" }}>
          <div style={{ padding: "12px 32px 10px", borderBottom: "1px solid rgba(255,255,255,0.08)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: 17, color: "#F1F5F9" }}>Текст к презентации</span>
            <span style={{ fontSize: 10, color: "#1E3A5F", fontFamily: "'JetBrains Mono',monospace" }}>18 / 18</span>
          </div>
          <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1px 1fr", overflow: "hidden" }}>
            <div style={{ overflowY: "auto", padding: "10px 24px 10px 28px", scrollbarWidth: "thin", scrollbarColor: "#1E3A5F transparent" }}>
              {script.slice(0, half).map(item => (
                <div key={item.n} style={{ marginBottom: 10 }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "baseline", marginBottom: 2 }}>
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, fontWeight: 700, color: C, flexShrink: 0 }}>{item.n}</span>
                    <span style={{ fontSize: 11.5, fontWeight: 700, color: "#E2E8F0" }}>{item.title}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: 11, color: "#64748B", lineHeight: 1.6, paddingLeft: 20 }}>{item.text}</p>
                </div>
              ))}
            </div>
            <div style={{ background: "rgba(255,255,255,0.06)" }} />
            <div style={{ overflowY: "auto", padding: "10px 28px 10px 24px", scrollbarWidth: "thin", scrollbarColor: "#1E3A5F transparent" }}>
              {script.slice(half).map(item => (
                <div key={item.n} style={{ marginBottom: 10 }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "baseline", marginBottom: 2 }}>
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, fontWeight: 700, color: V, flexShrink: 0 }}>{item.n}</span>
                    <span style={{ fontSize: 11.5, fontWeight: 700, color: "#E2E8F0" }}>{item.title}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: 11, color: "#64748B", lineHeight: 1.6, paddingLeft: 20 }}>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    })(),
  },
];

// ─── App ─────────────────────────────────────────────────────────
export default function App() {
  const [cur, setCur] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  const [scale, setScale] = useState(1);
  const [direction, setDirection] = useState(1);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    const upd = () => {
      const avW = window.innerWidth - 16;
      const avH = window.innerHeight - 48 - 48 - (showNotes ? 140 : 0) - 8;
      setScale(Math.min(avW / W, avH / H, 1.5));
    };
    upd();
    window.addEventListener("resize", upd);
    return () => window.removeEventListener("resize", upd);
  }, [showNotes]);

  const navigate = useCallback((delta: number) => {
    const next = Math.max(0, Math.min(cur + delta, slides.length - 1));
    if (next === cur) return;
    setDirection(delta > 0 ? 1 : -1);
    setAnimKey(k => k + 1);
    setCur(next);
  }, [cur]);

  const goTo = useCallback((i: number) => {
    if (i === cur) return;
    setDirection(i > cur ? 1 : -1);
    setAnimKey(k => k + 1);
    setCur(i);
  }, [cur]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); navigate(1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); navigate(-1); }
      if (e.key === "n" || e.key === "N") setShowNotes(s => !s);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [navigate]);

  const slide = slides[cur];

  return (
    <div style={{ height: "100vh", width: "100vw", background: "#030912", display: "flex", flexDirection: "column", overflow: "hidden", fontFamily: "Inter,sans-serif" }}>
      <style>{`
        @keyframes slideFromRight {
          from { opacity: 0; transform: translateX(36px); }
          to   { opacity: 1; transform: translateX(0);    }
        }
        @keyframes slideFromLeft {
          from { opacity: 0; transform: translateX(-36px); }
          to   { opacity: 1; transform: translateX(0);     }
        }
        @media (max-width: 640px) {
          .deck-topbar { padding: 0 10px !important; }
          .deck-subtitle { display: none !important; }
          .deck-count { white-space: nowrap; font-size: 11px !important; }
          .deck-notes-button { padding: 4px 8px !important; font-size: 11px !important; }
        }
      `}</style>

      {/* Top bar */}
      <div className="deck-topbar" style={{ height: 48, background: "#020810", borderBottom: "1px solid rgba(255,255,255,0.04)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: 16, color: "#F1F5F9" }}>Uchicode</span>
          <span className="deck-subtitle" style={{ fontSize: 11, color: "#1E3A5F", paddingLeft: 10, borderLeft: "1px solid #0D1A2E" }}>Защита учебного проекта</span>
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <span className="deck-count" style={{ fontSize: 11.5, color: "#334155" }}>{cur + 1} / {slides.length}</span>
          <button className="deck-notes-button" onClick={() => setShowNotes(s => !s)} style={{ background: showNotes ? C + "22" : "transparent", border: `1px solid ${showNotes ? C + "50" : "#0D1A2E"}`, borderRadius: 6, padding: "4px 12px", color: showNotes ? C : "#334155", fontSize: 12, cursor: "pointer", transition: "all 0.15s" }}>
            Заметки (N)
          </button>
        </div>
      </div>

      {/* Slide area */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "6px 8px" }}>
        <div
          key={animKey}
          style={{ animation: `${direction > 0 ? "slideFromRight" : "slideFromLeft"} 0.28s cubic-bezier(0.25,0.46,0.45,0.94) forwards` }}
        >
          <div style={{ width: W * scale, height: H * scale, position: "relative", boxShadow: "0 28px 80px rgba(0,0,0,0.75)", borderRadius: 4, overflow: "hidden" }}>
            <div style={{ width: W, height: H, transform: `scale(${scale})`, transformOrigin: "top left", position: "absolute" }}>
              {slide.content}
            </div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <div style={{ height: 48, background: "#020810", borderTop: "1px solid rgba(255,255,255,0.04)", display: "flex", alignItems: "center", justifyContent: "center", gap: 14, flexShrink: 0 }}>
        <button onClick={() => navigate(-1)} disabled={cur === 0} style={{ background: "none", border: "none", cursor: cur === 0 ? "not-allowed" : "pointer", color: cur === 0 ? "#0D1A2E" : "#334155", display: "flex", padding: 4 }}>
          <ChevronLeft size={22} />
        </button>
        <div style={{ display: "flex", gap: 4 }}>
          {slides.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} style={{ width: i === cur ? 18 : 7, height: 7, borderRadius: 4, background: i === cur ? C : "#0D1A2E", border: "none", cursor: "pointer", padding: 0, transition: "width 0.2s,background 0.2s" }} />
          ))}
        </div>
        <button onClick={() => navigate(1)} disabled={cur === slides.length - 1} style={{ background: "none", border: "none", cursor: cur === slides.length - 1 ? "not-allowed" : "pointer", color: cur === slides.length - 1 ? "#0D1A2E" : "#334155", display: "flex", padding: 4 }}>
          <ChevronRight size={22} />
        </button>
      </div>

      {/* Notes */}
      {showNotes && (
        <div style={{ background: "#020810", borderTop: "1px solid rgba(255,255,255,0.04)", padding: "12px 24px", maxHeight: 140, overflow: "auto", flexShrink: 0 }}>
          <div style={{ fontSize: 9.5, color: C, fontFamily: "'JetBrains Mono',monospace", marginBottom: 6, opacity: 0.5 }}>// заметки докладчика — слайд {cur + 1}</div>
          <p style={{ margin: 0, fontSize: 13, color: "#475569", lineHeight: 1.7 }}>{slide.notes}</p>
        </div>
      )}
    </div>
  );
}
