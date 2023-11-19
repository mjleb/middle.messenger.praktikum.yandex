export const tpl: string = ` 
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
