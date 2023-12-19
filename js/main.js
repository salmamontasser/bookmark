var siteName = document.getElementById('siteName')
var siteURL = document.getElementById('siteURL')
var submitBtn = document.getElementById('submitBtn')
var visitBtn = document.querySelector(".btn-visit");
var tableRow =document.getElementById('tableRow')

var bookmarkList = []
if (localStorage.getItem('bookmarks'))
    bookmarkList = JSON.parse(localStorage.getItem('bookmarks'))

display(bookmarkList)
submitBtn.onclick = function () {
    if(nameRegex() && urlRegex()){
        addSite()
        clearFun()

    }
    else
    NotMatch()
}
function addSite() {

    var bookmark = {
        siteName: siteName.value,
        siteURL: siteURL.value

    }
    bookmarkList.push(bookmark)
 localStorage.setItem('bookmarks',JSON.stringify(bookmarkList))
    display(bookmarkList)
}

function display(list) {
    var box = ''
    var l = bookmarkList.length
    for (var i = 0; i < l; i++) {
        box += `
        <tr>
            <td>${i + 1}</td>
            <td>${list[i].siteName}</td>
            <td>
            <a href="${list[i].siteURL}" target="_blank" type="button" class="btn btn-visit" id="btnVisit">
            <i class="fa-solid fa-eye pe-2"></i>
            Visit</a>
            </td>
            <td>
                <button  class="btn btn-danger" onclick='deleteItems(${i})'>
                    <i class="fa-solid fa-trash-can pe-2"></i>
                    Delete
                </button>
            </td>
        </tr>
        `
    }
    tableRow.innerHTML=box
}

function clearFun() {
    siteName.value=''
    siteURL.value=''
}
function deleteItems(index) {
    bookmarkList.splice(index,1)
localStorage.setItem('bookmarks',JSON.stringify(bookmarkList))
    display(bookmarkList)
}





function nameRegex() {
    var Regex=/^\w{3,}(\s+\w+)*$/;
    return Regex.test(siteName.value)
}
function urlRegex() {
    var Regex=/^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;
    return Regex.test(siteURL.value)
}

function NotMatch() {
    if(!nameRegex())
    alert('website name not match')
else if (!urlRegex())
alert('website url not match')
}