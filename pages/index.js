import Head from 'next/head';
import Header from '../components/Header';
import { getSession } from 'next-auth/react';
import Login from './../components/Login';
import SideBar from './../components/SideBar';
import Feed from './../components/Feed';
import Widgets from '../components/Widgets';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export default function Home({ userSession, posts }) {
    if (!userSession) return <Login />;

    return (
        <div className="h-screen bg-gray-100 overflow-hidden">
            <Head>
                <title>Facebook Demo</title>
            </Head>

            {/* Header */}
            <Header />

            <main className="flex">
                {/* Sidebar */}
                <SideBar />
                {/* Feed */}
                <Feed posts={posts} />
                {/* Widgets */}
                <Widgets />
            </main>
        </div>
    );
}

export async function getServerSideProps(ctx) {
    const session = await getSession(ctx);

    const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));

    const posts = await getDocs(q);

    // console.log(posts);

    const docs = posts.docs.map(post => ({
        id: post.id,
        ...post.data(),
        timestamp: null,
    }));

    return {
        props: {
            userSession: session,
            posts: docs,
        },
    };
}
