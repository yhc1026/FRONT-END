// 存储原始的视频通话页面内容
const videoCallContent = `
    <h1>视频通话</h1>
    <div class="video-container">
        <video id="localVideo" autoplay muted></video>
        <video id="remoteVideo" autoplay></video>
    </div>
    <div class="button-container">
        <button id="startButton">开启摄像头</button>
        <button id="closeButton">关闭摄像头</button> 
        <button id="callButton">呼叫</button>
        <button id="hangupButton" disabled>挂断</button>
    </div>
`;

function loadContent(page) {
    const content = document.getElementById('content');
    // 移除所有活动标签
    document.querySelectorAll('.nav-tab').forEach(tab => tab.classList.remove('active'));
    // 添加活动标签
    document.querySelector(`[href="#${page}"]`).classList.add('active');

    // 添加淡出效果
    content.style.opacity = '0';
    content.style.transform = 'translateY(20px)';

    setTimeout(() => {
        switch(page) {
            case 'home':
                content.innerHTML = '<h1>欢迎来到学生管理系统</h1><p>请选择上方的功能选项卡进行操作。</p>';
                break;
            case 'profile':
                content.innerHTML = '<h1>个人信息</h1><div id="profile-content"></div>';
                loadProfileContent();
                break;
            case 'schedule':
                content.innerHTML = '<h1>课表</h1><div id="schedule-content"></div>';
                loadScheduleContent();
                break;
            case 'evaluation':
                content.innerHTML = '<h1>课程评价</h1><div id="evaluation-content"></div>';
                loadEvaluationContent();
                break;
            case 'video':
                content.innerHTML = videoCallContent;
                // 重新加载视频通话相关的脚本
                const script = document.createElement('script');
                script.src = 'script.js';
                document.body.appendChild(script);
                break;
        }

        // 添加淡入效果
        requestAnimationFrame(() => {
            content.style.opacity = '1';
            content.style.transform = 'translateY(0)';
        });
    }, 300);
}

// 添加过渡效果的样式
const contentStyle = document.createElement('style');
contentStyle.textContent = `
    #content {
        transition: opacity 0.3s ease, transform 0.3s ease;
    }
`;
document.head.appendChild(contentStyle);

// 页面加载时显示主页
document.addEventListener('DOMContentLoaded', () => {
    loadContent('home');
});