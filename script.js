// 假设这是 PIC 变量，你可以根据实际情况修改
const PIC = '"E:\yml\Website YML\PIC\endayuan_computing_technology_architecture_concept_with_blue_cl_976e960c-1012-4923-b886-357f2ec40330.png"'; 

// 获取 banner 元素
const banner = document.getElementById('banner');

// 设置 banner 的背景图
if (banner) {
    banner.style.backgroundImage = `url('${PIC}')`;
}



// 为每个 TAB 按钮添加点击事件监听器
/*tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // 移除所有按钮的 active 类
        tabButtons.forEach(btn => btn.classList.remove('active'));
        // 为当前点击的按钮添加 active 类
        button.classList.add('active');

        // 获取当前按钮对应的 TAB 内容 ID
        const tabId = button.dataset.tab;

        // 隐藏所有 TAB 内容
        tabPanes.forEach(pane => pane.classList.remove('active'));
        // 显示当前对应的 TAB 内容
        document.getElementById(tabId).classList.add('active');
    });
});*/


// 导航栏激活状态
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', function() {
    document.querySelector('nav a.active')?.classList.remove('active');
    this.classList.add('active');
  });
});

// 联系表单提交
const contactForm = document.querySelector('.contact-form form');
if(contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    // 这里可以添加AJAX提交逻辑
    alert('表单已提交，我们会尽快与您联系！');
    this.reset();
  });
}



// 社交图标悬停提示
const icons = document.querySelectorAll('.icon');
icons.forEach(icon => {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = icon.dataset.tooltip;
    icon.appendChild(tooltip);

    icon.addEventListener('mouseenter', () => {
        tooltip.style.opacity = '1';
        tooltip.style.visibility = 'visible';
    });

    icon.addEventListener('mouseleave', () => {
        tooltip.style.opacity = '0';
        tooltip.style.visibility = 'hidden';
    });
});




document.addEventListener('DOMContentLoaded', function() {
    // 获取所有标签按钮和作品区域
    const tabBtns = document.querySelectorAll('.tab-btn');
    const worksSections = document.querySelectorAll('.works-section');
    
    // 初始状态：默认显示所有作品区域
    function resetTabs() {
        // 移除所有按钮的active类
        tabBtns.forEach(btn => {
            btn.classList.remove('active');
        });
        
        // 显示所有作品区域
        worksSections.forEach(section => {
            section.classList.remove('hidden');
        });
    }
    
    // 为每个按钮添加点击事件
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation(); // 阻止事件冒泡到document
            
            const category = this.getAttribute('data-category');
            
            // 如果点击的是已经激活的按钮，取消选中并显示所有作品
            if (this.classList.contains('active')) {
                resetTabs();
            } else {
                // 移除所有按钮的active类
                tabBtns.forEach(b => b.classList.remove('active'));
                
                // 给当前点击的按钮添加active类
                this.classList.add('active');
                
                // 隐藏所有作品区域
                worksSections.forEach(section => {
                    if (section.getAttribute('data-category') === category) {
                        section.classList.remove('hidden');
                    } else {
                        section.classList.add('hidden');
                    }
                });
            }
        });
    });
    
    // 为整个document添加点击事件，点击空白区域时重置TAB
    document.addEventListener('click', function(e) {
        // 检查点击的元素是否在tabs区域内
        const tabsArea = document.querySelector('.tabs');
        const worksGrid = document.querySelector('.works-grid');
        
        // 如果点击的不是tabs区域内的元素，也不是作品项目，则重置TAB
        if (!tabsArea.contains(e.target) && !worksGrid.contains(e.target)) {
            resetTabs();
        }
    });
});

    // 联系我弹窗交互
    document.addEventListener('DOMContentLoaded', function() {
        const contactBtn = document.getElementById('contactBtn');
        const contactModal = document.getElementById('contactModal');
        const closeModal = document.getElementById('closeModal');
        const followBtn = document.getElementById('followBtn');
        
        // 打开弹窗
        if(contactBtn) {
            contactBtn.addEventListener('click', function() {
                contactModal.style.display = 'flex';
            });
        }
        
        // 关闭弹窗
        if(closeModal) {
            closeModal.addEventListener('click', function() {
                contactModal.style.display = 'none';
            });
        }
        
        // 点击弹窗外部关闭
        window.addEventListener('click', function(event) {
            if (event.target === contactModal) {
                contactModal.style.display = 'none';
            }
        });
        
        // 加关注按钮
        if(followBtn) {
            followBtn.addEventListener('click', function() {
                // 添加到收藏夹
                try {
                    if(window.sidebar && window.sidebar.addPanel) { // Firefox
                        window.sidebar.addPanel(document.title, window.location.href, '');
                    } else if(window.external && ('AddFavorite' in window.external)) { // IE
                        window.external.AddFavorite(window.location.href, document.title);
                    } else { // Chrome, Safari等
                        alert('请按 Ctrl+D 将本页添加到收藏夹');
                    }
                } catch(e) {
                    alert('添加收藏失败，请手动添加');
                }
            });
        }
    });

      
    
// 作品弹窗功能
document.addEventListener('DOMContentLoaded', function() {
    // 获取所有作品项
    const workItems = document.querySelectorAll('.work-item');
    const workSections = document.querySelectorAll('.works-section a.work-item');
    const allWorkItems = [...workItems, ...workSections];
    
    // 获取弹窗元素
    const workModal = document.getElementById('workModal');
    const closeWorkModal = document.getElementById('closeWorkModal');
     
    // 弹窗内容元素
    const workModalTitle = document.getElementById('workModalTitle');
    const workModalCategory = document.getElementById('workModalCategory');
    const workModalImages = document.getElementById('workModalImages');
    const workModalDescription = document.getElementById('workModalDescription');
    const workModalDate = document.getElementById('workModalDate');
    const workModalRole = document.getElementById('workModalRole');
    const workModalTools = document.getElementById('workModalTools');
    
    // 为每个作品项添加点击事件
    allWorkItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault(); // 阻止默认链接行为
            
            // 获取作品数据
            let title, category, description, date, role, tools, images;
            
            // 判断是div还是a元素
            if (item.tagName.toLowerCase() === 'div') {
                // div元素 (新结构)
                title = item.getAttribute('data-title');
                category = item.getAttribute('data-category');
                description = item.getAttribute('data-description');
                date = item.getAttribute('data-date') || '未指定';
                role = item.getAttribute('data-role') || '未指定';
                tools = item.getAttribute('data-tools') || '未指定';
                
                // 获取图片数据
                if (item.hasAttribute('data-images')) {
                    try {
                        images = JSON.parse(item.getAttribute('data-images'));
                    } catch (e) {
                        console.error('解析图片数据出错:', e);
                        images = [item.getAttribute('data-image') || item.querySelector('img').src];
                    }
                } else {
                    images = [item.getAttribute('data-image') || item.querySelector('img').src];
                }
            } else {
                // a元素 (旧结构)
                title = item.querySelector('h3').textContent;
                category = item.closest('.works-section').getAttribute('data-category');
                description = item.querySelector('p').textContent;
                date = '未指定';
                role = '未指定';
                tools = '未指定';
                images = [item.querySelector('img').src];
            }
            
            // 清空图片容器
            workModalImages.innerHTML = '';
            
            // 添加所有图片
            images.forEach(imgSrc => {
                const img = document.createElement('img');
                img.src = imgSrc;
                img.alt = title;
                workModalImages.appendChild(img);
            });
            // 确保无论单图还是多图都使用flex布局
            workModal.style.display = 'flex';
            workModal.classList.add('flex-layout'); // 添加一个类以便在CSS中进一步控制
            
            
            // 填充其他弹窗内容
            workModalTitle.textContent = title;
            workModalCategory.textContent = getCategoryName(category);
            workModalDescription.textContent = description;
            workModalDate.textContent = date;
            workModalRole.textContent = role;
            workModalTools.textContent = tools;
            
            // 显示弹窗
            workModal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // 防止背景滚动
            // 将弹窗滚动到顶部
            workModal.scrollTop = 0;
        });
    });
    
    // 关闭弹窗
    if(closeWorkModal) {
        closeWorkModal.addEventListener('click', function() {
            workModal.style.display = 'none';
            document.body.style.overflow = ''; // 恢复背景滚动
        });
    }
    
    // 点击弹窗外部关闭弹窗
    window.addEventListener('click', function(event) {
        if (event.target === workModal) {
            workModal.style.display = 'none';
            document.body.style.overflow = ''; // 恢复背景滚动
        }
    });
    
    // 获取分类名称
    function getCategoryName(category) {
        const categoryMap = {
            'product': '产品设计',
            'visualization': '可视化大屏',
            'miniprogram': '小程序设计',
            'brand': '品牌设计',
            'aigc': 'AIGC',
            'packaging': '包装设计'
        };
        return categoryMap[category] || category;
    }
});

//在页面底部添加//
    // 添加双向滚动功能
document.addEventListener('DOMContentLoaded', function() {
    const heroSection = document.querySelector('.hero-banner');
    const worksSection = document.getElementById('works-section');
    let isScrolling = false;
    
    // 检测滚动位置
    window.addEventListener('scroll', function() {
        if (isScrolling) return; // 如果正在执行滚动动画，不再触发
        
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const heroHeight = heroSection.offsetHeight;
        
        // 如果用户在首页区域轻微向下滚动，自动滚动到作品区域
        if (scrollPosition > 50 && scrollPosition < windowHeight / 2) {
            isScrolling = true;
            worksSection.scrollIntoView({
                behavior: 'smooth'
            });
            setTimeout(() => { isScrolling = false; }, 1000); // 滚动动画完成后重置标志
        }
        
        // 如果用户在作品区域顶部向上滚动，自动滚动回首页
        if (scrollPosition >= windowHeight * 0.7 && scrollPosition < windowHeight * 1.2) {
            if (scrollPosition < lastScrollPosition) { // 向上滚动
                isScrolling = true;
                heroSection.scrollIntoView({
                    behavior: 'smooth'
                });
                setTimeout(() => { isScrolling = false; }, 1000); // 滚动动画完成后重置标志
            }
        }
        
        lastScrollPosition = scrollPosition;
    });
    
    // 记录上一次滚动位置
    let lastScrollPosition = window.scrollY;
    
    // 添加鼠标滚轮事件处理
    heroSection.addEventListener('wheel', function(e) {
        if (e.deltaY > 0) { // 向下滚动
            e.preventDefault(); // 阻止默认滚动
            worksSection.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }, { passive: false });
    
    // 添加作品区域顶部的滚轮事件处理
    worksSection.addEventListener('wheel', function(e) {
        const rect = worksSection.getBoundingClientRect();
        // 只在作品区域顶部100px范围内触发
        if (rect.top >= -50&& rect.top <= 50) {
            if (e.deltaY < 0) { // 向上滚动
                e.preventDefault(); // 阻止默认滚动
                heroSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    }, { passive: false });
    
    // 添加键盘上下键导航
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowDown' && window.scrollY < windowHeight / 2) {
            e.preventDefault();
            worksSection.scrollIntoView({
                behavior: 'smooth'
            });
        } else if (e.key === 'ArrowUp' && window.scrollY >= windowHeight * 0.7 && window.scrollY < windowHeight * 1.2) {
            e.preventDefault();
            heroSection.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
// 作者弹窗中的联系我按钮点击事件
document.addEventListener('DOMContentLoaded', function() {
    const authorContactBtn = document.getElementById('authorContactBtn');
    const contactModal = document.getElementById('contactModal');
    
    if (authorContactBtn && contactModal) {
        authorContactBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            contactModal.style.display = 'flex';
        });
    }
});

// 作者弹窗交互功能
document.addEventListener('DOMContentLoaded', function() {
    // 获取所有社交图标项
    const socialItems = document.querySelectorAll('.work-social-item');
    
    // 为每个社交图标项添加事件监听器
    socialItems.forEach(item => {
        const popup = item.querySelector('.author-popup');
        
        if (popup) {
            // 鼠标进入社交图标项时
            item.addEventListener('mouseenter', function() {
                popup.style.opacity = '1';
                popup.style.visibility = 'visible';
                popup.style.pointerEvents = 'auto';
            });
            
            // 鼠标离开社交图标项时，不立即隐藏
            item.addEventListener('mouseleave', function(e) {
                // 检查鼠标是否移动到弹窗上
                if (!isMouseOverPopup(e, popup)) {
                    // 设置延时，给用户时间移动到弹窗上
                    setTimeout(function() {
                        // 再次检查鼠标是否在弹窗上，如果不在才隐藏
                        if (!popup.matches(':hover')) {
                            popup.style.opacity = '0';
                            popup.style.visibility = 'hidden';
                            popup.style.pointerEvents = 'none';
                        }
                    }, 300); // 300毫秒延迟，可以根据需要调整
                }
            });
            
            // 鼠标进入弹窗时
            popup.addEventListener('mouseenter', function() {
                popup.style.opacity = '1';
                popup.style.visibility = 'visible';
                popup.style.pointerEvents = 'auto';
            });
            
            // 鼠标离开弹窗时
            popup.addEventListener('mouseleave', function() {
                popup.style.opacity = '0';
                popup.style.visibility = 'hidden';
                popup.style.pointerEvents = 'none';
            });
            
            // 为弹窗中的按钮添加点击事件
            const popupBtn = popup.querySelector('.author-popup-btn');
            if (popupBtn) {
                popupBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    // 这里可以添加按钮点击后的操作，例如打开联系表单
                    console.log('联系按钮被点击');
                    // 如果有联系模态框，可以在这里显示
                    const contactModal = document.querySelector('.contact-modal');
                    if (contactModal) {
                        contactModal.style.display = 'flex';
                    }
                });
            }
        }
    });
    
    // 辅助函数：检查鼠标是否移动到弹窗上
    function isMouseOverPopup(event, popup) {
        const rect = popup.getBoundingClientRect();
        return (
            event.clientX >= rect.left &&
            event.clientX <= rect.right &&
            event.clientY >= rect.top &&
            event.clientY <= rect.bottom
        );
    }
    
    // 如果有联系模态框的关闭按钮，添加关闭事件
    const closeModalBtns = document.querySelectorAll('.close-modal');
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.contact-modal');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    });
});



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
                const mainImage = this.getAttribute('data-image');
                const imagesStr = this.getAttribute('data-images');
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

                // 创建图片展示容器
                const imagesContainer = document.createElement('div');
                imagesContainer.className = 'work-images-grid';
                
                // 创建所有图片的数组
                let allImages = [];
                
                // 首先添加主图片
                if (mainImage) {
                    allImages.push(mainImage);
                }
                
                // 然后添加data-images中的图片（如果有）
                if (imagesStr) {
                    // 分割图片路径字符串
                    const additionalImages = imagesStr.split(',');
                    
                    // 过滤掉与主图片重复的图片
                    additionalImages.forEach(img => {
                        const trimmedImg = img.trim();
                        if (trimmedImg !== mainImage && !allImages.includes(trimmedImg)) {
                            allImages.push(trimmedImg);
                        }
                    });
                }
                
                // 处理所有图片
                allImages.forEach((imagePath, index) => {
                    // 创建图片容器
                    const imageContainer = document.createElement('div');
                    imageContainer.className = 'work-image-item';
                    
                    // 创建图片元素
                    const img = document.createElement('img');
                    img.src = imagePath;
                    img.alt = `${title} - 图片 ${index + 1}`;
                    img.className = 'work-detail-image';
                    
                    // 将图片添加到容器中
                    imageContainer.appendChild(img);
                    imagesContainer.appendChild(imageContainer);
                });
                
                // 将图片网格添加到弹窗中
                workModalImages.appendChild(imagesContainer);

                // 显示弹窗
                workModal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // 防止背景滚动
            });
        }
    });

    // 关闭弹窗
    closeWorkModal.addEventListener('click', function() {
        workModal.style.display = 'none';
        document.body.style.overflow = ''; // 恢复背景滚动
    });

    // 点击弹窗外部关闭弹窗
    window.addEventListener('click', function(event) {
        if (event.target === workModal) {
            workModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
});

