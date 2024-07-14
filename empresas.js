function acesso(){

    // Limpa todos os campos do formulário
    var inputs = document.querySelectorAll('#meuFormulario input');
    inputs.forEach(function(input) {
        input.value = '';
    });
    alert('Formulário Enviado. Agradecemos o contato, retornaremos em breve.')
}
