function addMotto(text) {
  var current = getMottos();;
  if(current === null) current = [];
  
  current.push({motto: text});

  localStorage.setItem('mottos',
                       JSON.stringify(current));
}

function removeMotto(index) {
  var current = localStorage.getItem('mottos');
  localStorage.setItem('mottos',
                       JSON.stringify(current.splice(index, 1)));
}

function getMottos() {
  return JSON.parse(localStorage.getItem('mottos'));
}

var Motto = React.createClass({
  render: function() {
    return (
      <li>
          <h3 type="text">{this.props.motto}</h3>
          <span>X</span>
      </li>
    );
  }
});

var MottoList = React.createClass({
  render: function() {
    console.log(getMottos());
    var mottoNodes = this.props.data.map(function(m, index) {
      return (
        <Motto key={index} motto={m.motto}>
          {m.motto}
        </Motto>
      );
    });

    return (
      <ul className="mottoList">
        {mottoNodes}  
      </ul> 
    );
  }
});

var MottoForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var motto = React.findDOMNode(this.refs.motto).value.trim();
    if(!motto) {
      return;
    }

    this.props.onMottoSubmit({motto: motto});
    React.findDOMNode(this.refs.motto).value = '';
  },
  render: function() {
    return (
      <form className="mottoForm" onSubmit={this.handleSubmit}>
          <input type="text" placeholder="New motto" ref="motto" />
          <input type="submit" value="Post" />
      </form>
    ); 
  }
});

var MottoContainer = React.createClass({
  loadMottos: function() {
    this.setState(getMottos()); 
  },
  handleMottoSubmit: function(motto) {
    var mottos = this.state.data;
    mottos.push(motto);
    
    addMotto(motto);
    this.setState({data: mottos}, function() {
      
    });
  },
  getInitialState: function() {
    return {data: []}; 
  },
  render: function() {
    return (
      <div className="mottoContainer">
        <MottoList data={this.state.data} />
        <MottoForm onMottoSubmit={this.handleMottoSubmit} />    
      </div>
    ); 
  }
});

var data = getMottos();
if(data === null) {
  data = [];
  localStorage.setItem('mottos', data);
}

React.render(
  <MottoContainer data={data} />,
  document.getElementById('content')
);
