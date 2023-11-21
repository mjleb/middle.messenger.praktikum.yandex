const tpl: string = `
<div>
    {{{modal}}}
    {{{avatar}}}
    <div class="person-data">
        {{{form}}}
        <nav>
            <ul class=" ">
                <li><a href="/profile-edit-password">Изменить пароль</a></li>
                <li><a class="/logout" href="/">Выйти</a></li>
            </ul>
        </nav>
    </div>
</div>
`;

export default tpl;
