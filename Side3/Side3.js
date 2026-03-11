import { useState } from "react";

const nodes = {
  center: { id: "center", label: "Lyriske\nTekster", x: 500, y: 400, color: "#1a4a6b" },
  topics: [
    {
      id: "lyrikk", label: "Hva er\nLyrikk?", x: 250, y: 130, color: "#2a7a9b",
      children: [
        { id: "l1", label: "Tre hovedsjangre", x: 80, y: 40, color: "#4aa8c0" },
        { id: "l2", label: "Uttrykker følelser\nog stemninger", x: 60, y: 120, color: "#4aa8c0" },
        { id: "l3", label: "Rim og rytme", x: 90, y: 200, color: "#4aa8c0" },
        { id: "l4", label: "Musikktekster\nog dikt", x: 55, y: 280, color: "#4aa8c0" },
      ]
    },
    {
      id: "motiv", label: "Motiv &\nTema", x: 680, y: 110, color: "#1a6b4a",
      children: [
        { id: "m1", label: "Motiv: konkrete\nhandlinger/personer", x: 820, y: 30, color: "#3a9b6a" },
        { id: "m2", label: "Tema: meningsinnhold\nsom tolkes", x: 870, y: 120, color: "#3a9b6a" },
        { id: "m3", label: "Finn tittelen\nsom hint", x: 840, y: 210, color: "#3a9b6a" },
      ]
    },
    {
      id: "spraklige", label: "Språklige\nBilder", x: 820, y: 380, color: "#6b1a4a",
      children: [
        { id: "s1", label: "Sammenlikning", x: 980, y: 280, color: "#9b3a7a" },
        { id: "s2", label: "Metafor", x: 1010, y: 360, color: "#9b3a7a" },
        { id: "s3", label: "Besjeling", x: 1010, y: 440, color: "#9b3a7a" },
        { id: "s4", label: "Personifikasjon", x: 990, y: 520, color: "#9b3a7a" },
        { id: "s5", label: "Symbol", x: 960, y: 600, color: "#9b3a7a" },
        { id: "s6", label: "Kontrast", x: 900, y: 670, color: "#9b3a7a" },
        { id: "s7", label: "Synekdoke", x: 820, y: 720, color: "#9b3a7a" },
      ]
    },
    {
      id: "musikalske", label: "Det\nMusikalske", x: 600, y: 670, color: "#6b4a1a",
      children: [
        { id: "mu1", label: "Fast / fri rytme", x: 680, y: 790, color: "#9b7a3a" },
        { id: "mu2", label: "Gjentakelse", x: 560, y: 820, color: "#9b7a3a" },
        { id: "mu3", label: "Enderim", x: 430, y: 800, color: "#9b7a3a" },
        { id: "mu4", label: "Bokstavrim", x: 370, y: 730, color: "#9b7a3a" },
      ]
    },
    {
      id: "oppbygning", label: "Oppbygning", x: 280, y: 650, color: "#4a1a6b",
      children: [
        { id: "o1", label: "Verselinje", x: 120, y: 640, color: "#7a3a9b" },
        { id: "o2", label: "Strofe", x: 90, y: 720, color: "#7a3a9b" },
        { id: "o3", label: "Avsnitt", x: 130, y: 800, color: "#7a3a9b" },
        { id: "o4", label: "Cesur", x: 230, y: 830, color: "#7a3a9b" },
        { id: "o5", label: "Enjambement\n/ Versebinding", x: 330, y: 820, color: "#7a3a9b" },
      ]
    },
    {
      id: "lyriskjeg", label: "Lyrisk\nJeg", x: 160, y: 390, color: "#1a4a1a",
      children: [
        { id: "lj1", label: "Jeg = den\nsom har ordet", x: 20, y: 330, color: "#3a7a3a" },
        { id: "lj2", label: "Subjektive\nopplevelser", x: 10, y: 420, color: "#3a7a3a" },
        { id: "lj3", label: "Vi / Du\nogså brukt", x: 20, y: 510, color: "#3a7a3a" },
      ]
    },
  ]
};

function MindMap() {
  const [active, setActive] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);

  const allChildNodes = nodes.topics.flatMap(t => t.children.map(c => ({ ...c, parentId: t.id })));

  return (
    <div style={{
      width: "100vw", height: "100vh", background: "#0d1b2a",
      fontFamily: "'Georgia', serif", overflow: "hidden", position: "relative"
    }}>
      {/* Background decoration */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at 50% 40%, #0d2a40 0%, #0a1520 60%, #060d14 100%)",
        pointerEvents: "none"
      }} />
      <div style={{
        position: "absolute", inset: 0, opacity: 0.03,
        backgroundImage: "repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, #fff 0px, #fff 1px, transparent 1px, transparent 60px)",
        pointerEvents: "none"
      }} />

      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
        <defs>
          {nodes.topics.map(t => (
            <marker key={t.id} id={`arrow-${t.id}`} markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
              <circle cx="3" cy="3" r="2" fill={t.color} opacity="0.6" />
            </marker>
          ))}
        </defs>

        {/* Lines from center to topics */}
        {nodes.topics.map(t => (
          <line key={`c-${t.id}`}
            x1={nodes.center.x} y1={nodes.center.y}
            x2={t.x} y2={t.y}
            stroke={t.color}
            strokeWidth={active === t.id ? 3 : 1.5}
            strokeOpacity={active && active !== t.id ? 0.2 : 0.7}
            strokeDasharray={active === t.id ? "none" : "4 3"}
            style={{ transition: "all 0.3s" }}
          />
        ))}

        {/* Lines from topics to children */}
        {nodes.topics.map(t =>
          t.children.map(c => (
            <line key={`l-${c.id}`}
              x1={t.x} y1={t.y}
              x2={c.x} y2={c.y}
              stroke={c.color}
              strokeWidth={1}
              strokeOpacity={active === t.id ? 0.9 : active ? 0.05 : 0.35}
              style={{ transition: "all 0.3s" }}
            />
          ))
        )}
      </svg>

      {/* Center node */}
      <div onClick={() => setActive(null)} style={{
        position: "absolute",
        left: nodes.center.x, top: nodes.center.y,
        transform: "translate(-50%, -50%)",
        width: 110, height: 110,
        borderRadius: "50%",
        background: "radial-gradient(circle, #2a6a9b, #1a4a6b)",
        border: "3px solid #4a9acb",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", zIndex: 20,
        boxShadow: "0 0 30px #2a7abba0, 0 0 60px #1a4a6b50",
        transition: "all 0.3s"
      }}>
        <span style={{
          color: "#e8f4ff", fontSize: 13, fontWeight: "bold",
          textAlign: "center", lineHeight: 1.4, letterSpacing: 0.5,
          whiteSpace: "pre-line"
        }}>{"Lyriske\nTekster"}</span>
      </div>

      {/* Topic nodes */}
      {nodes.topics.map(t => (
        <div key={t.id}
          onClick={() => setActive(active === t.id ? null : t.id)}
          onMouseEnter={() => setHoveredNode(t.id)}
          onMouseLeave={() => setHoveredNode(null)}
          style={{
            position: "absolute",
            left: t.x, top: t.y,
            transform: "translate(-50%, -50%)",
            width: 88, height: 88,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${t.color}cc, ${t.color}88)`,
            border: `2px solid ${t.color}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", zIndex: 15,
            opacity: active && active !== t.id ? 0.3 : 1,
            boxShadow: active === t.id || hoveredNode === t.id
              ? `0 0 20px ${t.color}90, 0 0 40px ${t.color}40`
              : `0 0 10px ${t.color}40`,
            transform: `translate(-50%, -50%) scale(${active === t.id ? 1.1 : 1})`,
            transition: "all 0.3s"
          }}>
          <span style={{
            color: "#f0f8ff", fontSize: 11, fontWeight: "bold",
            textAlign: "center", lineHeight: 1.35, whiteSpace: "pre-line",
            padding: "0 6px"
          }}>{t.label}</span>
        </div>
      ))}

      {/* Child nodes */}
      {nodes.topics.map(t =>
        t.children.map(c => (
          <div key={c.id}
            style={{
              position: "absolute",
              left: c.x, top: c.y,
              transform: "translate(-50%, -50%)",
              padding: "5px 10px",
              borderRadius: 20,
              background: `${c.color}22`,
              border: `1px solid ${c.color}88`,
              cursor: "default", zIndex: 10,
              opacity: active === t.id ? 1 : active ? 0 : 0.6,
              pointerEvents: active === t.id ? "auto" : "none",
              boxShadow: active === t.id ? `0 0 12px ${c.color}50` : "none",
              transition: "all 0.3s",
              whiteSpace: "pre-line"
            }}>
            <span style={{
              color: "#ddeeff", fontSize: 10, textAlign: "center",
              display: "block", lineHeight: 1.4
            }}>{c.label}</span>
          </div>
        ))
      )}

      {/* Legend */}
      <div style={{
        position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)",
        color: "#4a7a9b", fontSize: 11, letterSpacing: 1, opacity: 0.7
      }}>
        Klikk på en node for å utforske • Klikk midt i for å tilbakestille
      </div>
    </div>
  );
}

export default MindMap;