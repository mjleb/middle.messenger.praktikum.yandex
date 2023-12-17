const tpl: string = `
{{{modalNew}}}
{{{modalSearch}}}

    <div class="profile-link">
        {{{linkProfile}}}
        
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
