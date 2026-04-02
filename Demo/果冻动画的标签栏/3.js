function move(index) {
    const indicator = document.getElementById("indicator");
    const step = 50 + 20;
    const endX = index * step;

    // 1. 直接设置位移，由 CSS transition 处理平滑度
    indicator.style.transform = `translateX(${endX}px)`;

    // 2. 触发内层果冻动画
    indicator.classList.remove("stretching");
    void indicator.offsetWidth; // 强制重绘
    indicator.classList.add("stretching");
}