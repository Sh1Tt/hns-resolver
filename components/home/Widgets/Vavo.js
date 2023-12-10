import Link from "next/link";
const Vavo = () => <>
    <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        padding: "1rem",
        textAlign: "center",
        color: "#fff",
        fontSize: "1rem",
        fontWeight: "bold",
        textShadow: "0px 0px 5px #000",
        borderRadius: "0.5rem"
    }}>
        <h4>
            Background by:
        </h4>
        <div>
            VAVortex AI ART Community
        </div>
        <Link href="https://linktr.ee/johannanyqvist">
            <a style={{
                color: "cornflowerblue",
                textShadow: "0px 0px 5px #000"
            }}>
                @johannanyqvist
            </a>
        </Link>
    </div>
</>;

export default Vavo;