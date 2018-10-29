const questionList = [
  {
    name: "Search",
    content: `

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
      </div>
    );
  }
}

const search = (query) => new Promise((resolve, reject) => {
  const result = DATA.filter(({ name }) => name.includes(query.toLowerCase()));
  if (result.length !== 0) {
    resolve(result);
  } else {
    reject(new Error('not found'));
  }
});

const Item = ({ name, price }) => (
  <div>
    { name }: { price }$ 
  </div>
);

const DATA = [
  {
    name: 'apple',
    price: 10
  },
  {
    name: 'orange',
    price: 15
  },
  {
    name: 'banana',
    price: 7
  },
]

ReactDOM.render(
  <App />,
  root
);

`,
    answer: `
class AnswerApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '', data: [] };
    this.changeValue = this.changeValue.bind(this);
  }
  changeValue(name) {
    this.setState({ value: name });
    search(name)
      .then(result => this.setState({ data: result }))
      .catch(e => {});
  }
  render() {
    return (
      <div>
        <div>Hi, I want to buy { this.state.value }</div>
        <input onChange={e => this.changeValue(e.target.value)}/>
        <div>
          {
            this.state.data.map(({ price, name }) => <Item price={price} name={name} /> )
          }
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <AnswerApp />,
  answer
);

`
  },
];

export default questionList;
