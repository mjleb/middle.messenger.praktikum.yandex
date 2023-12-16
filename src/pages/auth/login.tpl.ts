const tpl: string = `
    <div class="card">
         <h1>Вход</h1>
      
         {{#if error}}<div class="alert alert-error">{{error}}</div>{{/if}}
         {{#if warning}}<div class="alert alert-warning">{{warning}}</div>{{/if}}
        {{{form}}}
        <div>
        <a href="{{links.signup}}">Нет аккаунта?</a>
        </div>
    </div>
`;

export default tpl;
