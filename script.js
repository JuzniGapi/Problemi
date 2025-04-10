const selectElement = document.getElementById('dropdown');
  


function createProblem(metadata,i){

  console.log(metadata);
  const problem = document.createElement('div');
  problem.className = 'problem';
  problem.innerHTML = `<p><b>${i}</b>:  ${metadata.title}</p>`;
  if (i < 6){
   fetch(`${metadata.difficulty}/descriptions/${metadata.id}.json`)
  .then(response => response.json())
  .then(data => {
    problem.title = data.description;
  })
  
  }
  return problem;

}


function fromFileCreate(file){
    fetch(file) // Replace with the URL you want to fetch from
  .then(response => response.json())
  .then(data => {
    // Assuming the JSON is an array
    document.getElementById('problems').innerHTML = ''; // Clear previous problems
    let i = 1;
    data.map(item => {
      
      const problem = createProblem(item, i);
      if (problem != null){
        document.getElementById('problems').appendChild(problem);
      }
      
        i++;
    });
  })

}


selectElement.addEventListener('change', function() {
  const selectedValue = selectElement.value;

  fromFileCreate(`${selectedValue}/metadata.json`)
});
fromFileCreate('easy/metadata.json')