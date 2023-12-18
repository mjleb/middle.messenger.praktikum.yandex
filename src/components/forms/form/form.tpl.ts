const tpl: string = ` 
<div id="{{id}}-alert-box" class="alert-box">
    <div id="{{id}}-alert-error" class="alert alert-error"></div>
    <div id="{{id}}-alert-warning" class="alert alert-warning"></div> 
</div>
    {{#each inputs}}
        {{{this}}}
    {{/each}}
    <div class="button">
        {{#each buttons}}
            {{{this}}}
        {{/each}}
    </div>
`;
export default tpl;
