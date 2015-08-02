// LRU cache of mottos - up to 3 mottos you can have. New ones will overwrite old ones.
function addMotto(text) {
  var current = getMottos();;
  if(current === null) current = [];

  current.push({motto: text});
  if(current.length > 3) {
    current.splice(0, 1);
  }

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

function getRandom(ar) {
  var rand = Math.floor(Math.random() * ar.length);
  return ar[rand];
}

// You can have up to 5 Mottos. LRU cache to erase old ones.
var Motto = React.createClass({
  render: function() {
    return (
      <h3>{this.props.motto}</h3>
    );
  }
});

var MottoList = React.createClass({
  render: function() {
    var mottoNodes = this.props.data.map(function(m, index) {
      return (
        <li>
          <Motto key={index} motto={m.motto} />
        </li>
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
    addMotto(motto);
    this.setState({data: getMottos()}, function() {
      
    });
  },
  getInitialState: function() {
    return {data: getMottos()}; 
  },
  componentDidMount: function() {
    this.loadMottos();
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
  localStorage.setItem('mottos', JSON.stringify(data)); 
}

React.render(
  <MottoContainer data={data} />,
  document.getElementById('content')
);
