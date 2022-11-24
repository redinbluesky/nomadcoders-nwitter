import NweetFactory from "components/NweetFactory";
import Nweet from "components/Nweets";
import { dbService, storageService } from "fbase";
import react, { useEffect, useState } from "react";

const Home = ({userObj}) => {
    
    const [nweets, setNweets] = useState([]);
    
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
    
    return  (
        <div className="container">
           <NweetFactory userObj={userObj}/>
            <div style={{ marginTop: 30 }}>
               {nweets.map(nweet => 
                    <Nweet key={nweet.id} nweetObj={nweet} isOnwer={nweet.creatorId === userObj.uid} />)}
            </div>
        </div>
    );
}

export default Home;