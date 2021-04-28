// ==UserScript==
// @name         Bot for Yandex
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://yandex.ru/*
// @match		 https://napli.ru/*
// @icon
// @grant        none
// ==/UserScript==

let keywords = ["вывод произвольных полей wordpress", "pods wordpress", "10 самых популярных шрифтов от Yandex", "Отключение редакций и ревизий в WordPress"];

let btnK = document.getElementsByName('btnK')[0];
let links = document.links;
let keyword = keywords[getRandom(0,keywords.length)];
let YandexInput = document.getElementsByName('q')[0];
let i = 0;


if(btnK !== undefined){
	let timerId = setInterval(()=> {
		YandexInput.value += keyword[i];
		i++;
		if(i == keyword.length) {
			clearInterval(timerId);
			btnK.click();
		}
	}, 1000);



}else if(location.hostname == "napli.ru" ) {
	console.log("Мы на napli.ru");
	setTimeout(()=>{
		let index = getRandom(0,links.length);

		if(getRandom(0,101)>=70) {
			location.href = "https://yandex.ru/";
		}
		if(links[index].href.indexOf('napli.ru')!=-1)
			links[index].click();
	},getRandom(2000,3500));
}
else{
	let nextYandexPage = true;
	for(let i=0; i<links.length; i++) {
		if(links[i].href.indexOf('napli.ru')!=-1) {
			let link = links[i];
			nextYandexPage = false;
			console.log("Нашел фразу" + link);
			setTimeout(()=>{
				link.click();},getRandom(1000,4500));
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

function getRandom(min,max) {
	return Math.floor(Math.random()*(max-min)+min);
}
