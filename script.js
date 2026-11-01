/* =====================================================================
 *  EDIT EVERYTHING HERE
 * ===================================================================== */

const EMAIL = "jongenyani1@gmail.com";

// The big tiles under "VIND MIJ".
//   image – a picture in /assets (leave "" for a placeholder)
const SOCIALS = [
  {
    name: "Instagram",
    tag: "MAIN",
    handle: "@yanijongen",
    link: "https://www.instagram.com/yanijongen",
    image: "assets/Yani40.jpeg",
  },
  {
    name: "Instagram",
    tag: "PORTFOLIO",
    handle: "@ishetnouyaofni",
    link: "https://www.instagram.com/ishetnouyaofni",
    image: "assets/Yani32.jpeg",
  },
  {
    name: "TikTok",
    tag: "",
    handle: "@yanijemoeder_",
    link: "https://www.tiktok.com/@yanijemoeder_",
    image: "assets/Yani46.jpeg",
  },
];

// Words that scroll past in the zigzag ribbon.
const RIBBON_WORDS = ["FASHION", "ART", "HAUTE COUTURE", "DESIGN", "PAINTING"];

// The carousel under "DINGEN DIE IK MAAKTE".
//   title     – name of the piece
//   type      – small label (e.g. "foto", "video", "tekening")
//   desc      – optional short description
//   images    – list of pictures in /assets. Clicking the card opens a
//               pop-up gallery of these. The first one is the card cover.
//   cover     – optional: use a different picture as the card cover
//   link      – optional: adds a "BEKIJK ↗" button in the pop-up.
//               If there are NO images, clicking the card goes straight here.
//   linkLabel – optional: text for that button (default "BEKIJK")
//
// TODO: these groupings are just examples, regroup the photos per project.
const PROJECTS = [
  {
    title: "School",
    type: "art",
    desc: "Verschillende oefeningen, projecten en proeven die ik voor school gemaakt heb",
    images: ["assets/Yani2.jpeg", "assets/Yani25.jpeg", "assets/Yani28.jpeg", "assets/Yani36.jpeg", "assets/Yani37.jpeg", "assets/Yani39.jpeg", "assets/Yani4.jpeg", "assets/Yani3.jpeg", "assets/Yani26.jpeg"]
  },
  {
    title: "Designs",
    type: "design",
    desc: "Designs voor verschillende outfits",
    images: ["assets/Yani29.jpeg", "assets/Yani30.jpeg", "assets/Yani31.jpeg", "assets/Yani32.jpeg", "assets/Yani33.jpeg", "assets/Yani34.jpeg", "assets/Yani35.jpeg"],
  },
  {
    title: "Future Village",
    type: "fashion",
    desc: "Presentatie van mijn collectie bij Future Village Festival",
    images: ["assets/Yani42.jpeg", "assets/Yani40.jpeg", "assets/Yani41.jpeg", "assets/Yani43.jpeg", "assets/Yani44.jpeg", "assets/Yani45.jpeg", "assets/Yani46.jpeg"],
  },
  {
    title: "De Nachtzuster",
    type: "fashion",
    desc: "Presentatie van mijn collectie in De Nachtzuster in Tilburg.",
    images: ["assets/Yani10.jpeg", "assets/Yani5.jpeg", "assets/Yani6.jpeg", "assets/Yani7.jpeg", "assets/Yani8.jpeg", "assets/Yani9.jpeg", "assets/Yani11.jpeg", "assets/Yani12.jpeg", "assets/Yani13.jpeg", "assets/Yani14.jpeg", "assets/Yani15.jpeg", "assets/Yani16.jpeg", "assets/Yani17.jpeg", "assets/Yani18.jpeg", "assets/Yani19.jpeg", "assets/Yani20.jpeg", "assets/Yani21.jpeg", "assets/Yani22.jpeg", "assets/Yani23.jpeg", "assets/Yani24.jpeg"],
  },
  {
    title: "Kunstbende Young Creators Festival",
    type: "fashion",
    desc: "Het filmpje van  de presentatie van mijn collectie op Kunstbende Young Creators Festival",
    cover: "assets/Yani47.jpeg",
    link: "https://www.youtube.com/watch?v=FteNAZ6H6kE",
  },
  {
    title: "Roomtour",
    type: "fun",
    desc: "Kunstbende kwam op bezoek op mijn kamer",
    images: [],                    // empty → the card links directly
    cover: "assets/Yani34.jpeg",   // picture shown on the card
    link: "https://www.youtube.com/watch?v=trTpLgCnzPg",
  }
];

/* ===================================================================== */

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function linkTo(url) {
  const a = el("a");
  a.href = url || "#";
  if (url && url.startsWith("http")) {
    a.target = "_blank";
    a.rel = "noopener";
  }
  return a;
}

function media(image, alt, placeholderText) {
  if (image) {
    const img = el("img");
    img.src = image;
    img.alt = alt;
    img.loading = "lazy";
    return img;
  }
  return el("div", "placeholder", placeholderText);
}

/* ---- socials ---- */
const socialsGrid = document.getElementById("socials-grid");
SOCIALS.forEach((s) => {
  const a = linkTo(s.link);
  a.className = "social";

  const box = el("div", "social__media");
  box.append(media(s.image, `${s.name} ${s.tag}`.trim(), "foto hier"));
  if (s.tag) box.append(el("span", "sticker social__tag", s.tag));

  const info = el("div", "social__info");
  info.append(el("span", "social__name", s.name.toUpperCase() + " ↗"));
  info.append(el("span", "social__handle", s.handle));

  a.append(box, info);
  socialsGrid.append(a);
});

/* ---- ribbon (content doubled so the loop is seamless) ---- */
const ribbonText = RIBBON_WORDS.map((w) => `${w} ✦`).join(" ");
const ribbon = document.getElementById("ribbon");
for (let i = 0; i < 4; i++) ribbon.append(el("span", "", ribbonText));

/* ---- carousel ---- */
const carousel = document.getElementById("carousel");
PROJECTS.forEach((p) => {
  const li = el("li", "card");
  const images = p.images || [];
  const hasGallery = images.length > 0;

  // With images → open the pop-up; without → plain link.
  const a = linkTo(hasGallery ? "#" : p.link);
  if (hasGallery) {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      openGallery(p);
    });
  }

  const box = el("div", "card__media");
  box.append(media(p.cover || images[0] || p.image, p.title, "binnenkort"));
  if (hasGallery && images.length > 1) {
    box.append(el("span", "sticker card__count", `${images.length} FOTO'S`));
  }

  const meta = el("div", "card__meta");
  meta.append(el("h3", "card__title", p.title.toUpperCase()));
  if (p.type) meta.append(el("span", "card__type", p.type));

  a.append(box, meta);
  if (p.desc) a.append(el("p", "card__desc", p.desc));
  li.append(a);
  carousel.append(li);
});

const arrows = document.querySelectorAll(".arrow");

function step() {
  const card = carousel.querySelector(".card");
  if (!card) return 0;
  const gap = parseFloat(getComputedStyle(carousel).columnGap) || 0;
  return card.getBoundingClientRect().width + gap;
}

arrows.forEach((btn) =>
  btn.addEventListener("click", () => {
    carousel.scrollBy({ left: step() * Number(btn.dataset.dir) });
  })
);

function updateArrows() {
  const max = carousel.scrollWidth - carousel.clientWidth - 2;
  arrows[0].disabled = carousel.scrollLeft <= 2;
  arrows[1].disabled = carousel.scrollLeft >= max;
}
carousel.addEventListener("scroll", updateArrows, { passive: true });
window.addEventListener("resize", updateArrows);
updateArrows();

carousel.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") { e.preventDefault(); carousel.scrollBy({ left: step() }); }
  if (e.key === "ArrowLeft")  { e.preventDefault(); carousel.scrollBy({ left: -step() }); }
});

/* ---- pop-up gallery ---- */
const gallery = document.getElementById("gallery");
const gTrack = gallery.querySelector(".gallery__track");
const gTitle = gallery.querySelector(".gallery__title");
const gDesc = gallery.querySelector(".gallery__desc");
const gCount = gallery.querySelector(".gallery__count");
const gLink = gallery.querySelector(".gallery__link");
const gPrev = gallery.querySelector(".gallery__prev");
const gNext = gallery.querySelector(".gallery__next");

function galleryIndex() {
  return Math.round(gTrack.scrollLeft / gTrack.clientWidth);
}

function galleryGo(i) {
  const n = gTrack.children.length;
  i = Math.max(0, Math.min(n - 1, i));
  gTrack.scrollTo({ left: i * gTrack.clientWidth });
}

function updateGallery() {
  const n = gTrack.children.length;
  const i = galleryIndex();
  gCount.textContent = `${i + 1} / ${n}`;
  gPrev.disabled = i <= 0;
  gNext.disabled = i >= n - 1;
}

function openGallery(p) {
  gTrack.replaceChildren(
    ...p.images.map((src, i) => {
      const slide = el("div", "gallery__slide");
      const img = el("img");
      img.src = src;
      img.alt = `${p.title} — ${i + 1}`;
      slide.append(img);
      return slide;
    })
  );
  gTitle.textContent = p.title.toUpperCase();
  gDesc.textContent = p.desc || "";
  gDesc.hidden = !p.desc;

  if (p.link && p.link !== "#") {
    gLink.href = p.link;
    gLink.textContent = `${p.linkLabel || "BEKIJK"} ↗`;
    gLink.hidden = false;
  } else {
    gLink.hidden = true;
  }

  const single = p.images.length < 2;
  gPrev.hidden = gNext.hidden = gCount.hidden = single;

  gallery.showModal();
  document.body.style.overflow = "hidden";
  gTrack.scrollLeft = 0;
  updateGallery();
}

gallery.addEventListener("close", () => {
  document.body.style.overflow = "";
});
gallery.querySelector(".gallery__close").addEventListener("click", () => gallery.close());
// click on the dark backdrop (outside the image) closes it
gallery.addEventListener("click", (e) => {
  if (e.target === gallery || e.target.classList.contains("gallery__slide")) gallery.close();
});
gPrev.addEventListener("click", () => galleryGo(galleryIndex() - 1));
gNext.addEventListener("click", () => galleryGo(galleryIndex() + 1));
gTrack.addEventListener("scroll", updateGallery, { passive: true });
gallery.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") { e.preventDefault(); galleryGo(galleryIndex() + 1); }
  if (e.key === "ArrowLeft")  { e.preventDefault(); galleryGo(galleryIndex() - 1); }
});

/* ---- email + year ---- */
const emailLink = document.getElementById("email-link");
emailLink.href = `mailto:${EMAIL}`;
emailLink.textContent = EMAIL;
document.getElementById("email-sticker").href = `mailto:${EMAIL}`;

document.getElementById("year").textContent = new Date().getFullYear();
