import { useState, useEffect } from "react"

export default function Main() {

    const [meme, setMeme] = useState({
        topText: "One does not simply",
        bottomText: "Walk into Mordor",
        imgUrl: "http://i.imgflip.com/1bij.jpg"
    });

    const [allImgs, setAllImgs] = useState([]);

    function handleChange(event) {
        const { value, name } = event.currentTarget;
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }));
    };

    useEffect(() => {
        fetch('https://api.imgflip.com/get_memes')
            .then(res => res.json())
            .then(data => {
                const memes = data.data.memes;
                setAllImgs(memes);

                const randomIndex = Math.floor(Math.random() * memes.length)
                const randomImg = memes[randomIndex].url
                setMeme(prevMeme => ({
                    ...prevMeme,
                    imgUrl: randomImg
                }));


            })
    }, []);

    function getNewImage() {
        const randomIndex = Math.floor(Math.random() * allImgs.length)
        const randomImg = allImgs[randomIndex].url
        setMeme(prevMeme => ({
            ...prevMeme,
            imgUrl: randomImg
        }));
    }


    return (
        <main>
            <div className="form">
                <label>Top Text
                    <input
                        type="text"
                        placeholder="One does not simply"
                        name="topText"
                        onChange={handleChange}
                        value={meme.topText}
                    />
                </label>

                <label>Bottom Text
                    <input
                        type="text"
                        placeholder="Walk into Mordor"
                        name="bottomText"
                        onChange={handleChange}
                        value={meme.bottomText}
                    />
                </label>
                <button onClick={getNewImage}>Get a new meme image 🖼</button>
            </div>
            <div className="meme">
                <img src={meme.imgUrl} />
                <span className="top">{meme.topText}</span>
                <span className="bottom">{meme.bottomText}</span>
            </div>
        </main>
    )
}