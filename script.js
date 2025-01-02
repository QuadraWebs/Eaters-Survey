function nextScene(current, next) {
    console.log(`Navigating to scene ${next}`);
    const currentElement = document.getElementById(current);
    const nextElement = document.getElementById(next);
    
    if (current === 'welcome') {
        const nameInput = document.querySelector('input[name="name"]');
        const emailInput = document.querySelector('input[name="email"]');
        
        if (!nameInput?.value.trim()) {
            alert('Please enter your name');
            return;
        }
        
        if (!emailInput?.value.trim() || !emailInput.value.includes('@')) {
            alert('Please enter a valid email address');
            return;
        }
    }
    switch(current) {
        case 'scene1':
            if (!validateMood(currentElement)) {
                alert('Please select your mood before continuing');
                return;
            }
            break;
        case 'scene2':
            if (!validateLocation(currentElement)) {
                alert('Please select your location before continuing');
                return;
            }
            break;
        case 'scene3':
            if (!validateWeather(currentElement)) {
                alert('Please select a weather element before continuing');
                return;
            }
            break;
        case 'scene4':
            if (!validateFoodCollection(currentElement)) {
                alert('Please select 3 foods from your collection');
                return;
            }
            break;
        case 'scene5':
            if (!validateFoodSearch(currentElement)) {
                alert('Please select 3 foods you searched for');
                return;
            }
            break;
        case 'scene6':
            if (!validateFoodDecision(currentElement)) {
                alert('Please select at least one food decision');
                return;
            }
            break;
        case 'scene7':
            if (!validateFoodCategories(currentElement)) {
                alert('Please select 3 food categories');
                return;
            }
            break;
    }

 
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


function validateMood(element) {
    return element.querySelector('input[name="user_mood"]:checked') !== null;
}

function validateLocation(element) {
    return element.querySelector('select[name="user_location"]').value !== '';
}

function validateWeather(element) {
    return element.querySelector('input[name="weather_element"]:checked') !== null;
}

function validateFoodCollection(element) {
    const checkedBoxes = element.querySelectorAll('input[name="user_collection"]:checked').length;
    const otherInputs = Array.from(element.querySelectorAll('input[name^="other_food"]'))
        .some(input => input.value.trim() !== '');
    return checkedBoxes > 2 || otherInputs;
}

function validateFoodSearch(element) {
    const checkedBoxes = element.querySelectorAll('input[name="food_search"]:checked').length;
    const otherInputs = Array.from(element.querySelectorAll('input[name^="other_search"]'))
        .some(input => input.value.trim() !== '');
    return checkedBoxes > 2 || otherInputs;
}

function validateFoodDecision(element) {
    const selectedRadio = element.querySelector('input[name="final_food_decision"]:checked');
    const otherInput = element.querySelector('input[name="other_decision"]');
    return selectedRadio || (otherInput && otherInput.value.trim() !== '');
}

function validateFoodCategories(element) {
    const selectedRadio = element.querySelector('input[name="food_categories"]:checked');
    const otherInput = element.querySelector('input[name="other_category"]');
    return selectedRadio || (otherInput && otherInput.value.trim() !== '');
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

function addSelectionLimit(groupName, limit) {
    const checkboxes = document.querySelectorAll(`input[name="${groupName}"]`);
    const otherCheckbox = document.getElementById(`other-${groupName}-checkbox`);
    let otherInputs = [];
    
    // Define other inputs based on group name
    switch(groupName) {
        case 'user_collection':
            otherInputs = ['other_food_1', 'other_food_2', 'other_food_3'];
            break;
        case 'food_search':
            otherInputs = ['other_search_1', 'other_search_2', 'other_search_3'];
            break;
        case 'final_food_decision':
            otherInputs = ['other_decision'];
            break;
        case 'food_categories':
            otherInputs = ['other_category'];
            break;
    }

    // Monitor regular checkbox selections
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.value === 'other') return; // Skip other checkbox
            
            const checkedCount = getSelectedCount(groupName, otherInputs);
            if (checkedCount > limit) {
                this.checked = false;
                alert(`Maximum ${limit} selections allowed`);
            }
        });
    });

    // Monitor other inputs
    otherInputs.forEach(inputName => {
        const input = document.querySelector(`input[name="${inputName}"]`);
        if (input) {
            input.addEventListener('input', function() {
                const checkedCount = getSelectedCount(groupName, otherInputs);
                if (checkedCount > limit) {
                    this.value = '';
                    alert(`Maximum ${limit} selections allowed`);
                }
            });
        }
    });
}

function getSelectedCount(groupName, otherInputs) {
    const checkedBoxes = document.querySelectorAll(`input[name="${groupName}"]:checked:not([value="other"])`).length;
    const filledOtherInputs = otherInputs.filter(inputName => {
        const input = document.querySelector(`input[name="${inputName}"]`);
        return input && input.value.trim() !== '';
    }).length;
    
    return checkedBoxes + filledOtherInputs;
}

function handleSubmit(event) {
    event.preventDefault();
    const submitButton = document.querySelector('button[type="submit"]');
    const backButton = document.querySelector('button[onclick="previousScene(\'scene8\', \'scene7\')"]');
    
    submitButton.disabled = true;
    backButton.disabled = true;
    submitButton.innerHTML = '<span class="text">Submitting...</span>';
    const form = document.getElementById('surveyForm');
    const formData = new FormData(form);

    const userFields = ['name', 'email'];
    userFields.forEach(fieldName => {
        const fieldElement = form.querySelector(`input[name="${fieldName}"]`);
        formData.set(fieldName, fieldElement ? fieldElement.value : '');
    });
    // Define all required constants
    const selectInputs = ['user_location'];
    const rankingInputs = [
        'feeling_rank',
        'location_rank',
        'weather_rank',
        'saved_food_rank',
        'searched_food_rank'
    ];
    const scriptURL = 'https://script.google.com/macros/s/AKfycbwNAcexKM5dYl14iQGv_8QgBwAuEwDTZ-FHQce3COa61GKFDDerNtixYgLkvNJT0nGw/exec';

    // Log initial form data
    console.log('Initial form data:', {
        weather: formData.get('weather_element'),
        foodSearch: formData.get('food_search'),
        rankings: {
            feeling: formData.get('feeling_rank'),
            location: formData.get('location_rank'),
            weather: formData.get('weather_rank'),
            saved: formData.get('saved_food_rank'),
            searched: formData.get('searched_food_rank')
        }
    });

    // Update checkbox groups to exclude scenes 6 and 7
    const checkboxGroups = {
        'user_collection': {
            checkboxes: form.querySelectorAll('input[name="user_collection"]'),
            otherInputs: ['other_food_1', 'other_food_2', 'other_food_3']
        },
        'food_search': {
            checkboxes: form.querySelectorAll('input[name="food_search"]'),
            otherInputs: ['other_search_1', 'other_search_2', 'other_search_3']
        }
    };

    // Add radio groups for scenes 6 and 7
    const radioGroups = ['user_mood', 'weather_element', 'final_food_decision', 'food_categories'];
    radioGroups.forEach(groupName => {
        const selectedRadio = form.querySelector(`input[name="${groupName}"]:checked`);
        if (selectedRadio && selectedRadio.value === 'other') {
            // Handle "other" values for scenes 6 and 7
            if (groupName === 'final_food_decision') {
                const otherValue = form.querySelector('input[name="other_decision"]').value;
                formData.set(groupName, otherValue || 'other');
            }
            if (groupName === 'food_categories') {
                const otherValue = form.querySelector('input[name="other_category"]').value;
                formData.set(groupName, otherValue || 'other');
            }
        } else {
            formData.set(groupName, selectedRadio ? selectedRadio.value : '');
        }
        console.log(`Radio group ${groupName}:`, formData.get(groupName));
    });

    // Process remaining checkbox groups
    for (let [groupName, group] of Object.entries(checkboxGroups)) {
        let selectedValues = [];
        
        group.checkboxes.forEach(checkbox => {
            if (checkbox.checked && checkbox.value !== 'other') {
                selectedValues.push(checkbox.value);
            }
        });

        group.otherInputs.forEach(inputName => {
            const otherInput = form.querySelector(`input[name="${inputName}"]`);
            if (otherInput && otherInput.value.trim()) {
                selectedValues.push(otherInput.value.trim());
            }
        });

        formData.set(groupName, selectedValues.join(', '));
        console.log(`Checkbox group ${groupName}:`, selectedValues);
    }

    // Process select inputs
    selectInputs.forEach(selectName => {
        const selectElement = form.querySelector(`select[name="${selectName}"]`);
        const value = selectElement ? selectElement.value : '';
        formData.set(selectName, value);
        console.log(`Select input ${selectName}:`, value);
    });

    // Process rankings
    let rankValues = [];
    rankingInputs.forEach(rankName => {
        const rankElement = form.querySelector(`input[name="${rankName}"]`);
        if (rankElement) {
            rankValues.push(rankElement.value);
        }
    });
    
    formData.set('rankings', rankValues.join(', '));
    console.log('Combined rankings:', rankValues.join(', '));

    console.log('Final form data:', Object.fromEntries(formData));

    fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        body: formData
    })
    .then(response => {
        console.log('Submission response:', response);
        console.log('Form submitted successfully');
        nextScene('scene8', 'final');
    })
    .catch(error => {
        console.error('Submission error:', error.message);
        console.log('Form data that failed:', Object.fromEntries(formData));
    });
}




document.addEventListener('DOMContentLoaded', () => {

    addSelectionLimit('user_collection', 3);
    addSelectionLimit('food_search', 3);
    addSelectionLimit('final_food_decision', 3);
    addSelectionLimit('food_categories', 3);
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




