var del = document.getElementById('delete');
var etl = document.getElementById('etl');

del.addEventListener('click', function () {
  fetch('offers', {
    method: 'delete'
  })
  .then(res => {
    if (res.ok) return res.json()
  })
  .then(data => {
    console.log(data)
    window.location.reload()
  })
})

etl.addEventListener('click', function () {
    fetch('offers', {
      method: 'post'
    })
    .then(res => {
      if (res.ok) return res.json()
    })
    .then(data => {
      console.log(data)
      window.location.reload()
    })
  })