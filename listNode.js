
// Первый раз с этим работал, мог организовать список не так, как ты задумал, поэтому учти это при тесте, пожалуйста.


"use strict"
// объект с ключом и указателем
	class Node{
		constructor(key){
			this.key=key;
			this.next=null;
			this.setNext=function(a){
					this.next=a;
			}
		}
	}
		//объект с head & tail указывает на первый и последний элемент списка. head содержит весь всписок.
	class LinkedList{
		constructor(){
			this.head=null;
			this.tail=null;
			for (var i = 0; i < arguments.length; i++) {
				this.pushBack(arguments[i]);
				}
			this.length=this.size();
		}
		
		// Добавление в начало списка(ОДНО ЗНАЧЕНИЕ)
				pushFront(key) {
			
				const newNode = new Node(key);

				if (this.head === null && this.tail === null) {
					this.head = newNode;
					this.tail = newNode;
					return;
				}

				 newNode.setNext(this.head);
				this.head = newNode;
				this.length=this.size();
			}
		// добавление в конец списка(ОДНО ЗНАЧЕНИЕ)
				pushBack(key) {
				
					const newNode = new Node(key);
					
					if (this.tail === null && this.head === null) {
						this.tail = newNode;
						this.head = newNode;
						return;
					}
					
					this.tail.setNext(newNode);

					this.tail = newNode;
					this.length=this.size();
				}
				// поиск по значению
				contains(key) {
					let node = this.head;
					while (node !== null) {
						
						if (node.key === key) {
							return true;
						}
						node = node.next;
					}
					
					return false;
				}
			//Удаление первого эл-та
			shift() {
				
				if (this.head ===  null) {
					throw new Error('List is empty');
				} else if (this.head === this.tail) {
					this.head = null;
					this.tail = null;
				}
				let firstEl=this.head.key;
				this.head = this.head.next;
				this.length=this.size();
				return firstEl;
			}
			
			//Удалние последнего эл-та
			pop() {
				if (this.head === null) {
					throw new Error('List is empty');
				} else if (this.head === this.tail) {
					this.head = null;
					this.tail = null;
				}
				let node = this.head;
				while (node.next !== this.tail) {
					node = node.next;
				}
				let lastEl=node.next.key;
				node.setNext(null);
				this.tail = node;
				this.length=this.size();
				return lastEl;
			}
			
		//Добавление по индексу
			set(index, key) {
				if (index === 0) {
					this.pushFront(key);
					return;
				}
				const newNode = new Node(key);
				let node = this.head;
				for (let i = 0; i < index - 1; i++) {
					node = node.next;
				}
				newNode.setNext(node.next);
				node.setNext(newNode);
				this.length=this.size();
			}
			
		//Получение по индексу
		get(index){
			let node = this.head;
			if(index>this.length-1){
				console.log("Error. This index is not exist");
				return;
			}
				for (let i = 0; i <= index-1; i++) {
					node = node.next;
				}
			return node.key;
			
		}
			
		// Переворот списка
			reverse() {
				
				if (this.head === this.tail) {
					return;
				}
				this.tail = this.head;
				let node = this.head.next;				
				let prev = this.head;			
				while (node !== null) {					
					if (node.next === null) {
						this.head = node;
					}				
					var current = node;					
					node = node.next;				
					current.setNext(prev);
					prev = current;
				}				
				this.tail.setNext(null);
			}
			
		// Вывод всего списка
		loop(){
			let node = this.head;
			while(node !== null){
					console.log(node.key);
					node = node.next;
			}
		}
		/*Преобразование в массив*/
		arrAdd(){
				let node = this.head;
				let str=[];
				let i=0;
				while(node !== null){
					str[i]=node.key;
					i++;
					node = node.next;
			}
			return str;
		}
					
		// Длина списка
			size() {
				let length = 0;
				let node = this.head;

				while (node !== null) {
					length += 1;
					node = node.next;
				}

				return length;
			}
			//добавление МНОГО элементов в конец
			push(){
				for (var i = 0; i < arguments.length; i++) {
				this.pushBack(arguments[i]);
				}
				this.length=this.size();
			}
			//добавление МНОГО элементов в начало
			unshift(){
				for (var i = arguments.length-1; i >= 0; i--) {
				this.pushFront(arguments[i]);
				}
				this.length=this.size();
			}
			// Сортировка пузырьком
			sort(){
				let A=this.arrAdd();// A - массив, который нужно
				let n = A.length;
				let Anum = []; let Astr = []; let Aobj = []; let Aost = [];
				// сортировка по типу данных и запись их в разные массивы.
				for (let i = 0; i <= n-1; i++)
				 { 
					if(typeof(A[i])=== "number")
					{
						Anum=Anum.concat(A[i]);				
					}
					if(typeof(A[i])=== "string")
					{
						Astr=Astr.concat(A[i]);				
					}
					if(typeof(A[i]) === "object")
					{
						Aobj=Aobj.concat(A[i]);				
					}
					if(typeof(A[i]) === "function" || typeof(A[i]) === "boolean" || typeof(A[i]) === "undefined")
					{
						Aost=Aost.concat(A[i]);				
					}
				 } 
				// отсортировать по возрастанию.
				function puz(Arr){
					for (let i = 0; i < n-1; i++)
					 { for (let j = 0; j < n-1-i; j++)
						{ if (Arr[j+1] < Arr[j])
						   { let t = Arr[j+1]; Arr[j+1] = Arr[j]; Arr[j] = t; }
						}
					} 
					return Arr;
				} 
				A = [];
				A = ((puz(Anum).concat(puz(Astr))).concat(puz(Aobj))).concat(Aost);
				 //обнуление списка
				this.head=null;
				this.tail=null;
				//запись в список
				for (var i = 0; i < A.length; i++) {
				this.pushBack(A[i]);
				}
			}
			
		//Прогон списка с выполнение какой-то функции
		/*forEach(elem, foo){				
				let node=elem;
				while(node !== null){
				foo(node.key);
				node = node.next;	
			}
			this.length=this.length();
		}*/
		// Преобразование списка в строку.
			toString(){
			return JSON.stringify(this.arrAdd());		
			}
		forEach(cb){
			this.forEU(cb, v=>true);
		}
		forEU(cb, pr){
			let node=this.head, index=0;
			while(node){
				cb(node.key, index);
				node=node.next;
				index++;
			}
		}
		
		//Итератор for (let num of list){}
		[Symbol.iterator]() {
			let i=0;
		  let current = this.get(i);
		  // метод должен вернуть объект с методом next()
		  return {
			next() {
				if (i<list.length) {
				return {
				  done: false,
				  value: list.get(i++)
				  
				}; 
			  } else {
				return {
				  done: true
				  
				};
			  }
			}
		  }
		};
				
	}
	
	const noder= new Node();
	const list = new LinkedList(1,23,44,"dsfs",{});
