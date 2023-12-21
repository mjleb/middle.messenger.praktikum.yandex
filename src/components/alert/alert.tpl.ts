const tpl: string = `
    {{#if error}}<div class="alert alert-error">{{error}}</div>{{/if}}
    {{#if warning}}<div class="alert alert-warning">{{warning}}</div>{{/if}}
`;
export default tpl;
