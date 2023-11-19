const tpl: string = `
{{#each posts}}
    <div class="post {{#if self}}self{{/if}}">
        {{text}} 
        <div class="date">
        {{#if status}}
            <i class="fa fa-check {{status}}" aria-hidden="true"></i>
        {{/if}}
        {{date}}
        </div>
    </div>
{{/each}}
`;

export default tpl;
