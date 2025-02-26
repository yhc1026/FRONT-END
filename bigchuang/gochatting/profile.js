function loadProfileContent() {
    const profileContent = document.getElementById('profile-content');
    profileContent.innerHTML = `
        <div class="profile-form">
            <div class="profile-avatar">
                <img src="./picture/头像.png" alt="用户头像">
                <button class="save-btn">更换头像</button>
            </div>
            <div class="profile-info">
                <div class="form-group">
                    <label>姓名：</label>
                    <input type="text" value="杨昊宸" readonly>
                </div>
                <div class="form-group">
                    <label>学号：</label>
                    <input type="text" value="2021001" readonly>
                </div>
                <div class="form-group">
                    <label>班级：</label>
                    <input type="text" value="唐人1班" readonly>
                </div>
                <div class="form-group">
                    <label>联系电话：</label>
                    <input type="tel" value="123456789">
                </div>
                <div class="form-group">
                    <label>邮箱：</label>
                    <input type="email" value="tangren@example.com">
                </div>
                <button class="save-btn">保存修改</button>
            </div>
        </div>
    `;
}