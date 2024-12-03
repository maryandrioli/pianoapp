document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('grid');
    const notes = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4'];
    let lastPlayed = [];
    let lastNoteTime = performance.now();
    let instrumentIndex = 0; // Índice do instrumento atual
    const instruments = ['piano', 'drums', 'guitar']; // Lista de instrumentos

    // Criação da grade
    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 7; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.note = notes[i];
            cell.addEventListener('click', () => {
                playAndRecord(notes[i]);
                highlightCell(cell);
            });
            grid.appendChild(cell);
        }
    }

    // Event listener para teclas
    document.addEventListener('keydown', (event) => {
        if (event.key === 'd' || event.key === 'D') { 
            switchInstrument();
            event.preventDefault(); // Evita ações padrão da tecla (como rolagem)
        } else {
            handleNoteKeyPress(event);
        }
    });

    function handleNoteKeyPress(event) {
        let note;
        switch (event.key) {
            case 'ArrowLeft':
                note = 'C4';
                break;
            case 'ArrowRight':
                note = 'D4';
                break;
            case 'ArrowUp':
                note = 'E4';
                break;
            case 'ArrowDown':
                note = 'F4';
                break;
            case ' ':
                note = 'G4';
                break;
            case 'Enter':
                note = 'A4';
                break;
            case 'w':
            case 'W':
                note = 'B4';
                break;
            case 'a':
            case 'A':
                replayLastPlayed();
                break;
        }
        if (note) {
            playAndRecord(note);
            highlightCells(note);
            event.preventDefault(); // Evita a rolagem da tela para todas as teclas relacionadas a notas
        }
    }

    // Alterna entre os instrumentos
    function switchInstrument() {
        instrumentIndex = (instrumentIndex + 1) % instruments.length;
        console.log(`Instrumento atual: ${instruments[instrumentIndex]}`);
    }

    function playAndRecord(note) {
        const now = performance.now();
        const interval = now - lastNoteTime;
        lastNoteTime = now;
        playNote(note);
        lastPlayed.push({ note, interval });
        if (lastPlayed.length > 7) {
            lastPlayed.shift();
        }
    }

    function replayLastPlayed() {
        let cumulativeDelay = 0;
        lastPlayed.forEach(entry => {
            setTimeout(() => playNote(entry.note), cumulativeDelay);
            cumulativeDelay += entry.interval;
        });
    }

    function playNote(note) {
        const synth = new Tone.Synth().toDestination();
        switch (instruments[instrumentIndex]) {
            case 'piano':
                synth.triggerAttackRelease(note, '8n');
                break;
            case 'drums':
                // Implemente a lógica para tocar o som da bateria
                break;
            case 'guitar':
                // Implemente a lógica para tocar o som da guitarra
                break;
        }
    }

    function highlightCells(note) {
        document.querySelectorAll(`[data-note="${note}"]`).forEach(cell => {
            highlightCell(cell);
        });
    }

    function highlightCell(cell) {
        const color = getRandomColor();
        cell.style.borderColor = color;
        cell.style.backgroundColor = color;
    }

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
});
