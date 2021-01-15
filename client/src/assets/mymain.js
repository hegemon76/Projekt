window.onload = () => {
  const navElements = Array.from(
    document.querySelector(".main-nav").querySelectorAll(".nav-item")
  );

  navElements.map((el) => {
    el.addEventListener("mouseover", () => {
      navElements.map((navEl) => {
        navEl.style.opacity = "0.2";
      });
      el.style.opacity = "1";
    });
    el.addEventListener("mouseout", () => {
      navElements.map((navEl) => {
        navEl.style.opacity = "1";
      });
    });
  });
};
