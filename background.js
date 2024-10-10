// Ouvindo quando a extensão é instalada
chrome.runtime.onInstalled.addListener(() => {
    console.log("Extensão WhatsLink instalada.");
});

// Ouvindo mensagens de outros scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "copyLink") {
        // Lógica para copiar um link, por exemplo, para a área de transferência
        navigator.clipboard.writeText(request.link)
            .then(() => {
                sendResponse({ status: "success" });
            })
            .catch(err => {
                sendResponse({ status: "error", message: err });
            });
        return true; // Indica que a resposta será enviada de forma assíncrona
    }
});
