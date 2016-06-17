{{if QuestionType==1}}
   <span class="text-name left" >{{CurrentQuesNameByType}}</span>
   <div class="topic-right-num right"  style="float:right">(<span class="nownum">{{CurrentQuesIndexByType}}</span>/<span class="sumnum">{{CurrentQuesCountByType}}</span>)</div>
{{else if QuestionType==2}}
   <span class="text-name left" >{{CurrentQuesNameByType}}</span>
   <div class="topic-right-num right"  style="float:right">(<span class="nownum">{{CurrentQuesIndexByType}}</span>/<span class="sumnum">{{CurrentQuesCountByType}}</span>)</div>
{{else if  QuestionType==3}}
   <span class="text-name left" > {{CurrentQuesNameByType}}</span>
   <div class="topic-right-num right"  style="float:right">(<span class="nownum">{{CurrentQuesIndexByType}}</span>/<span class="sumnum">{{CurrentQuesCountByType}}</span>)</div>
{{/if}}
