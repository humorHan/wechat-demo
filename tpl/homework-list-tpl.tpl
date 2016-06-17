{{each}}
    {{if $value.HomeworkStatus == 0}}
        <li class="homework-item box-padding" data-homework-id="{{$value.HomeworkId}}">
            <div class="title-and-type fl">
                <div class="homework-name ellipsis">{{$value.HomeworkName}}</div>
                <div>
                    {{if $value.HomeworkStatus == 0}}
                        老师批改中...
                    {{else if $value.HomeworkStatus == 1}}
                        {{$value.StudentScore}}分
                    {{else if $value.HomeworkStatus == 2}}
                        逾期未交
                    {{else if $value.HomeworkStatus == 3}}
                        忽略批改
                    {{/if}}
                </div>
            </div>
            <div class="end-time font-size12 fl">
                截止 {{$value.SubmitTime | dateFormat: 'MM-dd'}}
                <span></span>
            </div>
        </li>
    {{else}}
        <li class="homework-item click box-padding" data-homework-id="{{$value.HomeworkId}}">
            <div class="title-and-type fl">
                <div class="homework-name ellipsis">{{$value.HomeworkName}}</div>
                <div>
                    {{if $value.HomeworkStatus == 0}}
                        老师批改中...
                    {{else if $value.HomeworkStatus == 1}}
                        {{$value.StudentScore}}分
                    {{else if $value.HomeworkStatus == 2}}
                        逾期未交
                    {{else if $value.HomeworkStatus == 3}}
                        忽略批改
                    {{/if}}
                </div>
            </div>
            <div class="end-time font-size12 fl">
                截止 {{$value.SubmitTime | dateFormat: 'MM-dd'}}
                <span></span>
            </div>
        </li>
    {{/if}}
{{/each}}