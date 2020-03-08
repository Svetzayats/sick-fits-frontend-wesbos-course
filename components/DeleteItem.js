import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import {ALL_ITEMS_QUERY} from './Items';

const DELETE_ITEM_MUTATION = gql`
    mutation DELETE_ITEM_MUTATION($id: ID!) {
        deleteItem(id: $id) {
            id
        }
    }
`;

class DeleteItem extends Component {
    update = (cache, payload) => {
        //manually update the cache on the client, so it matches the server
        //1. read the cache for items we want 
        const data = cache.re
    }

    render() {
        return (
            <Mutation mutation={DELETE_ITEM_MUTATION} 
            variables={{
                id: this.props.id
            }}
            update={this.update}>
                {(deleteItem, { error }) => (
                    <button
                        onClick={() => {
                            if (confirm('Are you sure you want to delete this item?')) {
                                deleteItem();
                            }
                        }}>
                            {this.props.children}
                    </button>
                )}
            </Mutation>

        );
    }
}

export default DeleteItem;