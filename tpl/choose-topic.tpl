<div >
    正确答案：<span class="color-green">{{#RightAnswer||"　"}}</span>，
    <span class="user-answer">您的答案：</span>
    {{if  UserAnswer}}
        {{if UserResult==1}}
        <span class="color-green user-answer">{{#UserAnswer}}<i style="font-style:normal;color:black">，</i></span>
        回答： <span class="color-green" >正确 </span>。
        {{else if UserResult==0||UserResult==2}}
        <span class="color-red user-answer">{{#UserAnswer || "未作答"}}<i style="font-style:normal;color:black">，</i></span>　
        回答： <span class="color-red" >错误 </span>。
        {{/if}}
    {{else}}
        <span class="color-green user-answer">{{"　"}}<i style="font-style:normal;color:black">，</i></span>
        回答： <span class="color-black" > 未作答 </span>。
    {{/if}}
</div>
<span class="color-green">试题分析：</span>
<div class="answer-ques" >
    <div id="explain-que">{{#QuestionAnalsis}}</div>
    <span class="color-green pretext" >笔记：</span>
    <pre class="color-siliver pretext" id="text-book">
        {{if NoteContent==null}}
             <p class="color-siliver">(无)</p>
        {{else}}
              <pre class="color-black pretext"> {{#NoteContent}}</pre>
        {{/if}}
     </pre>
</div>
