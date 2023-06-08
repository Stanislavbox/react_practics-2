import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Grid, GridItem, SearchForm, EditForm, Text, Todo } from 'components';

const KEY_LOCAL = `todos`;

export class Todos extends Component {
  state = {
    todos: [],
  };

  componentDidMount () {
    const data = JSON.parse(localStorage.getItem(KEY_LOCAL));
    if(data) {
      this.setState({
        todos: data,
      })
    } 
  }

  componentDidUpdate(_, prevState) {
    if(prevState.todos !== this.state.todos){
      localStorage.setItem(KEY_LOCAL, JSON.stringify(this.state.todos))
    }
  }

  handleDelete = (id) => {
    const updateToDo = this.state.todos.filter( (item) => item.id !== id)
    this.setState ({
      todos: updateToDo,
    })
  }

  handleSubmit = text => {
    const toDo = {
      id: nanoid(),
      text,
    };
    this.setState(prevState => ({ todos: [...prevState.todos, toDo] }));
  };
  render() {
    return (
      <>
        <SearchForm onSubmit={this.handleSubmit} />
        <Grid>
          {this.state.todos.map(({ id, text }, index) => (
            <GridItem key={id}>
              <Todo 
              text={text} 
              count={index + 1} 
              onDelete = {this.handleDelete}
              id={id}
              />
            </GridItem>
          ))}
        </Grid>
        <Text>Todos</Text>
      </>
    );
  }
}
