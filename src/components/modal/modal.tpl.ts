const tpl: string = ` 
        <div class="modal-dialog-centered">
            <div class="modal-content">
                {{#each buttons}}
                    {{{this}}}
                {{/each}}
                <h1>{{h1}}</h1>
                {{{body}}}
            </div>
        </div>
`;
export default tpl;
