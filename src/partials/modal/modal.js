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
