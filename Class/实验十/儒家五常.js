// 获取所有导航链接和描述文本元素
const links = document.querySelectorAll('.nav-left a');
const showImg = document.querySelector('.show-img');
const descText = document.getElementById('desc-text');

// 为每个链接添加鼠标悬浮和点击事件
links.forEach(link => {
    // 鼠标悬浮时更新描述
    link.addEventListener('mouseover', function() {
        descText.textContent = this.dataset.text;
    });
    // 点击时更新图片
    link.addEventListener('click', function(e) {
        e.preventDefault(); // 阻止默认跳转
        showImg.src = this.href;
    });
});