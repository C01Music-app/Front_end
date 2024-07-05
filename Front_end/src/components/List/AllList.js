import {PlayList} from "./PlayLists";
import Slider from "./Slider";
import {AlbumList} from "./AlbumList";
import {Artists} from "./Artists/Artists";

export function AllList() {
    return (
        <>
            <div style={{padding: '0px 24px'}}><Slider/>
                <PlayList/>
                <AlbumList/>
                <Artists/></div>

        </>
    )
}
