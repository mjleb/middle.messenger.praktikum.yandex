const tpl: string = ` 
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
