const tpl: string = `
<div class="link-back ">
    {{{linkChat}}}
</div>

<div>  
    {{{modal}}}
    {{{avatar}}}

    <div class="person-data">

    {{#if error}}<div class="alert alert-error">{{error}}</div>{{/if}}
    {{#if warning}}<div class="alert alert-warning">{{warning}}</div>{{/if}}
    {{#if succsess}}<div class="alert alert-succsess">{{succsess}}</div>{{/if}}

        <ul class=" ">
            <li>
                <div class="label">id</div>
                <div class="data">{{user.id}}</div>
            </li>
            <li>
                <div class="label">Почта</div>
                <div class="data">{{user.email}}</div>
            </li>
            <li>
                <div class="label">Логин</div>
                <div class="data">{{user.login}}</div>
            </li>
            <li>
                <div class="label">Имя</div>
                <div class="data">{{user.first_name}}</div>
            </li>
            <li>
                <dt class="label">Фамилия</dt>
                <div class="data">{{user.second_name}}</div>
            </li>
            <li>
                <div class="label">Имя в чате</div>
                <div class="data">{{user.display_name}}</div>
            </li>
            <li>
                <div class="label">Телефон</div>
                <div class="data">{{user.phone}}</div>
            </li>
        </ul>
        <nav>
            <ul class=" ">
                <li>{{{linkProfileEdit}}}</li>
                <li>{{{linkProfilePassword}}}</li>
                <li>{{{linkLogout}}}</li>
            </ul>
        </nav>
    </div>
</div>
`;

export default tpl;
