const tpl: string = ` 
        <div class="modal-dialog-centered">
            <div class="modal-content">
                {{#each buttons}}
                    {{{this}}}
                {{/each}}
                <h1>{{h1}}</h1>
                <div id="{{id}}-alert-box" class="alert-box">
                    <div id="{{id}}-alert-error" class="alert alert-error"></div>
                    <div id="{{id}}-alert-warning" class="alert alert-warning"></div>
                    <div id="{{id}}-alert-success" class="alert alert-success"></div>
                </div>
                {{#if resulttext}}
                    <h3>{{{resulttext}}}</h3>
                {{/if}}
                {{#if result}}<small>Нажмите, чтобы удалить</small>{{/if}}
                <div class="links-list">
                {{#each result}}
                    {{{this}}}
                {{/each}}
                </div>
            </div>
        </div>
`;
export default tpl;
