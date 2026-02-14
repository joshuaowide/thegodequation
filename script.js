(function () {
  // Set footer year
  const y = document.querySelector("[data-year]");
  if (y) y.textContent = new Date().getFullYear();

  // Print helper
  document.querySelectorAll("[data-print]").forEach((btn) => {
    btn.addEventListener("click", () => window.print());
  });

  // Gentle enhancement: footnote hover preview (desktop)
  const isFinePointer = window.matchMedia("(hover:hover) and (pointer:fine)").matches;
  if (isFinePointer) {
    const refs = document.querySelectorAll(".fn-ref a[href^='#fn-']");
    refs.forEach((ref) => {
      const target = document.querySelector(ref.getAttribute("href"));
      if (!target) return;

      let tip;
      const show = () => {
        tip = document.createElement("div");
        tip.className = "fn-tooltip";
        tip.setAttribute("role", "tooltip");

        // clone text only (keep it short)
        const text = target.textContent.trim().replace(/\s+/g, " ");
        tip.textContent = text.length > 220 ? text.slice(0, 217) + "…" : text;

        document.body.appendChild(tip);

        const r = ref.getBoundingClientRect();
        const pad = 10;
        tip.style.left = Math.min(window.innerWidth - tip.offsetWidth - pad, r.left) + "px";
        tip.style.top = (window.scrollY + r.bottom + 8) + "px";
      };

      const hide = () => {
        if (tip) tip.remove();
        tip = null;
      };

      ref.addEventListener("mouseenter", show);
      ref.addEventListener("mouseleave", hide);
      ref.addEventListener("focus", show);
      ref.addEventListener("blur", hide);
    });

    // Tooltip styles injected so CSS file stays “print-like”
    const style = document.createElement("style");
    style.textContent = `
      .fn-tooltip{
        position:absolute;
        max-width: 420px;
        padding:.55rem .7rem;
        border:1px solid rgba(0,0,0,.18);
        border-radius:10px;
        background: rgba(255,255,255,.92);
        box-shadow: 0 12px 30px rgba(0,0,0,.12);
        font: 0.95rem/1.45 "STIX Two Text","Times New Roman",serif;
        color:#111;
        z-index: 9999;
        backdrop-filter: blur(2px);
      }
    `;
    document.head.appendChild(style);
  }
})();
