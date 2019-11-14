import React, { Component } from 'react';
import { connect } from 'react-redux';

class AddItem extends Component {

    state = {
        description: '',
        image_url: '',
    }

    handleChange = (event, property) => {
        this.setState({
            ...this.state,
            [property]: event.target.value
        })
    }

    addNewItem = () => {
        this.props.dispatch({ type: 'ADD_ITEM', payload: this.state });
        this.setState({
            description: '',
            image_url: '',
        });
    }

    render() {

        return (
            <div>
                <input type='text' placeholder="description" value={this.state.description} onChange={(event) => this.handleChange(event, 'description')} />
                <input type='text' placeholder="image_url" value={this.state.image_url} onChange={(event) => this.handleChange(event, 'image_url')} />
                <button onClick={this.addNewItem}>Add</button>
            </div>
        )
    }
}

export default connect()(AddItem);