import { useState, useEffect } from 'react';

const useTheshake = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const res = await fetch("https://theshake.substack.com/feed");
                const xml = await res.text();
                const parser = new DOMParser();
                const doc = parser.parseFromString(xml, "application/xml");
                const items = doc.querySelectorAll("item");
                console.log(items)
                const articles = items.map(item => {
                    const title = item.querySelector("title").textContent;
                    const link = item.querySelector("link").textContent;
                    const pubDate = item.querySelector("pubDate").textContent;
                    const description = item.querySelector("description").textContent;
                    return {
                        title,
                        link,
                        pubDate,
                        description,
                    };
                });

                setArticles(articles[0]);
            } 
            catch (err) {
                setError(err);
            };

            setLoading(false);
        };

        fetchData();
    }, []);

    return { loading, error, articles };
};

export default useTheshake;