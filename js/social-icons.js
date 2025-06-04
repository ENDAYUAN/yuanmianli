/**
 * 社交图标交互功能
 * 统一处理所有社交图标的悬停和弹窗交互
 */
document.addEventListener('DOMContentLoaded', function() {
    // 获取所有社交图标项
    const socialItems = document.querySelectorAll('.work-social-item');
    
    // 当前激活的弹窗
    let activePopup = null;
    
    // 延时器ID
    let timeoutId = null;
    
    // 为每个社交图标项添加事件监听器
    socialItems.forEach(item => {
        // 获取该图标对应的所有可能弹窗
        const authorPopup = item.querySelector('.author-popup');
        const wechatPopup = item.querySelector('.wechat-popup');
        const emailPopup = item.querySelector('.email-popup');
        const sharePopup = item.querySelector('.share-popup');
        const tooltip = item.querySelector('.tooltip');
        
        // 该图标的弹窗（可能是多种类型中的一种）
        const popup = authorPopup || wechatPopup || emailPopup || sharePopup;
        
        if (popup) {
            // 鼠标进入社交图标项时
            item.addEventListener('mouseenter', function() {
                // 清除之前的延时
                if (timeoutId) {
                    clearTimeout(timeoutId);
                    timeoutId = null;
                }
                
                // 关闭其他弹窗
                if (activePopup && activePopup !== popup) {
                    activePopup.classList.remove('active');
                }
                
                // 显示当前弹窗
                popup.classList.add('active');
                activePopup = popup;
                
                // 隐藏tooltip
                if (tooltip) {
                    tooltip.classList.remove('active');
                }
            });
            
            // 鼠标离开社交图标项时
            item.addEventListener('mouseleave', function(e) {
                // 检查鼠标是否移动到弹窗上
                if (!isMouseOverElement(e, popup)) {
                    // 设置延时，给用户时间移动到弹窗上
                    timeoutId = setTimeout(function() {
                        // 再次检查鼠标是否在弹窗上
                        if (!isMouseOverElement(null, popup)) {
                            popup.classList.remove('active');
                            activePopup = null;
                        }
                    }, 200); // 300毫秒延迟
                }
            });
            
            // 鼠标进入弹窗时
            popup.addEventListener('mouseenter', function() {
                // 清除之前的延时
                if (timeoutId) {
                    clearTimeout(timeoutId);
                    timeoutId = null;
                }
                
                // 确保弹窗保持显示
                popup.classList.add('active');
                activePopup = popup;
            });
            
            // 鼠标离开弹窗时
            popup.addEventListener('mouseleave', function() {
                // 设置延时关闭弹窗
                timeoutId = setTimeout(function() {
                    popup.classList.remove('active');
                    activePopup = null;
                }, 100); // 100毫秒延迟
            });
            
            // 为弹窗中的按钮添加点击事件
            const popupBtn = popup.querySelector('.author-popup-btn');
            if (popupBtn) {
                popupBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    // 显示联系模态框
                    const contactModal = document.querySelector('.contact-modal');
                    if (contactModal) {
                        contactModal.style.display = 'flex';
                    }
                    // 关闭弹窗
                    popup.classList.remove('active');
                    activePopup = null;
                });
            }
            
            // 为分享按钮添加点击事件
            const shareButtons = popup.querySelectorAll('.share-btn');
            if (shareButtons.length > 0) {
                shareButtons.forEach(btn => {
                    btn.addEventListener('click', function() {
                        // 这里可以添加分享逻辑
                        alert('分享到' + this.textContent);
                        // 关闭弹窗
                        popup.classList.remove('active');
                        activePopup = null;
                    });
                });
            }
        } else if (tooltip) {
            // 如果只有tooltip没有弹窗
            item.addEventListener('mouseenter', function() {
                tooltip.classList.add('active');
            });
            
            item.addEventListener('mouseleave', function() {
                tooltip.classList.remove('active');
            });
        }
    });
    
    // 辅助函数：检查鼠标是否在元素上
    function isMouseOverElement(event, element) {
        if (!element) return false;
        
        if (event) {
            // 使用事件对象检查
            const rect = element.getBoundingClientRect();
            return (
                event.clientX >= rect.left &&
                event.clientX <= rect.right &&
                event.clientY >= rect.top &&
                event.clientY <= rect.bottom
            );
        } else {
            // 使用document.elementFromPoint检查
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const elementAtPoint = document.elementFromPoint(centerX, centerY);
            
            return element.contains(elementAtPoint) || element === elementAtPoint;
        }
    }
    
    // 关闭联系模态框
    const closeModalBtn = document.getElementById('closeModal');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            const contactModal = document.getElementById('contactModal');
            if (contactModal) {
                contactModal.style.display = 'none';
            }
        });
    }
});

// 点击作者联系方式按钮时，打开邮件客户端
document.getElementById("emailContactBtn").addEventListener("click", function() {
    const email = "yuanmianli@163.com";
    const subject = encodeURIComponent("关于工作的邀约");
    const body = encodeURIComponent("您好，我对您的作品很感兴趣，想进一步交流。");
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
});


// 微博分享
document.querySelector('.share-btn.weibo').addEventListener('click', () => {
    const shareUrl = encodeURIComponent(window.location.href);
    const shareTitle = encodeURIComponent('看看我分享的作品！');
    window.open(`https://service.weibo.com/share/share.php?url=${shareUrl}&title=${shareTitle}`, '_blank');
});

// QQ 分享
document.querySelector('.share-btn.qq').addEventListener('click', () => {
    const shareUrl = encodeURIComponent(window.location.href);
    const shareTitle = encodeURIComponent('看看我分享的作品！');
    window.open(`https://connect.qq.com/widget/shareqq/index.html?url=${shareUrl}&title=${shareTitle}`, '_blank');
});