// Keep track of all count values
const counts = [];

// Reference to the total display
const totalCountDisplay = document.getElementById('totalCountDisplay');

// Function to update total count
function updateTotalCount() {
  const total = counts.reduce((sum, c) => sum + c.value, 0);
  totalCountDisplay.textContent = `Total: ${total}`;
}

document.getElementById('createBtn').addEventListener('click', () => {
  let count = 0;

  const label = document.getElementById('label').value;
  const description = document.getElementById('description').value;

  // Create elements
  const newElement = document.createElement('div');
  const countContainer = document.createElement('div');
  const countDisplay = document.createElement('p');
  const incrementBtn = document.createElement('button');
  const decrementBtn = document.createElement('button');
  const updateBtn = document.createElement('button');
  const deleteBtn = document.createElement('button');

  // Set classes
  newElement.classList.add('item');
  countContainer.classList.add('div_count');
  countDisplay.classList.add('_count');
  incrementBtn.textContent = '+';
  decrementBtn.textContent = '-';
  updateBtn.textContent = 'Update';
  deleteBtn.textContent = 'Delete';

  countDisplay.textContent = count;

  // Register this count in the counts array
  const countRef = { value: count };
  counts.push(countRef);

  function updateCount() {
    countDisplay.textContent = count;
    countRef.value = count; // update the tracked value
    updateTotalCount();
  }

  // Button listeners
  incrementBtn.addEventListener('click', () => {
    count++;
    updateCount();
  });

  decrementBtn.addEventListener('click', () => {
    count--;
    updateCount();
  });

  deleteBtn.addEventListener('click', () => {
    // Remove the element from DOM
    newElement.remove();

    // Remove this count from the tracked array
    const index = counts.indexOf(countRef);
    if (index > -1) {
      counts.splice(index, 1);
    }

    updateTotalCount();
  });

  // Count container
  countContainer.appendChild(countDisplay);
  countContainer.appendChild(incrementBtn);
  countContainer.appendChild(decrementBtn);

  // Editable text setup
  const labelP = document.createElement('p');
  labelP.className = 'p';
  labelP.textContent = label;

  const descP = document.createElement('p');
  descP.className = 'p';
  descP.textContent = description;

  function makeEditable(p) {
    p.addEventListener('click', () => {
      const input = document.createElement('input');
      input.type = 'text';
      input.value = p.textContent;
      input.className = 'p-input';

      p.replaceWith(input);
      input.focus();

      const save = () => {
        const newP = document.createElement('p');
        newP.className = 'p';
        newP.textContent = input.value;
        makeEditable(newP);
        input.replaceWith(newP);
      };

      input.addEventListener('blur', save);
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') save();
      });
    });
  }

  makeEditable(labelP);
  makeEditable(descP);

  newElement.appendChild(labelP);
  newElement.appendChild(descP);
  newElement.appendChild(updateBtn);
  newElement.appendChild(deleteBtn);
  newElement.appendChild(countContainer);

  document.querySelector('.hero_item').appendChild(newElement);

  // Initial update of total
  updateTotalCount();
});

