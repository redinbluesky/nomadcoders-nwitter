import Nweet from "components/Nweets";
import { dbService, storageService } from "fbase";
import react, { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const Home = ({userObj}) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const [attachement, setAttachement] = useState("");
    /*
    const getNweets = async () => {
        const dbNweets = await dbService.collection("nweets").get();
        dbNweets.forEach(document => {
            const nweetsObject = {
                ...document.data(),
                id: document.id,
            }
            setNweets((prev) => [nweetsObject, ...prev]);
        });
    }
    */
    useEffect(() => {
        //getNweets();
        dbService.collection("nweets").onSnapshot(snapshot => {
            const nweetArray = snapshot.docs.map(doc => ({id:doc.id, ...doc.data()}));
            setNweets(nweetArray);
        })
    }, []);
    const onSubmit = async (event) => {
        event.preventDefault();
        let attachementURL = "";
        if(attachement !== ""){
            const attahementRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
            const response = await attahementRef.putString(attachement,"data_url");
            attachementURL = await response.ref.getDownloadURL();
        }
        const nweetObj = {
            text:nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachementURL
        }
         await dbService.collection("nweets").add(nweetObj);
        setNweet(""); 
        setAttachement("");
    }
    const onChange = (event) => {
        const {target:{value}} = event;
        setNweet(value);
    }
    const onFileChange = (event) => {
        const {target:{files}} = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onload = (finishedEvent) => {
            const {currentTarget:{result}} = finishedEvent;
            setAttachement(result);
        }
        reader.readAsDataURL(theFile);
    }
    const onClearAttachement = () => setAttachement("");
    return  (
        <div>
            <form onSubmit={onSubmit}>
                <input value={nweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120}/>
                <input onChange={onFileChange} type="file" accept="image/*"/>
                <input type="submit" value="Nweet" />
                {attachement && ( 
                    <div>
                        <img src={attachement} width="50px" height="50px"/>
                        <button onClick={onClearAttachement}>Clear</button>
                    </div>
                )}
            </form>
            <div>
               {nweets.map(nweet => 
                    <Nweet key={nweet.id} nweetObj={nweet} isOnwer={nweet.creatorId === userObj.uid} />)}
            </div>
        </div>
    );
}

export default Home;