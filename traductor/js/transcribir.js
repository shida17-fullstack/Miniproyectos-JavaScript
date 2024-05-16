document.addEventListener('DOMContentLoaded', function() {
    // Verificar si el navegador soporta la API de reconocimiento de voz
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        let selectedLanguage = 'es-ES'; // Idioma predeterminado: español
        let isRecognitionActive = false; // Bandera para rastrear el estado del reconocimiento

        // Permitir una grabación continua
        recognition.continuous = true; // Activar reconocimiento continuo

        // Array para almacenar las traducciones
        let translations = [];

        // Función para manejar el resultado del reconocimiento de voz
        function handleSpeechRecognition(event) {
            const results = event.results;
            for (let i = 0; i < results.length; i++) {
                const result = results[i][0].transcript;
                if (!translations.includes(result)) {
                    translations.push(result); // Agregar la traducción al array si no existe previamente
                }
            }
            // Mostrar todas las traducciones
            showTranslations();
        }

        // Función para mostrar todas las traducciones en el área de transcripción
        function showTranslations() {
            const transcriptionArea = document.getElementById('transcriptionArea'); // Acceder al textarea por su ID
            transcriptionArea.value = translations.join('\n'); // Actualizar el contenido del textarea con todas las transcripciones
            transcriptionArea.rows = translations.length; // Ajustar la cantidad de filas del textarea según la cantidad de traducciones
        }

        //Función para cambiar el idioma seleccionado
        function changeLanguage(language) {
            selectedLanguage = language;
            // Cambiar el idioma del reconocimiento de voz
            recognition.lang = selectedLanguage;
        }

        // Asociar la función de cambio de idioma al selector de idioma
        const languageSelector = document.getElementById('languageSelector');
        languageSelector.addEventListener('change', function() {
            changeLanguage(languageSelector.value);
        });

        // Función para iniciar o detener la transcripción
        function toggleTranscription() {
            if (!isRecognitionActive) {
                recognition.start(); // Iniciar el reconocimiento de voz
                isRecognitionActive = true; // Actualizar el estado del reconocimiento
                startButton.textContent = 'Detener Transcripción'; // Cambiar texto del botón
            } else {
                recognition.stop(); // Detener el reconocimiento de voz
                isRecognitionActive = false; // Actualizar el estado del reconocimiento
                startButton.textContent = 'Iniciar Transcripción'; // Cambiar texto del botón
            }
        }
        const startButton = document.getElementById('startButton');
        startButton.addEventListener('click', toggleTranscription);
        recognition.onresult = handleSpeechRecognition;
        recognition.onerror = function(event) {
            console.error('Error en el reconocimiento de voz:', event.error);
        };
        recognition.onend = function() {
            if (isRecognitionActive) {
                recognition.start(); // Volver a iniciar el reconocimiento si aún está activo
            }
        };
        
        // Manejar el botón de "Guardar Transcripción"
        const saveButton = document.getElementById('saveButton');
        saveButton.addEventListener('click', function() {
            saveTranscription();
        });

        // Función para guardar la transcripción en un archivo
        function saveTranscription() {
            const transcriptionArea = document.getElementById('transcriptionArea'); // Acceder al textarea por su ID
            const textToSave = transcriptionArea.value; // Obtener el contenido actual del textarea
            const blob = new Blob([textToSave], { type: 'text/plain' });
            const fileName = 'transcripcion_audio.txt';
            const link = document.createElement('a');
            link.download = fileName;
            link.href = window.URL.createObjectURL(blob);
            link.click();
        }

       // Manejar el botón de "Borrar Transcripción"
        const clearButton = document.getElementById('clearButton');
        clearButton.addEventListener('click', function() {
            // Mostrar el modal de confirmación
            const confirmationModal = document.getElementById('confirmationModal');
            confirmationModal.style.display = 'block';
        });

        // Manejar el botón de confirmar en el modal de confirmación
        const confirmDeleteButton = document.getElementById('confirmDeleteButton');
        confirmDeleteButton.addEventListener('click', function() {
            // Ocultar el modal de confirmación
            const confirmationModal = document.getElementById('confirmationModal');
            confirmationModal.style.display = 'none';

            // Mostrar mensaje de borrado vistoso
            const deleteMessage = document.getElementById('deleteMessage');
            deleteMessage.textContent = '¡Transcripción borrada con éxito!';
            deleteMessage.style.display = 'block';
            
            // Ocultar mensaje después de 3 segundos
            setTimeout(function() {
                deleteMessage.style.display = 'none';
            }, 3000);

            // Limpiar la transcripción
            const transcriptionArea = document.getElementById('transcriptionArea'); // Acceder al textarea por su ID
            transcriptionArea.value = ''; // Limpiar el contenido del textarea
            translations = []; // Borrar la transcripción
        });

        // Manejar el botón de cancelar en el modal de confirmación
        const cancelDeleteButton = document.getElementById('cancelDeleteButton');
        cancelDeleteButton.addEventListener('click', function() {
            // Ocultar el modal de confirmación
            const confirmationModal = document.getElementById('confirmationModal');
            confirmationModal.style.display = 'none';
        });


        // Manejar el botón de "Editar Transcripción"
        const editButton = document.getElementById('editButton');
        editButton.addEventListener('click', function() {
            const transcriptionArea = document.getElementById('transcriptionArea');
            transcriptionArea.readOnly = false; // Permitir la edición del textarea
        });

    } else {
        // Si el navegador no soporta la API de reconocimiento de voz, mostrar un mensaje de error
        alert('Lo siento, tu navegador no soporta la API de reconocimiento de voz.');
    }
});
