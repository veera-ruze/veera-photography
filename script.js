// Replace these sample image URLs with paths to your own photos, e.g. "images/travel/mountains.jpg".
const photos = [
  {category:"travel",title:"Mountain reflections",src:"https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1600&auto=format&fit=crop&q=85"},
  {category:"travel",title:"Into the mountains",src:"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&auto=format&fit=crop&q=85"},
  {category:"travel",title:"The open road",src:"https://images.unsplash.com/photo-1500534623283-312aade485b7?w=1600&auto=format&fit=crop&q=85"},
  {category:"portraits",title:"Portrait study",src:"https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1600&auto=format&fit=crop&q=85"},
  {category:"portraits",title:"Natural light",src:"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1600&auto=format&fit=crop&q=85"},
  {category:"creative",title:"Color and atmosphere",src:"https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1600&auto=format&fit=crop&q=85"},
  {category:"creative",title:"After dark",src:"https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=1600&auto=format&fit=crop&q=85"}
];
let category = "all";
let index = 0;
const image = document.querySelector("#gallery-image");
const caption = document.querySelector("#gallery-caption");
const counter = document.querySelector("#gallery-counter");
const thumbs = document.querySelector("#gallery-thumbs");
const tabs = document.querySelectorAll(".tab");
const filtered = () => category === "all" ? photos : photos.filter(photo => photo.category === category);
function render() {
  const items = filtered();
  if (!items.length) return;
  index = ((index % items.length) + items.length) % items.length;
  const current = items[index];
  image.src = current.src;
  image.alt = current.title + " — sample " + current.category + " photograph";
  caption.textContent = current.title;
  counter.textContent = (index + 1) + " / " + items.length;
  thumbs.replaceChildren();
  items.forEach((photo, i) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = i === index ? "active" : "";
    button.setAttribute("aria-label", "View " + photo.title);
    button.setAttribute("aria-current", i === index ? "true" : "false");
    const thumb = document.createElement("img");
    thumb.src = photo.src.replace("w=1600", "w=220");
    thumb.alt = "";
    thumb.loading = "lazy";
    button.appendChild(thumb);
    button.addEventListener("click", () => {index = i;render();});
    thumbs.appendChild(button);
  });
}
function move(delta) { index += delta; render(); }
document.querySelector(".prev").addEventListener("click", () => move(-1));
document.querySelector(".next").addEventListener("click", () => move(1));
tabs.forEach(tab => tab.addEventListener("click", () => {
  category = tab.dataset.category;
  index = 0;
  tabs.forEach(t => {const selected = t === tab;t.classList.toggle("active",selected);t.setAttribute("aria-pressed",String(selected));});
  render();
}));
document.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft") move(-1);
  if (e.key === "ArrowRight") move(1);
});
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("#site-nav");
toggle.addEventListener("click", () => {const open = nav.classList.toggle("open");toggle.setAttribute("aria-expanded",String(open));});
nav.querySelectorAll("a").forEach(a => a.addEventListener("click",()=>{nav.classList.remove("open");toggle.setAttribute("aria-expanded","false");}));
document.querySelector("#year").textContent = new Date().getFullYear();
render();