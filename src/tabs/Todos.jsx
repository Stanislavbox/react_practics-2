import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Grid, GridItem, SearchForm, EditForm, Text, Todo } from 'components';

export class Todos extends Component {
  state = {
    todos: [],
  };

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
              <Todo text={text} count={index + 1} />
            </GridItem>
          ))}
        </Grid>
        <Text>Todos</Text>
      </>
    );
  }
}
