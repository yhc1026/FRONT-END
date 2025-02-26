function loadEvaluationContent() {
    const evaluationContent = document.getElementById('evaluation-content');
    evaluationContent.innerHTML = `
        <div class="evaluation-container">
            <div class="course-list">
                <div class="course-item">
                    <h3>高等数学</h3>
                    <div class="rating">
                        <span>评分：</span>
                        <select>
                            <option>5分</option>
                            <option>4分</option>
                            <option>3分</option>
                            <option>2分</option>
                            <option>1分</option>
                        </select>
                    </div>
                    <textarea placeholder="请输入课程评价..."></textarea>
                    <button>提交评价</button>
                </div>
                <!-- 添加更多课程评价项 -->
            </div>
        </div>
    `;
}