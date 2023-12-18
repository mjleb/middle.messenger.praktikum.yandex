const tpl: string = ` 
<div class="malert">
    <div id="{{id}}-alert-error" class="alert alert-error"></div>
    <div id="{{id}}-alert-warning" class="alert alert-warning"></div> 
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
