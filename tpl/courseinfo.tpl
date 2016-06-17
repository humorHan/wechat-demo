  {{each}}
  <table>
    <tr><td class="pct25">授课老师</td><td class="tdvalue">
    {{if $value.teacherName}}
      {{$value.teacherName}}<span class="color-green">({{$value.classType==1?"1对1":$value.className}})</span></td></tr>
    {{else}}
        未设置
    {{/if}}

    <tr><td>报名课时</td><td  class="tdvalue">{{$value.totalClassHour}}</td></tr>
    <tr><td>剩余课时</td><td  class="tdvalue">{{($value.totalClassHour-$value.classHour)>0?($value.totalClassHour-$value.classHour):0}}</td></tr>
</table>
            <div class="foot">
                <p class="plan">已上完 {{$value.teachProcess}}/{{$value.totalCourse}} 次课</p>
                <p class="hint">根据实际情况：总课次会略有调整</p>
            </div>
            <div class="totalinfo fl">
    <div class="teach fl mlp6">
        <p class="desc bg-ff7f01">{{$value.teachProcess}}</p>
        <p class="num bg-e85700">已讲学案</p>
    </div>
                <div class="teach fr mrp6">
                    <p class="desc bg-green">{{$value.makeHomeWorkCount}}</p>
                    <p class="num bg-darkgreen">已做作业</p>
                </div>
            </div>
  {{/each}}
