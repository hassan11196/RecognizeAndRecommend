import React from 'react';
import { Comment, Button, Form, Header, Rating, Icon } from 'semantic-ui-react';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Comments() {
    return (
        <div style={{ margin: '2rem' }}>
            <Comment.Group minimal>
                <Header as="h3" dividing>
                    Reviews
                </Header>

                <Comment>
                    <Comment.Avatar
                        as="a"
                        src="https://react.semantic-ui.com/images/avatar/small/matt.jpg"
                    />
                    <Comment.Content>
                        <Comment.Author as="a">Matt</Comment.Author>
                        <Comment.Metadata>
                            <span>Today at 5:42PM</span>
                            <span>
                                {' '}
                                <Rating
                                    maxRating={5}
                                    defaultRating={4}
                                    icon="star"
                                    size="small"
                                />
                            </span>
                        </Comment.Metadata>
                        <Comment.Text>How artistic!</Comment.Text>
                        <Comment.Actions>
                            <a>Reply</a>
                        </Comment.Actions>
                    </Comment.Content>
                </Comment>

                <Comment>
                    <Comment.Avatar
                        as="a"
                        src="https://react.semantic-ui.com/images/avatar/small/elliot.jpg"
                    />
                    <Comment.Content>
                        <Comment.Author as="a">Elliot Fu</Comment.Author>
                        <Comment.Metadata>
                            <span>Yesterday at 12:30AM</span>
                            <span>
                                <Rating
                                    maxRating={5}
                                    defaultRating={4}
                                    icon="star"
                                    size="small"
                                />
                            </span>
                        </Comment.Metadata>
                        <Comment.Text>
                            <p>
                                This has been very useful for my research.
                                Thanks as well!
                            </p>
                        </Comment.Text>
                        <Comment.Actions>
                            <a>Reply</a>
                        </Comment.Actions>
                    </Comment.Content>
                </Comment>

                <Comment>
                    <Comment.Avatar
                        as="a"
                        src="https://react.semantic-ui.com/images/avatar/small/joe.jpg"
                    />
                    <Comment.Content>
                        <Comment.Author as="a">Joe Henderson</Comment.Author>
                        <Comment.Metadata>
                            <span>5 days ago</span>
                            <span>
                                <Rating
                                    maxRating={5}
                                    defaultRating={4}
                                    icon="star"
                                    size="small"
                                />
                            </span>
                        </Comment.Metadata>
                        <Comment.Text>
                            Dude, this is awesome. Thanks so much
                        </Comment.Text>
                        <Comment.Actions>
                            <a>Reply</a>
                        </Comment.Actions>
                    </Comment.Content>
                </Comment>

                <Form reply>
                    <Form.TextArea
                        placeholder="Write a Review ..."
                        style={{ minHeight: 120 }}
                    />
                    <Button positive>
                        <span style={{ marginRight: '0.5rem' }}>
                            <FontAwesomeIcon icon={faPencilAlt} />
                        </span>
                        Add Reply
                    </Button>
                </Form>
            </Comment.Group>
        </div>
    );
}

export default Comments;
