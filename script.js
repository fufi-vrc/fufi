const cards = document.querySelectorAll(".price-card");
const selected = document.getElementById("selected");
const orderBtn = document.getElementById("orderBtn");
const toast = document.getElementById("toast");

let currentPackage = "";

function showToast(text){
  toast.textContent = text;
  toast.classList.add("show");
  clearTimeout(showToast.t);
  showToast.t = setTimeout(()=>toast.classList.remove("show"),2200);
}

cards.forEach(card=>{
  card.addEventListener("click",()=>{
    cards.forEach(c=>c.classList.remove("selected"));
    card.classList.add("selected");
    currentPackage = card.dataset.package;
    selected.textContent = currentPackage;
    document.getElementById("contacts").scrollIntoView({behavior:"smooth",block:"center"});
  });
});

orderBtn.addEventListener("click",()=>{
  if(!currentPackage){
    showToast("Сначала выберите пакет очков");
    document.getElementById("prices").scrollIntoView({behavior:"smooth",block:"center"});
    return;
  }
  showToast("Выбран пакет: " + currentPackage);
});

document.querySelectorAll("[data-copy]").forEach(btn=>{
  btn.addEventListener("click",e=>{
    e.preventDefault();
    const value = btn.dataset.copy;
    if(navigator.clipboard){
      navigator.clipboard.writeText(value);
      showToast("Скопировано: " + value);
    }else{
      showToast(value);
    }
  });
});
