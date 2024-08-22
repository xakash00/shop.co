import React, { useEffect, useState } from 'react'

const AboutUs = (props) => {
    const [data, setData] = useState({})

    useEffect(() => {
        fetch("https://api.quotable.io/quotes/random").then((res) => {
            return res.json()
        }).then((data) => {
            setData(data)
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    return (
        <>

            <pre><code>{JSON.stringify(props, null, 2)}</code></pre>
            <pre><code>{JSON.stringify(data, null, 2)}</code></pre>
        </>
    )
}

export default AboutUs

export async function getStaticProps() {
    // Call an external API endpoint to get posts
    const res = await fetch('https://api.quotable.io/quotes/random')
    const posts = await res.json()

    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
        props: {
            posts,
        },
        revalidate: 60

    }
}

// By returning { props: { posts } }, the Blog component
// will receive `posts` as a prop at build time

