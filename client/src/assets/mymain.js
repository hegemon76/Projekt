window.onload = () => {
  const navElements = Array.from(
    document.querySelector(".main-nav").querySelectorAll(".nav-item")
  );
  let tasks = Array.from(document.querySelectorAll(".list-group-item"));

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

  // tasks.map((el) => {
  //   el.addEventListener("mouseover", () => {
  //     tasks.map((innerEl) => {
  //       innerEl.style.opacity = 0.2;
  //     });
  //     el.style.opacity = 1;
  //   });
  //   el.addEventListener("mouseout", () => {
  //     tasks.map((innerEl) => {
  //       innerEl.style.opacity = 1;
  //     });
  //   });
  // });
};
