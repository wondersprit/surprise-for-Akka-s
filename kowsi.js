
document.addEventListener("DOMContentLoaded", () => {
  const lines = document.querySelectorAll(".line");
  let index = 0;

  function showLine() {
    if (index < lines.length) {
      lines[index].style.opacity = 1;
      index++;
      setTimeout(showLine, 1500);
    }
  }

  document.getElementById("final-message").classList.remove("hidden");
  showLine();
});
