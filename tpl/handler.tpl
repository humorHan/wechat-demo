{{if num == 1}}
    {{if QuestionCount == 1}}
        <div class="homework-comment">
            <img class="search" src="../bundle/img/search.png">
            {{if homeworkStatus == 3}}
                <span>忽略原因</span>
            {{else}}
                <span>查看评语</span>
            {{/if}}
        </div>
    {{else}}
        <div class="some-subjects">
            <div class="homework-comment border-right w49 fl">
                <img class="search" src="../bundle/img/search.png">
                {{if homeworkStatus == 3}}
                    <span>忽略原因</span>
                {{else}}
                    <span>查看评语</span>
                {{/if}}
            </div>
            <div class="right-btn w50 fl">
                <img src="../bundle/img/right-text.png">
                <span>下一题</span>
            </div>
        <div>
    {{/if}}
{{else if num >= QuestionCount}}
    <div class="last left-btn">
        <img src="../bundle/img/left-text.png">
        <span>上一题</span>
    </div>
{{else}}
    <div class="middle">
        <div class="left-btn border-right w49 fl">
            <img class="search" src="../bundle/img/left-text.png">
            <span>上一题</span>
        </div>
        <div class="right-btn w50 fl">
            <img src="../bundle/img/right-text.png">
            <span>下一题</span>
        </div>
    </div>
{{/if}}