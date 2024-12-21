function nextScene(current, next) {
    console.log(`Navigating to scene ${next}`);
    const currentElement = document.getElementById(current);
    const nextElement = document.getElementById(next);
    
    if (next === 'scene1' && nextElement) {
        const waveOverlay = nextElement.querySelector('.wave-overlay');
        // Reset animation
        waveOverlay.style.animation = 'none';
        waveOverlay.offsetHeight; // Trigger reflow
        waveOverlay.style.animation = 'waveUp 3s ease-out forwards';
    }

    if (!currentElement || !nextElement) {
        console.error(`Elements not found: current=${current}, next=${next}`);
        return;
    }

    // Validate required fields
    const requiredFields = currentElement.querySelectorAll('[required]');
    let isValid = true;

    // Check if any required fields are empty
    requiredFields.forEach(field => {
        if (!field.value) {
            field.classList.add('error');
            isValid = false;
        }
    });

    if (!isValid) {
        console.error('Required fields are empty');
        return;
    }

    // Show next scene
    currentElement.classList.add('hidden');
    nextElement.classList.remove('hidden');

    // Reset required fields
    requiredFields.forEach(field => {
        field.value = '';
        field.classList.remove('error');
    });

    console.log(`Showing scene ${next}`);
}

function previousScene(current, previous) {
    console.log(`Navigating to previous scene ${previous}`);
    const currentElement = document.getElementById(current);
    const previousElement = document.getElementById(previous);
    
    if (!currentElement || !previousElement) {
        console.error(`Elements not found: current=${current}, previous=${previous}`);
        return;
    }

    // Hide current scene
    currentElement.classList.add('hidden');

    // Show previous scene
    previousElement.classList.remove('hidden');

    console.log(`Showing previous scene ${previous}`);
}

document.addEventListener('DOMContentLoaded', () => {
    // Initially hide both modals
    const modalOverlay = document.getElementById('modal-overlay');
    const modalOverlay5 = document.getElementById('modal-overlay-scene5');
    modalOverlay.style.display = 'none';
    modalOverlay5.style.display = 'none';

    // Original modal code - unchanged
    document.getElementById('other-checkbox').addEventListener('change', function() {
        const modalOverlay = document.getElementById('modal-overlay');
        if (this.checked) {
            modalOverlay.style.display = 'flex';
        }
    });

    document.getElementById('modal-cancel').addEventListener('click', () => {
        const modalOverlay = document.getElementById('modal-overlay');
        const otherCheckbox = document.getElementById('other-checkbox');
        modalOverlay.style.display = 'none';
        otherCheckbox.checked = false;
    });

    document.getElementById('modal-save').addEventListener('click', () => {
        const modalOverlay = document.getElementById('modal-overlay');
        modalOverlay.style.display = 'none';
    });

    document.getElementById('modal-overlay').addEventListener('click', (e) => {
        if (e.target === document.getElementById('modal-overlay')) {
            const otherCheckbox = document.getElementById('other-checkbox');
            e.target.style.display = 'none';
            otherCheckbox.checked = false;
        }
    });

    // Scene 5 modal code - new addition
    document.getElementById('other-search-checkbox').addEventListener('change', function() {
        if (this.checked) {
            modalOverlay5.style.display = 'flex';
        }
    });

    document.getElementById('modal-cancel-scene5').addEventListener('click', () => {
        modalOverlay5.style.display = 'none';
        document.getElementById('other-search-checkbox').checked = false;
    });

    document.getElementById('modal-save-scene5').addEventListener('click', () => {
        modalOverlay5.style.display = 'none';
    });

    modalOverlay5.addEventListener('click', (e) => {
        if (e.target === modalOverlay5) {
            modalOverlay5.style.display = 'none';
            document.getElementById('other-search-checkbox').checked = false;
        }
    });

    // Add to your existing DOMContentLoaded event listener
const modalOverlay6 = document.getElementById('modal-overlay-scene6');
modalOverlay6.style.display = 'none';

document.getElementById('other-decision-checkbox').addEventListener('change', function() {
    if (this.checked) {
        modalOverlay6.style.display = 'flex';
    }
});

document.getElementById('modal-cancel-scene6').addEventListener('click', () => {
    modalOverlay6.style.display = 'none';
    document.getElementById('other-decision-checkbox').checked = false;
});

document.getElementById('modal-save-scene6').addEventListener('click', () => {
    modalOverlay6.style.display = 'none';
});

modalOverlay6.addEventListener('click', (e) => {
    if (e.target === modalOverlay6) {
        modalOverlay6.style.display = 'none';
        document.getElementById('other-decision-checkbox').checked = false;
    }
});


// Add to your existing DOMContentLoaded event listener
const modalOverlay7 = document.getElementById('modal-overlay-scene7');
modalOverlay7.style.display = 'none';

document.getElementById('other-category-checkbox').addEventListener('change', function() {
    if (this.checked) {
        modalOverlay7.style.display = 'flex';
    }
});

document.getElementById('modal-cancel-scene7').addEventListener('click', () => {
    modalOverlay7.style.display = 'none';
    document.getElementById('other-category-checkbox').checked = false;
});

document.getElementById('modal-save-scene7').addEventListener('click', () => {
    modalOverlay7.style.display = 'none';
});

modalOverlay7.addEventListener('click', (e) => {
    if (e.target === modalOverlay7) {
        modalOverlay7.style.display = 'none';
        document.getElementById('other-category-checkbox').checked = false;
    }
});

// Add to your DOMContentLoaded event listener
document.querySelectorAll('.ranking-slider').forEach(slider => {
    const valueDisplay = slider.parentElement.querySelector('.ranking-value');
    
    // Initial value display
    valueDisplay.textContent = slider.value;
    
    // Update value display on slider change
    slider.addEventListener('input', function() {
        valueDisplay.textContent = this.value;
        
        // Add visual feedback
        slider.style.background = `linear-gradient(to right, #f26f27 ${(this.value - 1) * 25}%, #e0e0e0 ${(this.value - 1) * 25}%)`;
    });
});


});


