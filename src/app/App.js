import React, { Component } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

class App extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      description: "",
      tasks: [],
      _id: "",
    };
    this.addTask = this.addTask.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  //save task - //fetch sends a http request
  addTask = (e) => {
    e.preventDefault();

    if (this.state._id) {
      // console.log("updating");
      fetch(`/api/task/${this.state._id}`, {
        method: "PUT",
        body: JSON.stringify(this.state),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          this.clearForm();
          this.setState({ _id: "" });
          this.fetchTasks();
        });
    } else {
      //saving task
      fetch("/api/task", {
        method: "POST",
        body: JSON.stringify(this.state),
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          //update table
          this.clearForm();
          this.fetchTasks();
        })
        .catch((err) => console.error(err));
    }
  };

  //delete task
  deleteTask = (id) => {
    if (confirm("Are you sure you want to delete this task?")) {
      fetch(`/api/task/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          this.deleteToast();
          this.fetchTasks();
        })
        .catch((err) => console.log(err));
    }
  };

  //edit task with same form of creating tasks
  editTask = (id) => {
    fetch(`api/task/${id}`)
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          title: data.title,
          description: data.description,
          _id: data._id,
        })
      );
  };

  //componentDidMount(executes this when the app starts)
  componentDidMount = () => {
    //console.log("component did mount");
    this.fetchTasks();
  };

  //read tasks( update the table with the state)
  fetchTasks = () => {
    fetch("/api/task")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        this.setState({
          tasks: data,
        });
        //console.log(this.state);
      })
      .catch((err) => console.error(err));
  };

  clearForm = () => {
    this.setState({
      title: "",
      description: "",
    });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  //toast messages
  saveToast = () =>
    toast.success("Saved task", {
      position: "bottom-center",
      style: {
        background: "#5cb85c",
        color: "#fff",
      },
      duration: 6000,
    });

  deleteToast = () =>
    toast.success("Task deleted", {
      position: "bottom-center",
      style: {
        background: "#5cb85c",
        color: "#fff",
      },
      duration: 6000,
    });

  editToast = () =>
    toast.success("Task edited", {
      position: "bottom-center",
      style: {
        background: "#5cb85c",
        color: "#fff",
      },
      duration: 6000,
    });

  EditIcon = () => {
    return <FontAwesomeIcon icon={faPen} />;
  };

  DeleteIcon = () => {
    return <FontAwesomeIcon icon={faTrash} />;
  };

  render() {
    return (
      <div>
        {/*Form*/}
        <div className="container mt-5">
          <div className="row">
            <div className="col-5">
              <div className="card">
                <div className="card-body">
                  <form onSubmit={this.addTask}>
                    <div className="row">
                      <div className="mt-3">
                        <input
                          name="title"
                          onChange={this.handleChange}
                          typeof="text"
                          className="form-control"
                          placeholder="Title"
                          value={this.state.title}
                          autoFocus
                        ></input>
                      </div>
                      <div className="mt-3">
                        <textarea
                          name="description"
                          onChange={this.handleChange}
                          className="form-control"
                          placeholder="Description"
                          value={this.state.description}
                        ></textarea>
                      </div>
                    </div>
                    <div className="mt-3">
                      <button
                        className="btn btn-primary w-100"
                        typeof="submit"
                        onClick={this.saveToast}
                      >
                        Send
                      </button>
                      <Toaster />
                    </div>
                  </form>
                </div>
              </div>
            </div>
            {/*Notes*/}
            <div className="col-7">
              <table className="table table-light">
                <thead >
                  <tr className="tr">
                    <th scope="col">Title</th>
                    <th scope="col">Description</th>
                    <th scope="col">Action</th>

                  </tr>
                </thead>
                <tbody>
                  {this.state.tasks.map((task) => {
                    return (
                      <tr key={task._id}>
                        <td>{task.title}</td>
                        <td>{task.description}</td>
                        <td>
                          <button
                            className="btn btn-primary"
                            onClick={() => this.editTask(task._id)}
                          >
                            <this.EditIcon />
                          </button>

                          <button
                            className="btn btn-danger"
                            style={{ margin: "5px" }}
                            onClick={() => this.deleteTask(task._id)}
                          >
                            <this.DeleteIcon />
                          </button>
                          <Toaster />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
