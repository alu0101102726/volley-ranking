const rows = document.querySelectorAll('.row');
const colors = ['#F8827D', '#FBBF7D', '#FCFD7D', '#87FB7F', '#84C0FE', '#8183FF'];

const onDragOver = (event) => {
  event.preventDefault();
}

const onDrop = (event) => {
  event.preventDefault();
  const draggedCardId = event.dataTransfer.getData('id');
  const draggedCard = document.getElementById(draggedCardId);
  event.target.appendChild(draggedCard);
  console.log('Elemento arrastrado');
}

rows.forEach((row, index) => {
  const label = row.querySelector('.label');
  label.style.backgroundColor = colors[index];
  row.ondragover = onDragOver;
  row.ondrop = onDrop;
})