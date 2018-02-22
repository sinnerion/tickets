import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

class TableRow extends React.Component {
    render() {
        return (
            <tr>
                <td>{this.props.ticket.from}</td>
                <td>{this.props.ticket.to}</td>
                <td>{this.props.ticket.ftime}</td>
                <td>{this.props.ticket.ttime}</td>
                <td>{this.props.ticket.price}</td>
            </tr>
        );
    }
}
class Option extends React.Component {
    render() {
        if (this.props.isDisabled) return (<option disabled value={this.props.value}>{this.props.value}</option>);
        return (
            <option value={this.props.value}>{this.props.value}</option>
        );
    }
}
class ControlPanel extends React.Component {
    constructor(props) {
        super(props);
        this.handleonFromChange = this.handleonFromChange.bind(this);
        this.handleonToChange = this.handleonToChange.bind(this);
        this.handleonDateChange = this.handleonDateChange.bind(this);
    }
    handleonFromChange = function (e) {
        this.props.onFromChange(e.target.options[e.target.selectedIndex].value);
    };
    handleonToChange = function (e) {
        this.props.onToChange(e.target.options[e.target.selectedIndex].value);
    };
    handleonDateChange = function (e) {
        this.props.onDateChange(e.target.options[e.target.selectedIndex].value);
    };
    render() {
        const massFrom = [];
        const massTo = [];
        const massDate = [];
        const self = this;
        const cities = this.props.cities;
        for (let i=0;i<7;i++){
            var today = new Date();
            massDate.push(<Option key={i} value={new Date(today.setDate(today.getDate()+i)).toLocaleDateString('ru-RUS',{day:'numeric',month:'numeric',year:'numeric'})}/>);
        };
        cities.forEach(function(city,i){
            massFrom.push(<Option key={i} value={city} isDisabled={self.props.to === city}/>);
            massTo.push(<Option key={i} value={city} isDisabled={self.props.from === city}/>);
        });
        return (
            <div className="controlPanel">
                Откуда <select name="from" onChange={this.handleonFromChange} value={this.props.from}>
                <option value="">Выберите место</option>
                {massFrom}
            </select>
                Дата <select name="date" onChange={this.handleonDateChange} value={this.props.date}>
                <option value="">Выберите дату</option>
                {massDate}
            </select>
                Куда  <select name="to" onChange={this.handleonToChange} value={this.props.to}>
                <option value="">Выберите место</option>
                {massTo}
            </select>
            </div>
        );
    }
}
class DataTable extends React.Component {
    render() {
        const rows = [];
        var self = this;
        this.props.tickets.forEach(function (ticket, id) {
            if (((self.props.from === '') || (ticket.from === self.props.from)) && ((self.props.to === '') || (ticket.to === self.props.to)) && ((self.props.date === '') || (ticket.ftime.split(',')[0] === self.props.date.split(',')[0]))) {
                rows.push(<TableRow ticket={ticket} key={id}/>);
            }
            ;
        });
        return (
            <table cellSpacing="0">
                <thead>
                <tr>
                    <th>Откуда</th>
                    <th>Куда</th>
                    <th>Отправление</th>
                    <th>Прибытие</th>
                    <th>Цены</th>
                </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    }
}
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            from: '',
            to: '',
            date: ''
        };
        this.fromChange = this.fromChange.bind(this);
        this.dateChange = this.dateChange.bind(this);
        this.toChange = this.toChange.bind(this);
    };
    fromChange(from) {
        this.setState({
            from: from
        });
    };
    dateChange(date) {
        this.setState({
            date: date
        });
    };
    toChange(to) {
        this.setState({
            to: to
        });
    };
    render() {
        return (
            <div className="app">
                <ControlPanel cities={this.props.cities} from={this.state.from} to={this.state.to} date={this.state.date} onFromChange={this.fromChange} onDateChange={this.dateChange} onToChange={this.toChange}/>
                <DataTable tickets={this.props.tickets} from={this.state.from} to={this.state.to}
                           date={this.state.date}/>
            </div>
        );
    }
}
function unique(arr) {
    var obj = {};
    for (var i = 0; i < arr.length; i++) {
        var str = arr[i];
        obj[str] = true;
    }
    return Object.keys(obj);
}
const tickets = [
    {from: 'Киев', to: 'Лондон', ftime: new Date().getDate()+'.02.2018, 11:00:00', ttime: new Date().getDate()+'.02.2018, 12:00:00', price: '250 рублей'},
    {from: 'Киев', to: 'Минск', ftime: new Date().getDate()+'.02.2018, 11:00:00', ttime: new Date().getDate()+'.02.2018, 12:00:00', price: '250 рублей'},
    {from: 'Киев', to: 'Москва', ftime: new Date().getDate()+'.02.2018, 11:00:00', ttime: new Date().getDate()+'.02.2018, 12:00:00', price: '250 рублей'},
    {from: 'Москва', to: 'Лондон', ftime: new Date().getDate()+'.02.2018, 11:00:00', ttime: new Date().getDate()+'.02.2018, 12:00:00', price: '250 рублей'},
    {from: 'Москва', to: 'Киев', ftime: new Date().getDate()+'.02.2018, 11:00:00', ttime: new Date().getDate()+'.02.2018, 12:00:00', price: '250 рублей'},
    {from: 'Москва', to: 'Минск', ftime: new Date().getDate()+'.02.2018, 11:00:00', ttime: new Date().getDate()+'.02.2018, 12:00:00', price: '250 рублей'},
    {from: 'Минск', to: 'Лондон', ftime: new Date().getDate()+'.02.2018, 11:00:00', ttime: new Date().getDate()+'.02.2018, 12:00:00', price: '250 рублей'},
    {from: 'Минск', to: 'Киев', ftime: new Date().getDate()+'.02.2018, 11:00:00', ttime: new Date().getDate()+'.02.2018, 12:00:00', price: '250 рублей'},
    {from: 'Минск', to: 'Москва', ftime: new Date().getDate()+'.02.2018, 11:00:00', ttime: new Date().getDate()+'.02.2018, 12:00:00', price: '250 рублей'},
    {from: 'Лондон', to: 'Минск', ftime: new Date().getDate()+'.02.2018, 11:00:00', ttime: new Date().getDate()+'.02.2018, 12:00:00', price: '250 рублей'},
    {from: 'Лондон', to: 'Киев', ftime: new Date().getDate()+'.02.2018, 11:00:00', ttime: new Date().getDate()+'.02.2018, 12:00:00', price: '250 рублей'},
    {from: 'Лондон', to: 'Москва', ftime: new Date().getDate()+'.02.2018, 11:00:00', ttime: new Date().getDate()+'.02.2018, 12:00:00', price: '250 рублей'},
    {from: 'Киев', to: 'Лондон', ftime: new Date().getDate()+1+'.02.2018, 15:30:00', ttime: new Date().getDate()+1+'.02.2018, 17:50:00', price: '550 рублей'},
    {from: 'Киев', to: 'Минск', ftime: new Date().getDate()+1+'.02.2018, 15:30:00', ttime: new Date().getDate()+1+'.02.2018, 17:50:00', price: '550 рублей'},
    {from: 'Киев', to: 'Москва', ftime: new Date().getDate()+1+'.02.2018, 15:30:00', ttime: new Date().getDate()+1+'.02.2018, 17:50:00', price: '550 рублей'},
    {from: 'Москва', to: 'Лондон', ftime: new Date().getDate()+1+'.02.2018, 15:30:00', ttime: new Date().getDate()+1+'.02.2018, 17:50:00', price: '550 рублей'},
    {from: 'Москва', to: 'Киев', ftime: new Date().getDate()+1+'.02.2018, 15:30:00', ttime: new Date().getDate()+1+'.02.2018, 17:50:00', price: '550 рублей'},
    {from: 'Москва', to: 'Минск', ftime: new Date().getDate()+1+'.02.2018, 15:30:00', ttime: new Date().getDate()+1+'.02.2018, 17:50:00', price: '550 рублей'},
    {from: 'Минск', to: 'Лондон', ftime: new Date().getDate()+1+'.02.2018, 15:30:00', ttime: new Date().getDate()+1+'.02.2018, 17:50:00', price: '550 рублей'},
    {from: 'Минск', to: 'Киев', ftime: new Date().getDate()+2+'.02.2018, 15:30:00', ttime: new Date().getDate()+2+'.02.2018, 17:50:00', price: '550 рублей'},
    {from: 'Минск', to: 'Москва', ftime: new Date().getDate()+2+'.02.2018, 15:30:00', ttime: new Date().getDate()+2+'.02.2018, 17:50:00', price: '550 рублей'},
    {from: 'Лондон', to: 'Минск', ftime: new Date().getDate()+2+'.02.2018, 15:30:00', ttime: new Date().getDate()+2+'.02.2018, 17:50:00', price: '550 рублей'},
    {from: 'Лондон', to: 'Киев', ftime: new Date().getDate()+2+'.02.2018, 15:30:00', ttime: new Date().getDate()+2+'.02.2018, 17:50:00', price: '550 рублей'},
    {from: 'Лондон', to: 'Москва', ftime: new Date().getDate()+2+'.02.2018, 15:30:00', ttime: new Date().getDate()+2+'.02.2018, 17:50:00', price: '550 рублей'}
];
ReactDOM.render(
    <App tickets={tickets} cities={unique(tickets.map(function(city){return city.from;}))}/>,
    document.getElementById('app')
);
const tickets1 = [
    {from: 'Уфа', to: 'Ливерпуль', ftime: new Date().getDate()+'.02.2018, 11:15:12', ttime: new Date().getDate()+'.02.2018, 12:15:12', price: '375 рублей'},
    {from: 'Уфа', to: 'Волгоград', ftime: new Date().getDate()+'.02.2018, 11:15:12', ttime: new Date().getDate()+'.02.2018, 12:15:12', price: '375 рублей'},
    {from: 'Уфа', to: 'Омск', ftime: new Date().getDate()+'.02.2018, 11:15:12', ttime: new Date().getDate()+'.02.2018, 12:15:12', price: '375 рублей'},
    {from: 'Омск', to: 'Ливерпуль', ftime: new Date().getDate()+'.02.2018, 11:15:12', ttime: new Date().getDate()+'.02.2018, 12:15:12', price: '375 рублей'},
    {from: 'Омск', to: 'Уфа', ftime: new Date().getDate()+'.02.2018, 11:15:12', ttime: new Date().getDate()+'.02.2018, 12:15:12', price: '375 рублей'},
    {from: 'Омск', to: 'Волгоград', ftime: new Date().getDate()+'.02.2018, 11:15:12', ttime: new Date().getDate()+'.02.2018, 12:15:12', price: '375 рублей'},
    {from: 'Волгоград', to: 'Ливерпуль', ftime: new Date().getDate()+'.02.2018, 11:15:12', ttime: new Date().getDate()+'.02.2018, 12:15:12', price: '375 рублей'},
    {from: 'Волгоград', to: 'Уфа', ftime: new Date().getDate()+'.02.2018, 11:15:12', ttime: new Date().getDate()+'.02.2018, 12:15:12', price: '375 рублей'},
    {from: 'Волгоград', to: 'Омск', ftime: new Date().getDate()+'.02.2018, 11:15:12', ttime: new Date().getDate()+'.02.2018, 12:15:12', price: '375 рублей'},
    {from: 'Ливерпуль', to: 'Волгоград', ftime: new Date().getDate()+'.02.2018, 11:15:12', ttime: new Date().getDate()+'.02.2018, 12:15:12', price: '375 рублей'},
    {from: 'Ливерпуль', to: 'Уфа', ftime: new Date().getDate()+'.02.2018, 11:15:12', ttime: new Date().getDate()+'.02.2018, 12:15:12', price: '375 рублей'},
    {from: 'Ливерпуль', to: 'Омск', ftime: new Date().getDate()+'.02.2018, 11:15:12', ttime: new Date().getDate()+'.02.2018, 12:15:12', price: '375 рублей'},
    {from: 'Уфа', to: 'Ливерпуль', ftime: new Date().getDate()+1+'.02.2018, 15:58:12', ttime: new Date().getDate()+1+'.02.2018, 17:44:12', price: '973 рублей'},
    {from: 'Уфа', to: 'Волгоград', ftime: new Date().getDate()+1+'.02.2018, 15:58:12', ttime: new Date().getDate()+1+'.02.2018, 17:44:12', price: '973 рублей'},
    {from: 'Уфа', to: 'Омск', ftime: new Date().getDate()+1+'.02.2018, 15:58:12', ttime: new Date().getDate()+1+'.02.2018, 17:44:12', price: '973 рублей'},
    {from: 'Омск', to: 'Ливерпуль', ftime: new Date().getDate()+1+'.02.2018, 15:58:12', ttime: new Date().getDate()+1+'.02.2018, 17:44:12', price: '973 рублей'},
    {from: 'Омск', to: 'Уфа', ftime: new Date().getDate()+1+'.02.2018, 15:58:12', ttime: new Date().getDate()+1+'.02.2018, 17:44:12', price: '973 рублей'},
    {from: 'Омск', to: 'Волгоград', ftime: new Date().getDate()+2+'.02.2018, 15:58:12', ttime: new Date().getDate()+2+'.02.2018, 17:44:12', price: '973 рублей'},
    {from: 'Волгоград', to: 'Ливерпуль', ftime: new Date().getDate()+2+'.02.2018, 15:58:12', ttime: new Date().getDate()+2+'.02.2018, 17:44:12', price: '973 рублей'},
    {from: 'Волгоград', to: 'Уфа', ftime: new Date().getDate()+2+'.02.2018, 15:58:12', ttime: new Date().getDate()+2+'.02.2018, 17:44:12', price: '973 рублей'},
    {from: 'Волгоград', to: 'Омск', ftime: new Date().getDate()+2+'.02.2018, 15:58:12', ttime: new Date().getDate()+2+'.02.2018, 17:44:12', price: '973 рублей'},
    {from: 'Ливерпуль', to: 'Волгоград', ftime: new Date().getDate()+2+'.02.2018, 15:58:12', ttime: new Date().getDate()+2+'.02.2018, 17:44:12', price: '973 рублей'},
    {from: 'Ливерпуль', to: 'Уфа', ftime: new Date().getDate()+2+'.02.2018, 15:58:12', ttime: new Date().getDate()+2+'.02.2018, 17:44:12', price: '973 рублей'},
    {from: 'Ливерпуль', to: 'Омск', ftime: new Date().getDate()+2+'.02.2018, 15:58:12', ttime: new Date().getDate()+2+'.02.2018, 17:44:12', price: '973 рублей'}
];
ReactDOM.render(
    <App tickets={tickets1} cities={unique(tickets1.map(function(city){return city.from;}))}/>,
    document.getElementById('app1')
);
const tickets2 = [
    {from: 'Уфа', to: 'Луцк', ftime: new Date().getDate()+'.02.2018, 11:15:12', ttime: new Date().getDate()+'.02.2018, 12:15:12', price: '375 рублей'},
    {from: 'Уфа', to: 'Винница', ftime: new Date().getDate()+'.02.2018, 11:15:12', ttime: new Date().getDate()+'.02.2018, 12:15:12', price: '375 рублей'},
    {from: 'Уфа', to: 'Омск', ftime: new Date().getDate()+'.02.2018, 11:15:12', ttime: new Date().getDate()+'.02.2018, 12:15:12', price: '375 рублей'},
    {from: 'Омск', to: 'Луцк', ftime: new Date().getDate()+'.02.2018, 11:15:12', ttime: new Date().getDate()+'.02.2018, 12:15:12', price: '375 рублей'},
    {from: 'Омск', to: 'Уфа', ftime: new Date().getDate()+'.02.2018, 11:15:12', ttime: new Date().getDate()+'.02.2018, 12:15:12', price: '375 рублей'},
    {from: 'Омск', to: 'Винница', ftime: new Date().getDate()+'.02.2018, 11:15:12', ttime: new Date().getDate()+'.02.2018, 12:15:12', price: '375 рублей'},
    {from: 'Винница', to: 'Луцк', ftime: new Date().getDate()+'.02.2018, 11:15:12', ttime: new Date().getDate()+'.02.2018, 12:15:12', price: '375 рублей'},
    {from: 'Винница', to: 'Уфа', ftime: new Date().getDate()+'.02.2018, 11:15:12', ttime: new Date().getDate()+'.02.2018, 12:15:12', price: '375 рублей'},
    {from: 'Винница', to: 'Омск', ftime: new Date().getDate()+'.02.2018, 11:15:12', ttime: new Date().getDate()+'.02.2018, 12:15:12', price: '375 рублей'},
    {from: 'Луцк', to: 'Винница', ftime: new Date().getDate()+'.02.2018, 11:15:12', ttime: new Date().getDate()+'.02.2018, 12:15:12', price: '375 рублей'},
    {from: 'Луцк', to: 'Уфа', ftime: new Date().getDate()+'.02.2018, 11:15:12', ttime: new Date().getDate()+'.02.2018, 12:15:12', price: '375 рублей'},
    {from: 'Луцк', to: 'Омск', ftime: new Date().getDate()+'.02.2018, 11:15:12', ttime: new Date().getDate()+'.02.2018, 12:15:12', price: '375 рублей'},
    {from: 'Уфа', to: 'Луцк', ftime: new Date().getDate()+1+'.02.2018, 15:58:12', ttime: new Date().getDate()+1+'.02.2018, 17:44:12', price: '973 рублей'},
    {from: 'Уфа', to: 'Винница', ftime: new Date().getDate()+1+'.02.2018, 15:58:12', ttime: new Date().getDate()+1+'.02.2018, 17:44:12', price: '973 рублей'},
    {from: 'Уфа', to: 'Омск', ftime: new Date().getDate()+1+'.02.2018, 15:58:12', ttime: new Date().getDate()+1+'.02.2018, 17:44:12', price: '973 рублей'},
    {from: 'Омск', to: 'Луцк', ftime: new Date().getDate()+1+'.02.2018, 15:58:12', ttime: new Date().getDate()+1+'.02.2018, 17:44:12', price: '973 рублей'},
    {from: 'Омск', to: 'Уфа', ftime: new Date().getDate()+2+'.02.2018, 15:58:12', ttime: new Date().getDate()+2+'.02.2018, 17:44:12', price: '973 рублей'},
    {from: 'Омск', to: 'Винница', ftime: new Date().getDate()+2+'.02.2018, 15:58:12', ttime: new Date().getDate()+2+'.02.2018, 17:44:12', price: '973 рублей'},
    {from: 'Винница', to: 'Луцк', ftime: new Date().getDate()+2+'.02.2018, 15:58:12', ttime: new Date().getDate()+2+'.02.2018, 17:44:12', price: '973 рублей'},
    {from: 'Винница', to: 'Уфа', ftime: new Date().getDate()+2+'.02.2018, 15:58:12', ttime: new Date().getDate()+2+'.02.2018, 17:44:12', price: '973 рублей'},
    {from: 'Винница', to: 'Омск', ftime: new Date().getDate()+2+'.02.2018, 15:58:12', ttime: new Date().getDate()+2+'.02.2018, 17:44:12', price: '973 рублей'},
    {from: 'Луцк', to: 'Винница', ftime: new Date().getDate()+2+'.02.2018, 15:58:12', ttime: new Date().getDate()+2+'.02.2018, 17:44:12', price: '973 рублей'},
    {from: 'Луцк', to: 'Уфа', ftime: new Date().getDate()+2+'.02.2018, 15:58:12', ttime: new Date().getDate()+2+'.02.2018, 17:44:12', price: '973 рублей'},
    {from: 'Луцк', to: 'Омск', ftime: new Date().getDate()+2+'.02.2018, 15:58:12', ttime: new Date().getDate()+2+'.02.2018, 17:44:12', price: '973 рублей'}
];
ReactDOM.render(
    <App tickets={tickets2} cities={unique(tickets2.map(function(city){return city.from;}))}/>,
    document.getElementById('app2')
);
[].slice.call(document.querySelectorAll('nav a')).forEach(function(a){a.addEventListener('click',function(e){e.preventDefault();document.getElementById(e.target.href.split('#')[1]).scrollIntoView({
    behavior: 'smooth',block:'start'
})})});

registerServiceWorker();