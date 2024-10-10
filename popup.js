document.addEventListener('DOMContentLoaded', function () {
    // Adiciona eventos aos botões
    document.getElementById('btnBold').addEventListener('click', function () {
        applyFormat('<b>', '</b>'); // Usando tags HTML para negrito
    });
    document.getElementById('btnItalic').addEventListener('click', function () {
        applyFormat('<i>', '</i>'); // Usando tags HTML para itálico
    });
    document.getElementById('btnList').addEventListener('click', function () {
        applyFormat('<li>', '</li>'); // Usando tags HTML para código
    });
    document.getElementById('btnStrike').addEventListener('click', function () {
        applyFormat('<s>', '</s>'); // Usando tags HTML para tachado
    });
    document.getElementById('btnCode').addEventListener('click', function () {
        applyFormat('<code>', '</code>'); // Usando tags HTML para código
    });


    // Atualiza a prévia da mensagem ao digitar
    document.getElementById('message').addEventListener('input', updatePreview);

    // Limpar campos
    document.getElementById('btnClear').addEventListener('click', clearFields);

    // Gerar WhatsLink
    document.getElementById('btnGenerate').addEventListener('click', generateLink);
});

// Função para aplicar formato
function applyFormat(startTag, endTag) {
    const messageArea = document.getElementById('message');
    const start = messageArea.selectionStart;
    const end = messageArea.selectionEnd;
    const selectedText = messageArea.value.substring(start, end);

    messageArea.value = messageArea.value.substring(0, start) +
        startTag + selectedText + endTag +
        messageArea.value.substring(end);
    messageArea.focus();
    updatePreview();
}

// Função para atualizar a prévia
function updatePreview() {
    const messageArea = document.getElementById('message');
    const messagePreview = document.getElementById('messagePreview');
    // Utiliza innerHTML para interpretar as tags HTML
    messagePreview.innerHTML = messageArea.value
        .replace(/\n/g, '<br>'); // Substitui novas linhas por <br>
}

// Função para limpar os campos
function clearFields() {
    document.getElementById('whatsappNumber').value = '';
    document.getElementById('message').value = '';
    document.getElementById('messagePreview').innerHTML = ''; // Limpa usando innerHTML
    document.getElementById('linkOutput').innerText = '';
}

// Função para gerar o WhatsLink
function generateLink() {
    const number = document.getElementById('whatsappNumber').value;
    const message = encodeURIComponent(document.getElementById('message').value);
    const link = `https://wa.me/${number}?text=${message}`;
    if (number.value != "" && message != "") {

        navigator.clipboard.writeText(link).then(() => {
            // Exibe o alerta SweetAlert
            Swal.fire({
                text: 'O link do WhatsApp foi copiado para a área de transferência.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        }).catch(err => {
            console.error('Erro ao copiar o link: ', err);
        });
    } else {
        Swal.fire({
            text: 'Por favor, preencha todos os campos!',
            icon: 'error',
            confirmButtonText: 'OK'
        });

    }


    // Copia o link para a área de transferência

    document.getElementById('linkOutput').innerText = link;
}

