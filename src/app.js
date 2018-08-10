class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: []
    };

    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handleOptionPick = this.handleOptionPick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.handleDeleteOption = this.handleDeleteOption.bind(this);
  }

  componentDidMount() {
    try {
      const json = localStorage.getItem("options");
      const options = JSON.parse(json);

      // if options is nul keep the default state
      if (options) {
        this.setState({
          options: options
        });
      }
    } catch (e) {}
  }

  // Used to save the data to loalStorage
  componentDidUpdate(prevProps, prevState) {
    if (prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem("options", json);
      console.log("saving the data");
    }
  }

  handleDeleteOptions() {
    this.setState(() => ({ options: [] }));
  }

  handleDeleteOption(optionToRemove) {
    this.setState(prevState => ({
      options: prevState.options.filter(option => {
        // will check if option to remove is the same as option added
        return optionToRemove !== option;
      })
    }));
  }

  handleAddOption(option) {
    if (!option) {
      return "Enter a valid value to add an item";
    } else if (this.state.options.indexOf(option) > -1) {
      return "This option already exists";
    } else {
      this.setState(prevState => {
        return {
          options: prevState.options.concat([option])
        };
      });
    }
  }

  handleOptionPick() {
    console.log("clicked");
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    alert(option);
  }

  render() {
    const title = "Indecision App";
    const subtitle = "Put your life in the hands of a computer";

    return (
      <div>
        <Header subtitle={subtitle} />
        <Action
          optionPick={this.handleOptionPick}
          hasOptions={this.state.options.length > 0}
        />
        <Options
          options={this.state.options}
          removeOptions={this.handleDeleteOptions}
          handleDeleteOption={this.handleDeleteOption}
        />
        <AddOption handleAddOption={this.handleAddOption} />
      </div>
    );
  }
}

const Header = props => {
  return (
    <div>
      <h1>{props.title}</h1>
      {props.subtitle && <h2>{props.subtitle}</h2>}
    </div>
  );
};

Header.defaultProps = {
  title: "Indecision App"
};

const Action = props => {
  return (
    <div>
      <button disabled={!props.hasOptions} onClick={props.optionPick}>
        What should I do?
      </button>
    </div>
  );
};

const Options = props => {
  return (
    <div>
      <button onClick={props.removeOptions}>Remove all</button>
      {props.options.length === 0 && <p>Please add an option to get started</p>}
      {props.options.length}
      {props.options.map(option => {
        return (
          <Option
            key={option}
            handleDeleteOption={props.handleDeleteOption}
            optionText={option}
          />
        );
      })}
    </div>
  );
};

class AddOption extends React.Component {
  constructor() {
    super();

    this.state = {
      error: undefined
    };

    this.handleAddOption = this.handleAddOption.bind(this);
  }

  handleAddOption(e) {
    e.preventDefault();

    const option = e.target.elements.option.value;
    const error = this.props.handleAddOption(option);

    this.setState(() => ({ error: error }));

    // removes the text from the input after submit
    if (!error) {
      e.target.elements.option.value = "";
    }
  }
  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.handleAddOption}>
          <input type="text" name="option" />
          <button>Add Option</button>
        </form>
      </div>
    );
  }
}

const Option = props => {
  return (
    <div>
      <p>{props.optionText}</p>
      <button onClick={() => props.handleDeleteOption(props.optionText)}>
        Remove
      </button>
    </div>
  );
};

const User = () => {
  return (
    <div>
      <p>Name: </p>
      <p>Age: </p>
    </div>
  );
};

ReactDOM.render(<IndecisionApp />, document.getElementById("app"));
