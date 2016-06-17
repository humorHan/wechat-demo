<ul class="mock-ul box-padding display-none">
    {{each data}}
        {{if $index == 0}}
            <li class="active" style="border:none;" data-id="{{$value.id}}">
                <span class="item-name">{{$value.name}}</span>
                <img src="../bundle/img/right.png" class="right">
            </li>
        {{else}}
            <li data-id="{{$value.id}}">
                <span class="item-name">{{$value.name}}</span>
                <img src="../bundle/img/right.png" class="right">
            </li>
        {{/if}}
    {{/each}}
</ul>