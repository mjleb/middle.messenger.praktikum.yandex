const tpl: string = ` 
        <div class="modal-dialog-centered">
            <div class="modal-content">
                {{{buttonClose}}}
                {{#each buttons}}
                    {{{this}}}
                {{/each}}
                <h1>{{h1}}</h1>
                {{#if error}}<div class="alert alert-error">{{error}}</div>{{/if}}
                {{#if warning}}<div class="alert alert-warning">{{warning}}</div>{{/if}}
                {{#if succsess}}<div class="alert alert-succsess">{{succsess}}</div>{{/if}}
                {{{body}}}
            </div>
        </div>
`;
export default tpl;
