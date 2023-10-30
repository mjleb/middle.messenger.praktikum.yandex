 
/*
let close = document.getElementById('modal-avatar-close');
close.onclick = function () {
    console.log('close'+this.id);
    let id=this.id;
    id = id.replace('-close','');
    let tagEdit = document.getElementById(id);
    let newDisplay = 'none';
    tagEdit.style.display = newDisplay;
};
 */
export function modalOpen(id) {
    let tagEdit = document.getElementById('modal-' + id);
    let newDisplay = 'block';
    tagEdit.style.display = newDisplay;
};
export function modalClose(id) {
    let tagEdit = document.getElementById('modal-' + id);
    let newDisplay = 'none';
    tagEdit.style.display = newDisplay;
};