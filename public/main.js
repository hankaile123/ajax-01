const ajax = (url, node, position) => {
    const request = new XMLHttpRequest()
    request.open('GET', url)
    request.onreadystatechange = () => {
        if (request.readyState == 4 && request.status >= 200 && request.status < 300) {
            console.log(request.response);
            const label = document.createElement(node)
            label.innerHTML = request.response
            if (position && position === 'head') {
                document.head.appendChild(label)
            } else {
                document.body.appendChild(label)
            }
        }
    }
    request.send()
}

// getCSS
getCSS.onclick = () => {
    ajax('/style.css', 'style', 'head')
}

// getJS
getJS.onclick = () => {
    ajax('/a.js', 'script')
}

// getHTML
getHTML.onclick = () => {
    ajax('/a.html', 'div')
}

// getXML
getXML.onclick = () => {
    const request = new XMLHttpRequest()
    request.open('GET', '/a.xml')
    request.onreadystatechange = () => {
        if (request.status >= 200 && request.status < 300 && request.readyState === 4) {
            const dom = request.responseXML
            const text = dom.getElementsByTagName('warning')[0].textContent.trim()
            xml.innerText = text
            console.log(text);
        }
    }
    request.send()
}

// getJSON
getJSON.onclick = () => {
    const request = new XMLHttpRequest()
    request.open('GET', '/a.json')
    request.onreadystatechange = () => {
        if (request.status >= 200 && request.status < 300 && request.readyState === 4) {
            console.log(JSON.parse(request.response));
            const result = JSON.parse(request.response)
            xml.innerText = `${result.fileName}, ${result.state}!`
        }
    }
    request.send()
}

// 分页
let n = 1
next.onclick = () => {
    const request = new XMLHttpRequest()
    request.open('GET', `page${n + 1}.json`)
    request.onreadystatechange = () => {
        if (request.status >= 200 && request.status < 300 && request.readyState === 4) {
            const arr = JSON.parse(request.response)
            arr.forEach(item => {
                const li = document.createElement('li')
                li.textContent = item.id
                pag.appendChild(li)
            })
            n++
            console.log(n);
        }
    }
    request.send()
}