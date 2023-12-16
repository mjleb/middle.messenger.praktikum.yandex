const tpl: string = `
    {{content}} 
    <div class="date">
        {{#if is_read}}
            <i class="fa fa-check {{is_read}}" aria-hidden="true"></i>
        {{/if}}
        {{date}}
    </div>
`;

export default tpl;
