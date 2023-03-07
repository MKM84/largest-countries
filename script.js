const draggable_list = document.getElementById('draggable-list');

const largestContry = [
    {
        country: 'Russia',
        flag: 'ru'
    },
    {
        country: 'Canada',
        flag: 'ca'
    },
    {
        country: 'China',
        flag: 'cn'
    },
    {
        country: 'USA',
        flag: 'us'
    },
    {
        country: 'Brazil',
        flag: 'br'
    },
    {
        country: 'Australia',
        flag: 'au'
    },
    {
        country: 'India',
        flag: 'io'
    },
    {
        country: 'Argentina',
        flag: 'ar'
    },
    {
        country: 'Kazakhstan',
        flag: 'kz'
    },
    {
        country: 'Algeria',
        flag: 'dz'
    }
]

// Store listitems
const listItems = [];


let dragStartIndex;

createList();

// Insert list items into DOM
function createList() {
  [...largestContry]
    .map(c => ({ country: c.country, flag: c.flag, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(c => ({country: c.country, flag: c.flag}))
    .forEach((country, index) => {
      const listItem = document.createElement('li');
      listItem.classList.add('draggable-item');
      listItem.setAttribute('data-index', index);

      listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
            <p class="country-name">${country.country}</p>
            <span class="fi fi-${country.flag}"></span>
        </div>
      `;

      listItems.push(listItem);

      draggable_list.appendChild(listItem);
    });

}

function dragStart() {
    dragStartIndex = +this.closest('li').getAttribute('data-index');
    this.classList.remove('over');
}

function dragEnter() {
    this.classList.add('over');
  }
  
  function dragLeave() {
    this.classList.remove('over');
  }
  function dragOver(e) {
    e.preventDefault();
  }
  function dragDrop() {
    const dragEndIndex = +this.getAttribute('data-index');
    swapItems(dragStartIndex, dragEndIndex);
  
    this.classList.remove('over');
  }
  
  // Swap list items that are drag and drop
  function swapItems(fromIndex, toIndex) {
    const itemOne = listItems[fromIndex].querySelector('.draggable');
    const itemTwo = listItems[toIndex].querySelector('.draggable');
  
    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);
  }
  
  // Check the order of list items
  function checkOrder() {
    listItems.forEach((listItem, index) => {
      const countryName = listItem.querySelector('.draggable').innerText.trim();

        console.log(largestContry[index].country.trim());
      if (countryName !== largestContry[index].country) {
        listItem.classList.add('wrong');
        listItem.classList.remove('right');
      } else {
        listItem.classList.remove('wrong');
        listItem.classList.add('right');
      }
    });
  }

function addEventListeners() {
    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll('.draggable-list li');
  
    draggables.forEach(draggable => {
      draggable.addEventListener('dragstart', dragStart);
    });
  
    dragListItems.forEach(item => {
      item.addEventListener('dragover', dragOver);
      item.addEventListener('drop', dragDrop);
      item.addEventListener('dragenter', dragEnter);
      item.addEventListener('dragleave', dragLeave);
    });
  }

  check.addEventListener('click', checkOrder);
  addEventListeners();
