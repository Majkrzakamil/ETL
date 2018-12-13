var del = document.getElementById('delete')

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