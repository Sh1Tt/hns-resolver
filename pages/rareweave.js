import Link from "next/link";
import Head from "next/head";
import CMS from "../cms";
import RareWeave from "../components/rareweave";

const RareWeavepage = () => {
    const launch = new Date("2023-04-15T00:00:00.000Z").getTime() - new Date().getTime() < 0;
    const cursorType = launch 
    ? "pointer"
    : "not-allowed";

    return (<>
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#008000" />
            <meta name="description" content="Countdown clock to the first liquid marketplace on arweave" />
            <meta name="title" content="Countdown to the launch of rareweave.store" />
            <meta property="og:title" content="Countdown to the launch of rareweave.store" />
            <meta property="og:description" content="Countdown clock to the first liquid marketplace on arweave" />
            <meta property="og:url" content="https://rareweave.store" />
            <meta property="og:type" content="website" />
            <meta property="og:image" content="/rareweave.png" />
            <link rel="canonical" href="https://rareweave.store" />
            <title>
                Countdown clock to the first liquid marketplace on arweave
            </title>
            <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="78x78" />
            <link rel="manifest" href="/site.webmanifest" />
        </Head>
        <div id="__rareweave">
            <RareWeave />
            <div style={{ 
                height: "100px",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "2rem",
                fontWeight: "bold",
                color: "white",
                backgroundColor: "rgba(178,3,72,1)"
            }}>
                <span
                    style={{
                        position: "relative",
                        cursor: cursorType
                    }}
                    onClick={() => {
                        if (launch)
                        window.location.href = "https://rareweave.store";
                    }}
                    >
                    To the marketplace
                </span>
            </div>
        </div>
    </>);
};

export default RareWeavepage;