const tpl: string = `
<div>
    {{{modal}}}
    {{{avatar}}}
    <div class="person-data">
        <ul class=" ">
            <li>
                <div class="label">Почта</div>
                <div class="data">{{email}}</div>
            </li>
            <li>
                <div class="label">Логин</div>
                <div class="data">{{login}}</div>
            </li>
            <li>
                <div class="label">Имя</div>
                <div class="data">{{first_name}}</div>
            </li>
            <li>
                <dt class="label">Фамилия</dt>
                <div class="data">{{second_name}}</div>
            </li>
            <li>
                <div class="label">Имя в чате</div>
                <div class="data">{{display_name}}</div>
            </li>
            <li>
                <div class="label">Телефон</div>
                <div class="data">{{phone}}</div>
            </li>
        </ul>
        <nav>
            <ul class=" ">
                <li><a href="/profile-edit">Изменить данные</a></li>
                <li><a href="/profile-edit-password">Изменить пароль</a></li>
                <li><a class="/logout" href="/">Выйти</a></li>
            </ul>
        </nav>
    </div>
</div>
`;

export default tpl;
