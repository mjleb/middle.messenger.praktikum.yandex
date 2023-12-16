const tpl: string = ` 
        <div class="modal-dialog-centered">
            <div class="modal-content">
                {{#each buttons}}
                    {{{this}}}
                {{/each}}
                <h1>{{h1}}</h1>
                {{#if error}}<div class="alert alert-error">{{error}}</div>{{/if}}
                {{#if warning}}<div class="alert alert-warning">{{warning}}</div>{{/if}}
                {{#if succsess}}<div class="alert alert-succsess">{{succsess}}</div>{{/if}}
                {{{body}}}
                {{#if resulttext}}
                    <h1>Результат поиска</h1>
                    <h3>{{{resulttext}}}</h3>
                {{/if}}
                {{#if result}}<small>Нажмите, чтобы добавить</small>{{/if}}
                <div class="links-list">
                {{#each result}}
                    {{{this}}}
                {{/each}}
                </div>
            </div>
        </div>
`;
export default tpl;
