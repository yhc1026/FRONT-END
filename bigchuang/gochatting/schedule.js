function loadScheduleContent() {
    const scheduleContent = document.getElementById('schedule-content');
    scheduleContent.innerHTML = `
        <table class="schedule-table">
            <thead>
                <tr>
                    <th>序号</th>
                    <th>课程名称</th>
                    <th>学分</th>
                    <th>课程类型</th>
                    <th>任课教师</th>
                    <th>上课时间</th>
                    <th>上课地点</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>高等数学</td>
                    <td>4</td>
                    <td>必修</td>
                    <td>张教授</td>
                    <td>周一 1-2节</td>
                    <td>教学楼A-101</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>程序设计</td>
                    <td>3</td>
                    <td>必修</td>
                    <td>李教授</td>
                    <td>周二 3-4节</td>
                    <td>实验楼B-202</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>英语</td>
                    <td>2</td>
                    <td>必修</td>
                    <td>王教授</td>
                    <td>周三 5-6节</td>
                    <td>外语楼C-303</td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>物理</td>
                    <td>3</td>
                    <td>必修</td>
                    <td>刘教授</td>
                    <td>周四 7-8节</td>
                    <td>理科楼D-404</td>
                </tr>
                <tr>
                    <td>5</td>
                    <td>体育</td>
                    <td>1</td>
                    <td>必修</td>
                    <td>陈教授</td>
                    <td>周五 9-10节</td>
                    <td>体育馆</td>
                </tr>
            </tbody>
        </table>
    `;
}