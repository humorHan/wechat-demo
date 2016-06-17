<div class="subAnswer-style" >
    <div class="score">得分： <span id="outcome">{{Score}}分</span>，满分：{{AllScore}}分</div>
    <span class="color-green user-answer">您的答案：</span><div class="color-black user-answer" >{{#UserAnswer | unEscape}}</div>
    <span class="color-green ">正确答案：</span> <div class="color-black" >{{#RightAnswer||"  "}}</div>
    <div class="subjective-answer display-none" >  <span class="color-green "> 回答：</span> <span class="color-black" > 未作答 </span>。</div>
</div>
<span class="color-green ">试题分析：</span>
<div class="answer-ques">
    <div id="explain-que"  style="overflow:hidden;zoom:1;color:black">{{#QuestionAnalsis||"<br>"}}</div>
    <span class="color-green " >笔记：</span>
    <pre class="color-siliver pretext" id="text-book">
        {{if NoteContent==null}}
            <div class="color-siliver">(无)</div>
        {{else}}
            <div class="color-black pretext"> {{#NoteContent}}</div>
        {{/if}}
    </pre>
</div>
