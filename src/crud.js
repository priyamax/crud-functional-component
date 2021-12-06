import React from 'react';
import axios from 'axios';

class CrudComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      user: [],
      userId: '',
      title: '',
      body: '',
      id: '',
      saveInProgress: false,
    };
  }

  async componentDidMount() {
    var response = await axios.get(
      'https://jsonplaceholder.typicode.com/posts'
    );
    await this.setState({ user: response.data });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    if (this.state.id) {
      this.updateData();
    } else {
      this.createData();
    }
  };
  updateData = async () => {
    var response = await axios.put(
      `https://jsonplaceholder.typicode.com/posts/${this.state.id}`,
      {
        id: this.state.id,
        userId: this.state.userId,
        title: this.state.title,
        body: this.state.body,
      }
    );
    var index = this.state.user.findIndex((row) => row.id === this.state.id);
    var user = [...this.state.user];
    user[index] = response.data;
    this.setState({
      user,
      userId: '',
      body: '',
      title: '',
      id: '',
    });
  };
  createData = async () => {
    this.setState({ saveInProgress: true });
    var response = await axios.post(
      'https://jsonplaceholder.typicode.com/posts',
      {
        userId: this.state.userId,
        title: this.state.title,
        body: this.state.body,
      }
    );
    var user = [...this.state.user];
    user.push(response.data);
    this.setState({
      user,
      userId: '',
      body: '',
      title: '',
      saveInProgress: false,
    });
  };
  onPopulateData = (id) => {
    var selectedData = this.state.user.filter((row) => row.id === id)[0];
    this.setState({
      id: selectedData.id,
      userId: selectedData.userId,
      title: selectedData.title,
      body: selectedData.body,
    });
  };
  handleDelete = async (id) => {
    var response = await axios.delete(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    var user = this.state.user.filter((row) => row.id !== id);
    this.setState({ user });
  };
  render() {
    return (
      <>
        <h3> User Form</h3>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label> UserId </label>
            <input
              type="text"
              name="userId"
              value={this.state.userId}
              onChange={(e) => this.setState({ userId: e.target.value })}
            />
          </div>{' '}
          <br />
          <div>
            <label> Title </label>
            <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={(e) => this.setState({ title: e.target.value })}
            />
          </div>{' '}
          <br />
          <div>
            <label> Body </label>
            <input
              type="text"
              name="body"
              value={this.state.body}
              onChange={(e) => this.setState({ body: e.target.value })}
            />
          </div>{' '}
          <br />
          <button disabled={this.state.saveInProgress}> Submit </button>
        </form>
        <h3> Post Data </h3>
        <table>
          <thead>
            <tr>
              <td> UserId </td>
              <td> Title </td>
              <td> Body </td>
              <td> Actions </td>
            </tr>
          </thead>
          <tbody>
            {this.state.user.map((data) => (
              <tr key={data.id}>
                <td> {data.userId} </td>
                <td> {data.title} </td>
                <td> {data.body} </td>
                <td>
                  <button onClick={() => this.onPopulateData(data.id)}>
                    {' '}
                    Update{' '}
                  </button>{' '}
                  &nbsp;&nbsp;
                  <button onClick={() => this.handleDelete(data.id)}>
                    {' '}
                    Delete{' '}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

export default CrudComponent;
