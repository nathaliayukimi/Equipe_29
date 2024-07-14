function acesso(event){
    event.preventDefault(); // Impede o envio do formulário
            
    // Verifica se todos os campos obrigatórios estão preenchidos
    const form = document.getElementById('meuFormulario');
    var inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(function(input) {
        if (!input.value) {
            isValid = false;
            input.style.borderColor = 'red'; // Adiciona um destaque para o campo não preenchido
        } else {
            input.style.borderColor = ''; // Remove o destaque caso o campo esteja preenchido
        }
    });

    if (!document.getElementById('termos').checked) {
        isValid = false;
        alert('Você deve aceitar os termos e condições.');
    }

    if (!isValid) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    // Envia o formulário se todos os campos estiverem preenchidos
    form.submit();

    // Limpa todos os campos do formulário
    inputs = document.querySelectorAll('#meuFormulario input');
    inputs.forEach(function(input) {
        input.value = '';
    });
    
    alert('Formulário Enviado. Agradecemos o contato, retornaremos em breve.')
}
