// ==UserScript==
// @name         Bot for Yandex
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       AlexandrLaptev
// @match        https://yandex.ru/*
// @match	 https://napli.ru/*
// @match        https://gagadget.com/*
// @match        https://news.rambler.ru*
// @icon
// @grant        none
// ==/UserScript==

let sites = {
	"gagadget.com":["Sony выпустила первое крупное обновление", "10 лучших квадрокоптеров с AliExpress", "Лучший SSD для монтажа видео"],
	"news.rambler.ru":['covid 19','шевский владимир', 'шествие на день города в санкт петербурге','бедствия'],
};

let site = Object.keys(sites)[getRandom(0,Object.keys(sites).length)];
let yandexInput = document.getElementsByName('text')[0];
let keywords = sites[site];
let keyword = keywords[getRandom(0, keywords.length)];
let find = document.getElementsByClassName('button mini-suggest__button')[0];
let links = document.links;
let i = 0;

if(find !== undefined) {
	document.cookie = "site="+site;
}else if (location.hostname == "yandex.ru") {
	site = getCookie("site");
}else{
	site = location.hostname;
}

if(find !== undefined){
    document.cookie = "site="+site;
    let timerId = setInterval(()=> {
		yandexInput.value += keyword[i];
		i++;
		if(i == keyword.length) {
			clearInterval(timerId);
			find.click();
		}
	}, 700);

}else if(location.hostname == site){
    setTimeout(()=>{
    let index = getRandom(0,links.length);
        if(getRandom(0,101)>=70){
        location.href = "https://yandex.ru/";
        }
        if(links[index].href.indexOf(site)!=-1)
    links[index].click();
    },getRandom(4000,7000));
}



else{
	let nextYandexPage = true;
	for(let i=0; i<links.length; i++) {
		if(links[i].href.indexOf(site)!=-1) {
			let link = links[i];
			nextYandexPage = false;
			setTimeout(()=>{
				link.click();},getRandom(3000,5000));
			break;
		}
	}
    if(document.querySelector('.pager__item_current_yes').textContent == "5") {
		nextYandexPage = false;
		location.href = "https://yandex.ru/";
	}

	if(document.querySelector('.pager__item_current_yes').textContent !== "5") {
		setTimeout(()=>{
			document.querySelector('.pager__item_kind_next').click();}
				   ,getRandom(3000,5000));
	}
}

function getRandom(min, max) {
return Math.floor(Math.random()*(max-min)+min);
}

function getCookie(name) {
	let matches = document.cookie.match(new RegExp(
		"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	));
	return matches ? decodeURIComponent(matches[1]) : undefined;
}
