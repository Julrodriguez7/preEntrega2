const btn = document.getElementById('button');

document.getElementById('form').addEventListener('submit', function(event) {
   event.preventDefault();

   btn.value = 'Enviando...';

   const serviceID = 'default_service';
   const templateID = 'template_5nhhayl';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Send Email';
      Swal.fire({
        icon: 'success',
        title: 'Gracias por su mensaje',
        text: 'Nos comunicaremos a la brevedad',
      });
    }, (err) => {
      btn.value = 'Send Email';
      alert(JSON.stringify(err));
    });
});