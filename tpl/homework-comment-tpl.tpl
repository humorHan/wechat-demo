<div class="title-wrapper">
    <span class="bg bg-green"></span>
    {{if HomeworkStatus == 3}}
        <span class="title">忽略原因</span>
    {{else}}
        <span class="title">作业评语</span>
    {{/if}}
</div>

{{if HomeworkStatus == 3}}
    {{if TeacherReason}}
        <pre class="content pretext font-size12">{{#TeacherReason}}</pre>
    {{else}}
        <pre class="content pretext font-size12 grey">（无）</pre>
    {{/if}}
{{else}}
    {{if TeacherReview}}
        <pre class="content pretext font-size12">{{#TeacherReview}}</pre>
    {{else}}
        <pre class="content pretext font-size12 grey">（无）}}</pre>
    {{/if}}
{{/if}}