// 处理作品弹窗功能
document.addEventListener('DOMContentLoaded', function() {
    // 获取所有作品项和弹窗元素
    const workItems = document.querySelectorAll('.work-item');
    const workModal = document.getElementById('workModal');
    const closeWorkModal = document.getElementById('closeWorkModal');
    const workModalTitle = document.getElementById('workModalTitle');
    const workModalCategory = document.getElementById('workModalCategory');
    const workModalImages = document.getElementById('workModalImages');
    const workModalDescription = document.getElementById('workModalDescription');
    const workModalDate = document.getElementById('workModalDate');
    const workModalRole = document.getElementById('workModalRole');
    const workModalTools = document.getElementById('workModalTools');

    // 为每个作品项添加点击事件
    workItems.forEach(item => {
        if (!item.closest('a')) { // 如果作品项不在链接内部
            item.addEventListener('click', function() {
                // 获取作品数据
                const title = this.getAttribute('data-title');
                const category = this.getAttribute('data-category');
                const imagesStr = this.getAttribute('data-image');
                const videosStr = this.getAttribute('data-videos');
                const description = this.getAttribute('data-description');
                const date = this.getAttribute('data-date');
                const role = this.getAttribute('data-role');
                const tools = this.getAttribute('data-tools');

                // 设置弹窗内容
                workModalTitle.textContent = title;
                workModalCategory.textContent = category;
                workModalDescription.textContent = description;
                workModalDate.textContent = date;
                workModalRole.textContent = role;
                workModalTools.textContent = tools;

                // 清空图片容器
                workModalImages.innerHTML = '';

                // 处理图片
                if (imagesStr) {
                    // 分割图片路径字符串并过滤空字符串
                    const images = imagesStr.includes(',') 
                    ? imagesStr.split(',').filter(path => path.trim().length > 0) 
                    : [imagesStr];
                    
                    // 处理所有图片
                    images.forEach((imagePath, index) => {
                        const trimmedPath = imagePath.trim();
                        // 创建图片容器
                        const imgContainer = document.createElement('div');
                        imgContainer.className = 'work-media-container';
                        
                        // 创建图片元素
                        const img = document.createElement('img');
                        img.src = trimmedPath;
                        img.alt = `${title} - 图片 ${index + 1}`;
                        img.className = 'work-detail-image';

                        // 添加图片加载错误处理
                        img.onerror = function() {
                             imgContainer.style.display = 'none'; // 隐藏容器
                            // 或者完全移除容器
                            // imgContainer.parentNode.removeChild(imgContainer);
                        };
                        
                        // 将图片添加到容器中
                        imgContainer.appendChild(img);
                        workModalImages.appendChild(imgContainer);
                    });
                }
                
            // 处理视频
if (videosStr) {
    // 分割视频路径字符串并过滤空字符串
    const videos = videosStr.includes(',') 
        ? videosStr.split(',').filter(path => path.trim().length > 0) 
        : [videosStr];
    
    // 处理所有视频
    videos.forEach((videoPath, index) => {
        const trimmedPath = videoPath.trim();
        console.log("尝试加载视频:", trimmedPath); // 添加日志
        
        // 创建视频容器
        const videoContainer = document.createElement('div');
        videoContainer.className = 'work-media-container';
        
        // 创建视频元素
        const video = document.createElement('video');
        video.src = trimmedPath;
        video.controls = true;
        video.className = 'work-detail-video';
        video.preload = 'metadata';
        
        // 添加错误处理
        video.onerror = function() {
            console.error("视频加载失败:", trimmedPath, video.error);
            videoContainer.innerHTML = `<div class="video-error">视频加载失败: ${trimmedPath}</div>`;
        };
        
        // 将视频添加到容器中
        videoContainer.appendChild(video);
        workModalImages.appendChild(videoContainer);
    });
}

                // 显示弹窗
                workModal.style.display = 'flex';
                document.body.style.overflow = 'hidden'; // 防止背景滚动
        
                document.documentElement.style.overflow = 'hidden'; // 新增：防止html元素滚动
            });
        }
    });

    // 关闭弹窗
    closeWorkModal.addEventListener('click', function() {
        workModal.style.display = 'none';
        document.body.style.overflow = ''; // 恢复背景滚动
        document.documentElement.style.overflow = ''; // 新增：恢复html元素滚动
        
        // 停止所有视频播放
        const videos = document.querySelectorAll('.work-detail-video');
        videos.forEach(video => {
            video.pause();
        });
    });

    // 点击弹窗外部关闭弹窗
    window.addEventListener('click', function(event) {
        if (event.target === workModal) {
            workModal.style.display = 'none';
            document.body.style.overflow = '';
            document.documentElement.style.overflow = ''; // 新增：恢复html元素滚动
            
            // 停止所有视频播放
            const videos = document.querySelectorAll('.work-detail-video');
            videos.forEach(video => {
                video.pause();
            });
        }
    });
});