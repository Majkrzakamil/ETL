var etlControl = {
    etl: document.getElementById('etl'),
    extract: document.getElementById('extract'),
    transform: document.getElementById('transform'),
    load: document.getElementById('load')
}
var del = document.getElementById('delete');
var status = document.getElementById('status');


transform.disabled = true;
load.disabled = true;

if(status === 'null'){
    Object.keys(etlControl).forEach((i) => {
        etlControl[i].disabled = true;
    });
}

del.addEventListener('click', function () {
    etl.disabled = false;
    extract.disabled = false;
    transform.disabled = true;
    load.disabled = true;
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

etlControl.etl.addEventListener('click', function () {
    Object.keys(etlControl).forEach((i) => {
        etlControl[i].disabled = true;
    });
    fetch('offers', {
        method: 'post'
    })
    
    .then(data => {
        console.log(data)
        window.location.reload()
    })
})

etlControl.extract.addEventListener('click', function () {
    etlControl.etl.disabled = true;
    etlControl.extract.disabled = true;
    etlControl.transform.disabled = false;
    fetch('extract', {
        method: 'get'
    })
    .then(res => {
        if (res.ok) return res.json()
    })
    .then(data => {
        console.log(data)
        window.location.reload()
    })
})

etlControl.transform.addEventListener('click', function () {
    etlControl.transform.disabled = true;
    etlControl.load.disabled = false;
    fetch('transform', {
        method: 'get'
    })
    .then(res => {
        if (res.ok) return res.json()
    })
    .then(data => {
        console.log(data)
        window.location.reload()
    })
})

etlControl.load.addEventListener('click', function () {
    etlControl.load.disabled = true;
    fetch('load', {
        method: 'post'
    })
    .then(data => {
        console.log(data)
        window.location.reload()
    })
})