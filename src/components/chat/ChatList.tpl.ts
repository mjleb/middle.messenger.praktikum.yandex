const tpl: string = `
{{{modalNew}}}
{{{modalSearch}}}

    <div class="profile-link">
        <a href="{{links.profile}}">Профиль ></a>
        
    </div>
    <div class="search">
        {{{formSearch}}}
    </div>
    <div class="users">
        {{#each chats}}
            {{{this}}}
        {{/each}}
    
    </div>
    <div class="new-chat">{{{addnewchat}}}</div>
`;

export default tpl;
