document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.confetti-container');
    if (!container) return;

    const colors = ['#FEF38F', '#BCDD97', '#F27FA6', '#76D0F9', '#FFC46D','#B7A49D', '#C683D1'];
    
    function createBurst() {
        // 清空上一波彩带，确保不累积
        container.innerHTML = '';

        const confettiCount = 80; // 每一波的数量稍微减少，保持质感

        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            
            const inner = document.createElement('div');
            inner.classList.add('confetti-inner');
            
            // 统一的长方形尺寸
            const sizeWidth = 20; 
            const sizeHeight = 8; 
            const color = colors[Math.floor(Math.random() * colors.length)];
            const left = Math.random() * 100;
            const animationDuration = Math.random() * 3 + 6; // 6s - 9s
            const animationDelay = Math.random() * 6; // 0s - 4s 散开时间
            const wobbleDuration = Math.random() * 0.4 + 0.6; 
            const wobbleDelay = Math.random() * -2; // 随机起始翻转位置
            const drift = (Math.random() - 0.5) * 800; 
            const tiltAngle = (drift / 600) * 30;
            const initialAngle = Math.random() * 360; // 随机初始旋转角度

            // 设置容器样式
            confetti.style.left = `${left}%`;
            confetti.style.width = `${sizeWidth}px`;
            confetti.style.height = `${sizeHeight}px`;
            confetti.style.animationDuration = `${animationDuration}s`;
            confetti.style.animationDelay = `${animationDelay}s`;
            confetti.style.setProperty('--drift', `${drift}px`);
            confetti.style.setProperty('--tilt-angle', `${tiltAngle}deg`);
            confetti.style.setProperty('--initial-angle', `${initialAngle}deg`);
            
            // 设置内部元素样式
            inner.style.backgroundColor = color;
            inner.style.animationDuration = `${wobbleDuration}s`;
            inner.style.animationDelay = `${wobbleDelay}s`; // 加入随机延迟
            inner.style.borderRadius = '0';

            confetti.appendChild(inner);
            container.appendChild(confetti);

            // 关键：动画结束后自动移除，为下一波留出空间
            confetti.addEventListener('animationend', () => {
                confetti.remove();
            });
        }
    }

    // 立即执行第一波
    createBurst();

    // 设置循环周期：每 15 秒触发一波
    // (最大时长 9s + 最大延迟 4s = 13s，设置 15s 确保每一波基本下落完)
    setInterval(createBurst, 15000);
});
