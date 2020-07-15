import React from 'react';
import { makeStyles } from '@material-ui/core';
import InfiniteScroll from "react-infinite-scroll-component";

import { getPosts } from '../../graphql';
import { usePagination } from '../../hooks/usePagination';
import { Post, PostArgs } from '../../types';
import { ErrorContainer } from '../ErrorContainer';
import { LoadingContainer } from '../LoadingContainer';
import { PostCard } from '../PostCard';

interface PostsProps {
    args: PostArgs;
}

export const Posts = ({ args }: PostsProps) => {
    const {
        loading,
        error,
        items,
        fetchMoreData,
        hasMore
    } = usePagination<Post, PostArgs>(args, 'posts', getPosts);

    const classes = useStyles();

    return (
        <LoadingContainer loading={loading}>
            <ErrorContainer error={error != null}>
                <InfiniteScroll
                dataLength={items.length}
                next={fetchMoreData}
                hasMore={hasMore || false}
                loader={<h4>Loading...</h4>}
                >
                {items && items.map(({ node: post }: { node: Post }) => (
                    <PostCard post={post} key={`allposts-${post.id}`} type="summary" className={classes.postCard} />
                ))}
                </InfiniteScroll>
            </ErrorContainer>
        </LoadingContainer>
    )
};

const useStyles = makeStyles({
    postCard: {
        marginBottom: '1rem',
    }
});