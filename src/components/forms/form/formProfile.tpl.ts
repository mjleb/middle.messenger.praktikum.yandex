const tpl: string = ` 
<div id="{{id}}-alert-box" class="alert-box">
    <div id="{{id}}-alert-error" class="alert alert-error"></div>
    <div id="{{id}}-alert-warning" class="alert alert-warning"></div>
    <div id="{{id}}-alert-success" class="alert alert-success"></div>
</div>
<ul>
    {{#each inputs}}
            <li>{{{this}}}</li>
    {{/each}}
</ul>
    {{#each buttons}}
        {{{this}}}
    {{/each}}
`;
export default tpl;
