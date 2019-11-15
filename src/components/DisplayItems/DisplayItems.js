import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
class DisplayItems extends Component {
    
    componentDidMount() {
        this.props.dispatch({type:'FETCH_ITEMS'});
    }

    deletePhoto = (item) => {
        this.props.dispatch({type:'DELETE_ITEM', payload: item});
    }

    render() {
        return (
            <div className="flex-container">
                {this.props && this.props.item && this.props.item.map(item => 
                        <Card style={{maxHeight: 700, maxWidth: 300}} key={item.id}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    image={item.image_url}
                                    title={item.description}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {item.description}
          </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {item.description}
          </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button variant="contained" color="secondary" onClick={() => this.deletePhoto(item)} size="small">
                                    Delete
                                </Button>
                            </CardActions>
                        </Card>
                )}
                <pre>{JSON.stringify(this.props.item)}</pre>
            </div>
        );
    }
}

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => {
    return state;
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(DisplayItems);
