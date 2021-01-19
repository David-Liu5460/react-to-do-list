import React, { PureComponent } from 'react'
import './todolist.css'

export default class Todolist extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            title: '一个todolist案例',
            count: 0,
            todoList: [
                {
                    name: 'react.js学习',
                    isFinish: false
                },
                {
                    name: 'vue.js学习',
                    isFinish: false
                },
                {
                    name: 'node.js学习1',
                    isFinish: false
                },
            ],
            newTodo: ""
        }
    }
    render() {
        console.log('this.state.todoList', this.state.todoList)
        return (
            <div id="todolist">
                <h2>{this.state.title}</h2>
                <h2>{this.state.count}</h2>
                <button onClick={e => {this.increment()}}>+1</button><br/>
                    <input type="text" 
                            id="newTodo" 
                            placeholder="添加item"
                            onChange={e => this.handleData(e)}
                            value={ this.state.newTodo }/>
                {/* <input placeholder="添加item" onChange={e => { this.handleData(e) }}></input> */}
                <button onClick={e => { this.addItem(e) }}>添加item</button>
                <ul>
                    {
                        this.state.todoList.map((item, index, arr) => {
                            return (
                                <div>
                                    <li className={(item.isFinish ? "active" : "")} key={item.name}>{index + 1}-{item.name}</li>
                                    {/* react中嵌入css */}
                                    <span onClick={e => { this.finishTodoItem(index)} }>已经完成</span>
                                    <span onClick={e => { this.deleteItem(index) }}>删除</span>
                                </div>
                            )
                        })
                    }
                </ul>
                <div>已经完成{ this.getFullfinishTotal() }项</div>
            </div>
        )
    }

    increment() {
        this.setState({
            count: this.state.count + 1
        })
    }

    deleteItem(index) {
        // console.log(this.state.todoList.splice(index, 1));
        // state数据的不可变性
        const newTodoList = [...this.state.todoList];
        console.log(index);
        newTodoList.splice(index,1);
        console.log(newTodoList);
        // this.state.todoList.splice(index, 1);
        this.setState({
            todoList: newTodoList
        })
    }

    addItem(e) {
        const newTodoList = [...this.state.todoList];
        newTodoList.push({
            name: this.state.newTodo,
            isFinish: false
        });
        this.setState({
            todoList: newTodoList,
            newTodo: ""
        });
    }

    handleData(event) {
        console.log(event.target.value);
        this.setState({
            newTodo: event.target.value
        })
        console.log(this.state.newTodo);
    }

    getFullfinishTotal() {
        return this.state.todoList.filter(item => item.isFinish ).length;
    }

    finishTodoItem(index) {
        // const newTodoList = [...this.state.todoList, {name: item.name, isFinish: !item.isFinih}];
        const newTodoList = [...this.state.todoList];
        newTodoList[index].isFinish = !newTodoList[index].isFinish;
        this.setState({
            todoList: newTodoList
        })
        console.log(this.state.todoList);
    }
}

