document.addEventListener('DOMContentLoaded', function() {
    // 获取所有技能标签
    const skillTags = document.querySelectorAll('.skill-tag');
    const container = document.querySelector('.skills-tags');
    
    if (!skillTags.length || !container) return;
    
    // 容器中心点
    const centerX = container.offsetWidth / 2;
    const centerY = container.offsetHeight / 2;
    
    // 椭圆轨道参数
    const orbitRadiusX = centerX * 0.8;
    const orbitRadiusY = centerY * 0.8;
    
    // 初始化标签位置
    skillTags.forEach((tag, index) => {
        // 计算标签在椭圆上的位置
        const angle = (index / skillTags.length) * Math.PI * 2;
        const x = centerX + orbitRadiusX * Math.cos(angle) - tag.offsetWidth / 2;
        const y = centerY + orbitRadiusY * Math.sin(angle) - tag.offsetHeight / 2;
        
        // 设置标签位置
        tag.style.left = `${x}px`;
        tag.style.top = `${y}px`;
        
        // 添加动画延迟，使标签依次出现
        tag.style.animationDelay = `${index * 0.1}s`;
        
        // 添加鼠标悬停事件
        tag.addEventListener('mouseover', () => {
            // 其他标签变暗
            skillTags.forEach(otherTag => {
                if (otherTag !== tag) {
                    otherTag.style.opacity = '0.5';
                }
            });
        });
        
        tag.addEventListener('mouseout', () => {
            // 恢复所有标签
            skillTags.forEach(otherTag => {
                otherTag.style.opacity = '1';
            });
        });
    });
    
    // 添加轻微的浮动动画
    let animationFrame;
    let time = 0;
    
    function animate() {
        time += 0.005;
        
        skillTags.forEach((tag, index) => {
            const angle = (index / skillTags.length) * Math.PI * 2 + time;
            const x = centerX + orbitRadiusX * Math.cos(angle) - tag.offsetWidth / 2;
            const y = centerY + orbitRadiusY * Math.sin(angle) - tag.offsetHeight / 2;
            
            tag.style.left = `${x}px`;
            tag.style.top = `${y}px`;
        });
        
        animationFrame = requestAnimationFrame(animate);
    }
    
    animate();
    
    // 清理动画
    window.addEventListener('beforeunload', () => {
        cancelAnimationFrame(animationFrame);
    });
});