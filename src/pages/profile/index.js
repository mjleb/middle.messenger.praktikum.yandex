
avatar.onclick = function () {
    console.log('open');
    let tagEdit = document.getElementById('modal-avatar');
    let newDisplay = 'block';
    tagEdit.style.display = newDisplay;
};
let close = document.getElementById('modal-avatar-close');
close.onclick = function () {
    console.log('close'+this.id);
    let id=this.id;
    id = id.replace('-close','');
    let tagEdit = document.getElementById(id);
    let newDisplay = 'none';
    tagEdit.style.display = newDisplay;
};