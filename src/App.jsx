import { useState, useRef, useEffect } from "react";

// ── Palette ──────────────────────────────────────────────
// Ink #1a1a2e | Spine #e94560 | Page bg #0f0f1e | Gold #f5a623 | Success #1b998b

const GENRES = ["Todos", "Fantasía", "Romance", "Terror", "Ciencia ficción", "Drama", "Misterio", "Aventura"];
const COVERS = [
  "linear-gradient(145deg,#1a1a2e,#e94560)", "linear-gradient(145deg,#0f3460,#533483)",
  "linear-gradient(145deg,#2d6a4f,#1b4332)", "linear-gradient(145deg,#6a0572,#e94560)",
  "linear-gradient(145deg,#f5a623,#e94560)", "linear-gradient(145deg,#0d3b66,#1b998b)",
  "linear-gradient(145deg,#3d0000,#8b0000)", "linear-gradient(145deg,#2c2c54,#40407a)",
];

const AUTHORS = {
  "Valentina Cruz": { bio: "Escritora de ciencia ficción ecológica. Cree que el futuro todavía puede salvarse.", joined: "2023", avatar: "🌿" },
  "Rodrigo Méndez": { bio: "Coleccionista de cartas perdidas y romances imposibles.", joined: "2022", avatar: "✉️" },
  "Sofía Ramos": { bio: "Escribo casas que recuerdan más que sus dueños.", joined: "2024", avatar: "🕯️" },
};

const INITIAL_STORIES = [
  { id: 1, title: "El último jardín del mundo", author: "Valentina Cruz", genre: "Ciencia ficción", reads: 12400, likes: 874, cover: COVERS[0], status: "En curso", price: 2.99,
    synopsis: "En un futuro donde la naturaleza ha desaparecido casi por completo, una botánica encuentra las últimas semillas vivas en un búnker militar olvidado.",
    chapters: [
      { id: 1, title: "Cenizas verdes", content: `El aire olía a plástico quemado, como siempre.\n\nMara ajustó su mascarilla y revisó los indicadores de calidad del aire en su muñeca: 187 partículas por millón. Habitable. Apenas.\n\nLlevaba tres años trabajando en el Departamento de Recursos Botánicos — un nombre absurdo para una oficina que no tenía ni una sola planta viva.\n\n—Mara, tienes visitante —dijo la voz sintética del sistema.\n\nEl hombre que la esperaba tenía los ojos del color del musgo. Puso sobre la mesa una caja metálica sellada.\n\n—Encontré esto —dijo simplemente— en el Bunker 7. Sector prohibido.\n\nDentro había doce semillas. Pequeñas, marrones, perfectamente ovales.\n\nVivas.` },
      { id: 2, title: "El mapa de los prohibidos", content: `El Sector 7 no existía en ningún mapa oficial.\n\nMara lo había verificado tres veces. Nada. Un agujero perfecto en la geografía de la ciudad.\n\n—¿Cómo entraste? —preguntó.\n\n—La misma forma en que entro a todos lados —respondió él—. Por las grietas.\n\nAfuera, la lluvia ácida comenzó a golpear las ventanas.\n\n—Necesito ir allá —dijo Mara.` },
    ]
  },
  { id: 2, title: "Cartas desde ningún lugar", author: "Rodrigo Méndez", genre: "Romance", reads: 28100, likes: 2310, cover: COVERS[1], status: "Completa", price: 0,
    synopsis: "Dos desconocidos empiezan a intercambiar cartas por error. Ninguno corrige el malentendido.",
    chapters: [
      { id: 1, title: "Primera carta (sin remitente)", content: `No sé por qué te escribo.\n\nEso es mentira. Sé exactamente por qué: encontré tu dirección en el reverso de una servilleta dentro de un libro de mercado de pulgas.\n\nMe llamo Lucía. Tengo 29 años, un trabajo que odio, y una ventana que da a un patio donde un vecino cultiva tomates a pesar de todo.\n\n¿Tú cultivas algo?\n\nL.` },
    ]
  },
  { id: 3, title: "La casa del juicio", author: "Sofía Ramos", genre: "Terror", reads: 9800, likes: 612, cover: COVERS[2], status: "En curso", price: 1.99,
    synopsis: "Una familia hereda una mansión victoriana. La mansión tiene memoria propia.",
    chapters: [
      { id: 1, title: "Llegada", content: `La llave no debería haber girado tan fácil.\n\nPero giró. Suave. Como si la casa hubiera estado esperando.\n\n—No me gusta —dijo Clara desde el camino.\n\nEl vestíbulo olía a alcanfor. Las paredes estaban cubiertas de retratos, todos con la misma expresión. No de miedo. De espera.\n\n—¿Cuántos retratos contaste tú? —preguntó Clara en voz muy baja.\n\nDiecisiete. En su primera inspección había contado dieciséis.` },
    ]
  },
  { id: 4, title: "Azul orbital", author: "Nicolás Ferreira", genre: "Ciencia ficción", reads: 5200, likes: 390, cover: COVERS[3], status: "En curso", price: 3.49,
    synopsis: "Un astrónomo descubre una señal artificial en el borde del sistema solar.",
    chapters: [
      { id: 1, title: "Señal", content: `La señal no debería existir.\n\nKenji llevaba diecisiete años buscando señales. Esto no se parecía a un patrón.\n\nEsto era un patrón.\n\nPulsaba en series de números primos: 2, 3, 5, 7, 11... Hasta el 89, y luego empezaba de nuevo.` },
    ]
  },
  { id: 5, title: "El peso de los nombres", author: "Isabella Montoya", genre: "Drama", reads: 15600, likes: 1104, cover: COVERS[4], status: "Completa", price: 0,
    synopsis: "Tres generaciones de mujeres con el mismo nombre, tres formas distintas de ser invisibles.",
    chapters: [
      { id: 1, title: "La primera Remedios", content: `Mi abuela nunca eligió su nombre.\n\n—Yo nunca fui Remedios por dentro —dijo sin levantar la vista de los frijoles—. Yo siempre fui Alma.\n\nNunca se lo dijo a nadie. Setenta y tres años siendo Remedios por fuera, Alma por dentro.\n\nYo tengo su mismo nombre. A veces me pregunto cuál es el mío.` },
    ]
  },
  { id: 6, title: "El detective de los sueños", author: "Marco Rivera", genre: "Misterio", reads: 7300, likes: 521, cover: COVERS[5], status: "En curso", price: 2.49,
    synopsis: "En una ciudad donde los sueños se pueden grabar y vender, un detective investiga un robo imposible.",
    chapters: [
      { id: 1, title: "El robo", content: `Los sueños no se roban fácilmente.\n\nY sin embargo, alguien le había robado un sueño a Leonora Vásquez. El único que había tenido durante veinte años.\n\n—Necesito que encuentre algo que no debería existir —dijo ella.\n\nYo soy Blas Montes, detective onírico. He visto cosas extrañas. Esta fue la más extraña de todas.` },
    ]
  },
];

function fmtNum(n) { return n >= 1000 ? (n / 1000).toFixed(1) + "k" : n.toString(); }
function fmtPrice(p) { return p === 0 ? "Gratis" : `$${p.toFixed(2)}`; }
function isValidEmail(e) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e); }

// ── BookCover ─────────────────────────────────────────────
function BookCover({ story, size = "md", onClick }) {
  const dims = size === "sm" ? { w: 80, h: 116 } : size === "lg" ? { w: 140, h: 210 } : { w: 108, h: 160 };
  return (
    <div onClick={onClick} style={{
      width: dims.w, height: dims.h, flexShrink: 0, background: story.cover, borderRadius: 4,
      cursor: onClick ? "pointer" : "default", boxShadow: "3px 4px 12px rgba(0,0,0,0.35), inset -2px 0 6px rgba(0,0,0,0.2)",
      position: "relative", overflow: "hidden", transition: "transform 0.18s, box-shadow 0.18s",
    }}
      onMouseEnter={e => { if (onClick) { e.currentTarget.style.transform = "translateY(-3px)"; } }}
      onMouseLeave={e => { e.currentTarget.style.transform = ""; }}>
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 8, background: "rgba(0,0,0,0.25)" }} />
      <div style={{ position: "absolute", inset: 0, padding: "10px 8px 8px 12px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div style={{ fontSize: size === "sm" ? 9 : 11, fontWeight: 800, color: "rgba(255,255,255,0.95)", lineHeight: 1.3, fontFamily: "Georgia, serif", textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}>{story.title}</div>
        <div style={{ fontSize: size === "sm" ? 8 : 9, color: "rgba(255,255,255,0.7)" }}>{story.author}</div>
      </div>
      {story.price > 0 && (
        <div style={{ position: "absolute", top: 6, right: 6, background: "rgba(245,166,35,0.95)", color: "#1a1a2e", fontSize: 9, fontWeight: 800, padding: "2px 6px", borderRadius: 4 }}>
          {fmtPrice(story.price)}
        </div>
      )}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 60%)", pointerEvents: "none" }} />
    </div>
  );
}

// ── StoryCard ─────────────────────────────────────────────
function StoryCard({ story, onOpen, onAuthor }) {
  return (
    <div style={{ display: "flex", gap: 16, padding: "16px 0", borderBottom: "1px solid #2a2a4a", cursor: "pointer" }} onClick={() => onOpen(story)}>
      <BookCover story={story} size="md" />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 8, flexWrap: "wrap" }}>
          <span style={{ fontSize: 11, background: "#e94560", color: "#fff", padding: "2px 7px", borderRadius: 3, fontWeight: 700, flexShrink: 0 }}>{story.genre}</span>
          <span style={{ fontSize: 11, color: story.status === "Completa" ? "#1b998b" : "#f5a623", fontWeight: 600, flexShrink: 0 }}>{story.status === "Completa" ? "✓ Completa" : "● En curso"}</span>
          {story.price > 0 && <span style={{ fontSize: 11, color: "#f5a623", fontWeight: 700, flexShrink: 0 }}>💰 {fmtPrice(story.price)}</span>}
        </div>
        <h3 style={{ margin: "6px 0 3px", fontSize: 16, fontWeight: 800, color: "#f0eae0", fontFamily: "Georgia, serif", lineHeight: 1.25 }}>{story.title}</h3>
        <div onClick={(e) => { e.stopPropagation(); onAuthor(story.author); }} style={{ fontSize: 12.5, color: "#8888aa", marginBottom: 6, cursor: "pointer", textDecoration: "underline", textDecorationColor: "transparent" }}
          onMouseEnter={e => e.currentTarget.style.textDecorationColor = "#8888aa"} onMouseLeave={e => e.currentTarget.style.textDecorationColor = "transparent"}>
          por {story.author}
        </div>
        <p style={{ margin: "0 0 10px", fontSize: 13, color: "#b0aac4", lineHeight: 1.6, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{story.synopsis}</p>
        <div style={{ display: "flex", gap: 14, fontSize: 12, color: "#6666aa" }}>
          <span>👁 {fmtNum(story.reads)}</span><span>❤️ {fmtNum(story.likes)}</span><span>📄 {story.chapters.length} cap.</span>
        </div>
      </div>
    </div>
  );
}

// ── BookReader ─────────────────────────────────────────────
function BookReader({ story, onClose, owned, onBuy }) {
  const [chapterIdx, setChapterIdx] = useState(0);
  const [fontSize, setFontSize] = useState(17);
  const [page, setPage] = useState(0);
  const contentRef = useRef(null);
  const chapter = story.chapters[chapterIdx];
  const paragraphs = chapter ? chapter.content.split("\n\n").filter(Boolean) : [];
  const locked = story.price > 0 && !owned && page > 0;

  useEffect(() => { contentRef.current?.scrollTo(0, 0); }, [chapterIdx, page]);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100, background: "linear-gradient(160deg, #0f0f1e 0%, #1a1a2e 100%)", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 20px", background: "rgba(0,0,0,0.4)", borderBottom: "1px solid #2a2a4a" }}>
        <button onClick={onClose} style={{ background: "none", border: "none", color: "#8888aa", cursor: "pointer", fontSize: 22, lineHeight: 1 }}>←</button>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#f0eae0", fontFamily: "Georgia, serif" }}>{story.title}</div>
          <div style={{ fontSize: 11, color: "#6666aa" }}>{page === 0 ? "Portada" : chapter.title}</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => setFontSize(f => Math.max(13, f - 1))} style={{ background: "none", border: "1px solid #2a2a4a", color: "#8888aa", borderRadius: 4, width: 28, height: 28, cursor: "pointer", fontSize: 14 }}>A-</button>
          <button onClick={() => setFontSize(f => Math.min(24, f + 1))} style={{ background: "none", border: "1px solid #2a2a4a", color: "#8888aa", borderRadius: 4, width: 28, height: 28, cursor: "pointer", fontSize: 14 }}>A+</button>
        </div>
      </div>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <div style={{ width: 200, background: "rgba(0,0,0,0.3)", borderRight: "1px solid #2a2a4a", overflowY: "auto", padding: "12px 0", flexShrink: 0 }}>
          <div style={{ fontSize: 10, color: "#4a4a6a", fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", padding: "0 14px 8px" }}>Contenido</div>
          <button onClick={() => setPage(0)} style={{ width: "100%", textAlign: "left", background: page === 0 ? "rgba(233,69,96,0.15)" : "none", border: "none", color: page === 0 ? "#e94560" : "#8888aa", padding: "8px 14px", cursor: "pointer", fontSize: 12.5, borderLeft: page === 0 ? "3px solid #e94560" : "3px solid transparent" }}>📖 Portada</button>
          {story.chapters.map((ch, i) => (
            <button key={ch.id} onClick={() => { setChapterIdx(i); setPage(1); }} style={{ width: "100%", textAlign: "left", background: page > 0 && chapterIdx === i ? "rgba(233,69,96,0.15)" : "none", border: "none", color: page > 0 && chapterIdx === i ? "#e94560" : "#8888aa", padding: "8px 14px", cursor: "pointer", fontSize: 12.5, borderLeft: page > 0 && chapterIdx === i ? "3px solid #e94560" : "3px solid transparent" }}>
              <div style={{ fontSize: 10, color: "#4a4a6a", marginBottom: 1 }}>Cap. {i + 1}{story.price > 0 && !owned && i > 0 ? " 🔒" : ""}</div>
              {ch.title}
            </button>
          ))}
        </div>

        <div ref={contentRef} style={{ flex: 1, overflowY: "auto", display: "flex", justifyContent: "center", padding: "40px 20px" }}>
          {page === 0 ? (
            <div style={{ maxWidth: 500, width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>
              <BookCover story={story} size="lg" />
              <div style={{ textAlign: "center" }}>
                <h1 style={{ margin: "0 0 6px", fontSize: 28, fontFamily: "Georgia, serif", color: "#f0eae0", fontWeight: 800 }}>{story.title}</h1>
                <div style={{ fontSize: 15, color: "#8888aa", marginBottom: 20 }}>por {story.author}</div>
                <div style={{ display: "flex", gap: 16, justifyContent: "center", marginBottom: 24, fontSize: 13, color: "#6666aa" }}>
                  <span>👁 {fmtNum(story.reads)} lecturas</span><span>❤️ {fmtNum(story.likes)} me gusta</span>
                </div>
                <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid #2a2a4a", borderRadius: 10, padding: "18px 22px", textAlign: "left", marginBottom: 24 }}>
                  <div style={{ fontSize: 10, color: "#4a4a6a", fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8 }}>Sinopsis</div>
                  <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.75, color: "#b0aac4", fontFamily: "Georgia, serif" }}>{story.synopsis}</p>
                </div>
                {story.price > 0 && !owned ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "center" }}>
                    <div style={{ fontSize: 13, color: "#8888aa" }}>El primer capítulo es gratis. El resto del libro cuesta:</div>
                    <button onClick={() => onBuy(story)} style={{ background: "#f5a623", border: "none", color: "#1a1a2e", padding: "12px 32px", borderRadius: 8, fontSize: 15, fontWeight: 800, cursor: "pointer" }}>
                      💰 Comprar libro completo · {fmtPrice(story.price)}
                    </button>
                    <button onClick={() => { setChapterIdx(0); setPage(1); }} style={{ background: "none", border: "1px solid #2a2a4a", color: "#8888aa", padding: "9px 24px", borderRadius: 8, fontSize: 13, cursor: "pointer" }}>Leer capítulo 1 gratis →</button>
                  </div>
                ) : (
                  <button onClick={() => { setChapterIdx(0); setPage(1); }} style={{ background: "#e94560", border: "none", color: "#fff", padding: "12px 32px", borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Leer capítulo 1 →</button>
                )}
              </div>
            </div>
          ) : locked && chapterIdx > 0 ? (
            <div style={{ maxWidth: 480, width: "100%", textAlign: "center", paddingTop: 60 }}>
              <div style={{ fontSize: 44, marginBottom: 16 }}>🔒</div>
              <h2 style={{ fontSize: 22, color: "#f0eae0", fontFamily: "Georgia, serif", marginBottom: 10 }}>Capítulo bloqueado</h2>
              <p style={{ color: "#8888aa", fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>Compra el libro completo para seguir leyendo "{story.title}" y todos sus capítulos.</p>
              <button onClick={() => onBuy(story)} style={{ background: "#f5a623", border: "none", color: "#1a1a2e", padding: "12px 32px", borderRadius: 8, fontSize: 15, fontWeight: 800, cursor: "pointer" }}>💰 Comprar · {fmtPrice(story.price)}</button>
            </div>
          ) : (
            <div style={{ maxWidth: 640, width: "100%" }}>
              <div style={{ fontSize: 11, color: "#4a4a6a", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>Capítulo {chapterIdx + 1}</div>
              <h2 style={{ margin: "0 0 32px", fontSize: 26, fontFamily: "Georgia, serif", color: "#f0eae0", fontWeight: 800, lineHeight: 1.2 }}>{chapter.title}</h2>
              {paragraphs.map((p, i) => (
                <p key={i} style={{ margin: "0 0 22px", fontSize, lineHeight: 1.85, color: "#ccc8e0", fontFamily: "Georgia, serif", textAlign: "justify", textIndent: i === 0 ? 0 : "1.5em" }}>{p}</p>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 40, paddingTop: 20, borderTop: "1px solid #2a2a4a" }}>
                <button onClick={() => { if (chapterIdx > 0) setChapterIdx(c => c - 1); else setPage(0); }} style={{ background: "none", border: "1px solid #2a2a4a", color: "#8888aa", padding: "8px 18px", borderRadius: 6, cursor: "pointer", fontSize: 13 }}>← Anterior</button>
                {chapterIdx < story.chapters.length - 1 && (
                  <button onClick={() => setChapterIdx(c => c + 1)} disabled={story.price > 0 && !owned && chapterIdx === 0} style={{ background: "#e94560", border: "none", color: "#fff", padding: "8px 18px", borderRadius: 6, cursor: "pointer", fontSize: 13, fontWeight: 700 }}>Siguiente →</button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── BuyModal (simulated checkout) ──────────────────────────
function BuyModal({ story, onClose, onConfirm }) {
  const [stage, setStage] = useState("confirm"); // confirm -> processing -> done
  const handleBuy = () => {
    setStage("processing");
    setTimeout(() => { setStage("done"); onConfirm(story.id); }, 1100);
  };
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 250, background: "rgba(0,0,0,0.75)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ background: "#1a1a2e", border: "1px solid #2a2a4a", borderRadius: 16, width: "100%", maxWidth: 380, padding: 28, textAlign: "center" }}>
        {stage === "confirm" && (
          <>
            <BookCover story={story} size="sm" />
            <h3 style={{ margin: "16px 0 4px", fontSize: 17, color: "#f0eae0", fontFamily: "Georgia, serif" }}>{story.title}</h3>
            <div style={{ fontSize: 12, color: "#6666aa", marginBottom: 18 }}>por {story.author}</div>
            <div style={{ background: "#0f0f1e", border: "1px solid #2a2a4a", borderRadius: 8, padding: "14px", marginBottom: 18, display: "flex", justifyContent: "space-between", fontSize: 14 }}>
              <span style={{ color: "#8888aa" }}>Total</span><span style={{ color: "#f5a623", fontWeight: 800 }}>{fmtPrice(story.price)}</span>
            </div>
            <p style={{ fontSize: 11, color: "#4a4a6a", marginBottom: 18, lineHeight: 1.5 }}>Esto es una simulación de pago. Ningún cargo real será realizado.</p>
            <button onClick={handleBuy} style={{ width: "100%", background: "#f5a623", border: "none", color: "#1a1a2e", padding: "12px", borderRadius: 8, fontSize: 14, fontWeight: 800, cursor: "pointer", marginBottom: 8 }}>Confirmar compra simulada</button>
            <button onClick={onClose} style={{ width: "100%", background: "none", border: "1px solid #2a2a4a", color: "#8888aa", padding: "10px", borderRadius: 8, fontSize: 13, cursor: "pointer" }}>Cancelar</button>
          </>
        )}
        {stage === "processing" && (
          <div style={{ padding: "30px 0" }}>
            <div style={{ width: 32, height: 32, border: "3px solid #2a2a4a", borderTopColor: "#f5a623", borderRadius: "50%", margin: "0 auto 16px", animation: "spin 0.7s linear infinite" }} />
            <div style={{ color: "#8888aa", fontSize: 13 }}>Procesando compra simulada...</div>
          </div>
        )}
        {stage === "done" && (
          <div style={{ padding: "20px 0" }}>
            <div style={{ fontSize: 40, marginBottom: 10 }}>✓</div>
            <div style={{ color: "#1b998b", fontWeight: 700, fontSize: 15, marginBottom: 6 }}>¡Compra simulada exitosa!</div>
            <div style={{ color: "#6666aa", fontSize: 12.5, marginBottom: 18 }}>Ya tienes acceso completo al libro.</div>
            <button onClick={onClose} style={{ width: "100%", background: "#e94560", border: "none", color: "#fff", padding: "11px", borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Seguir leyendo</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Auth (email signup / login) ────────────────────────────
function AuthModal({ onClose, onAuth }) {
  const [mode, setMode] = useState("login"); // login | signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const submit = () => {
    setError("");
    if (!isValidEmail(email)) return setError("Ingresa un correo electrónico válido.");
    if (password.length < 6) return setError("La contraseña debe tener al menos 6 caracteres.");
    if (mode === "signup" && !name.trim()) return setError("Ingresa tu nombre de autor.");

    if (mode === "signup") {
      setSent(true); // simulate verification email step
      setTimeout(() => { onAuth({ name, email, avatar: "📘", bio: "Nuevo autor en Books.", joined: "2026" }); }, 1400);
    } else {
      onAuth({ name: email.split("@")[0], email, avatar: "📘", bio: "", joined: "2026" });
    }
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 250, background: "rgba(0,0,0,0.75)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ background: "#1a1a2e", border: "1px solid #2a2a4a", borderRadius: 16, width: "100%", maxWidth: 400, padding: 28 }}>
        {sent ? (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ fontSize: 38, marginBottom: 14 }}>📩</div>
            <div style={{ color: "#f0eae0", fontWeight: 700, fontSize: 15, marginBottom: 6 }}>Revisa tu correo</div>
            <div style={{ color: "#8888aa", fontSize: 12.5, lineHeight: 1.6 }}>Enviamos un enlace de verificación simulado a {email}. Creando tu cuenta...</div>
          </div>
        ) : (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h2 style={{ margin: 0, fontSize: 19, color: "#f0eae0", fontFamily: "Georgia, serif" }}>{mode === "login" ? "Iniciar sesión" : "Crear cuenta"}</h2>
              <button onClick={onClose} style={{ background: "none", border: "none", color: "#6666aa", cursor: "pointer", fontSize: 20 }}>✕</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {mode === "signup" && (
                <div>
                  <label style={labelStyle}>Nombre de autor</label>
                  <input value={name} onChange={e => setName(e.target.value)} placeholder="Cómo te verán los lectores" style={fieldStyle()} />
                </div>
              )}
              <div>
                <label style={labelStyle}>Correo electrónico</label>
                <input value={email} onChange={e => setEmail(e.target.value)} placeholder="tu@correo.com" type="email" style={fieldStyle()} />
              </div>
              <div>
                <label style={labelStyle}>Contraseña</label>
                <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Mínimo 6 caracteres" type="password" style={fieldStyle()} />
              </div>
              {error && <div style={{ color: "#e94560", fontSize: 12.5 }}>{error}</div>}
              <button onClick={submit} style={primaryBtn(false)}>{mode === "login" ? "Entrar" : "Crear cuenta y verificar correo"}</button>
              <div style={{ textAlign: "center", fontSize: 12.5, color: "#6666aa" }}>
                {mode === "login" ? "¿No tienes cuenta? " : "¿Ya tienes cuenta? "}
                <span onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); }} style={{ color: "#e94560", cursor: "pointer", fontWeight: 700 }}>
                  {mode === "login" ? "Regístrate" : "Inicia sesión"}
                </span>
              </div>
              <div style={{ fontSize: 10.5, color: "#4a4a6a", textAlign: "center", lineHeight: 1.5, marginTop: 4 }}>
                Esta es una autenticación simulada para esta demo. No se envían correos reales.
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ── AuthorProfile ───────────────────────────────────────────
function AuthorProfile({ authorName, stories, onClose, onOpen, currentUser, onUpdateProfile,  onDeleteStory }) {
  const isMe = currentUser && currentUser.name === authorName;
  const info = isMe ? currentUser : (AUTHORS[authorName] || { bio: "Autor en Books.", joined: "2025", avatar: "📘" });
  const [editing, setEditing] = useState(false);
  const [bioDraft, setBioDraft] = useState(info.bio);
  const authorStories = stories.filter(s => s.author === authorName);
  const totalReads = authorStories.reduce((a, s) => a + s.reads, 0);
  const totalLikes = authorStories.reduce((a, s) => a + s.likes, 0);
  const earnings = authorStories.reduce((a, s) => a + s.price * Math.round(s.reads * 0.03), 0);

  const saveBio = () => { onUpdateProfile({ ...currentUser, bio: bioDraft }); setEditing(false); };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 150, background: "#0f0f1e", overflowY: "auto" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "20px 20px 60px" }}>
        <button onClick={onClose} style={{ background: "none", border: "none", color: "#8888aa", cursor: "pointer", fontSize: 22, marginBottom: 16 }}>← Volver</button>

        <div style={{ display: "flex", gap: 20, alignItems: "center", marginBottom: 24, flexWrap: "wrap" }}>
          <div style={{ width: 76, height: 76, borderRadius: "50%", background: "linear-gradient(145deg,#e94560,#533483)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, flexShrink: 0 }}>{info.avatar}</div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <h1 style={{ margin: "0 0 4px", fontSize: 24, color: "#f0eae0", fontFamily: "Georgia, serif", fontWeight: 800 }}>{authorName}</h1>
            <div style={{ fontSize: 12.5, color: "#6666aa" }}>Autor desde {info.joined}{isMe && <span style={{ color: "#1b998b", marginLeft: 8 }}>· Tu perfil</span>}</div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
          {[{ label: "Historias", val: authorStories.length }, { label: "Lecturas", val: fmtNum(totalReads) }, { label: "Me gusta", val: fmtNum(totalLikes) }].concat(isMe ? [{ label: "Ganancias est.", val: "$" + earnings.toFixed(2) }] : []).map((s, i) => (
            <div key={i} style={{ flex: 1, minWidth: 90, background: "#1a1a2e", border: "1px solid #2a2a4a", borderRadius: 10, padding: "14px 12px", textAlign: "center" }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: "#f0eae0" }}>{s.val}</div>
              <div style={{ fontSize: 11, color: "#6666aa", marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#1a1a2e", border: "1px solid #2a2a4a", borderRadius: 10, padding: "16px 18px", marginBottom: 28 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 10, color: "#4a4a6a", fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase" }}>Biografía</div>
            {isMe && !editing && <button onClick={() => setEditing(true)} style={{ background: "none", border: "none", color: "#e94560", cursor: "pointer", fontSize: 12, fontWeight: 700 }}>Editar</button>}
          </div>
          {editing ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <textarea value={bioDraft} onChange={e => setBioDraft(e.target.value)} rows={3} style={{ ...fieldStyle(), resize: "vertical" }} />
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={saveBio} style={{ ...primaryBtn(false), flex: 1, padding: "8px" }}>Guardar</button>
                <button onClick={() => { setEditing(false); setBioDraft(info.bio); }} style={{ flex: 1, background: "none", border: "1px solid #2a2a4a", color: "#8888aa", borderRadius: 8, cursor: "pointer" }}>Cancelar</button>
              </div>
            </div>
          ) : (
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: "#b0aac4" }}>{info.bio}</p>
          )}
        </div>

        <div style={{ fontSize: 11, color: "#4a4a6a", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>
          {authorStories.length} historia{authorStories.length !== 1 ? "s" : ""} publicada{authorStories.length !== 1 ? "s" : ""}
        </div>
       {authorStories.map(s => (
  <div key={s.id}>
    <StoryCard
      story={s}
      onOpen={onOpen}
      onAuthor={() => {}}
    />

    {isMe && (
      <div style={{ marginBottom: 20 }}>
        <button
          onClick={() => {
            if (window.confirm(`¿Borrar "${s.title}"?`)) {
              onDeleteStory(s.id);
            }
          }}
          style={{
            background: "#8b0000",
            color: "white",
            border: "none",
            padding: "8px 14px",
            borderRadius: 6,
            cursor: "pointer",
            fontWeight: 700
          }}
        >
          🗑️ Borrar historia
        </button>
      </div>
    )}
  </div>
))}
      </div>
    </div>
  );
}

const labelStyle = { display: "block", fontSize: 11, fontWeight: 700, color: "#6666aa", letterSpacing: 1, textTransform: "uppercase", marginBottom: 5 };
const fieldStyle = () => ({ width: "100%", padding: "10px 12px", background: "#0f0f1e", border: "1px solid #2a2a4a", borderRadius: 8, color: "#f0eae0", fontSize: 14, outline: "none", boxSizing: "border-box" });
const primaryBtn = (disabled) => ({ padding: "12px", background: disabled ? "#2a2a4a" : "#e94560", border: "none", color: disabled ? "#4a4a6a" : "#fff", borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: disabled ? "not-allowed" : "pointer", width: "100%" });

// ── PublishModal ──────────────────────────────────────────
function PublishModal({ onClose, onPublish, currentUser }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ title: "", genre: "Fantasía", synopsis: "", chapterTitle: "", chapterContent: "", cover: COVERS[0], price: "0" });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handlePublish = () => {
    if (!form.title || !form.synopsis || !form.chapterTitle || !form.chapterContent) return;
    onPublish({ id: Date.now(), title: form.title, author: currentUser.name, genre: form.genre, synopsis: form.synopsis, cover: form.cover, status: "En curso", reads: 0, likes: 0, price: parseFloat(form.price) || 0, chapters: [{ id: 1, title: form.chapterTitle, content: form.chapterContent }] });
    onClose();
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.75)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ background: "#1a1a2e", border: "1px solid #2a2a4a", borderRadius: 16, width: "100%", maxWidth: 560, maxHeight: "90vh", overflowY: "auto", padding: 28 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h2 style={{ margin: 0, fontSize: 20, color: "#f0eae0", fontFamily: "Georgia, serif" }}>{step === 1 ? "Tu historia" : step === 2 ? "Primer capítulo" : "Vista previa"}</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#6666aa", cursor: "pointer", fontSize: 22 }}>✕</button>
        </div>
        <div style={{ display: "flex", gap: 6, marginBottom: 24 }}>{[1, 2, 3].map(s => <div key={s} style={{ flex: 1, height: 3, borderRadius: 2, background: s <= step ? "#e94560" : "#2a2a4a" }} />)}</div>

        {step === 1 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div><label style={labelStyle}>Título</label><input value={form.title} onChange={e => set("title", e.target.value)} placeholder="El título de tu historia" style={fieldStyle()} /></div>
            <div><label style={labelStyle}>Género</label><select value={form.genre} onChange={e => set("genre", e.target.value)} style={fieldStyle()}>{GENRES.filter(g => g !== "Todos").map(g => <option key={g}>{g}</option>)}</select></div>
            <div><label style={labelStyle}>Sinopsis</label><textarea value={form.synopsis} onChange={e => set("synopsis", e.target.value)} placeholder="Engancha al lector en 2-3 oraciones..." rows={3} style={{ ...fieldStyle(), resize: "vertical" }} /></div>
            <div>
              <label style={labelStyle}>Precio del libro completo (USD)</label>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {[0, 0.99, 1.99, 2.99, 4.99].map(p => (
                  <button key={p} onClick={() => set("price", String(p))} style={{ padding: "7px 14px", borderRadius: 20, border: "1px solid", borderColor: parseFloat(form.price) === p ? "#f5a623" : "#2a2a4a", background: parseFloat(form.price) === p ? "rgba(245,166,35,0.15)" : "none", color: parseFloat(form.price) === p ? "#f5a623" : "#8888aa", fontSize: 12.5, fontWeight: 700, cursor: "pointer" }}>{p === 0 ? "Gratis" : `$${p.toFixed(2)}`}</button>
                ))}
              </div>
              <div style={{ fontSize: 10.5, color: "#4a4a6a", marginTop: 6, lineHeight: 1.4 }}>El primer capítulo siempre es gratuito como muestra.</div>
            </div>
            <div>
              <label style={labelStyle}>Portada</label>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {COVERS.map((c, i) => <div key={i} onClick={() => set("cover", c)} style={{ width: 40, height: 56, background: c, borderRadius: 4, cursor: "pointer", border: form.cover === c ? "2.5px solid #e94560" : "2px solid transparent" }} />)}
              </div>
            </div>
            <button onClick={() => setStep(2)} disabled={!form.title || !form.synopsis} style={primaryBtn(!form.title || !form.synopsis)}>Continuar →</button>
          </div>
        )}

        {step === 2 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div><label style={labelStyle}>Título del capítulo</label><input value={form.chapterTitle} onChange={e => set("chapterTitle", e.target.value)} placeholder="Ej: El comienzo" style={fieldStyle()} /></div>
            <div><label style={labelStyle}>Contenido</label><textarea value={form.chapterContent} onChange={e => set("chapterContent", e.target.value)} placeholder="Escribe aquí tu capítulo..." rows={10} style={{ ...fieldStyle(), resize: "vertical", lineHeight: 1.7, fontFamily: "Georgia, serif" }} /></div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => setStep(1)} style={{ flex: 1, padding: "10px", background: "none", border: "1px solid #2a2a4a", color: "#8888aa", borderRadius: 8, cursor: "pointer" }}>← Atrás</button>
              <button onClick={() => setStep(3)} disabled={!form.chapterTitle || !form.chapterContent} style={{ ...primaryBtn(!form.chapterTitle || !form.chapterContent), flex: 2 }}>Vista previa →</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
              <div style={{ width: 80, height: 116, background: form.cover, borderRadius: 4, boxShadow: "3px 4px 12px rgba(0,0,0,0.4)", flexShrink: 0, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, padding: 6, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div style={{ fontSize: 8.5, fontWeight: 800, color: "rgba(255,255,255,0.95)", fontFamily: "Georgia, serif", lineHeight: 1.3 }}>{form.title || "Título"}</div>
                  <div style={{ fontSize: 7.5, color: "rgba(255,255,255,0.7)" }}>{currentUser.name}</div>
                </div>
              </div>
              <div>
                <div style={{ display: "flex", gap: 6, marginBottom: 6 }}>
                  <span style={{ fontSize: 11, background: "#e94560", color: "#fff", padding: "2px 7px", borderRadius: 3, fontWeight: 700 }}>{form.genre}</span>
                  <span style={{ fontSize: 11, background: parseFloat(form.price) > 0 ? "rgba(245,166,35,0.15)" : "rgba(27,153,138,0.15)", color: parseFloat(form.price) > 0 ? "#f5a623" : "#1b998b", padding: "2px 7px", borderRadius: 3, fontWeight: 700 }}>{parseFloat(form.price) > 0 ? fmtPrice(parseFloat(form.price)) : "Gratis"}</span>
                </div>
                <h3 style={{ margin: "0 0 3px", fontSize: 17, color: "#f0eae0", fontFamily: "Georgia, serif", fontWeight: 800 }}>{form.title}</h3>
                <div style={{ fontSize: 12, color: "#6666aa", marginBottom: 8 }}>por {currentUser.name}</div>
                <p style={{ margin: 0, fontSize: 13, color: "#b0aac4", lineHeight: 1.6 }}>{form.synopsis}</p>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => setStep(2)} style={{ flex: 1, padding: "10px", background: "none", border: "1px solid #2a2a4a", color: "#8888aa", borderRadius: 8, cursor: "pointer" }}>← Editar</button>
              <button onClick={handlePublish} style={{ ...primaryBtn(false), flex: 2 }}>✦ Publicar historia</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main App ──────────────────────────────────────────────
export default function App() {
 const [stories, setStories] = useState(() => {
  const saved = localStorage.getItem("books_stories");

  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return INITIAL_STORIES;
    }
  }

  return INITIAL_STORIES;
});
  const [genre, setGenre] = useState("Todos");
  const [search, setSearch] = useState("");
  const [reading, setReading] = useState(null);
  const [publishing, setPublishing] = useState(false);
  const [toast, setToast] = useState(null);
  const [currentUser, setCurrentUser] = useState(() => {
  const saved = localStorage.getItem("books_user");

  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return null;
    }
  }

  return null;
});
  const [showAuth, setShowAuth] = useState(false);
  const [viewingAuthor, setViewingAuthor] = useState(null);
 const [ownedBooks, setOwnedBooks] = useState(() => {
  const saved = localStorage.getItem("books_owned");

  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return [];
    }
  }

  return [];
});
  const [buying, setBuying] = useState(null);

  const filtered = stories.filter(s => {
    const matchGenre = genre === "Todos" || s.genre === genre;
    const matchSearch = !search || s.title.toLowerCase().includes(search.toLowerCase()) || s.author.toLowerCase().includes(search.toLowerCase());
    return matchGenre && matchSearch;
  });
  const featured = stories.slice(0, 3);

  const handlePublish = (story) => { setStories(prev => [story, ...prev]); setToast("¡Historia publicada con éxito!"); setTimeout(() => setToast(null), 3000); };
  const handleAuth = (user) => { setCurrentUser(user); setShowAuth(false); setToast(`¡Bienvenido/a, ${user.name}!`); setTimeout(() => setToast(null), 2500); };
  const handleBuyConfirm = (storyId) => {
  setOwnedBooks(prev => {
    if (prev.includes(storyId)) return prev;
    return [...prev, storyId];
  });
};
  const tryPublish = () => { if (!currentUser) { setShowAuth(true); } else { setPublishing(true); } };

  useEffect(() => {
  localStorage.setItem(
    "books_stories",
    JSON.stringify(stories)
  );
}, [stories]);

  const deleteStory = (storyId) => {
  setStories(prev =>
    prev.filter(story => story.id !== storyId)
  );

  setToast("Historia eliminada");
  setTimeout(() => setToast(null), 3000);
};

useEffect(() => {
  localStorage.setItem(
    "books_owned",
    JSON.stringify(ownedBooks)
  );
}, [ownedBooks]);

useEffect(() => {
  if (currentUser) {
    localStorage.setItem(
      "books_user",
      JSON.stringify(currentUser)
    );
  } else {
    localStorage.removeItem("books_user");
  }
}, [currentUser]);

  if (reading) return (
    <>
      <BookReader story={reading} onClose={() => setReading(null)} owned={ownedBooks.includes(reading.id)} onBuy={(s) => setBuying(s)} />
      {buying && <BuyModal story={buying} onClose={() => setBuying(null)} onConfirm={handleBuyConfirm} />}
    </>
  );

  if (viewingAuthor) return (
    <AuthorProfile authorName={viewingAuthor} stories={stories} onClose={() => setViewingAuthor(null)} onOpen={setReading} currentUser={currentUser}
      onUpdateProfile={(u) => setCurrentUser(u)} onDeleteStory={deleteStory} />
  );

  return (
    <div style={{ minHeight: "100vh", background: "#0f0f1e", color: "#f0eae0", fontFamily: "system-ui, sans-serif" }}>
      <style>{`* { box-sizing: border-box; } ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #0f0f1e; } ::-webkit-scrollbar-thumb { background: #2a2a4a; border-radius: 2px; } @keyframes spin { to { transform: rotate(360deg); } }`}</style>

      {toast && <div style={{ position: "fixed", top: 20, left: "50%", transform: "translateX(-50%)", zIndex: 300, background: "#1b998b", color: "#fff", padding: "10px 22px", borderRadius: 8, fontWeight: 700, fontSize: 14, boxShadow: "0 4px 20px rgba(0,0,0,0.4)" }}>✓ {toast}</div>}

      <div style={{ background: "linear-gradient(180deg, #1a1a2e 0%, #0f0f1e 100%)", borderBottom: "1px solid #2a2a4a", padding: "0 20px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 0", gap: 12 }}>
            <span style={{ fontSize: 21, fontWeight: 900, fontFamily: "Georgia, serif", color: "#f0eae0", letterSpacing: -0.5 }}>Books</span>
            <div style={{ flex: 1, maxWidth: 280 }}>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar historias o autores..." style={{ width: "100%", padding: "8px 14px", background: "#1a1a2e", border: "1px solid #2a2a4a", borderRadius: 20, color: "#f0eae0", fontSize: 13, outline: "none" }} />
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <button onClick={tryPublish} style={{ background: "#e94560", border: "none", color: "#fff", padding: "9px 16px", borderRadius: 8, fontWeight: 700, fontSize: 13, cursor: "pointer", whiteSpace: "nowrap" }}>+ Publicar</button>
              {currentUser ? (
                <div onClick={() => setViewingAuthor(currentUser.name)} style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(145deg,#e94560,#533483)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, cursor: "pointer", flexShrink: 0 }}>{currentUser.avatar}</div>
              ) : (
                <button onClick={() => setShowAuth(true)} style={{ background: "none", border: "1px solid #2a2a4a", color: "#b0aac4", padding: "9px 14px", borderRadius: 8, fontWeight: 600, fontSize: 13, cursor: "pointer", whiteSpace: "nowrap" }}>Entrar</button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "24px 20px" }}>
        {!search && (
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontSize: 10, color: "#4a4a6a", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>Destacados</div>
            <div style={{ display: "flex", gap: 20, overflowX: "auto", paddingBottom: 8 }}>
              {featured.map(story => (
                <div key={story.id} onClick={() => setReading(story)} style={{ flexShrink: 0, width: 200, cursor: "pointer" }}>
                  <div style={{ height: 130, background: story.cover, borderRadius: 10, marginBottom: 10, position: "relative", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.4)" }}>
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)" }} />
                    <div style={{ position: "absolute", bottom: 10, left: 12, right: 12 }}>
                      <div style={{ fontSize: 13, fontWeight: 800, color: "#fff", fontFamily: "Georgia, serif", lineHeight: 1.3 }}>{story.title}</div>
                    </div>
                    {story.price > 0 && <div style={{ position: "absolute", top: 8, right: 8, background: "rgba(245,166,35,0.95)", color: "#1a1a2e", fontSize: 10, fontWeight: 800, padding: "3px 8px", borderRadius: 4 }}>{fmtPrice(story.price)}</div>}
                  </div>
                  <div style={{ fontSize: 12, color: "#8888aa" }}>por {story.author}</div>
                  <div style={{ fontSize: 11, color: "#4a4a6a", marginTop: 2 }}>👁 {fmtNum(story.reads)} · ❤️ {fmtNum(story.likes)}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 4, marginBottom: 20 }}>
          {GENRES.map(g => (
            <button key={g} onClick={() => setGenre(g)} style={{ padding: "6px 14px", borderRadius: 20, border: "1px solid", borderColor: genre === g ? "#e94560" : "#2a2a4a", background: genre === g ? "rgba(233,69,96,0.15)" : "none", color: genre === g ? "#e94560" : "#6666aa", fontSize: 12.5, fontWeight: genre === g ? 700 : 400, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 }}>{g}</button>
          ))}
        </div>

        <div style={{ fontSize: 11, color: "#4a4a6a", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>{filtered.length} historia{filtered.length !== 1 ? "s" : ""}</div>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#4a4a6a" }}><div style={{ fontSize: 40, marginBottom: 12 }}>📚</div><div style={{ fontSize: 15 }}>No hay historias que coincidan</div></div>
        ) : (
          filtered.map(s => <StoryCard key={s.id} story={s} onOpen={setReading} onAuthor={setViewingAuthor} />)
        )}
      </div>

      {publishing && <PublishModal onClose={() => setPublishing(false)} onPublish={handlePublish} currentUser={currentUser} />}
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} onAuth={handleAuth} />}
    </div>
  );
}
