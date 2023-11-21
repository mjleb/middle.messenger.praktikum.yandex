const tpl: string = `
<div class="menu">
    <div class="profile-link">
        <a href="/profile">Профиль ></a>
    </div>
    <div class="search">
        {{{formSearch}}}
    </div>
    <div class="users">
        {{{users}}}
        
    </div>
</div>
<div class="context">
    <div class="user">
        {{user}}
       {{!-- <i class="fa fa-ellipsis-v" aria-hidden="true"></i> --}}
    </div>
    {{#if posts }}
         {{{posts}}} 
    {{else}}
        <div class="no_data">Выберите чат чтобы отправить сообщение</div> 
    {{/if}}
    <div class="input-message">
        <div class="button-img-add"><i class="fa fa-paperclip fa-2x" aria-hidden="true"></i></div>
        {{{formMessage}}}
    </div>
</div>
`;

export default tpl;
