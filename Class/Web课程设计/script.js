document.addEventListener('DOMContentLoaded', () => {
    const playBtn = document.querySelector('.play-btn');
    
    if(playBtn) {
        playBtn.addEventListener('click', () => {
            alert('准备播放视频... (这里可以集成视频播放器)');
        });
    }

    // 可以在这里添加导航栏随滚动变色的效果
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });
});
