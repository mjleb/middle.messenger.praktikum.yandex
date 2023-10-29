function modalOpen (id) {
    console.log('open');
    let tagEdit = document.getElementById('modal-'+id);
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

 
const form  = document.getElementById('form-avatar');

form.addEventListener('submit', (event) => {
    alert(form_id);
});
function formPreventDefault(e) {
    e.preventDefault();
    var form_id = $(this).closest("form").attr("id");
    alert(form_id);
    let sucsess = document.getElementById(id+'-sucsess');
    sucsess.style.display = block;
    return false;
}