import React, { useState, useEffect, useCallback } from 'react';
import SafeAreaView from 'react-native-safe-area-view';

import LazyImage from '../../components/LazyImage';

import { Post, Header, Avatar, Name, Description, Loading } from './styles';
import { FlatList } from 'react-native';

export default function Feed() {
    const [feed, setFeed] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [viewable, setViewable] = useState([]);
    async function loadPage(pageNumber = page, shouldRefresh = false) {
        if (total && pageNumber > total) return;
        setLoading(true);
        const response = await fetch(`http://localhost:3000/feed?_expand=author&_limit=4&_page=${pageNumber}`);
        const data = await response.json();
        const totalItems = response.headers.get('X-Total-Count');
        setFeed(shouldRefresh ? data : [...feed, ...data]);
        setTotal(Math.floor(totalItems / 5));
        setPage(pageNumber + 1);
        setLoading(false);
    }
    useEffect(() => {
        loadPage();
    }, []);

    async function refreshList() {
        setRefreshing(true);

        await loadPage(1, true);

        setRefreshing(false);
    }

    const handleViewableChanged = useCallback(({ changed }) => {
        setViewable(changed.map(({ item }) => item.id));
    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FlatList
                data={feed}
                keyExtractor={post => String(post.id)}
                onEndReached={() => loadPage()}
                onRefresh={refreshList}
                refreshing={refreshing}
                onViewableItemsChanged={handleViewableChanged}
                onEndReachedThreshold={0.1}
                viewabilityConfig={{ viewAreaCoveragePercentThreshold: 20 }}
                ListFooterComponent={loading && <Loading />}
                renderItem={({ item }) => (
                    <Post>
                        <Header>
                            <Avatar source={{ uri: item.author.avatar }} />
                            <Name>{item.author.name}</Name>
                        </Header>
                        <LazyImage
                            shouldLoad={viewable.includes(item.id)}
                            aspectRatio={item.aspectRatio}
                            smallSource={{ uri: item.small }}
                            source={{ uri: item.image }} />
                        <Description>
                            <Name>{item.author.name}</Name> {item.description}
                        </Description>
                    </Post>
                )}
            />
        </SafeAreaView>
    );
}
